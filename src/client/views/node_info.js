Template.nodeInfo.helpers({
  rawData: function () {
    var node = Session.get('curremtFeature');
    var currentLayerName = Session.get('currentLayerName');
    if (node && currentLayerName) {
      currentLayerName = currentLayerName.replace(/\./g, '\uff0e');
      layer = node.layers[currentLayerName]
      if (!layer) {
        return;
      }
      data = layer.data;
      if (node.name) {
        data.name = node.name;
      }
      return JSON.stringify(data, null, '  ');
    }
  }
});

