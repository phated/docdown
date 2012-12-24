# Alias.js API documentation

<!-- div -->


<!-- div -->

## <a id="Alias"></a>`Alias`
* [`Alias`](#aliasname-owner)
* [`Alias.getAliases`](#aliasgetaliasesindex)
* [`Alias.getCall`](#aliasgetcall)
* [`Alias.getCategory`](#aliasgetcategory)
* [`Alias.getDesc`](#aliasgetdesc)
* [`Alias.getExample`](#aliasgetexample)
* [`Alias.getLineNumber`](#aliasgetlinenumber)
* [`Alias.getMembers`](#aliasgetmembersindex)
* [`Alias.getName`](#aliasgetname)
* [`Alias.getParams`](#aliasgetparamsindex)
* [`Alias.getReturns`](#aliasgetreturns)
* [`Alias.getType`](#aliasgettype)
* [`Alias.isAlias`](#aliasisalias)
* [`Alias.isCtor`](#aliasisctor)
* [`Alias.isPlugin`](#aliasisplugin)
* [`Alias.isPrivate`](#aliasisprivate)
* [`Alias.isStatic`](#aliasisstatic)

<!-- /div -->


<!-- /div -->


<!-- div -->


<!-- div -->

## `Alias`

<!-- div -->

### <a id="aliasname-owner"></a>`Alias(name, owner)`
<a href="#aliasname-owner">#</a> [&#x24C8;](https://github.com/phated/docdown/blob/js/Alias.js#L2 "View in source") [&#x24C9;][1]

The Alias constructor.

#### Arguments
1. `name` *(String)*: The alias name.
2. `owner` *(Object)*: The alias owner.

* * *

<!-- /div -->


<!-- div -->

### <a id="aliasgetaliasesindex"></a>`Alias.getAliases(index)`
<a href="#aliasgetaliasesindex">#</a> [&#x24C8;](https://github.com/phated/docdown/blob/js/Alias.js#L2 "View in source") [&#x24C9;][1]

Extracts the entry's `alias` objects.

#### Arguments
1. `index` *(Number)*: The index of the array value to return.

#### Returns
*(Array, String)*: The entry's `alias` objects.

* * *

<!-- /div -->


<!-- div -->

### <a id="aliasgetcall"></a>`Alias.getCall()`
<a href="#aliasgetcall">#</a> [&#x24C8;](https://github.com/phated/docdown/blob/js/Alias.js#L2 "View in source") [&#x24C9;][1]

Extracts the function call from the owner entry.

#### Returns
*(String)*: The function call.

* * *

<!-- /div -->


<!-- div -->

### <a id="aliasgetcategory"></a>`Alias.getCategory()`
<a href="#aliasgetcategory">#</a> [&#x24C8;](https://github.com/phated/docdown/blob/js/Alias.js#L2 "View in source") [&#x24C9;][1]

Extracts the owner entry's `category` data.

#### Returns
*(String)*: The owner entry's `category` data.

* * *

<!-- /div -->


<!-- div -->

### <a id="aliasgetdesc"></a>`Alias.getDesc()`
<a href="#aliasgetdesc">#</a> [&#x24C8;](https://github.com/phated/docdown/blob/js/Alias.js#L2 "View in source") [&#x24C9;][1]

Extracts the owner entry's description.

#### Returns
*(String)*: The owner entry's description.

* * *

<!-- /div -->


<!-- div -->

### <a id="aliasgetexample"></a>`Alias.getExample()`
<a href="#aliasgetexample">#</a> [&#x24C8;](https://github.com/phated/docdown/blob/js/Alias.js#L2 "View in source") [&#x24C9;][1]

Extracts the owner entry's `example` data.

#### Returns
*(String)*: The owner entry's `example` data.

* * *

<!-- /div -->


<!-- div -->

### <a id="aliasgetlinenumber"></a>`Alias.getLineNumber()`
<a href="#aliasgetlinenumber">#</a> [&#x24C8;](https://github.com/phated/docdown/blob/js/Alias.js#L2 "View in source") [&#x24C9;][1]

Resolves the owner entry's line number.

#### Returns
*(Number)*: The owner entry's line number.

* * *

<!-- /div -->


<!-- div -->

### <a id="aliasgetmembersindex"></a>`Alias.getMembers(index)`
<a href="#aliasgetmembersindex">#</a> [&#x24C8;](https://github.com/phated/docdown/blob/js/Alias.js#L2 "View in source") [&#x24C9;][1]

Extracts the owner entry's `member` data.

#### Arguments
1. `index` *(Number)*: The index of the array value to return.

#### Returns
*(Array, String)*: The owner entry's `member` data.

* * *

<!-- /div -->


<!-- div -->

### <a id="aliasgetname"></a>`Alias.getName()`
<a href="#aliasgetname">#</a> [&#x24C8;](https://github.com/phated/docdown/blob/js/Alias.js#L2 "View in source") [&#x24C9;][1]

Extracts the owner entry's `name` data.

#### Returns
*(String)*: The owner entry's `name` data.

* * *

<!-- /div -->


<!-- div -->

### <a id="aliasgetparamsindex"></a>`Alias.getParams(index)`
<a href="#aliasgetparamsindex">#</a> [&#x24C8;](https://github.com/phated/docdown/blob/js/Alias.js#L2 "View in source") [&#x24C9;][1]

Extracts the owner entry's `param` data.

#### Arguments
1. `index` *(Number)*: The index of the array value to return.

#### Returns
*(Array)*: The owner entry's `param` data.

* * *

<!-- /div -->


<!-- div -->

### <a id="aliasgetreturns"></a>`Alias.getReturns()`
<a href="#aliasgetreturns">#</a> [&#x24C8;](https://github.com/phated/docdown/blob/js/Alias.js#L2 "View in source") [&#x24C9;][1]

Extracts the owner entry's `returns` data.

#### Returns
*(String)*: The owner entry's `returns` data.

* * *

<!-- /div -->


<!-- div -->

### <a id="aliasgettype"></a>`Alias.getType()`
<a href="#aliasgettype">#</a> [&#x24C8;](https://github.com/phated/docdown/blob/js/Alias.js#L2 "View in source") [&#x24C9;][1]

Extracts the owner entry's `type` data.

#### Returns
*(String)*: The owner entry's `type` data.

* * *

<!-- /div -->


<!-- div -->

### <a id="aliasisalias"></a>`Alias.isAlias()`
<a href="#aliasisalias">#</a> [&#x24C8;](https://github.com/phated/docdown/blob/js/Alias.js#L2 "View in source") [&#x24C9;][1]

Checks if the entry is an alias.

#### Returns
*(Boolean)*: Returns `true`.

* * *

<!-- /div -->


<!-- div -->

### <a id="aliasisctor"></a>`Alias.isCtor()`
<a href="#aliasisctor">#</a> [&#x24C8;](https://github.com/phated/docdown/blob/js/Alias.js#L2 "View in source") [&#x24C9;][1]

Checks if the owner entry is a constructor.

#### Returns
*(Boolean)*: Returns `true` if a constructor, else `false`.

* * *

<!-- /div -->


<!-- div -->

### <a id="aliasisplugin"></a>`Alias.isPlugin()`
<a href="#aliasisplugin">#</a> [&#x24C8;](https://github.com/phated/docdown/blob/js/Alias.js#L2 "View in source") [&#x24C9;][1]

Checks if the owner entry *is* assigned to a prototype.

#### Returns
*(Boolean)*: Returns `true` if assigned to a prototype, else `false`.

* * *

<!-- /div -->


<!-- div -->

### <a id="aliasisprivate"></a>`Alias.isPrivate()`
<a href="#aliasisprivate">#</a> [&#x24C8;](https://github.com/phated/docdown/blob/js/Alias.js#L2 "View in source") [&#x24C9;][1]

Checks if the owner entry is private.

#### Returns
*(Boolean)*: Returns `true` if private, else `false`.

* * *

<!-- /div -->


<!-- div -->

### <a id="aliasisstatic"></a>`Alias.isStatic()`
<a href="#aliasisstatic">#</a> [&#x24C8;](https://github.com/phated/docdown/blob/js/Alias.js#L2 "View in source") [&#x24C9;][1]

Checks if the owner entry is *not* assigned to a prototype.

#### Returns
*(Boolean)*: Returns `true` if not assigned to a prototype, else `false`.

* * *

<!-- /div -->


<!-- /div -->


<!-- /div -->


  [1]: #Alias "Jump back to the TOC."