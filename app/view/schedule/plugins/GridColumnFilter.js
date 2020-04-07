Ext.define('lsk.view.schedule.plugins.GridColumnFilter', {
  extend: 'Ext.form.field.Text',
  alias: 'widget.gridcolumnfilter',
  inputType: 'search',
  filterId: null,
  timer: null,
  enableKeyEvents: true,
  flex: 1,
  initComponent: function() {
    this.callParent();
    if (!this.filterId) {
      this.filterId = this.getId();
    }
  },
    getLocalFilterValue: function(value) {
    return value.replace(/\./g, '\\.').replace(/%/g, '.*').replace(/\(/g, '\\(').replace(/\)/g, '\\)');
  },
  listeners: {
    change: function(field, newValue, oldValue, eOpts) {
      let me = this;
      me.timer = setTimeout(function() {
        if (me.timer) clearTimeout(me.timer);
        me.timer = null;
        let value = me.getValue().trim();
        let store = me.up('grid').getStore();
        if (Ext.isEmpty(value)) {
          store.removeFilter(me.filterId);
        } else {
          let remote = store.getRemoteFilter();
          let filterConfig = {
            id: me.filterId,
            property: me.up().dataIndex,
            value: remote ? value : me.getLocalFilterValue(value),
          };
          if (!remote) filterConfig.operator = '/=';
          store.addFilter(filterConfig);
        }
      }, 500);
    }
  }
});
