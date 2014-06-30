Simulate = {};

firebase = new Firebase('https://burning-fire-4763.firebaseio.com/beacon_events');

Simulate.cleanFireBase = function () {
  firebase.remove();
};

Simulate.trackEvent = function (customerId, ibeaconId, duration, startTime) {
  var customer = Customers.findOne({
    _id: customerId
  });

  var ibeacon = Ibeacons.findOne({
    _id: ibeaconId
  });

  if (!customer || !ibeacon) {
    Logs.insert('No customer or ibeacon found');
    return;
  }

  var data = {
    minor: ibeacon.minor,
    major: ibeacon.major,
    uuid: ibeacon.uuid,
    visitor_uuid: customer.uuid,
    created_at: (new Date).toString()
  };

  startTime = startTime || 0;

  Meteor.setTimeout(function () {
    var initCounter = 0;
    var rangeEvent = Meteor.setInterval(function () {
      _.extend(data, {type: 'didRangeBeacons'});
      var result = firebase.push(data);
      Logs.insert({
        type: 'didRangeBeacons',
        customer_uuid: customer.uuid,
        ibeacon_id: ibeacon._id,
        firebase_path: result.path,
        created_at: new Date
      });

      initCounter++;
      if (initCounter == 5) {
        Meteor.clearInterval(rangeEvent);
      }
    }, 1000);

    //there is a slight delay. shouldn't be an issue.
    //exist event
    var exitEvent = Meteor.setTimeout(function () {
      _.extend(data, {type: 'didExitRegion'});
      var result = firebase.push(data);
      Logs.insert({
        type: 'didExitRegion',
        customer_uuid: customer.uuid,
        ibeacon_id: ibeacon._id,
        firebase_path: result.path,
        created_at: new Date
      });
      //and kill off the interval
      if (rangeEvent)
        Meteor.clearInterval(rangeEvent);

      Meteor.clearTimeout(exitEvent);
    }, duration * 1000);
  }, startTime * 1000);
};
