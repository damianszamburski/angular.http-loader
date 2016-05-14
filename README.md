# angular.http-loader


## Installation
Include the Javascript at the bottom of your page before the closing body tag:
```
<script src="path/js/angular-http-loader.min.js"></script>
```
Include module to your angular app:
```
.module('yourmodule', [..., 'angular.http-loader'])
```

## Usage
**The `$http` service:**
Available new property `loader` in config object:
```
$http({..., loader: "your_loader_name"});
```
Property:
* **loader** - `{string}` - Name of loader that will be observed.

**The `loader=""` directive:**
You can observe `$http` requests in view:
```
<div ng-loader="your_loader_name">...</div>
```
Observe more than one variable (eq.`loader="your_loader_name1 your_loader_name2"`).

When `$http` request is calling, the html element automaticly receives a html class `ajax-loading`, like that:
```
<div ng-loader="your_loader_name" class="ajax-loading">...</div>
```
If you want to show `ajax-loading` class when view was init, add `ng-loader-init=""` and set it to `true`, like that:
```
<div ng-loader="your_loader_name" ng-loader-init="true">...</div>
```

Directives:
* **ng-loader** - `string`
* **ng-loader-init** - `bool=true` (optional)

## License
**The MIT License (MIT)**
Copyright (c) 2016 Damian Szamburski

Permission is hereby granted, free of charge, to any person obtaining a copyof this software and associated documentation files (the "Software"), to dealin the Software without restriction, including without limitation the rightsto use, copy, modify, merge, publish, distribute, sublicense, and/or sellcopies of the Software, and to permit persons to whom the Software isfurnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included inall copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS ORIMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THEAUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHERLIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS INTHE SOFTWARE.
