Ext.apply(Ext.form.VTypes, {
  daterange: function(val, field) {
    var date = field.parseDate(val);
    if (!date) {
      return false;
    }
    if (
      field.startDateField &&
      (!this.dateRangeMax || date.getTime() != this.dateRangeMax.getTime())
    ) {
      //var start = Ext.getCmp(field.startDateField);
      var start = Ext.ComponentQuery.query('#start_date')[0];
      start.setMaxValue(date);
      start.validate();
      this.dateRangeMax = date;
    } else if (
      field.endDateField &&
      (!this.dateRangeMin || date.getTime() != this.dateRangeMin.getTime())
    ) {
      //var end = Ext.getCmp(field.endDateField);
      var end = Ext.ComponentQuery.query('#end_date')[0];
      end.setMinValue(date);
      end.validate();
      this.dateRangeMin = date;
    }
    return true;
  }
});

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
          defaults: {
            xtype: 'combobox',
            width: 500,
            labelWidth: 70,
            labelAlign: 'right',
            queryMode: 'local',
            valueField: 'id',
            displayField: 'name',
            editable: false,
            allowBlank: true
          },
          items: [
            {
              itemId: 'project_id',
              fieldLabel: 'Проект',
              emptyText: 'Выберите проект',
              store: {
                fields: [
                  { name: 'id', type: 'int' },
                  { name: 'code', type: 'string' },
                  { name: 'name', type: 'string' }
                ],
                autoLoad: true,
                proxy: {
                  type: 'ajax',
                  actionMethods: 'GET',
                  api: { read: 'app/view/structur/structur.json' },
                  startParam: '',
                  limitParam: '',
                  pageParam: '',
                  pageSize: '',
                  paramsAsJson: true,
                  extraParams: { },
                  reader: {
                    type: 'json',
                    rootProperty: 'result',
                    successProperty: 'success',
                    totalProperty: 'total'
                  }
                }
              },
              allowBlank: false,
              displayField: 'name',
              valueField: 'code',
              listeners: {
                afterrender: function() {
                  this.getStore().on('load', function(store) {
                    var prj = Ext.ComponentQuery.query('#project_id')[0];
                    prj.select(prj.getStore().getAt(0));
                  });
                }
              }
            },
            {
              xtype: 'tagfield',
              itemId: 'object_id',
              fieldLabel: 'Объекты',
              emptyText: 'Выберите объекты',
              //store: { type: 'object' },
              displayField: 'title'
            }
          ]
        },
        {
          xtype: 'panel',
          layout: { type: 'vbox' },
          items: [
            {
              xtype: 'panel',
              layout: { type: 'hbox' },
              defaults: {
                width: 200,
                labelWidth: 70,
                labelAlign: 'right',
                margin: '0 0 5 0',
                editable: false
              },
              items: [
                {
                  xtype: 'combobox',
                  itemId: 'year',
                  fieldLabel: 'Год',
                  allowBlank: false,
                  store: {
                    fields: ['year'],
                    data: [
                      { year: 2010 },
                      { year: 2011 },
                      { year: 2012 },
                      { year: 2013 },
                      { year: 2014 },
                      { year: 2015 },
                      { year: 2016 },
                      { year: 2017 },
                      { year: 2018 },
                      { year: 2019 },
                      { year: 2020 },
                      { year: 2021 },
                      { year: 2022 },
                      { year: 2023 },
                      { year: 2024 },
                      { year: 2025 }
                    ]
                  },
                  queryMode: 'local',
                  displayField: 'year',
                  valueField: 'year',
                  listeners: {
                    afterrender: function() {
                      var mnt = new Date();
                      this.setValue(mnt.getFullYear());
                    }
                  }
                },
                {
                  xtype: 'combobox',
                  itemId: 'month',
                  fieldLabel: 'Месяц',
                  allowBlank: false,
                  store: {
                    fields: ['id', 'month'],
                    data: [
                      { id: 01, month: 'Январь' },
                      { id: 02, month: 'Февраль' },
                      { id: 03, month: 'Март' },
                      { id: 04, month: 'Апрель' },
                      { id: 05, month: 'Май' },
                      { id: 06, month: 'Июнь' },
                      { id: 07, month: 'Июль' },
                      { id: 08, month: 'Август' },
                      { id: 09, month: 'Сентябрь' },
                      { id: 10, month: 'Октябрь' },
                      { id: 11, month: 'Ноябрь' },
                      { id: 12, month: 'Декабрь' }
                    ]
                  },
                  queryMode: 'local',
                  displayField: 'month',
                  valueField: 'id',
                  listeners: {
                    afterrender: function() {
                      var mnt = new Date();
                      this.setValue(mnt.getMonth() + 1);
                    }
                  }
                },
                {
                  xtype: 'radiofield',
                  name: 'dateselector',
                  inputValue: 'yearmon',
                  checked: true,
                  width: 20,
                  margin: '0 0 0 5',
                  listeners: {
                    change: function (el, status) {
                      var year = Ext.ComponentQuery.query('#year')[0];
                      var month = Ext.ComponentQuery.query('#month')[0];
                      if(status == false) {
                        year.setDisabled(true);
                        month.setDisabled(true);
                      } else {
                        year.setDisabled(false);
                        month.setDisabled(false);
                      }
                    }
                  }
                }
              ]
            },
            {
              xtype: 'panel',
              layout: { type: 'hbox' },
              defaults: {
                width: 200,
                labelWidth: 70,
                labelAlign: 'right',
                margin: '5 0 0 0'
              },
              items: [
                {
                  xtype: 'datefield',
                  vtype: 'daterange',
                  endDateField: 'end_date',
                  format: 'd.m.Y',
                  itemId: 'start_date',
                  fieldLabel: 'Начало',
                  allowBlank: false,
                  disabled: true,
                  listeners: {
                    afterrender: function() {
                      this.setValue(Ext.Date.getFirstDateOfMonth(new Date()))
                    }
                  }
                },
                {
                  xtype: 'datefield',
                  vtype: 'daterange',
                  startDateField: 'start_date',
                  format: 'd.m.Y',
                  itemId: 'end_date',
                  fieldLabel: 'Конец',
                  allowBlank: false,
                  disabled: true,
                  listeners: {
                    afterrender: function() {
                      this.setValue(Ext.Date.getLastDateOfMonth(new Date()))
                    }
                  }
                },
                {
                  xtype: 'radiofield',
                  name: 'dateselector',
                  inputValue: 'yearmon',
                  checked: false,
                  width: 20,
                  margin: '5 0 0 5',
                  listeners: {
                    change: function (el, status) {
                      var startdate = Ext.ComponentQuery.query('#start_date')[0];
                      var enddate = Ext.ComponentQuery.query('#end_date')[0];
                      if(status == true) {
                        startdate.setDisabled(false);
                        enddate.setDisabled(false);
                      } else {
                        startdate.setDisabled(true);
                        enddate.setDisabled(true);
                      }
                    }
                  }
                }
              ]
            }
          ]
        },
        {
          xtype: 'panel',
          layout: { type: 'vbox' },
          defaults: {
            width: 220,
            margin: '0 0 5 15'
          },
          items: [
            {
              xtype: 'textfield',
              itemId: 'task_code',
              inputType: 'search',
              emptyText: 'Введите код работы',
              flex: 1,
              allowBlank: true
            },
            {
              xtype: 'button',
              text: 'Применить'
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