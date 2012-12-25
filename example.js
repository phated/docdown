var docdown = require("./docdown");

var fs = require('fs');

// generate Markdown
var markdown = docdown({
  path: './src/DocDown/Alias.js',
  url: 'https://github.com/phated/docdown/blob/js/src/DocDown/Alias.js'
});

fs.writeFileSync('output.md', markdown, 'utf-8');