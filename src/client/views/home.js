ENDPOINT_URL = 'https://citysdk.futureeverything.org';

function onLayersReceived(error, result) {
  if (error) {
    console.error(error);
  }
  content = JSON.parse(result.content);
  layers = content.results;
  _.each(layers, function (layer) {
    layer._id = layer.name;
    Layers.upsert({_id: layer._id}, layer);
  });
}

Template.home.created = function() {
  HTTP.get(ENDPOINT_URL + '/layers/', onLayersReceived);
}


