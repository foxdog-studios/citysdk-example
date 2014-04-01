function onRegionsReceived(error, result) {
  if (error) {
    console.error(error);
  }
  Meteor.call('upsertRegions', result);
}

Template.regions.created = function () {
  HTTP.get(ENDPOINT_URL + '/regions/', onRegionsReceived);
};

Template.regions.helpers({
  regions: function() {
    return Regions.find({});
  }
});

Template.regions.events({
  'change .region': function(e) {
    var regionId = $(e.target).val();
    Session.set('regionId', regionId);
  }
});

