function onRegionsReceived(error, result) {
  if (error) {
    console.error(error);
  }
  content = JSON.parse(result.content);
  regions = content.results;
  _.each(regions, function (region) {
    region._id = region.cdk_id;
    Regions.upsert({_id: region._id}, region);
  });
}

Template.regions.created = function () {
  HTTP.get(ENDPOINT_URL + '/regions/', onRegionsReceived);
};

Template.regions.helpers({
  regions: function() {
    return Regions.find({});
  }
});

