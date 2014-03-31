function onNodesReceived(error, result) {
  if (error) {
    console.error(error);
    return;
  }
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
    Nodes.upsert({_id: node._id}, node);
  });
}

Template.nodes.created = function () {
  Deps.autorun(function () {
    var currentLayerName = Session.get('currentLayerName');
    if (currentLayerName) {
      HTTP.get(ENDPOINT_URL + '/nodes/?layer=' + currentLayerName + '&geom',
               onNodesReceived);
    }
  });
};

Template.nodes.helpers({
  nodes: function() {
    return Nodes.find({});
  }
});

