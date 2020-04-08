Ext.define('lsk.view.schedule.SheduleStore', {
  extend: 'Ext.data.Store',
  alias: 'store.shedulestore',
  autoLoad: true,
  fields: [
    { name: 'id', type: 'int' },
    { name: 'code', type: 'string' },
    { name: 'name', type: 'string' }
  ],
  proxy: {
    type: 'ajax',
    actionMethods: 'GET',
    paramsAsJson: true,
    api: { read: 'app/view/schedule/store.json' },
    startParam: '',
    limitParam: '',
    pageParam: '',
    pageSize: '',
    extraParams: { },
    reader: {
      type: 'json',
      rootProperty: 'result',
      successProperty: 'success',
      totalProperty: 'total'
    }
  },
  sorters: [
    { property: 'code', direction: 'ASC' },
  ],
  remoteFilter: true,
  remoteSort: true
});


