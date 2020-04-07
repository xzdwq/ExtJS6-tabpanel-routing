Ext.define('lsk.view.structur.Structur', {
  extend: 'Ext.panel.Panel',
  alias: 'widget.structur',
  requires: [
    'lsk.view.structur.StructurController',
    'lsk.view.structur.plugins.StructurJSONReader',
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
            type: 'StructurJSONReader',
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
      flex: .4,
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
            itemId: 'searching',
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
          itemId: 'treecolumn',
          dataIndex: 'name',
          align: 'left',
          flex: 1,
          sortable: true
        }
      ], layout: 'fit',
    },
    {
      region: 'center',
      xtype: 'panel',
      border: true,
      collapsible: false,
      split: { size: 5 },
      heigth: '100%',
      layout: 'fit'
    }
  ]
});