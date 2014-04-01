Template.layers.helpers({
  layers: function() {
    return Layers.find();
  }
});

Template.layers.events({
  'change .layer': function (e) {
    e.preventDefault();
    var layerName = $(e.target).val();
    Session.set('currentLayerName', layerName);
  }
});

function onNodesReceived(error, result) {
  if (error) {
    console.error(error);
    return;
  }
  Meteor.call('upsertNodes', result);
}

Template.layers.created = function () {
  Deps.autorun(function () {
    var currentLayerName = Session.get('currentLayerName');
    if (currentLayerName) {
      HTTP.get(ENDPOINT_URL + '/nodes/?per_page=100&layer=' + currentLayerName + '&geom',
               onNodesReceived);
    }
  });
};

