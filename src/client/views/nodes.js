function onNodesReceived(error, result) {
  if (error) {
    console.error(error);
  }
  content = JSON.parse(result.content);
  nodes = content.results;
  _.each(nodes, function (node) {
    node._id = node.cdk_id;
    Nodes.upsert({_id: node._id}, node);
  });
}

Template.nodes.created = function () {
  HTTP.get(ENDPOINT_URL + '/nodes/?geom', onNodesReceived);
};

Template.nodes.helpers({
  nodes: function() {
    return Nodes.find({});
  }
});

