var docdown = require("./docdown");

var fs = require('fs');

// generate Markdown
var markdown = docdown({
  path: './src/DocDown/Alias.js',
  url: 'https://github.com/phated/docdown/blob/js/src/DocDown/Alias.js'
});

fs.writeFileSync('output.md', markdown, 'utf-8');

    // 'path'  => '../' . $file,
    // 'title' => 'Lo-Dash <sup>v1.0.0-rc.3</sup>',
    // 'toc'   => 'categories',
    // 'url'   => 'https://github.com/bestiejs/lodash/blob/master/lodash.js'