ENDPOINT_URL = 'https://citysdk.futureeverything.org';

function onLayersReceived(error, result) {
  if (error) {
    console.error(error);
  }
  Meteor.call('upsertLayer', result);
}

Template.home.created = function() {
  HTTP.get(ENDPOINT_URL + '/layers/', onLayersReceived);
}

