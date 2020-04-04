Ext.Loader.setConfig({ enabled: true });
Ext.application({
  name: 'lsk',
  appFolder: 'app',
  autoCreateViewport: true,
  models: [],
  views: [],
  stores: [],
  controllers: [],
  defaultToken : 'structur',
  quickTips: false,
  platformConfig: {
    desktop: { quickTips: true }
  },
  launch: function () {},
  onAppUpdate: function () {
    Ext.Msg.confirm('Application Update', 'This application has an update, reload?',
      function (choice) {
        if (choice === 'yes') {
          window.location.reload();
        }
      }
    );
  }
});