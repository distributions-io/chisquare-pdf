'use strict';

// MODULES //

var gammaPartial = require( 'distributions-gamma-pdf/lib/partial.js' );


// PARTIAL //

/**
* FUNCTION: partial( df )
*	Partially applies degrees of freedom `df` and returns a function for evaluating the probability density function (PDF) for a Chi-squared distribution.
*
* @param {Number} df - degrees of freedom
* @returns {Function} PDF
*/
function partial( df ) {

	/**
	* FUNCTION: pdf( x )
	*	Evaluates the probability density function (PDF) for a Chi-squared distribution.
	*
	* @private
	* @param {Number} x - input value
	* @returns {Number} evaluated PDF
	*/
	return gammaPartial( df / 2, 0.5 );
} // end FUNCTION partial()


// EXPORTS //

module.exports = partial;
