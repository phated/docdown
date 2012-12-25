var Alias = require('./Alias');

var os = require('os');
var _ = require('lodash');
var _str = require('underscore.string');
var natsort = require('../../javascript-natural-sort/naturalSort');

// Return all pattern matches with captured groups
RegExp.prototype.execAll = function(string) {
  'use strict';

  var match;
  var matches = [];
  while (match = this.exec(string)) {
    var matchArray = [];
    _.forEach(match, function(group, idx){
      matchArray.push(group);
    });
    matches.push(matchArray);
  }
  return matches.length ? matches : null;
};

/**
 * A class to simplify parsing a single JSDoc entry.
 */

/**
 * The Entry constructor.
 *
 * @constructor
 * @param {String} entry The documentation entry to analyse.
 * @param {String} source The source code.
 * @param {String} [lang ='js'] The language highlighter used for code examples.
 */
function Entry(entry, source, lang){
  'use strict';

  /**
   * The documentation entry.
   *
   * @memberOf Entry
   * @type String
   */
  this.entry = entry !== null && entry !== undefined ? entry : '';

  /**
   * The language highlighter used for code examples.
   *
   * @memberOf Entry
   * @type String
   */
  this.lang = lang !== null && lang !== undefined ? lang : 'js';

  /**
   * The source code.
   *
   * @memberOf Entry
   * @type String
   */
  this.source = source.replace(new RegExp(os.EOL, 'g'), '\n');
}

/**
 * Extracts the documentation entries from source code.
 *
 * @static
 * @memberOf Entry
 * @param {String} $source The source code.
 * @returns {Array} The array of entries.
 */
Entry.prototype.getEntries = function(source) {
  'use strict';

  var result = source.match(new RegExp('\\*\\*(?![-!])[\\s\\S]*?\\*/\\s*[^\n]+', 'g'));
  // return result.pop();
  return result;
};

/**
 * Checks if the entry is a function reference.
 *
 * @private
 * @memberOf Entry
 * @returns {Boolean} Returns `true` if the entry is a function reference, else `false`.
 */
Entry.prototype.isFunction = function() {
  'use strict';

  if (!this._isFunction) {
    this._isFunction = !!(this.isCtor() || (this.getParams() && this.getParams().length) || (this.getReturns() && this.getReturns().length) || this.entry.match('\\* *@function\\b'));
  }
  return this._isFunction;
};

/**
 * Extracts the entry's `alias` objects.
 *
 * @memberOf Entry
 * @param {Number} $index The index of the array value to return.
 * @returns {Array|String} The entry's `alias` objects.
 */
Entry.prototype.getAliases = function(index) {
  'use strict';

  if (!this.aliases) {
    var result = this.entry.match(new RegExp('\\* *@alias\\s+([^\\n]+)', 'g'));

    if (result && result.length) {
      result = result[1].replace(new RegExp('(?:^|\\n)\\s*\\* ?', 'g'), ' ').trim();
      result = result.split(new RegExp(',\\s*', 'g'));
      result.sort(natsort);

      result.forEach(function(value, resultIndex){
        result[resultIndex] = new Alias(value, this);
      });
    }
    this.aliases = result;
  }

  return typeof index !== 'undefined' && index !== null ? this.aliases[index] : this.aliases;
};

/**
 * Extracts the function call from the entry.
 *
 * @memberOf Entry
 * @returns {String} The function call.
 */
Entry.prototype.getCall = function() {
  'use strict';

  if (this.call) {
    return this.call;
  }

  var result = new RegExp('\\*/\\s*(?:function ([^(]*)|(.*?)(?=[:=,]|return\\b))', 'g').exec(this.entry);
    // console.log(result, this.entry);
  // var result = this.entry.match(new RegExp('\\*/\\s*(?:function ([^(]*)|(.*?)(?=[:=,]|return\\b))', 'g'));
  if(result){
    // result = result[0].replace(new RegExp('\\*\\/\\n', 'g'), '');
    if(result[1]){
      result = result[1];
    } else {
      result = result[2];
    }
  }
  if (result) {
    result = _str.trim(result.split('.').pop().trim(), "'").split('var ').pop();
  }
  // resolve name
  // avoid this.getName() because it calls this.getCall()
  var name = this.entry.match(new RegExp('\\* *@name\\s+([^\\n]+)', 'g'));
  if (name && name.length) {
    name = name[1].trim();
  } else {
    name = result;
  }
  // compile function call syntax
  if (this.isFunction()) {
    // compose parts
    result = [result];
    var params = this.getParams();
    if(params){
      _.forEach(params, function(param){
        result.push(param[2]);
      });
    }
    // format
    result = name + '(' + result.slice(1).join(', ') + ')';
    result = result.replace(new RegExp('\\], \\[', 'g'), ', ').replace(new RegExp(', \\[', 'g'), ' [, ');
  }
  this.call = result ? result : name;
  return this.call;
};

/**
 * Extracts the entry's `category` data.
 *
 * @memberOf Entry
 * @returns {String} The entry's `category` data.
 */
Entry.prototype.getCategory = function() {
  'use strict';

  if (this.category) {
    return this.category;
  }

  var result = this.entry.match(new RegExp('\\* *@category\\s+([^\\n]+)', 'g'));
  if (result && result.length) {
    result = result[1].replace(new RegExp('(?:^|\\n)\\s*\\* ?', 'g'), ' ').trim();
  } else {
    result = this.getType() == 'Function' ? 'Methods' : 'Properties';
  }
  this.category = result;
  return result;
};

/**
 * Extracts the entry's description.
 *
 * @memberOf Entry
 * @returns {String} The entry's description.
 */
Entry.prototype.getDesc = function() {
  'use strict';

  if (this.desc) {
    return this.desc;
  }

  // var result = new RegExp('/\\*\\*(?:\\s*\\*)?([\\s\\S]*?)(?=\\*\\s\\@[a-z]|\\*/)', 'g').exec(this.entry);
  var result = new RegExp('\\*\\*(?:\\s*\\*)?([\\s\\S]*?)(?=\\*\\s\\@[a-z]|\\*/)', 'g').exec(this.entry);
  if (result && result.length) {
    var type = this.getType();
    result = result[1].replace(new RegExp(':\\n *\\* */', 'g'), ":<br>\n");
    result = result.replace(new RegExp('(?:^|\\n) *\\*\\n *\\* *', 'g'), "\n\n");
    result = result.replace(new RegExp('(?:^|\\n) *\\* ?', 'g'), ' ');
    result = result.trim();
    result = (type == 'Function' ? '' : '(' + _str.trim(type, '{}').replace(new RegExp('\\|', 'g'), ', ') + '): ') + result;
  }
  this.desc = result;
  return result;
};

/**
 * Extracts the entry's `example` data.
 *
 * @memberOf Entry
 * @returns {String} The entry's `example` data.
 */
Entry.prototype.getExample = function() {
  'use strict';

  if (this.example) {
    return this.example;
  }

  var result = this.entry.match(new RegExp('\\* *@example\\s+([\\s\\S]*?)(?=\\*\\s\\@[a-z]|\\*/)#', 'g'));
  if (result && result.length) {
    result = result[0].replace(new RegExp('(?:^|\\n)\\s*\\* ?/', 'g'), "\n").trim();
    result = '```' + this.lang + "\n" + result + "\n```";
  }
  this.example = result;
  return result;
};

/**
 * Resolves the entry's line number.
 *
 * @memberOf Entry
 * @returns {Number} The entry's line number.
 */
Entry.prototype.getLineNumber = function() {
  'use strict';

  if (!this.lineNumber) {
    var lines = this.source.substr(0, this.source.indexOf(this.entry) + this.entry.length).match(new RegExp('\\n', 'g'));
    this.lineNumber = lines.pop().length + 1;
  }
  return this.lineNumber;
};

/**
 * Extracts the entry's `member` data.
 *
 * @memberOf Entry
 * @param {Number} $index The index of the array value to return.
 * @returns {Array|String} The entry's `member` data.
 */
Entry.prototype.getMembers = function(index) {
  'use strict';

  if (!this.members) {
    var result = new RegExp('\\* *@member(?:Of)?\\s+([^\\n]+)', 'g').exec(this.entry);
    // console.log(result);
    if (result && result.length) {
      result = result[1].replace(new RegExp('(?:^|\\n)\\s*\\* ?', 'g'), ' ').trim();
      // console.log(result);
      result = result.split(new RegExp(',\\s*'));
      result.sort(natsort);
    }
    this.members = result;
  }
  return typeof index !== 'undefined' && index !== null && this.members ? this.members[index] : this.members;
};

/**
 * Extracts the entry's `name` data.
 *
 * @memberOf Entry
 * @returns {String} The entry's `name` data.
 */
Entry.prototype.getName = function() {
  'use strict';

  if (this.name) {
    return this.name;
  }

  var result = this.entry.match(new RegExp('\\* *@name\\s+([^\\n]+)', 'g'));
  if (result && result.length) {
    result = result[0].replace(new RegExp('(?:^|\\n)\\s*\\* ?', 'g'), ' ').trim();
  } else {
    result = this.getCall().split('(').shift();
  }
  this.name = result;
  return result;
};

/**
 * Extracts the entry's `param` data.
 *
 * @memberOf Entry
 * @param {Number} $index The index of the array value to return.
 * @returns {Array} The entry's `param` data.
 */
Entry.prototype.getParams = function(index) {
  'use strict';

  if (!this.params) {
    // var result = this.entry.match(new RegExp('\\* *@param\\s+\\{([^}]+)\\}\\s+(\\[.+\\]|[$\\w|]+(?:\\[.+\\])?)\\s+([\\s\\S]*?)(?=\\*\\s\\@[a-z]|\\*/)', 'gi'));
    var result = new RegExp('\\* *@param\\s+\\{([^}]+)\\}\\s+(\\[.+\\]|[$\\w|]+(?:\\[.+\\])?)\\s+([\\s\\S]*?)(?=\\*\\s\\@[a-z]|\\*/)', 'gi').execAll(this.entry);
    if(result){
      result = result.filter(function(value){
        return !!value;
      });
    }
    // console.log(result);
    if (result && result.length) {
      result.forEach(function(param){
    //     // console.log(param);
        param.forEach(function(value, key){
    //       if(!Array.isArray(result[0][key])){
    //         result[0][key] = [];
    //       }
    //       result[0][key].push(value.replace(new RegExp('(?:^|\\n)\\s*\\* *', 'g'), ' ').trim());
          value = value.replace(new RegExp('(?:^|\\n)\\s*\\* *', 'g'), ' ').trim();
        });
      });
    }
    // console.log(result);
    this.params = result;
  }
  return typeof index !== 'undefined' && index !== null ? this.params[index] : this.params;
};

/**
 * Extracts the entry's `returns` data.
 *
 * @memberOf Entry
 * @returns {String} The entry's `returns` data.
 */
Entry.prototype.getReturns = function() {
  'use strict';

  if (this.returns) {
    return this.returns;
  }

  var result = new RegExp('\\* *@returns\\s+\\{([^}]+)\\}\\s+([\\s\\S]*?)(?=\\*\\s\\@[a-z]|\\*/)', 'g').exec(this.entry);
  if (result && result.length) {
    result = result.map(function(value){
      return value.trim();
    });
    result[1] = result[1].replace(new RegExp('\\|', 'g'), ', ');
    result[2] = result[2].replace(new RegExp('(?:^|\\n)\\s*\\* ?', 'g'), ' ');
  }
  this.returns = result;
  return result;
};

/**
 * Extracts the entry's `type` data.
 *
 * @memberOf Entry
 * @returns {String} The entry's `type` data.
 */
Entry.prototype.getType = function() {
  'use strict';

  if (this.type) {
    return this.type;
  }

  var result = new RegExp('\\* *@type\\s+([^\\n]+)', 'g').exec(this.entry);
  if (result && result.length) {
    result = result[1].replace(new RegExp('(?:^|\\n)\\s*\\* ?', 'g'), ' ').trim();
  } else {
    result = this.isFunction() ? 'Function' : 'Unknown';
  }
  this.type = result;
  return result;
};

/**
 * Checks if the entry is an alias.
 *
 * @memberOf Entry
 * @returns {Boolean} Returns `false`.
 */
Entry.prototype.isAlias = function() {
  'use strict';

  return false;
};

/**
 * Checks if the entry is a constructor.
 *
 * @memberOf Entry
 * @returns {Boolean} Returns `true` if a constructor, else `false`.
 */
Entry.prototype.isCtor = function() {
  'use strict';

  if (_.isUndefined(this._isCtor)) {
    this._isCtor = !!this.entry.match(new RegExp('\\* *@constructor\\b/', 'g'));
  }
  return this._isCtor;
};

/**
 * Checks if the entry *is* assigned to a prototype.
 *
 * @memberOf Entry
 * @returns {Boolean} Returns `true` if assigned to a prototype, else `false`.
 */
Entry.prototype.isPlugin = function() {
  'use strict';

  if (_.isUndefined(this._isPlugin)) {
    this._isPlugin = !this.isCtor() && !this.isPrivate() && !this.isStatic();
  }
  return this._isPlugin;
};

/**
 * Checks if the entry is private.
 *
 * @memberOf Entry
 * @returns {Boolean} Returns `true` if private, else `false`.
 */
Entry.prototype.isPrivate = function() {
  'use strict';

  if (_.isUndefined(this._isPrivate)) {
    this._isPrivate = !!this.entry.match(new RegExp('\\* *@private\\b/', 'g')) || !this.entry.match(new RegExp('\\* *@[a-z]+\\b', 'g'));
  }
  return this._isPrivate;
};

/**
 * Checks if the entry is *not* assigned to a prototype.
 *
 * @memberOf Entry
 * @returns {Boolean} Returns `true` if not assigned to a prototype, else `false`.
 */
Entry.prototype.isStatic = function() {
  'use strict';

  if (_.isUndefined(this._isStatic)) {
    return this._isStatic;
  }

  var pub = !this.isPrivate();
  var result = pub && !!this.entry.match(new RegExp('\\* *@static\\b', 'g'));

  // set in cases where it isn't explicitly stated
  if (pub && !result) {
    var parent = this.getMembers(0).split(new RegExp('[#.]')).pop();
    if (parent) {
      _.forEach(Entry.prototype.getEntries(this.source), function(entry){
        entry = new Entry(entry, this.source);
        if(entry.getName() == parent){
          result = !entry.isCtor();
          return false;
        }
      }, this);
    } else {
      result = true;
    }
  }
  this._isStatic = result;
  return result;
};

module.exports = Entry;