var Alias = require('./Alias');

var os = require('os');
var _ = require('lodash');
var _ = require('lodash');
_.str = require('underscore.string');

_.mixin(_.str.exports());
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
  this.entry = typeof entry !== 'undefined' && entry !== null ? entry : '';

  /**
   * The language highlighter used for code examples.
   *
   * @memberOf Entry
   * @type String
   */
  this.lang = typeof lang !== 'undefined' && lang !== null ? lang : 'js';

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

  var result = new RegExp('\\*\\*(?![-!])[\\s\\S]*?\\*/\\s*[^\n]+', 'g').execAll(source);
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

  if (_.isUndefined(this._isFunction)) {
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

  if (_.isUndefined(this.aliases)) {
    var result = this.entry.match(new RegExp('\\* *@alias\\s+([^\\n]+)', 'g'));

    if (result && result.length) {
      result = result[0].replace(new RegExp('(?:^|\\n)\\s*\\* ?', 'g'), ' ').trim();
      result = result.split(new RegExp(',\\s*', 'g'));
      result.sort(natsort);

      _.forEach(result, function(value, resultIndex){
        result[resultIndex] = new Alias(value, this);
      }, this);
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

  if (!_.isUndefined(this.call)) {
    return this.call;
  }

  var result = new RegExp('\\*/\\s*(?:function ([^(]*)|(.*?)(?=[:=,]|return\\b))', 'g').exec(this.entry);
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
    result = _.trim(result.split('.').pop().trim(), "'").split('var ').pop();
  }
  // resolve name
  // avoid this.getName() because it calls this.getCall()
  var name = new RegExp('\\* *@name\\s+([^\\n]+)', 'g').exec(this.entry);
  if (name && name.length) {
    name = name[1].trim();
  } else {
    name = result ? result : '';
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

  if (!_.isUndefined(this.category)) {
    return this.category;
  }

  var result = new RegExp('\\* *@category\\s+([^\\n]+)', 'g').exec(this.entry);
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

  if (!_.isUndefined(this.desc)) {
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
    result = (type == 'Function' ? '' : '(' + _.trim(type, '{}').replace(new RegExp('\\|', 'g'), ', ') + '): ') + result;
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

  if (!_.isUndefined(this.example)) {
    return this.example;
  }

  var result = this.entry.match(new RegExp('\\* *@example\\s+([\\s\\S]*?)(?=\\*\\s\\@[a-z]|\\*/)', 'g'));
  if (result && result.length) {
    result = result[0].replace(new RegExp('(?:^|\\n)\\s*\\* ?/', 'g'), "\n").trim();
    result = '```' + this.lang + "\n" + result + "\n```";
  }
  this.example = result;
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
 * Checks if the entry is a license.
 *
 * @memberOf Entry
 * @returns {Boolean} Returns `true` if a license, else `false`.
 */
Entry.prototype.isLicense = function() {
  'use strict';

  if (_.isUndefined(this._isLicense)) {
    this._isLicense = !!this.entry.match(new RegExp('\\* *@license\\b', 'g'));
  }
  return this._isLicense;
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
    this._isPrivate = this.isLicense() || !!this.entry.match(new RegExp('\\* *@private\\b', 'g')) || !this.entry.match(new RegExp('\\* *@[a-z]+\\b', 'g'));
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

  if (!_.isUndefined(this._isStatic)) {
    return this._isStatic;
  }

  var pub = !this.isPrivate();
  var result = pub && !!this.entry.match(new RegExp('\\* *@static\\b', 'g'));

  // set in cases where it isn't explicitly stated
  if (pub && !result) {
    var parent = this.getMembers(0).split(new RegExp('[#.]')).pop();
    if (parent) {
      _.forEach(Entry.prototype.getEntries(this.source), function(entry){
        entry = entry.pop();
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

/**
 * Resolves the entry's line number.
 *
 * @memberOf Entry
 * @returns {Number} The entry's line number.
 */
Entry.prototype.getLineNumber = function() {
  'use strict';

  if (_.isUndefined(this.lineNumber)) {
    var lines = new RegExp('\\n', 'g').execAll(this.source.substr(0, this.source.indexOf(this.entry) + this.entry.length));
    this.lineNumber = lines.length + 1;
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

  if (_.isUndefined(this.members)) {
    var result = new RegExp('\\* *@member(?:Of)?\\s+([^\\n]+)', 'g').exec(this.entry);
    if (result && result.length) {
      result = result[1].replace(new RegExp('(?:^|\\n)\\s*\\* ?', 'g'), ' ').trim();
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

  if (!_.isUndefined(this.name)) {
    return this.name;
  }

  var result = new RegExp('\\* *@name\\s+([^\\n]+)', 'g').exec(this.entry);
  if (result && result.length) {
    result = result[1].replace(new RegExp('(?:^|\\n)\\s*\\* ?', 'g'), ' ').trim();
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

  if (_.isUndefined(this.params)) {
    // var result = this.entry.match(new RegExp('\\* *@param\\s+\\{([^}]+)\\}\\s+(\\[.+\\]|[$\\w|]+(?:\\[.+\\])?)\\s+([\\s\\S]*?)(?=\\*\\s\\@[a-z]|\\*/)', 'gi'));
    var result = new RegExp('\\* *@param\\s+\\{([^}]+)\\}\\s+(\\[.+\\]|[$\\w|]+(?:\\[.+\\])?)\\s+([\\s\\S]*?)(?=\\*\\s\\@[a-z]|\\*/)', 'gi').execAll(this.entry);
    if(result){
      result = result.filter(function(value){
        return !!value;
      });
    }
    if (result && result.length) {
      result.forEach(function(param){
        param.forEach(function(value, key){
          value = value.replace(new RegExp('(?:^|\\n)\\s*\\* *', 'g'), ' ').trim();
        });
      });
    }
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

  if (!_.isUndefined(this.returns)) {
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

  if (!_.isUndefined(this.type)) {
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

module.exports = Entry;