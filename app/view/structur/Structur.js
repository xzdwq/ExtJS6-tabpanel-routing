Ext.define('lsk.view.structur.Structur', {
  extend: 'Ext.panel.Panel',
  alias: 'widget.structur',
  requires: [
    'lsk.view.structur.StructurController',
    'lsk.view.structur.plugins.StructuJSONReader',
    'lsk.view.structur.plugins.TreeFilter'
  ],
  controller: 'structur',
  bodyPadding: 2,
  layout: 'border',
  items: [
    {
      xtype: 'treepanel',
      itemId: 'treepanel',
      plugins: [{
        ptype: 'treefilter',
        allowParentFolders: true
      }],
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
            //type: 'json',
            rootProperty: 'result',
            successProperty: 'success',
            totalProperty: 'total'
          }
        },
        root: {
          id: 0,
          name: 'structur',
          expanded: true,
          nodeType: 'async'
        }
      },
      rootVisible: false,
      split: true,
      autoScroll: true,
      scrollable: true,
      //maxHeight: screen.height*.65,
      border: true,
      flex: .7,
      region: 'west',
      listeners: {
        afterrender: function(treepanel, tool, event) {
          treepanel.expandAll();
        }
      },
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
            enableKeyEvents: true,
            listeners: {
              change: {
                  fn: function(el, txt) {
                  var tree = el.up('treepanel');
                  tree.filter(txt);
                }, buffer: 250
              }
            }
          },
          {
            xtype: 'panel',
            layout: { type: 'hbox', pack: 'end' },
            flex: 1,
            items: [
              {
                xtype: 'button',
                text: 'Развернуть все',
                region: 'east',
                handler: function(el) {
                  var treepanel = Ext.ComponentQuery.query('#treepanel')[0];
                  treepanel.expandAll();
                }
              },{ padding: 3 },
              {
                xtype: 'button',
                text: 'Свернуть все',
                region: 'east',
                handler: function(el) {
                  var treepanel = Ext.ComponentQuery.query('#treepanel')[0];
                  treepanel.collapseAll();
                }
              }
            ]
          }
        ]
      },
      columns: [
        {
          xtype: 'treecolumn',
          dataIndex: 'name',
          align: 'left',
          flex: 1,
          sortable: true
        }
      ]
    }
  ]
});