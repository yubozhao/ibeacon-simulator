Customers.spawnRandom = function (number) {
  for (var i = 0; i < number; i++) {
    Customers.insert({
      uuid: Meteor.uuid(),
      random: Math.random(),   // we have this here for select random user later on.
      created_at: new Date
    });
  };
};
