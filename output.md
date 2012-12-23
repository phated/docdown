# Alias.js API documentation

<!-- div -->


<!-- div -->

## <a id="Alias"></a>`Alias`
* [`Alias`](#alias)
* [`Alias.getAliases`](#aliasgetaliasesp)
* [`Alias.getCall`](#aliasgetcall)
* [`Alias.getCategory`](#aliasgetcategory)
* [`Alias.getDesc`](#aliasgetdesc)
* [`Alias.getExample`](#aliasgetexample)
* [`Alias.getLineNumber`](#aliasgetlinenumber)
* [`Alias.getMembers`](#aliasgetmembersp)
* [`Alias.getName`](#aliasgetname)
* [`Alias.getParams`](#aliasgetparamsp)
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

### <a id="alias"></a>`Alias`
<a href="#alias">#</a> [&#x24C8;](https://github.com/phated/docdown/blob/master/Alias.js#L2 "View in source") [&#x24C9;][1]

*(Unknown)*: The Alias constructor.

* * *

<!-- /div -->


<!-- div -->

### <a id="aliasgetaliasesp"></a>`Alias.getAliases(p)`
<a href="#aliasgetaliasesp">#</a> [&#x24C8;](https://github.com/phated/docdown/blob/master/Alias.js#L2 "View in source") [&#x24C9;][1]

Extracts the entry's `alias` objects.

#### Returns
*(Array, String)*: The entry's `alias` objects.

* * *

<!-- /div -->


<!-- div -->

### <a id="aliasgetcall"></a>`Alias.getCall()`
<a href="#aliasgetcall">#</a> [&#x24C8;](https://github.com/phated/docdown/blob/master/Alias.js#L2 "View in source") [&#x24C9;][1]

Extracts the function call from the owner entry.

#### Returns
*(String)*: The function call.

* * *

<!-- /div -->


<!-- div -->

### <a id="aliasgetcategory"></a>`Alias.getCategory()`
<a href="#aliasgetcategory">#</a> [&#x24C8;](https://github.com/phated/docdown/blob/master/Alias.js#L2 "View in source") [&#x24C9;][1]

Extracts the owner entry's `category` data.

#### Returns
*(String)*: The owner entry's `category` data.

* * *

<!-- /div -->


<!-- div -->

### <a id="aliasgetdesc"></a>`Alias.getDesc()`
<a href="#aliasgetdesc">#</a> [&#x24C8;](https://github.com/phated/docdown/blob/master/Alias.js#L2 "View in source") [&#x24C9;][1]

Extracts the owner entry's description.

#### Returns
*(String)*: The owner entry's description.

* * *

<!-- /div -->


<!-- div -->

### <a id="aliasgetexample"></a>`Alias.getExample()`
<a href="#aliasgetexample">#</a> [&#x24C8;](https://github.com/phated/docdown/blob/master/Alias.js#L2 "View in source") [&#x24C9;][1]

Extracts the owner entry's `example` data.

#### Returns
*(String)*: The owner entry's `example` data.

* * *

<!-- /div -->


<!-- div -->

### <a id="aliasgetlinenumber"></a>`Alias.getLineNumber()`
<a href="#aliasgetlinenumber">#</a> [&#x24C8;](https://github.com/phated/docdown/blob/master/Alias.js#L2 "View in source") [&#x24C9;][1]

Resolves the owner entry's line number.

#### Returns
*(Number)*: The owner entry's line number.

* * *

<!-- /div -->


<!-- div -->

### <a id="aliasgetmembersp"></a>`Alias.getMembers(p)`
<a href="#aliasgetmembersp">#</a> [&#x24C8;](https://github.com/phated/docdown/blob/master/Alias.js#L2 "View in source") [&#x24C9;][1]

Extracts the owner entry's `member` data.

#### Returns
*(Array, String)*: The owner entry's `member` data.

* * *

<!-- /div -->


<!-- div -->

### <a id="aliasgetname"></a>`Alias.getName()`
<a href="#aliasgetname">#</a> [&#x24C8;](https://github.com/phated/docdown/blob/master/Alias.js#L2 "View in source") [&#x24C9;][1]

Extracts the owner entry's `name` data.

#### Returns
*(String)*: The owner entry's `name` data.

* * *

<!-- /div -->


<!-- div -->

### <a id="aliasgetparamsp"></a>`Alias.getParams(p)`
<a href="#aliasgetparamsp">#</a> [&#x24C8;](https://github.com/phated/docdown/blob/master/Alias.js#L2 "View in source") [&#x24C9;][1]

Extracts the owner entry's `param` data.

#### Returns
*(Array)*: The owner entry's `param` data.

* * *

<!-- /div -->


<!-- div -->

### <a id="aliasgetreturns"></a>`Alias.getReturns()`
<a href="#aliasgetreturns">#</a> [&#x24C8;](https://github.com/phated/docdown/blob/master/Alias.js#L2 "View in source") [&#x24C9;][1]

Extracts the owner entry's `returns` data.

#### Returns
*(String)*: The owner entry's `returns` data.

* * *

<!-- /div -->


<!-- div -->

### <a id="aliasgettype"></a>`Alias.getType()`
<a href="#aliasgettype">#</a> [&#x24C8;](https://github.com/phated/docdown/blob/master/Alias.js#L2 "View in source") [&#x24C9;][1]

Extracts the owner entry's `type` data.

#### Returns
*(String)*: The owner entry's `type` data.

* * *

<!-- /div -->


<!-- div -->

### <a id="aliasisalias"></a>`Alias.isAlias()`
<a href="#aliasisalias">#</a> [&#x24C8;](https://github.com/phated/docdown/blob/master/Alias.js#L2 "View in source") [&#x24C9;][1]

Checks if the entry is an alias.

#### Returns
*(Boolean)*: Returns `true`.

* * *

<!-- /div -->


<!-- div -->

### <a id="aliasisctor"></a>`Alias.isCtor()`
<a href="#aliasisctor">#</a> [&#x24C8;](https://github.com/phated/docdown/blob/master/Alias.js#L2 "View in source") [&#x24C9;][1]

Checks if the owner entry is a constructor.

#### Returns
*(Boolean)*: Returns `true` if a constructor, else `false`.

* * *

<!-- /div -->


<!-- div -->

### <a id="aliasisplugin"></a>`Alias.isPlugin()`
<a href="#aliasisplugin">#</a> [&#x24C8;](https://github.com/phated/docdown/blob/master/Alias.js#L2 "View in source") [&#x24C9;][1]

Checks if the owner entry *is* assigned to a prototype.

#### Returns
*(Boolean)*: Returns `true` if assigned to a prototype, else `false`.

* * *

<!-- /div -->


<!-- div -->

### <a id="aliasisprivate"></a>`Alias.isPrivate()`
<a href="#aliasisprivate">#</a> [&#x24C8;](https://github.com/phated/docdown/blob/master/Alias.js#L2 "View in source") [&#x24C9;][1]

Checks if the owner entry is private.

#### Returns
*(Boolean)*: Returns `true` if private, else `false`.

* * *

<!-- /div -->


<!-- div -->

### <a id="aliasisstatic"></a>`Alias.isStatic()`
<a href="#aliasisstatic">#</a> [&#x24C8;](https://github.com/phated/docdown/blob/master/Alias.js#L2 "View in source") [&#x24C9;][1]

Checks if the owner entry is *not* assigned to a prototype.

#### Returns
*(Boolean)*: Returns `true` if not assigned to a prototype, else `false`.

* * *

<!-- /div -->


<!-- /div -->


<!-- /div -->


  [1]: #Alias "Jump back to the TOC."