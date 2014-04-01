Meteor.publish('nodes', function(layerName, regionId) {
  if (!layerName) {
    return;
  }
  layerName = layerName.replace(/\./g, '\uff0e');
  var query = {};
  query['layers.' + layerName] = {
    $exists: true
  };
  return Nodes.find(query);
});

Meteor.publish('layers', function() {
  return Layers.find({});
});

Meteor.publish('regions', function() {
  return Regions.find({});
});

