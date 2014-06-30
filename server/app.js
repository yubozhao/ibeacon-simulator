//Generate test data

Meteor.startup(function () {
  if (Customers.find().count() <= 0) {
    Customers.spawnRandom(100);
  }

  if (Stores.find().count() <= 0) {
    Stores.insert({
      _id: 'store1',   //just going to create a _id we could use for ibeacons
      name: 'APC',
      address: '24 WYNDHAM STREET Hong Kong',
      created_at: new Date
    });
  }

  if (Ibeacons.find().count() <= 0) {
    /**
     * Create ibeacons for example store APC
     *
     * based on example diagram, going to create 6 ibeacons.
     * 1 for the door and street traffic
     * 4 for product sections
     * 1 for cashier
     */

    Ibeacons.insert({
      uuid: '74278BDA-B644-4520-8F0C-720EAF059935',
      major: '1', //store 1
      minor: '001', //door
      store_id: 'store1',
      roles: ['door'],
      create_at: new Date
    });

    for (var i = 0; i < 4; i ++) {
      var minor = '10' + i;
      Ibeacons.insert({
        uuid: '74278BDA-B644-4520-8F0C-720EAF059935',
        major: '1', //store 1
        minor: minor, //product sections
        store_id: 'store1',
        roles: ['product'],
        create_at: new Date
      });
    };

    Ibeacons.insert({
      uuid: '74278BDA-B644-4520-8F0C-720EAF059935',
      major: '1', //store 1
      minor: '002', //cashier
      store_id: 'store1',
      roles: ['cashier'],
      create_at: new Date
    });
  }
});


Meteor.methods({
  '/app/simulation/start/basic_scenario': function () {
    Scenarios.basic();
  },

  '/logs/clean': function () {
    Simulate.cleanFireBase();
    Logs.remove({});
  }
});
