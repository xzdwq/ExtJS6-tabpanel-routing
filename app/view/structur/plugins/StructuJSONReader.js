Ext.define('lsk.view.structur.plugins.StructuJSONReader', {
  extend: 'Ext.data.reader.Json',
  alias : 'reader.StructuJSONReader',
  buildExtractors : function() {
    var me = this;
    me.callParent(arguments);
    me.getRoot = function(res) {
      switch(res.code) {
        case 'LSK.1':
          return res['leaf'] = true, res['add'] = "add";
        // case 'LSK.2':
        //   return res['leaf'] = true, res['add'] = "add";
        case 'LSK.3':
          return res['leaf'] = true, res['add'] = "add";
      }
        return res['result'];
    };
  }
});