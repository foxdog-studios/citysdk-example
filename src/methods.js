Meteor.methods({
  'upsertLayer': function(result) {
    content = JSON.parse(result.content);
    layers = content.results;
    _.each(layers, function (layer) {
      layer._id = layer.name;
      Layers.upsert(layer._id, layer);
    });
  },
  'upsertNodes': function(result) {
    content = JSON.parse(result.content);
    nodes = content.results;
    _.each(nodes, function (node) {
      node._id = node.cdk_id;
      for (var layerName in node.layers) {
        if (node.layers.hasOwnProperty(layerName)) {
          // Replace '.' with unicode equivalent fore mongodb
          newLayerName = layerName.replace(/\./g, '\uff0e');
          node.layers[newLayerName] = node.layers[layerName];
          if (newLayerName !== layerName) {
            delete node.layers[layerName];
          }
        }
      }
      Nodes.upsert(node._id, node);
    });
  },
  'upsertRegions': function(result) {
    content = JSON.parse(result.content);
    regions = content.results;
    _.each(regions, function (region) {
      region._id = region.cdk_id;
      Regions.upsert(region._id, region);
    });
  }
});
