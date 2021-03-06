'use strict';

describe('Schools E2E Tests:', function() {
	describe('Test Schools page', function() {
		it('Should not include new Schools', function() {
			browser.get('http://localhost:3000/#!/schools');
			expect(element.all(by.repeater('school in schools')).count()).toEqual(0);
		});
	});
});
