Template.metOffice.created = function() {
};

Template.metOffice.helpers({
  max: function() {
    var node = Nodes.findOne();
    var metOffice = 'fds.metoffice'.replace(/\./g, '\uff0e');
    var maxSoFar = 0;
    if (!node) {
      return maxSoFar;
    }
    if (node.layers[metOffice]) {
      var periods = node.layers[metOffice].data.Period;
      for (var i = 0; i < periods.length; i++) {
        var time = periods[i].Rep;
        maxSoFar += time.length;
      }
    }
    return maxSoFar;
  }
});

Template.metOffice.events({
  'change .time': function(e) {
    var index = $(e.target).val();
    Session.set('metOfficeIndex', index);
  }
});

