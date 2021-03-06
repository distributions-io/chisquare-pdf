Probability Density Function
===
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage Status][coveralls-image]][coveralls-url] [![Dependencies][dependencies-image]][dependencies-url]

> [Chi-squared](https://en.wikipedia.org/wiki/Chi-squared_distribution) distribution probability density function (PDF).

The [probability density function](https://en.wikipedia.org/wiki/Probability_density_function) (PDF) for a [Chi-squared](https://en.wikipedia.org/wiki/Chi-squared_distribution) random variable is

<div class="equation" align="center" data-raw-text="" data-equation="eq:pdf_function">
	<img src="https://cdn.rawgit.com/distributions-io/chisquare-pdf/71cba5e8a69f15d0651267876c6724ef6fd7401e/docs/img/eqn.svg" alt="Probability density function (PDF) for a Chi-squared distribution.">
	<br>
</div>

for `x  >= 0`, for `x < 0` it evaluates to zero. `df` is the degrees of freedom of the [Chi-squared distribution](https://en.wikipedia.org/wiki/Chi-squared_distribution).

## Installation

``` bash
$ npm install distributions-chisquare-pdf
```

For use in the browser, use [browserify](https://github.com/substack/node-browserify).


## Usage

``` javascript
var pdf = require( 'distributions-chisquare-pdf' );
```

#### pdf( x[, options] )

Evaluates the [probability density function](https://en.wikipedia.org/wiki/Probability_density_function) (PDF) for the [Chi-squared](https://en.wikipedia.org/wiki/Chi-squared_distribution) distribution. `x` may be either a [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number), an [`array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array), a [`typed array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays), or a [`matrix`](https://github.com/dstructs/matrix).

``` javascript
var matrix = require( 'dstructs-matrix' ),
	mat,
	out,
	x,
	i;

// by default, df = 1
out = pdf( 1 );
// returns ~0.242

out = pdf( -1 );
// returns 0

x = [ 0, 0.5, 1, 1.5, 2, 2.5 ];
out = pdf( x );
// returns [ +Infinity, ~0.439, ~0.242, ~0.154, ~0.104, ~0.073 ]

x = new Int8Array( x );
out = pdf( x );
// returns Float64Array( [+Infinity,~0.439,~0.242,~0.154,~0.104,~0.073] )

x = new Float32Array( 6 );
for ( i = 0; i < 6; i++ ) {
	x[ i ] = i * 0.5;
}
mat = matrix( x, [3,2], 'float32' );
/*
	[ 0  0.5
	  1  1.5
	  2  2.5 ]
*/

out = pdf( mat );
/*
	[ +Infinity ~0.439
	  ~0.242    ~0.154
	  ~0.104    ~0.073 ]
*/
```

The function accepts the following `options`:

*	__df__: degrees of freedom. Default: `1`.
* 	__accessor__: accessor `function` for accessing `array` values.
* 	__dtype__: output [`typed array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays) or [`matrix`](https://github.com/dstructs/matrix) data type. Default: `float64`.
*	__copy__: `boolean` indicating if the `function` should return a new data structure. Default: `true`.
*	__path__: [deepget](https://github.com/kgryte/utils-deep-get)/[deepset](https://github.com/kgryte/utils-deep-set) key path.
*	__sep__: [deepget](https://github.com/kgryte/utils-deep-get)/[deepset](https://github.com/kgryte/utils-deep-set) key path separator. Default: `'.'`.

A [Chi-squared](https://en.wikipedia.org/wiki/Chi-squared_distribution) distribution is a function of one parameter: `df`(degrees of freedom). By default, `df` is equal to `1`. To adjust the parameter, set the corresponding option.

``` javascript
var x = [ 0, 0.5, 1, 1.5, 2, 2.5 ];

var out = pdf( x, {
	'df': 3,
});
// returns [ 0, ~0.22, ~0.242, ~0.231, ~0.208, ~0.181 ]
```

For non-numeric `arrays`, provide an accessor `function` for accessing `array` values.

``` javascript
var data = [
	[0,0],
	[1,0.5],
	[2,1],
	[3,1.5],
	[4,2],
	[5,2.5]
];

function getValue( d, i ) {
	return d[ 1 ];
}

var out = pdf( data, {
	'accessor': getValue
});
// returns [  +Infinity, ~0.439, ~0.242, ~0.154, ~0.104, ~0.073 ]
```


To [deepset](https://github.com/kgryte/utils-deep-set) an object `array`, provide a key path and, optionally, a key path separator.

``` javascript
var data = [
	{'x':[0,0]},
	{'x':[1,0.5]},
	{'x':[2,1]},
	{'x':[3,1.5]},
	{'x':[4,2]},
	{'x':[5,2.5]}
];

var out = pdf( data, {
	'path': 'x/1',
	'sep': '/'
});
/* 
	[
		{'x':[0,+Infinity]},
		{'x':[1,~0.439]},
		{'x':[2,~0.242]},
		{'x':[3,~0.154]},
		{'x':[4,~0.104]},
		{'x':[5,~0.073]}
	]
*/

var bool = ( data === out );
// returns true
```

By default, when provided a [`typed array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays) or [`matrix`](https://github.com/dstructs/matrix), the output data structure is `float64` in order to preserve precision. To specify a different data type, set the `dtype` option (see [`matrix`](https://github.com/dstructs/matrix) for a list of acceptable data types).

``` javascript
var x, out;

x = new Float32Array( [0.1,0.2,0.3,0.4] );

out = pdf( x, {
	'dtype': 'int32'
});
// returns Int32Array( [1,0,0,0] )

// Works for plain arrays, as well...
out = pdf( [0.1,0.2,0.3,0.4], {
	'dtype': 'uint8'
});
// returns Uint8Array( [1,0,0,0] )
```

By default, the function returns a new data structure. To mutate the input data structure (e.g., when input values can be discarded or when optimizing memory usage), set the `copy` option to `false`.

``` javascript
var bool,
	mat,
	out,
	x,
	i;

x = [ 0, 0.5, 1, 1.5, 2 ];

out = pdf( x, {
	'copy': false
});
// returns [ +Infinity, ~0.439, ~0.242, ~0.154, ~0.104, ~0.073 ]

bool = ( x === out );
// returns true

x = new Float32Array( 6 );
for ( i = 0; i < 6; i++ ) {
	x[ i ] = i * 0.5;
}
mat = matrix( x, [3,2], 'float32' );
/*
	[ 0  0.5
	  1  1.5
	  2  2.5 ]
*/

out = pdf( mat, {
	'copy': false
});
/*
	[ +Infinity ~0.439
	  ~0.242    ~0.154
	  ~0.104    ~0.073 ]
*/

bool = ( mat === out );
// returns true
```


## Notes

*	If an element is __not__ a numeric value, the evaluated [PDF](https://en.wikipedia.org/wiki/Chi-squared_distribution) is `NaN`.

	``` javascript
	var data, out;

	out = pdf( null );
	// returns NaN

	out = pdf( true );
	// returns NaN

	out = pdf( {'a':'b'} );
	// returns NaN

	out = pdf( [ true, null, [] ] );
	// returns [ NaN, NaN, NaN ]

	function getValue( d, i ) {
		return d.x;
	}
	data = [
		{'x':true},
		{'x':[]},
		{'x':{}},
		{'x':null}
	];

	out = pdf( data, {
		'accessor': getValue
	});
	// returns [ NaN, NaN, NaN, NaN ]

	out = pdf( data, {
		'path': 'x'
	});
	/*
		[
			{'x':NaN},
			{'x':NaN},
			{'x':NaN,
			{'x':NaN}
		]
	*/
	```

*	Be careful when providing a data structure which contains non-numeric elements and specifying an `integer` output data type, as `NaN` values are cast to `0`.

	``` javascript
	var out = pdf( [ true, null, [] ], {
		'dtype': 'int8'
	});
	// returns Int8Array( [0,0,0] );
	```


## Examples

``` javascript
var pdf = require( 'distributions-chisquare-pdf' ),
	matrix = require( 'dstructs-matrix' );

var data,
	mat,
	out,
	tmp,
	i;

// Plain arrays...
data = new Array( 10 );
for ( i = 0; i < data.length; i++ ) {
	data[ i ] = i * 0.5;
}
out = pdf( data );

// Object arrays (accessors)...
function getValue( d ) {
	return d.x;
}
for ( i = 0; i < data.length; i++ ) {
	data[ i ] = {
		'x': data[ i ]
	};
}
out = pdf( data, {
	'accessor': getValue
});

// Deep set arrays...
for ( i = 0; i < data.length; i++ ) {
	data[ i ] = {
		'x': [ i, data[ i ].x ]
	};
}
out = pdf( data, {
	'path': 'x/1',
	'sep': '/'
});

// Typed arrays...
data = new Float32Array( 10 );
for ( i = 0; i < data.length; i++ ) {
	data[ i ] = i * 0.5;
}
out = pdf( data );

// Matrices...
mat = matrix( data, [5,2], 'float32' );
out = pdf( mat );

// Matrices (custom output data type)...
out = pdf( mat, {
	'dtype': 'uint8'
});
```

To run the example code from the top-level application directory,

``` bash
$ node ./examples/index.js
```


## Tests

### Unit

Unit tests use the [Mocha](http://mochajs.org/) test framework with [Chai](http://chaijs.com) assertions. To run the tests, execute the following command in the top-level application directory:

``` bash
$ make test
```

All new feature development should have corresponding unit tests to validate correct functionality.


### Test Coverage

This repository uses [Istanbul](https://github.com/gotwarlost/istanbul) as its code coverage tool. To generate a test coverage report, execute the following command in the top-level application directory:

``` bash
$ make test-cov
```

Istanbul creates a `./reports/coverage` directory. To access an HTML version of the report,

``` bash
$ make view-cov
```


---
## License

[MIT license](http://opensource.org/licenses/MIT).


## Copyright

Copyright &copy; 2015. The [Compute.io](https://github.com/compute-io) Authors.


[npm-image]: http://img.shields.io/npm/v/distributions-chisquare-pdf.svg
[npm-url]: https://npmjs.org/package/distributions-chisquare-pdf

[travis-image]: http://img.shields.io/travis/distributions-io/chisquare-pdf/master.svg
[travis-url]: https://travis-ci.org/distributions-io/chisquare-pdf

[coveralls-image]: https://img.shields.io/coveralls/distributions-io/chisquare-pdf/master.svg
[coveralls-url]: https://coveralls.io/r/distributions-io/chisquare-pdf?branch=master

[dependencies-image]: http://img.shields.io/david/distributions-io/chisquare-pdf.svg
[dependencies-url]: https://david-dm.org/distributions-io/chisquare-pdf

[dev-dependencies-image]: http://img.shields.io/david/dev/distributions-io/chisquare-pdf.svg
[dev-dependencies-url]: https://david-dm.org/dev/distributions-io/chisquare-pdf

[github-issues-image]: http://img.shields.io/github/issues/distributions-io/chisquare-pdf.svg
[github-issues-url]: https://github.com/distributions-io/chisquare-pdf/issues
