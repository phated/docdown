/**
 * The Alias constructor.
 *
 * @constructor
 * @param {String} name The alias name.
 * @param {Object} owner The alias owner.
 */
function Alias(name, owner){
  'use strict';

  this.owner = owner;
  this.name = name;
  this.call = owner.getCall();
  this.category = owner.getCategory();
  this.desc = owner.getDesc();
  this.example = owner.getExample();
  this.lineNumber = owner.getLineNumber();
  this.members = owner.getMembers();
  this.params = owner.getParams();
  this.returns = owner.getReturns();
  this.type = owner.getType();
  this._isCtor = owner.isCtor();
  this._isPlugin = owner.isPlugin();
  this._isPrivate = owner.isPrivate();
  this._isStatic = owner.isStatic();
}

/**
 * Extracts the entry's `alias` objects.
 *
 * @memberOf Alias
 * @param {Number} index The index of the array value to return.
 * @returns {Array|String} The entry's `alias` objects.
 */
Alias.prototype.getAliases = function(index) {
  'use strict';

  var result = [];
  return typeof index !== 'undefined' && index !== null ? result[index] : result;
};

/**
 * Extracts the function call from the owner entry.
 *
 * @memberOf Alias
 * @returns {String} The function call.
 */
Alias.prototype.getCall = function() {
  'use strict';

  return this.call;
};

/**
 * Extracts the owner entry's `category` data.
 *
 * @memberOf Alias
 * @returns {String} The owner entry's `category` data.
 */
Alias.prototype.getCategory = function() {
  'use strict';

  return this.category;
};

/**
 * Extracts the owner entry's description.
 *
 * @memberOf Alias
 * @returns {String} The owner entry's description.
 */
Alias.prototype.getDesc = function() {
  'use strict';

  return this.desc;
};

/**
 * Extracts the owner entry's `example` data.
 *
 * @memberOf Alias
 * @returns {String} The owner entry's `example` data.
 */
Alias.prototype.getExample = function() {
  'use strict';

  return this.example;
};

/**
 * Resolves the owner entry's line number.
 *
 * @memberOf Alias
 * @returns {Number} The owner entry's line number.
 */
Alias.prototype.getLineNumber = function() {
  'use strict';

  return this.lineNumber;
};

/**
 * Extracts the owner entry's `member` data.
 *
 * @memberOf Alias
 * @param {Number} index The index of the array value to return.
 * @returns {Array|String} The owner entry's `member` data.
 */
Alias.prototype.getMembers = function(index) {
  'use strict';

  return typeof index !== 'undefined' && index !== null ? this.members[index] : this.members;
};

/**
 * Extracts the owner entry's `name` data.
 *
 * @memberOf Alias
 * @returns {String} The owner entry's `name` data.
 */
Alias.prototype.getName = function() {
  'use strict';

  return this.name;
};

/**
 * Extracts the owner entry's `param` data.
 *
 * @memberOf Alias
 * @param {Number} index The index of the array value to return.
 * @returns {Array} The owner entry's `param` data.
 */
Alias.prototype.getParams = function(index) {
  'use strict';

  return typeof index !== 'undefined' && index !== null ? this.params[index] : this.params;
};

/**
 * Extracts the owner entry's `returns` data.
 *
 * @memberOf Alias
 * @returns {String} The owner entry's `returns` data.
 */
Alias.prototype.getReturns = function() {
  'use strict';

  return this.returns;
};

/**
 * Extracts the owner entry's `type` data.
 *
 * @memberOf Alias
 * @returns {String} The owner entry's `type` data.
 */
Alias.prototype.getType = function() {
  'use strict';

  return this.type;
};

/**
 * Checks if the entry is an alias.
 *
 * @memberOf Alias
 * @returns {Boolean} Returns `true`.
 */
Alias.prototype.isAlias = function() {
  'use strict';

  return true;
};

/**
 * Checks if the owner entry is a constructor.
 *
 * @memberOf Alias
 * @returns {Boolean} Returns `true` if a constructor, else `false`.
 */
Alias.prototype.isCtor = function() {
  'use strict';

  return this._isCtor;
};

/**
 * Checks if the owner entry *is* assigned to a prototype.
 *
 * @memberOf Alias
 * @returns {Boolean} Returns `true` if assigned to a prototype, else `false`.
 */
Alias.prototype.isPlugin = function() {
  'use strict';

  return this._isPlugin;
};

/**
 * Checks if the owner entry is private.
 *
 * @memberOf Alias
 * @returns {Boolean} Returns `true` if private, else `false`.
 */
Alias.prototype.isPrivate = function() {
  'use strict';

  return this._isPrivate;
};

/**
 * Checks if the owner entry is *not* assigned to a prototype.
 *
 * @memberOf Alias
 * @returns {Boolean} Returns `true` if not assigned to a prototype, else `false`.
 */
Alias.prototype.isStatic = function() {
  'use strict';

  return this._isStatic;
};

module.exports = Alias;