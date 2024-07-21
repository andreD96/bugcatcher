import { Given, When, Then } from '@wdio/cucumber-framework';

import libraryPage from "../pageobjects/library.page.ts";
import searchPage from "../pageobjects/search.page.ts";
import pricingPage from "../pageobjects/pricing.page.ts";
import {browser} from "@wdio/globals";
import selfServePage from "../pageobjects/selfServe.page.ts";


Given(/^I am on the (\w+) page$/, async (page:string) => {
    switch (page.toLowerCase()) {
        case 'library':
            await libraryPage.open();
            break;
        case 'search':
            await searchPage.open();
            break;
        case 'pricing':
            await pricingPage.open()
            break;
        default:
            throw new Error(`Page ${page} not found`);
    }
});

When(/^I search for (.*)$/, async (term) => {
    await libraryPage.searchFor(term);

});

When(/^I click on start now for small teams$/, async () => {
    await pricingPage.startNowBtn.scrollIntoView({ block: 'center', inline: 'center' })
    await pricingPage.startNowBtn.click()
});

When(/^I land on the self serve page$/, async () => {
    await expect(await browser.getUrl()).toContain('checkout/self-serve/?annually=1&seats=5')
});


Then(/^I should see results related to (.*) or (.*)$/, async (term: string, alternative: string) => {
    const results = await searchPage.resultsShown();
    for (let element of results) {
        let ariaLabel = await element.getAttribute('aria-label');
        expect(ariaLabel.toLowerCase()).toContain(term.toLowerCase() || alternative.toLowerCase());
    }
});

Then(/^I expect to see the business pricing plans$/, async () => {
    const businessTabBgrColour = await pricingPage.pricingTabStatus( pricingPage.forBusinessTab)
    expect(businessTabBgrColour.value).toMatch('rgba(235,247,250,1)')
});

Then(/^I expect to see the (.*) social login$/, async (socialPlatform: string) => {
    expect(await selfServePage.checkSocialLogin(socialPlatform)).toContain(socialPlatform)
});

Then(/^I expect to see the email form$/, async () => {
    const fieldsPlaceHolders = ['First Name', 'Last Name', 'Your email address', 'Password'];
    const formFields = await selfServePage.formFields;
    await expect(formFields).toBeElementsArrayOfSize(fieldsPlaceHolders.length)
    for (let i = 0; i < formFields.length; i++) {
        const field = formFields[i];
        const placeholder = fieldsPlaceHolders[i];
        const fieldText = await field.getAttribute('placeholder');
        expect(fieldText).toContain(placeholder);
    }
});
