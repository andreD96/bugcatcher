import { ChainablePromiseElement } from 'webdriverio';
import Page from './page.js';

class PricingPage extends Page {

    constructor() {
        super();
    }

    get forBusinessTab() {
        return $('a[aria-describedby=\'1\'] div')
    }

    get forIndividualTab() {
        return $('a[aria-describedby=\'2\'] div')
    }

    get startNowBtn() {
        return $('a[data-cy=\'ga-direct-checkout-btn-smallteams-yearly\']')
    }

    public async open(): Promise<void> {
        await super.open("pricing/");
    }

    public async pricingTabStatus(tab: ChainablePromiseElement<WebdriverIO.Element>) {
        return await tab.getCSSProperty('background-color')
    }
}

export default new PricingPage()
