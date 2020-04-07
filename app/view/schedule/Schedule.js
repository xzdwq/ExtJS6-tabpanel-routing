Ext.define('lsk.view.schedule.Schedule', {
  extend: 'Ext.panel.Panel',
  alias: 'widget.schedule',
  requires: [
    //'lsk.view.structur.StructurController',
    'lsk.view.schedule.plugins.GridColumnFilter'
  ],
  //controller: 'structur',
  bodyPadding: 2,
  layout: 'border',
  items: [
    {
      region: 'north',
      xtype: 'form',
      collapsible: true,
      collapsed: false,
      titleCollapse: true,
      title: 'Фильтр',
      border: true,
      bodyPadding: '5 5 0 5',
      layout: { type: 'hbox' },
      items: [
        {
          xtype: 'panel',
          layout: { type: 'vbox' },
          items: [
            {
              xtype: 'panel',
              layout: { type: 'hbox' },
              defaults: {
                width: 190,
                labelWidth: 70,
                labelAlign: 'right',
              },
              items: [
                {
                  xtype: 'combobox',
                  name: 'year',
                  fieldLabel: 'Год',
                  allowBlank: false,
                  //store: { type: 'years' },
                  displayField: 'year',
                  valueField: 'year'
                }
              ]
            }
          ]
        }
      ]
    },
    {
      region: 'center',
      xtype: 'grid',
      layout: 'fit',
      //store: store,
      columnLines: true,
      border: true,
      columns: [
        {
          text: '№<br>п/п',
          width: 60,
          align: 'center',
          //dataIndex: 'company',
          sortable : false,
          menuDisabled: true,
          draggable: false,
          locked: true
        },
        {
          text: 'Наименование',
          width: 300,
          align: 'center',
          //dataIndex: 'company',
          sortable : true,
          draggable: false,
          locked: true,
          items: { xtype: 'gridcolumnfilter', cls: 'gridcolumnfilter' }
        },
        {
          text: 'Код',
          width: 150,
          align: 'center',
          //dataIndex: 'company',
          sortable : true,
          draggable: false,
          locked: true,
          items: { xtype: 'gridcolumnfilter', cls: 'gridcolumnfilter' }
        },
        {
          text: 'Статус',
          width: 150,
          align: 'center',
          //dataIndex: 'company',
          sortable : true,
          draggable: false,
          items: { xtype: 'gridcolumnfilter', cls: 'gridcolumnfilter' }
        },
        {
          text: 'Сроки',
          sortable : false,
          draggable: false,
          menuDisabled: true,
          columns: [
            {
              text: 'Старт',
              width: 75,
              // dataIndex: 'price'
              sortable : true,
              draggable: false,
              //renderer : 'usMoney'
            },
            {
              text: 'Финиш',
              width: 75,
              // dataIndex: 'change'
              sortable : true,
              draggable: false,
              // renderer : change,
            }
          ]
        },
        {
          text: 'Ключ. событие',
          width: 150,
          align: 'center',
          // dataIndex: 'lastChange',
          sortable : true,
          draggable: false,
          // renderer : Ext.util.Format.dateRenderer('m/d/Y')
        },
        {
          text: 'Обеспечение',
          sortable : false,
          draggable: false,
          menuDisabled: true,
          columns: [
            {
              text: 'ПСД',
              sortable : false,
              draggable: false,
              menuDisabled: true,
              columns: [
                {
                  text: 'Выпуск РД',
                  width: 50,
                  height: 100,
                  align: 'left',
                  cls: 'vertical',
                  // dataIndex: 'lastChange',
                  sortable : true,
                  draggable: false
                },
                {
                  text: 'Раб.док.',
                  width: 50,
                  height: 100,
                  align: 'left',
                  cls: 'vertical',
                  // dataIndex: 'lastChange',
                  sortable : true,
                  draggable: false
                },
                {
                  text: 'Смета',
                  width: 50,
                  height: 100,
                  align: 'left',
                  cls: 'vertical',
                  // dataIndex: 'lastChange',
                  sortable : true,
                  draggable: false
                }
              ]
            },
            {
              text: 'Материалы',
              sortable : false,
              menuDisabled: true,
              draggable: false,
              columns: [
                {
                  text: 'Спец.',
                  width: 50,
                  height: 100,
                  align: 'left',
                  cls: 'vertical',
                  // dataIndex: 'lastChange',
                  sortable : true,
                  draggable: false
                },
                {
                  text: 'Заказано',
                  width: 50,
                  height: 100,
                  align: 'left',
                  cls: 'vertical',
                  // dataIndex: 'lastChange',
                  sortable : true,
                  draggable: false
                },
                {
                  text: 'Поставл.',
                  width: 50,
                  height: 100,
                  align: 'left',
                  cls: 'vertical',
                  // dataIndex: 'lastChange',
                  sortable : true,
                  draggable: false
                },
                {
                  text: 'Не поставл.',
                  width: 50,
                  height: 100,
                  align: 'left',
                  cls: 'vertical',
                  // dataIndex: 'lastChange',
                  sortable : true,
                  draggable: false
                }
              ]
            },
            {
              text: 'Стройгот.',
              width: 50,
              height: 100,
              align: 'left',
              cls: 'vertical',
              // dataIndex: 'lastChange',
              sortable : true,
              draggable: false
            }
          ]
        },
        {
          text: 'Подрядчик',
          width: 150,
          align: 'center',
          // dataIndex: 'lastChange',
          sortable : true,
          draggable: false,
          items: { xtype: 'gridcolumnfilter', cls: 'gridcolumnfilter' }
        },
        {
          text: 'Объект',
          width: 150,
          align: 'center',
          // dataIndex: 'lastChange',
          sortable : true,
          draggable: false,
          items: { xtype: 'gridcolumnfilter', cls: 'gridcolumnfilter' }
        },
        {
          text: 'Группа объектов',
          width: 150,
          align: 'center',
          // dataIndex: 'lastChange',
          sortable : true,
          draggable: false,
          items: { xtype: 'gridcolumnfilter', cls: 'gridcolumnfilter' }
        }
      ]
    }
  ]
});