Meteor.subscribe('layers');
Meteor.subscribe('regions');
Deps.autorun(function() {
  Meteor.subscribe('nodes', Session.get('currentLayerName'));
});

