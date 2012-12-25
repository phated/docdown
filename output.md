# Alias.js API documentation

<!-- div -->


<!-- div -->

## <a id="Alias"></a>`Alias`
* [`Alias`](#aliasname-owner)

<!-- /div -->


<!-- div -->

## `Alias.prototype`
* [`Alias.prototype.getAliases`](#aliasprototypegetaliasesindex)
* [`Alias.prototype.getCall`](#aliasprototypegetcall)
* [`Alias.prototype.getCategory`](#aliasprototypegetcategory)
* [`Alias.prototype.getDesc`](#aliasprototypegetdesc)
* [`Alias.prototype.getExample`](#aliasprototypegetexample)
* [`Alias.prototype.getLineNumber`](#aliasprototypegetlinenumber)
* [`Alias.prototype.getMembers`](#aliasprototypegetmembersindex)
* [`Alias.prototype.getName`](#aliasprototypegetname)
* [`Alias.prototype.getParams`](#aliasprototypegetparamsindex)
* [`Alias.prototype.getReturns`](#aliasprototypegetreturns)
* [`Alias.prototype.getType`](#aliasprototypegettype)
* [`Alias.prototype.isAlias`](#aliasprototypeisalias)
* [`Alias.prototype.isCtor`](#aliasprototypeisctor)
* [`Alias.prototype.isPlugin`](#aliasprototypeisplugin)
* [`Alias.prototype.isPrivate`](#aliasprototypeisprivate)
* [`Alias.prototype.isStatic`](#aliasprototypeisstatic)

<!-- /div -->


<!-- /div -->


<!-- div -->


<!-- div -->

## `Alias`

<!-- div -->

### <a id="aliasname-owner"></a>`Alias(name, owner)`
<a href="#aliasname-owner">#</a> [&#x24C8;](https://github.com/phated/docdown/blob/js/src/DocDown/Alias.js#L2 "View in source") [&#x24C9;][1]

The Alias constructor.

#### Arguments
1. `name` *(String)*: The alias name.
2. `owner` *(Object)*: The alias owner.

* * *

<!-- /div -->


<!-- /div -->


<!-- div -->

## `Alias.prototype`

<!-- div -->

### <a id="aliasprototypegetaliasesindex"></a>`Alias.prototype.getAliases(index)`
<a href="#aliasprototypegetaliasesindex">#</a> [&#x24C8;](https://github.com/phated/docdown/blob/js/src/DocDown/Alias.js#L2 "View in source") [&#x24C9;][1]

Extracts the entry's `alias` objects.

#### Arguments
1. `index` *(Number)*: The index of the array value to return.

#### Returns
*(Array, String)*: The entry's `alias` objects.

* * *

<!-- /div -->


<!-- div -->

### <a id="aliasprototypegetcall"></a>`Alias.prototype.getCall()`
<a href="#aliasprototypegetcall">#</a> [&#x24C8;](https://github.com/phated/docdown/blob/js/src/DocDown/Alias.js#L2 "View in source") [&#x24C9;][1]

Extracts the function call from the owner entry.

#### Returns
*(String)*: The function call.

* * *

<!-- /div -->


<!-- div -->

### <a id="aliasprototypegetcategory"></a>`Alias.prototype.getCategory()`
<a href="#aliasprototypegetcategory">#</a> [&#x24C8;](https://github.com/phated/docdown/blob/js/src/DocDown/Alias.js#L2 "View in source") [&#x24C9;][1]

Extracts the owner entry's `category` data.

#### Returns
*(String)*: The owner entry's `category` data.

* * *

<!-- /div -->


<!-- div -->

### <a id="aliasprototypegetdesc"></a>`Alias.prototype.getDesc()`
<a href="#aliasprototypegetdesc">#</a> [&#x24C8;](https://github.com/phated/docdown/blob/js/src/DocDown/Alias.js#L2 "View in source") [&#x24C9;][1]

Extracts the owner entry's description.

#### Returns
*(String)*: The owner entry's description.

* * *

<!-- /div -->


<!-- div -->

### <a id="aliasprototypegetexample"></a>`Alias.prototype.getExample()`
<a href="#aliasprototypegetexample">#</a> [&#x24C8;](https://github.com/phated/docdown/blob/js/src/DocDown/Alias.js#L2 "View in source") [&#x24C9;][1]

Extracts the owner entry's `example` data.

#### Returns
*(String)*: The owner entry's `example` data.

* * *

<!-- /div -->


<!-- div -->

### <a id="aliasprototypegetlinenumber"></a>`Alias.prototype.getLineNumber()`
<a href="#aliasprototypegetlinenumber">#</a> [&#x24C8;](https://github.com/phated/docdown/blob/js/src/DocDown/Alias.js#L2 "View in source") [&#x24C9;][1]

Resolves the owner entry's line number.

#### Returns
*(Number)*: The owner entry's line number.

* * *

<!-- /div -->


<!-- div -->

### <a id="aliasprototypegetmembersindex"></a>`Alias.prototype.getMembers(index)`
<a href="#aliasprototypegetmembersindex">#</a> [&#x24C8;](https://github.com/phated/docdown/blob/js/src/DocDown/Alias.js#L2 "View in source") [&#x24C9;][1]

Extracts the owner entry's `member` data.

#### Arguments
1. `index` *(Number)*: The index of the array value to return.

#### Returns
*(Array, String)*: The owner entry's `member` data.

* * *

<!-- /div -->


<!-- div -->

### <a id="aliasprototypegetname"></a>`Alias.prototype.getName()`
<a href="#aliasprototypegetname">#</a> [&#x24C8;](https://github.com/phated/docdown/blob/js/src/DocDown/Alias.js#L2 "View in source") [&#x24C9;][1]

Extracts the owner entry's `name` data.

#### Returns
*(String)*: The owner entry's `name` data.

* * *

<!-- /div -->


<!-- div -->

### <a id="aliasprototypegetparamsindex"></a>`Alias.prototype.getParams(index)`
<a href="#aliasprototypegetparamsindex">#</a> [&#x24C8;](https://github.com/phated/docdown/blob/js/src/DocDown/Alias.js#L2 "View in source") [&#x24C9;][1]

Extracts the owner entry's `param` data.

#### Arguments
1. `index` *(Number)*: The index of the array value to return.

#### Returns
*(Array)*: The owner entry's `param` data.

* * *

<!-- /div -->


<!-- div -->

### <a id="aliasprototypegetreturns"></a>`Alias.prototype.getReturns()`
<a href="#aliasprototypegetreturns">#</a> [&#x24C8;](https://github.com/phated/docdown/blob/js/src/DocDown/Alias.js#L2 "View in source") [&#x24C9;][1]

Extracts the owner entry's `returns` data.

#### Returns
*(String)*: The owner entry's `returns` data.

* * *

<!-- /div -->


<!-- div -->

### <a id="aliasprototypegettype"></a>`Alias.prototype.getType()`
<a href="#aliasprototypegettype">#</a> [&#x24C8;](https://github.com/phated/docdown/blob/js/src/DocDown/Alias.js#L2 "View in source") [&#x24C9;][1]

Extracts the owner entry's `type` data.

#### Returns
*(String)*: The owner entry's `type` data.

* * *

<!-- /div -->


<!-- div -->

### <a id="aliasprototypeisalias"></a>`Alias.prototype.isAlias()`
<a href="#aliasprototypeisalias">#</a> [&#x24C8;](https://github.com/phated/docdown/blob/js/src/DocDown/Alias.js#L2 "View in source") [&#x24C9;][1]

Checks if the entry is an alias.

#### Returns
*(Boolean)*: Returns `true`.

* * *

<!-- /div -->


<!-- div -->

### <a id="aliasprototypeisctor"></a>`Alias.prototype.isCtor()`
<a href="#aliasprototypeisctor">#</a> [&#x24C8;](https://github.com/phated/docdown/blob/js/src/DocDown/Alias.js#L2 "View in source") [&#x24C9;][1]

Checks if the owner entry is a constructor.

#### Returns
*(Boolean)*: Returns `true` if a constructor, else `false`.

* * *

<!-- /div -->


<!-- div -->

### <a id="aliasprototypeisplugin"></a>`Alias.prototype.isPlugin()`
<a href="#aliasprototypeisplugin">#</a> [&#x24C8;](https://github.com/phated/docdown/blob/js/src/DocDown/Alias.js#L2 "View in source") [&#x24C9;][1]

Checks if the owner entry *is* assigned to a prototype.

#### Returns
*(Boolean)*: Returns `true` if assigned to a prototype, else `false`.

* * *

<!-- /div -->


<!-- div -->

### <a id="aliasprototypeisprivate"></a>`Alias.prototype.isPrivate()`
<a href="#aliasprototypeisprivate">#</a> [&#x24C8;](https://github.com/phated/docdown/blob/js/src/DocDown/Alias.js#L2 "View in source") [&#x24C9;][1]

Checks if the owner entry is private.

#### Returns
*(Boolean)*: Returns `true` if private, else `false`.

* * *

<!-- /div -->


<!-- div -->

### <a id="aliasprototypeisstatic"></a>`Alias.prototype.isStatic()`
<a href="#aliasprototypeisstatic">#</a> [&#x24C8;](https://github.com/phated/docdown/blob/js/src/DocDown/Alias.js#L2 "View in source") [&#x24C9;][1]

Checks if the owner entry is *not* assigned to a prototype.

#### Returns
*(Boolean)*: Returns `true` if not assigned to a prototype, else `false`.

* * *

<!-- /div -->


<!-- /div -->


<!-- /div -->


  [1]: #Alias "Jump back to the TOC."