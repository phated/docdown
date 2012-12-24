var Entry = require('./Entry');

var path = require('path');
var fs = require('fs');
var os = require('os');
var _ = require('lodash');
_.str = require('underscore.string');

_.mixin(_.str.exports());
/**
 * Generates Markdown from JSDoc entries.
 */

/**
 * The HTML for the close tag.
 *
 * @static
 * @memberOf Generator
 * @type String
 */
var closeTag = "\n<!-- /div -->\n";

/**
 * An array of JSDoc entries.
 *
 * @memberOf Generator
 * @type Array
 */
var entries = [];

/**
 * The HTML for the open tag.
 *
 * @static
 * @memberOf Generator
 * @type String
 */
var openTag = "\n<!-- div -->\n";

/**
 * An options array used to configure the generator.
 *
 * @memberOf Generator
 * @type Array
 */
var options = [];

/**
 * The file's source code.
 *
 * @memberOf Generator
 * @type String
 */
var source = '';

/**
 * The Generator constructor.
 *
 * @constructor
 * @param {String} $source The source code to parse.
 * @param {Array} $options The options array.
 */
function Generator(source, options) {
  'use strict';

  options = _.isObject(options) ? options : {};
  // juggle arguments
  if (_.isObject(source)) {
    options = source;
  } else {
    options.source = source;
  }
  if (options.source && fs.existsSync(options.source)) {
    options.path = options.source;
  }
  if (options.path) {
    var ext = path.extname(options.path);
    options.source = fs.readFileSync(options.path, 'utf-8');

    if (!options.lang && ext) {
      options.lang = ext;
    }
    if (!options.title) {
      options.title = _.capitalize(path.basename(options.path)) + ' API documentation';
    }
  }
  if (!options.lang) {
    options.lang = 'js';
  }
  if (!options.toc) {
    options.toc = 'properties';
  }

  this.options = options;
  this.source = options.source.replace(new RegExp(os.EOL, 'g'), '\n');
  this.entries = Entry.prototype.getEntries(this.source);

  _.forEach(this.entries, function(value, index){
    this.entries[index] = new Entry(value, this.source, options.lang);
  }, this);
}

/**
 * Performs common string formatting operations.
 *
 * @private
 * @static
 * @memberOf Generator
 * @param {String} $string The string to format.
 * @returns {String} The formatted string.
 */
Generator.prototype.format = function(string) {
  'use strict';

  var counter = 0;

  // tokenize inline code snippets
  var tokenized = string.match(new RegExp('`[^`]+`', 'g'));
  if(tokenized){
    tokenized.forEach(function(snippet){
      string = string.replace(new RegExp(snippet, 'g'), '__token' + (counter++) + '__');
    });
  }

  // italicize parentheses
  string = string.replace(new RegExp('(^|\\s)(\\([^)]+\\))', 'g'), '$1*$2*');

  // mark numbers as inline code
  string = string.replace(new RegExp(' (-?\\d+(?:.\\d+)?)(?!\\.[^\\n])', 'g'), ' `$1`');

  // detokenize inline code snippets
  counter = 0;
  if(tokenized){
    tokenized.forEach(function(snippet){
      string = string.replace(new RegExp('__token' + (counter++) + '__', 'g'), snippet);
    });
  }

  return string.trim();
};

/**
 * Modify a string by replacing named tokens with matching assoc. array values.
 *
 * @private
 * @static
 * @memberOf Generator
 * @param {String} $string The string to modify.
 * @param {Array|Object} $object The template object.
 * @returns {String} The modified string.
 */
Generator.prototype.interpolate = function(string, object) {
  'use strict';

  var tokens = string.match(new RegExp('#\\{([^}]+)\\}', 'g'));
  tokens = _.unique(tokens);

  tokens.forEach(function(token){
    token = new RegExp('#\\{([^}]+)\\}', 'g').exec(token)[1];
    var pattern = new RegExp('#{' + token + '}', 'g');
    var replacement = '';

    if(_.isObject(object)){
      var args = token.match(new RegExp('\\(([^)]+?)\\)$', 'g'));
      if(args){
        args = args.pop().split(new RegExp(',\\s*'));
      }
      var method = 'get' + _.capitalize(token.replace(new RegExp('\\([^)]+?\\)$', 'g'), ''));
      if(object && object[method] && _.isFunction(object[method])){
        replacement = object[method].apply(object, args);
      } else if(_.has(object, token)){
        replacement = object[token];
      }
    } else if(_.has(object, token)){
      replacement = object[token];
    }
    string = string.replace(pattern, String(replacement).trim());
  });
  return Generator.prototype.format(string);
};

/**
 * Adds the given `$entries` to the `$result` array.
 *
 * @private
 * @memberOf Generator
 * @param {Array} $result The result array to modify.
 * @param {Array} $entries The entries to add to the `$result`.
 */
Generator.prototype.addEntries = function(result, entries) {
  'use strict';

  entries.forEach(function(entry){
    // skip aliases
    if(entry.isAlias()){
      return;
    }
    // name and description
    result.push(openTag, Generator.prototype.interpolate("### <a id=\"#{hash}\"></a>`#{member}#{separator}#{call}`\n<a href=\"##{hash}\">#</a> [&#x24C8;](#{href} \"View in source\") [&#x24C9;][1]\n\n#{desc}", entry));
    // @alias
    var aliases = entry.getAliases();
    if(aliases && aliases.length){
      result.push('', '#### Aliases');
      aliases.forEach(function(alias, index){
        aliases[index] = alias.getName();
      });
      result.push('*' + aliases.join(', ') + '*');
    }
    // @param
    var params = entry.getParams();
    if(params && params.length){
      result.push('', '#### Arguments');
      params.forEach(function(param, index){
        result.push(Generator.prototype.interpolate('#{num}. `#{name}` (#{type}): #{desc}', {
          'desc': param[3],
          'name': param[2],
          'num': index + 1,
          'type': param[1]
        }));
      });
    }
    // @returns
    var returns = entry.getReturns();
    if(returns && returns.length){
      result.push('', '#### Returns', Generator.prototype.interpolate('(#{type}): #{desc}', {
        'desc': returns[2],
        'type': returns[1]
      }));
    }
    // @example
    var example = entry.getExample();
    if(example){
      result.push('', '#### Example', example);
    }
    result.push("\n* * *", closeTag);
  });
};

/**
 * Resolves the entry's hash used to navigate the documentation.
 *
 * @private
 * @memberOf Generator
 * @param {Number|Object} $entry The entry object.
 * @param {String} $member The name of the member.
 * @returns {String} The url hash.
 */
Generator.prototype.getHash = function(entry, member) {
  'use strict';

  entry = _.isNumber(entry) ? this.entries[entry] : entry;
  member = !member ? entry.getMembers(0) : member;
  var result = (member ? member + (entry.isPlugin() ? 'prototype' : '') : '') + entry.getCall();
  result = result.replace(new RegExp('\\(\\[|\\[\\]', 'g'), '');
  result = result.replace(new RegExp('[ =|\\\'"{}.()\\]]', 'g'), '');
  result = result.replace(new RegExp('[[#,]', 'g'), '-');
  return result.toLowerCase();
};

/**
 * Resolves the entry's url for the specific line number.
 *
 * @private
 * @memberOf Generator
 * @param {Number|Object} $entry The entry object.
 * @returns {String} The url.
 */
Generator.prototype.getLineUrl = function(entry) {
  'use strict';

  entry = _.isNumber(entry) ? this.entries[entry] : entry;
  return this.options.url + '#L' + entry.getLineNumber();
};

/**
 * Extracts the character used to separate the entry's name from its member.
 *
 * @private
 * @memberOf Generator
 * @param {Number|Object} $entry The entry object.
 * @returns {String} The separator.
 */
Generator.prototype.getSeparator = function(entry) {
  'use strict';

  entry = _.isNumber(entry) ? this.entries[entry] : entry;
  return entry.isPlugin() ? '.prototype.' : '.';
};

/**
 * Generates Markdown from JSDoc entries.
 *
 * @memberOf Generator
 * @returns {String} The rendered Markdown.
 */
Generator.prototype.generate = function() {
  'use strict';

  var api = {};
  var byCategory = this.options.toc == 'categories';
  var categories = {};
  var compiling = false;
  var result = ['# ' + this.options.title];
  var toc = 'toc';

  // initialize api arraye
  _.forEach(this.entries, function(entry){
    var name = entry.getName();
    // skip invalid or private entries
    if(name && !entry.isPrivate()){
      var members = entry.getMembers();
      members = members && members.length ? members : [''];

      members.forEach(function(member){
        var aliases;
        // create api category arrays
        if(member && !api[member]){
          // create temporary entry to be replaced later
          api[member] = {};
          api[member].static = [];
          api[member].plugin = [];
        }

        // append entry to api member
        if(!member || entry.isCtor() || (entry.getType() === 'Object' && !entry.entry.match(new RegExp('[=:]\\s*(?:null|undefined)\\s*[,;]?$', 'g')))){
          // assign the real entry, replacing the temporary entry if it exist
          member = (member ? member + (entry.isPlugin() ? '#' : '.') : '') + name;
          entry.static = api[member] ? api[member].static : [];
          entry.plugin = api[member] ? api[member].plugin : [];

          aliases = entry.getAliases();
          if(aliases && aliases.length){
            aliases.forEach(function(alias){
              api[member] = alias;
              alias.static = [];
              alias.plugin = [];
            });
          }
          api[member] = entry;
        } else if(entry.isStatic()){
          api[member].static.push(entry);
          aliases = entry.getAliases();
          if(aliases && aliases.length){
            aliases.forEach(function(alias){
              api[member].static.push(alias);
            });
          }
        } else if(!entry.isCtor()){
          api[member].plugin.push(entry);
          aliases = entry.getAliases();
          if(aliases && aliases.length){
            aliases.forEach(function(alias){
              api[member].plugin.push(alias);
            });
          }
        }
      });
    }
  });

  // add properties to each entry
  _.forEach(api, function(entry){
    entry.hash = this.getHash(entry);
    entry.href = this.getLineUrl(entry);

    var member = entry.getMembers(0);
    member = (member ? member + (entry.isPlugin() ? '.prototype.' : '.') : '') + entry.getName();
    entry.member = member.replace(new RegExp(entry.getName() + '$', 'g'), '');

    // add properties to static and plugin sub-entries
    _.forEach(['static', 'plugin'], function(kind){
      _.forEach(entry[kind], function(subentry){
        subentry.hash = this.getHash(subentry);
        subentry.href = this.getLineUrl(subentry);
        subentry.member = member;
        subentry.separator = this.getSeparator(subentry);
      }, this);
    }, this);
  }, this);

  /*------------------------------------------------------------------------*/

  // custom sort for root level entries
  // TODO: see how well it handles deeper namespace traversal
  function sortCompare(a, b) {
    var score = {
      a: 0,
      b: 0
    };
    _.forEach({a: a, b: b}, function(value, key){
      // capitalized properties are last
      if(value.match(new RegExp('[#.][A-Z]', 'g'))){
        score[key] = 0;
      }
      // lowercase prototype properties are next to last
      else if(value.match(new RegExp('#[a-z]', 'g'))){
        score[key] = 1;
      }
      // lowercase static properties next to first
      else if(value.match(new RegExp('\\.[a-z]', 'g'))){
        score[key] = 2;
      }
      // root properties are first
      else if(value.match(new RegExp('^[^#.]+$', 'g'))){
        score[key] = 3;
      }
    });
    score = score.b - score.a;
    return score ? score : a.toLowerCase().localeCompare(b.toLowerCase());
  }

  // TODO: sort shit
  // api.sort(sortCompare);

  // sort static and plugin sub-entries
  _.forEach(api, function(entry){
    ['static', 'plugin'].forEach(function(kind){
      var sortBy = {
        a: [],
        b: [],
        c: []
      };
      entry[kind].forEach(function(subentry){
        var name = subentry.getName();
        // functions w/o ALL-CAPs names are last
        sortBy.a.push(subentry.getType() == 'Function' && !name.match(new RegExp('^[A-Z_]+$', 'g')));
        // ALL-CAPs properties first
        sortBy.b.push(name.match(new RegExp('^[A-Z_]+$', 'g')));
        // lowercase alphanumeric sort
        sortBy.c.push(name.toLowerCase());
        // TODO: Sort this shit
        // array_multisort($sortBy['a'], SORT_ASC,  $sortBy['b'], SORT_DESC, $sortBy['c'], SORT_ASC, $entry->{$kind});
      });
    });
  });

  /*------------------------------------------------------------------------*/

  // add categories
  _.forEach(api, function(entry){
    var category = entry.getCategory();
    categories[category] = Array.isArray(categories[category]) ? categories[category].push(entry) : [entry];
    // categories[entry.getCategory()].push(entry);
    ['static', 'plugin'].forEach(function(kind){
      entry[kind].forEach(function(subentry){
        var category = subentry.getCategory();
        categories[category] = Array.isArray(categories[category]) ? categories[category].push(subentry) : [subentry];
        // categories[subentry.getCategory()].push(subentry);
      });
    });
  });

  // sort categories
  // TODO: sort this shit
  // ksort($categories);

  ['Methods', 'Properties'].forEach(function(category){
    if(categories[category]){
      var entries = categories[category];
      delete categories[category];
      categories[category] = entries;
    }
  });

  /*------------------------------------------------------------------------*/

  // compile TOC
  result.push(openTag);

  // compile toc by categories
  if (byCategory) {
    categories.forEach(function(entries, category){
      if(compiling){
        result.push(closeTag);
      } else {
        compiling = true;
      }
      // assign TOC hash
      if(result.length === 2){
        toc = category;
      }
      result.push(openTag, '## ' + (result.length == 2 ? '<a id="' + toc + '"></a>' : '') + '`' + category + '`');
      entries.forEach(function(entry){
        result.push(Generator.prototype.interpolate('* [`#{member}#{separator}#{name}`](##{hash})', entry));
      });
    });
  }
  // compile TOC by namespace
  else {
    _.forEach(api, function(entry){
      if(compiling){
        result.push(closeTag);
      } else {
        compiling = true;
      }
      var member = entry.member + entry.getName();

      // assign TOC hash
      if(result.length == 2){
        toc = member;
      }
      // add root entry
      result.push(openTag, '## ' + (result.length == 2 ? '<a id="' + toc + '"></a>' : '') + '`' + member + '`', Generator.prototype.interpolate('* [`' + member + '`](##{hash})', entry));

      // add static and plugin sub-entries
      ['static', 'plugin'].forEach(function(kind){
        if(kind == 'plugin' && entry.plugin.length){
          result.push(closeTag, openTag, '## `' + member + (entry.isCtor() ? '.prototype`' : '`'));
        }
        entry[kind].forEach(function(subentry){
          subentry.member = member;
          result.push(Generator.prototype.interpolate('* [`#{member}#{separator}#{name}`](##{hash})', subentry));
        });
      });
    });
  }

  result.push(closeTag, closeTag);

  /*------------------------------------------------------------------------*/

  // compile content
  compiling = false;
  result.push(openTag);

  if (byCategory) {
    categories.forEach(function(entries, category){
      if(compiling){
        result.push(closeTag);
      } else {
        compiling = true;
      }
      if(category != 'Methods' && category != 'Properties'){
        category = '“' + category + '” Methods';
      }
      result.push(openTag, '## `' + category + '`');
      this.addEntries(result, entries);
    });
  }
  else {
    _.forEach(api, function(entry){
      // skip aliases
      if(entry.isAlias()){
        return;
      }
      if(compiling){
        result.push(closeTag);
      } else {
        compiling = true;
      }
      // add root entry name
      var member = entry.member + entry.getName();
      result.push(openTag, '## `' + member + '`');

      _.forEach([entry, 'static', 'plugin'], function(kind){
        var subentries = _.isString(kind) ? entry[kind] : [kind];

        // add sub-entry name
        if(kind != 'static' && entry.getType() != 'Object' && subentries.length && subentries[0] != kind){
          if(kind == 'plugin'){
            result.push(closeTag);
          }
          result.push(openTag, '## `' + member + (kind == 'plugin' ? '.prototype`' : '`'));
        }
        this.addEntries(result, subentries);
      }, this);
    }, this);
  }

  // close tags add TOC link reference
  result.push(closeTag, closeTag, '', '  [1]: #' + toc + ' "Jump back to the TOC."');

  // cleanup whitespace
  return result.join('\n').replace(new RegExp(' +\n', 'g'), '\n').trim();
};

module.exports = Generator;