Meteor.publish('ibeacons', function () {
  return Ibeacons.find();
});
