/*!
 * Docdown v1.0.0-pre
 * Copyright 2011-2012 John-David Dalton <http://allyoucanleet.com/>
 * Available under MIT license <http://mths.be/mit>
 */
var Generator = require('./src/DocDown/Generator');

/**
 * Generates Markdown from JSDoc entries in a given file.
 *
 * @param {Array} [$options=array()] The options array.
 * @returns {String} The generated Markdown.
 * @example
 *
 * // specify a file path
 * $markdown = docdown(array(
 *   // path to js file
 *   'path' => $filepath,
 *   // url used to reference line numbers in code
 *   'url' => 'https://github.com/username/project/blob/master/my.js'
 * ));
 *
 * // or pass raw js
 * $markdown = docdown(array(
 *   // raw JavaScript source
 *   'source' => $rawJS,
 *   // documentation title
 *   'title' => 'My API Documentation',
 *   // url used to reference line numbers in code
 *   'url' => 'https://github.com/username/project/blob/master/my.js'
 * ));
 */
module.exports = function docdown(options) {
  options = options || {};
  var gen = new Generator(options);
  return gen.generate();
};