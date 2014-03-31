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

