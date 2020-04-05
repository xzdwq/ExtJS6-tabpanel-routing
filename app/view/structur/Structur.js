Ext.define('lsk.view.structur.StructuJSONReader', {
  extend: 'Ext.data.reader.Json',
  alias : 'reader.StructuJSONReader',
  buildExtractors : function() {
    var me = this;
    me.callParent(arguments);
    me.getRoot = function(res) {
      switch(res.code) {
        case 'LSK.1':
          return res['leaf'] = true,
          console.log(res);
        case 'LSK.2':
          return res['leaf'] = true,
          console.log(res);
        case 'LSK.3':
          return res['leaf'] = true,
          console.log(res);
      }
        return res['result'];
    };
  }
});

Ext.define('lsk.view.structur.Structur', {
  extend: 'Ext.panel.Panel',
  alias: 'widget.structur',
  requires: [
    'lsk.view.structur.StructurController'
  ],
  controller: 'structur',
  bodyPadding: 2,
  layout: 'border',
  items: [
    {
      xtype: 'treepanel',
      itemId: 'treepanel',
      displayField: 'name',
      store: {
        type: 'tree',
        autoLoad: true,
        proxy: {
          type: 'ajax',
          headers: { "Content-Type": 'application/json' },
          actionMethods: {
            read: 'GET',
            update: 'POST'
          },
          api: { read: 'app/view/structur/structur.json' },
          reader: {
            type: 'StructuJSONReader',
            rootProperty: 'result',
            successProperty: 'success',
            totalProperty: 'total'
          }
        },
        root: {
          id: 0,
          text: 'structur',
          expanded: true
        }
      },
      rootVisible: false,
      split: true,
      autoScroll: true,
      border: true,
      flex: .7,
      region: 'west',
      dockedItems: {
        xtype: 'panel',
        layout: { type: 'hbox', align: 'stretch' },
        region: 'north',
        border: true,
        dock: 'top',
        defaults: { margin: 5 },
        items: [
          {
            xtype: 'textfield',
            inputType: 'search',
            fieldLabel: 'Код',
            labelPad: 0,
            labelWidth: 30,
            width: 190,
            emptyText: 'Введите код работы',
          },
          {
            xtype: 'panel',
            layout: { type: 'hbox', pack: 'end' },
            flex: 1,
            items: [
              {
                xtype: 'button',
                text: 'Развернуть все',
                region: 'east'
              },{ padding: 3 },
              {
                xtype: 'button',
                text: 'Свернуть все',
                region: 'east'
              }
            ]
          }
        ]
      }
    }
  ]
});