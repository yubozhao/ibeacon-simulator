/*****************************************************************************/
/* Client App Namespace  */
/*****************************************************************************/
_.extend(App, {
  subs: {
    stores: Meteor.subscribe('stores'),
    ibeacons: Meteor.subscribe('ibeacons'),
    logs: Meteor.subscribe('logs')
  }
});

App.helpers = {
};

_.each(App.helpers, function (helper, key) {
  Handlebars.registerHelper(key, helper);
});

Template.Controls.events({
  'click .start': function () {
    Meteor.call('/app/simulation/start/basic_scenario');
  },
  'click .clean': function () {
    Meteor.call('/logs/clean');
  },
});
Template.Controls.helpers({
  logs: function () {
    return Logs.find({}, {sort: {created_at: -1}});
  },
  ibeacon: function () {
    return Ibeacons.findOne({_id: this.ibeacon_id});
  }
});
