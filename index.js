require('./polyfill');
var parseCSS = require('postcss').parse;

function toNodes(node) {
  if (node.type === 'rule') {
    return [{
      selector: node.selector,
      attributes: node.nodes.map(function (decl) {
        return {
          prop: decl.prop,
          value: decl.value
        };
      })
    }];
  } else if (node.type === 'atrule' && node.name === 'media') {
    return node.nodes;
  } else {
    // comments, @keyframes, etc.
    return [];
  }
}

module.exports = function postcss2json(css) {
  return parseCSS(css).nodes.flatMap(toNodes);
};
