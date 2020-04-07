Ext.define('lsk.view.structur.plugins.TreeFilter', {
  extend: 'Ext.AbstractPlugin',
  alias: 'plugin.treefilter',
  init: function(tree) {
    var me = this;
    me.tree = tree;
    tree.filter = Ext.Function.bind(me.filter, me);
  },
  filter: function(value, property, re) {
    var me = this,
        tree = me.tree,
        matches = [],
        root = tree.getRootNode(),
        property = property || 'name',
        re = re || new RegExp(value, "ig"),
        visibleNodes = [],
        viewNode;
    tree.expandAll();
    root.cascadeBy(function (node) {
      if(re.test(node.get(property))) {
        matches.push(node);
      }
    });
    if(me.allowParentFolders === false) {
      Ext.each(matches, function (match) {
        if (!match.isLeaf()) {
          Ext.Array.remove(matches, match);
        }
      });
    }
    Ext.each(matches, function (item, i, arr) {
      root.cascadeBy(function (node) {
        if(node.contains(item) == true) {
          visibleNodes.push(node);
        }
      });
      if(me.allowParentFolders === true && !item.isLeaf()) {
        item.cascadeBy(function (node) {
          visibleNodes.push(node);
        });
      }
      visibleNodes.push(item);
    });

    root.cascadeBy(function (node) {
      viewNode = Ext.fly(tree.getView().getNode(node));
      if(viewNode) {
        viewNode.setVisibilityMode(Ext.Element.DISPLAY);
        viewNode.setVisible(Ext.Array.contains(visibleNodes, node));
      }
    });
  }
});