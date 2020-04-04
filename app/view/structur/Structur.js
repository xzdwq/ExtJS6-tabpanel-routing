Ext.define('lsk.view.structur.Structur', {
  extend: 'Ext.panel.Panel',
  alias: 'widget.structur',
  requires: [
    'lsk.view.structur.StructurController'
  ],
  controller: 'structur',
  bodyPadding: 10,
  layout: 'border',
  items: [
    {
      html: 'STR'
    }
  ]
});