'use strict';

// MODULES //

var gammaPDF = require( 'distributions-gamma-pdf/lib/number.js' );


// PDF //

/**
* FUNCTION: pdf( x, df )
*	Evaluates the probability density function (PDF) for a Chi-squared distribution with degrees of freedom `df` at a value `x`.
*
* @param {Number} x - input value
* @param {Number} df - degrees of freedom
* @returns {Number} evaluated PDF
*/
function pdf( x, df ) {
	return gammaPDF( x, df / 2, 0.5 );
} // end FUNCTION pdf()


// EXPORTS //

module.exports = pdf;
