Template.nodeInfo.helpers({
  name: function () {
    var node = Session.get('curremtFeature');
    if (node) {
      return node.name;
    }
  }
});

