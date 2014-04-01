Template.nodeInfo.helpers({
  controls: function () {
    var currentLayerName = Session.get('currentLayerName');
    console.log(currentLayerName);
    if (currentLayerName == 'fds.metoffice') {
      return Template.metOffice;
    }
  },
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

