MyRandom = {};

MyRandom.genInt = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

MyRandom.getObject = function (array) {
  var length = array.length;
  var random = this.genInt(0, length - 1);

  return array[random];
};

//customer profile
Profiles = {
  walkby: function (customerId, storeId) {
    var doorBeacon = Ibeacons.findOne({store_id: storeId, roles: 'door'});
    Simulate.trackEvent(customerId, doorBeacon && doorBeacon._id, MyRandom.genInt(1, 5));
  },

  //light browsing
  checkingOut: function (customerId, storeId) {
    var doorBeacon = Ibeacons.findOne({store_id: storeId, roles: 'door'});
    var productBeacons = Ibeacons.find({store_id: storeId, roles: 'product'}).fetch();
    var randomProductBeacon = MyRandom.getObject(productBeacons);

    Simulate.trackEvent(customerId, doorBeacon && doorBeacon._id, MyRandom.genInt(10, 20));
    Simulate.trackEvent(
        customerId,
        randomProductBeacon && randomProductBeacon._id, //ibeacon id
        MyRandom.genInt(5, 20),  //duration in ibeacon
        MyRandom.genInt(17, 22)  //starting point
    );
    Simulate.trackEvent(
        customerId,
        doorBeacon && doorBeacon._id,
        MyRandom.genInt(4, 10),
        MyRandom.genInt(41, 45)
    );
  },

  browsing: function (customerId, storeId) {
    var doorBeacon = Ibeacons.findOne({store_id: storeId, roles: 'door'});
    var productBeacons = Ibeacons.find({store_id: storeId, roles: 'product'}).fetch();
    var randomProductBeacon = MyRandom.getObject(productBeacons);
    var randomProductBeacon2 = MyRandom.getObject(productBeacons);

    Simulate.trackEvent(customerId, doorBeacon && doorBeacon._id, MyRandom.genInt(10, 20));
    Simulate.trackEvent(
        customerId,
        randomProductBeacon && randomProductBeacon._id,
        MyRandom.genInt(5, 20),
        MyRandom.genInt(17, 22)
    );
    Simulate.trackEvent(
        customerId,
        randomProductBeacon2 && randomProductBeacon2._id,
        MyRandom.genInt(5, 20),
        MyRandom.genInt(37, 43)
    );
    Simulate.trackEvent(
        customerId,
        doorBeacon && doorBeacon._id,
        MyRandom.genInt(4, 10),
        MyRandom.genInt(55, 61)
    );
  },

  buying: function (customerId, storeId) {
    var doorBeacon = Ibeacons.findOne({store_id: storeId, roles: 'door'});
    var productBeacons = Ibeacons.find({store_id: storeId, roles: 'product'}).fetch();
    var cashierBeacon = Ibeacons.findOne({store_id: storeId, roles: 'cashier'});
    var randomProductBeacon = MyRandom.getObject(productBeacons);
    var randomProductBeacon2 = MyRandom.getObject(productBeacons);

    Simulate.trackEvent(customerId, doorBeacon && doorBeacon._id, MyRandom.genInt(10, 20));
    Simulate.trackEvent(
        customerId,
        randomProductBeacon && randomProductBeacon._id,
        MyRandom.genInt(5, 20),
        MyRandom.genInt(17, 22)
    );
    Simulate.trackEvent(
        customerId,
        randomProductBeacon2 && randomProductBeacon2._id,
        MyRandom.genInt(5, 20),
        MyRandom.genInt(37, 43)
    );
    Simulate.trackEvent(
        customerId,
        cashierBeacon && cashierBeacon._id,
        MyRandom.genInt(10, 40),
        MyRandom.genInt(55, 61)
    );
    //XXX simplify here a little bit, the shopper should past the product here. but
    //we are not recording.  This should be changed with more research.
    Simulate.trackEvent(
        customerId,
        doorBeacon && doorBeacon._id,
        MyRandom.genInt(4, 10),
        MyRandom.genInt(97, 100)
    );
  }
};
