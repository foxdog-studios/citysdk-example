function onNodesReceived(error, result) {
  if (error) {
    console.error(error);
    return;
  }
  Meteor.call('upsertNodes', result);
}

Template.nodes.created = function () {
  Deps.autorun(function () {
    var currentLayerName = Session.get('currentLayerName');
    if (currentLayerName) {
      HTTP.get(ENDPOINT_URL + '/nodes/?per_page=100&layer=' + currentLayerName + '&geom',
               onNodesReceived);
    }
  });
};

Template.nodes.helpers({
  nodes: function() {
    return Nodes.find({});
  }
});

