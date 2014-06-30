Scenarios = {
  //every minute there are group of 10 users that does something. for 5 mins.
  wave: function () {
    //random customers
    var random = Math.random();
    var customers = Customers.find(
        {random: {$gte: random}},
        {limit: MyRandom.genInt(1, 15)}).fetch();

    if (customers == null) {
      customers = Customers.find(
          {random: {$lte: random}},
          {limit: MyRandom.genInt(1, 15)}).fetch();
    };

    var store = Stores.findOne();
    _.each(customers, function (customer) {
      var chance = MyRandom.genInt(0, 20);

      if (chance >= 19) {
        return Profiles.buying(customer._id, store._id);
      } else if (chance >= 15) {
        return Profiles.checkingOut(customer._id, store._id);
      } else if (chance >= 10) {
        return Profiles.browsing(customer._id, store._id);
      } else {
        return Profiles.walkby(customer._id, store._id);
      }
    });
  },

  basic: function () {
    Logs.insert({
      type: 'Start simulation'
    });
    Scenarios.wave();
    var waves = Meteor.setInterval(function () {
      Scenarios.wave();
    }, 60000);

    var totalTest = Meteor.setTimeout(function () {
      Meteor.clearInterval(waves);
      Logs.insert({
        type: 'END simulation'
      });
    }, 300000);
  }
};
