#!/usr/bin/env node
var postcss2json = require('./');

var data = '';
process.stdin.on('data', function (chunk) {
  data += chunk.toString('utf-8');
});

process.stdin.on('end', function () {
  postcss2json(data).forEach(function (rule) {
    delete rule.raws;
    delete rule.source;
    if (rule.nodes) {
      rule.nodes.forEach(n => {
        delete n.raws;
        delete n.source;
      });
    }

    process.stdout.write(JSON.stringify(rule) + '\n');
  });
});
