import { Given, When, Then } from '@wdio/cucumber-framework';

import libraryPage from "../pageobjects/library.page.ts";
import searchPage from "../pageobjects/search.page.ts";


Given(/^I am on the (\w+) page$/, async (page:string) => {
    switch (page.toLowerCase()) {
        case 'library':
            await libraryPage.open();
            break;
        case 'search':
            await searchPage.open();
            break;
        default:
            throw new Error(`Page ${page} not found`);
    }
});

When(/^I search for (.*)$/, async (term) => {
    await libraryPage.searchFor(term);

});

Then(/^I should see results related to (.*) or (.*)$/, async (term: string, alternative: string) => {
    const results = await searchPage.resultsShown();
    for (let element of results) {
        let ariaLabel = await element.getAttribute('aria-label');
        expect(ariaLabel.toLowerCase()).toContain(term.toLowerCase() || alternative.toLowerCase());
    }
});
