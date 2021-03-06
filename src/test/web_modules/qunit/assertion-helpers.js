import QUnit from "qunit";


/**
 * Clear all registered steps of the current test
 */
QUnit.assert.clearSteps = function() {
	this.test.steps.splice( 0, this.test.steps.length );
};


/**
 * Verifies and clears steps of the current test in one call
 * @params {string[]} steps
 */
QUnit.assert.checkSteps = function() {
	this.verifySteps( ...arguments );
	this.clearSteps();
};


/**
 * Alternative to assert.throw, which doesn't support async functions or promises
 * @param {(Promise|Function)} promise
 * @param {(Object|Function)} expected
 * @param {string} [message]
 * @returns {Promise}
 */
QUnit.assert.rejects = async function( promise, expected, message ) {
	let actual;
	let threw = false;

	try {
		if ( typeof promise === "function" ) {
			actual = await promise();
		} else {
			actual = await promise;
		}
	} catch ( err ) {
		actual = err;
		threw = true;
	}

	if ( !threw ) {
		this.test.pushResult({
			result: false,
			actual,
			expected,
			message: message || "Does not reject"
		});
		return;
	}

	let result = true;
	let msg = "Rejects";

	if ( expected ) {
		const expectedType = typeof expected;
		if ( expectedType === "function" ) {
			result = actual instanceof expected;
		} else if ( expectedType === "object" ) {
			result = actual instanceof expected.constructor
				&& actual.name === expected.name
				&& actual.message === expected.message;
		} else {
			result = actual === expected;
		}
		if ( actual ) {
			msg = `${actual.name || "Error"}${actual.message ? `: ${actual.message}` : ""}`;
		}
	}

	this.test.pushResult({ result, actual, expected, message: message || msg });
};
