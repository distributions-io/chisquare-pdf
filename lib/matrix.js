'use strict';

// MODULES //

var partial = require( './partial.js' );


// PDF //

/**
* FUNCTION: pdf( out, matrix, df )
*	Evaluates the probability density function (PDF) for a Chi-squared distribution with degrees of freedom `df` for each matrix element.
*
* @param {Matrix} out - output matrix
* @param {Matrix} arr - input matrix
* @param {Number} df - degrees of freedom
* @returns {Matrix} output matrix
*/
function pdf( y, x, df ) {
	var len = x.length,
		fcn,
		i;
	if ( y.length !== len ) {
		throw new Error( 'pdf()::invalid input arguments. Input and output matrices must be the same length.' );
	}
	fcn = partial( df );
	for ( i = 0; i < len; i++ ) {
		y.data[ i ] = fcn( x.data[ i ] );
	}
	return y;
} // end FUNCTION pdf()


// EXPORTS //

module.exports = pdf;
