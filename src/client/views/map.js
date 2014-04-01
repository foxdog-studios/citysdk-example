PRECPITATION_COLORS = [
  '#fff7fb',
  '#ece7f2',
  '#d0d1e6',
  '#a6bddb',
  '#74a9cf',
  '#3690c0',
  '#0570b0',
  '#045a8d',
  '#023858',
];

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
  }).setView([53.43, -2.18], 11);

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
      var pointStyle = {
        radius: 5,
        weight: 1,
        opacity: 1,
        fillOpacity: 0.9,
        stroke: false
      };
      metOffice = 'fds.metoffice'.replace(/\./g, '\uff0e');
      var metOfficeIndex = parseInt(Session.get('metOfficeIndex'))
      if (feature.properties.layers[metOffice]) {
        var indexX = 0;
        var indexY = 0;
        var data = feature.properties.layers[metOffice].data.Period;
        if (metOfficeIndex) {
          var count = 0;
          for (var i = 0; i < data.length; i++) {
            var rep = data[i].Rep;
            for (var j = 0; j < rep.length; j++) {
              count ++;
              if (count == metOfficeIndex) {
                break;
              }
            }
            if (count == metOfficeIndex) {
              break;
            }
          }
          indexX = i;
          indexY = j;
        }
        data = data[indexX].Rep;
        var percipitationProb = parseInt(data[indexY].Pp);
        // 100 is max
        var index = Math.floor((percipitationProb / 100)
                            * PRECPITATION_COLORS.length);
        var color = PRECPITATION_COLORS[index];
        pointStyle.fillColor = color;
        pointStyle.color = color;
      }
      return L.circleMarker(latlng, pointStyle);
    }
  }).addTo(map);

  Deps.autorun(function () {
    layer.clearLayers();
    var layerKey = Session.get('currentLayerName');
    var metOfficeIndex = Session.get('metOfficeIndex');
    if (!layerKey) {
      return;
    }
    layerKey = layerKey.replace(/\./g, '\uff0e');
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

