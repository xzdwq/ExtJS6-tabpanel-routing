Ext.define('lsk.view.Viewport', {
  extend:'Ext.container.Viewport',
  layout: 'fit',
  requires: [
    'lsk.router.Router',
    'lsk.view.structur.Structur',
    'lsk.view.schedule.Schedule'
  ],
  controller: 'router',
  items: [
    {
      xtype: 'tabpanel',
      itemId: 'tab-panel',
      tabPosition: 'bottom',
      defaults: { bodyPadding: 5, layout: 'fit' },
      items: [
        {
          title: 'Empty-test',
          itemId: 'empty'
        },
        {
          title: 'Структура',
          itemId: 'structur'
        },
        {
          title: 'График',
          itemId: 'schedule'
        }
      ]
    }
  ]
});