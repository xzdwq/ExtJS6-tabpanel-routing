Ext.define('lsk.view.structur.StructurStore', {
  extend: 'Ext.data.TreeStore',
  alias: 'store.structur',
  autoLoad: true,
  listeners: {
    beforeload: function(store, operation, eOpts) {
        var node = operation.node;
        var nn = node.get('name');
    }
  },
  constructor: function() {
      this.callParent(
        Ext.Ajax.request({
          method: 'GET',
          headers: { "Content-Type": 'application/json' },
          url: 'app/view/structur/structur.json',
          scope: this,
          success: function(res, opts) {
            var data = Ext.decode(res.responseText);
            let children = Array.isArray(data.result) ? data.result : [data.result];
            //console.log(data);
            var treepanel = Ext.ComponentQuery.query('#treepanel')[0];
            treepanel.getStore().setRoot({
              id: 0,
              title: 'structur',
              expanded: true,
              children: children,
            });
            treepanel.expandAll();
            //treepanel.selectPath('/' + children[0].code, 'code');
          },
          failure: function(res, opts) {
            var data = Ext.decode(res.responseText);
            console.log(data);
          }
        })
      );
  }
});