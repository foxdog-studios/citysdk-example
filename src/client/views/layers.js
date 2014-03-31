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

