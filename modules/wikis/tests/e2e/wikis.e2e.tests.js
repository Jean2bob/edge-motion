'use strict';

describe('Wikis E2E Tests:', function() {
	describe('Test Wikis page', function() {
		it('Should not include new Wikis', function() {
			browser.get('http://localhost:3000/#!/wikis');
			expect(element.all(by.repeater('wiki in wikis')).count()).toEqual(0);
		});
	});
});
