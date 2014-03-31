function onFeatureClick(e) {
  Session.set('curremtFeature', e.target.feature.properties);
}

function onEachFeature(feature, layer) {
  layer.on('click', onFeatureClick);
}

Template.map.rendered = function() {
  L.Icon.Default.imagePath = 'packages/leaflet/images';

  map = L.map('map', {
    doubleClickZoom: false
  }).setView([53.28, -2.14], 13);

  L.tileLayer.provider('Stamen.TonerHybrid').addTo(map);

  var lineStyle = {
    color: "#CE2027",
    weight: 3,
    opacity: 0.90
  };

  var pointStyle = {
    radius: 5,
    weight: 1,
    opacity: 1,
    fillOpacity: 0.9
  };

  var layer = new L.geoJson(null, {
    style: lineStyle,
    onEachFeature: onEachFeature,
    pointToLayer: function (feature, latlng) {
      return L.circleMarker(latlng, pointStyle);
    }
  }).addTo(map);

  Deps.autorun(function () {
    layer.clearLayers();
    var layerKey = Session.get('currentLayerName');
    if (!layerKey) {
      return;
    }
    layerKey = layerKey.replace(/\./g, '\uff0e');
    console.log(layerKey);
    var query = {};
    query['layers.' + layerKey] = {
      $exists: true
    };
    var nodes = Nodes.find(query);
    nodes.forEach(function (node) {
      var geom;
      var feature = {
        type: 'Feature',
        properties: node
      };
      if (node.geom) {
        geom = node.geom;
      } else if(node.bbox) {
        geom = node.bbox;
      } else {
        return;
      }
      feature.geometry = geom;
      layer.addData(feature);
    });
  });
}

