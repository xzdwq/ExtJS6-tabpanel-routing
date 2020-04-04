Ext.define('lsk.router.Router', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.router',
  views: 'lsk.view.Viewport',
  routes: {
    'structur': {
      action: 'onRoutingStructur'
    },
    'schedule': {
      action: 'onRoutingSchedule'
    }
  },
  init: function() {
    this.control({
      'tabpanel tab': {
        click: 'onClickTab'
      }
    });
  },
  onRoutingStructur: function() {
    var tab = Ext.ComponentQuery.query('#tab-panel')[0];
    var structur = tab.child('#structur');
    tab.setActiveTab(structur);
    structur.add({ xtype: 'structur' });
  },
  onRoutingSchedule: function() {
    var tab = Ext.ComponentQuery.query('#tab-panel')[0];
    var schedule = tab.child('#schedule');
    tab.setActiveTab(schedule);
    schedule.add({ xtype: 'schedule' });
  },
  onClickTab: function() {
    setTimeout(() => {
      var tab = Ext.ComponentQuery.query('#tab-panel')[0];
      this.redirectTo(tab.getActiveTab().itemId);
    }, 100);
  }
});