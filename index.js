require('./polyfill');
var parseCSS = require('postcss').parse;

function toNodes(node, prefix) {
  prefix = prefix || '';

  if (node.type === 'rule') {
    return [{
      selector: prefix + node.selector,
      attributes: node.nodes.map(function (decl) {
        return {
          prop: decl.prop,
          value: decl.value
        };
      })
    }];
  } else if (node.type === 'atrule' && node.name === 'media') {
    return node.nodes.flatMap(function (n) {
      return toNodes(n, '@media ' + node.params + ' { ');
    });
  } else {
    // comments, @keyframes, etc.
    return [];
  }
}

module.exports = function postcss2json(css) {
  return parseCSS(css).nodes.flatMap(function (n) { return toNodes(n); });
};
