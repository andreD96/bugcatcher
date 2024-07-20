import { browser } from '@wdio/globals'

/**
 * Header class containing header-specific selectors
 */
class Header {
    get searchBarInput() {
        return $('input[class$=\'input\']')
    }

    get searchBarIconBtn() {
        return $('div[class=\'sc-d27c6a4b-2 jpqqfX\']')
    }
}

/**
 * main page object containing all methods, selectors and functionality
 * that is shared across all page objects
 */
export default class Page {
    public header: Header;

    constructor() {
        this.header = new Header();
    }

    private get getCookieSelectionButton() {
        return $('#CybotCookiebotDialogBodyLevelButtonLevelOptinAllowallSelection');
    }

    /**
     * Opens a sub-page of the page
     * @param path path of the sub-page (e.g. /path/to/page.html)
     */
    public async open(path?: string) {
        await browser.url(`https://cloudacademy.com/${path}`)
        await this.header.searchBarInput.waitForDisplayed()
        const cookieButton = this.getCookieSelectionButton;
        if (await cookieButton.isDisplayed()) {
            await cookieButton.click();
        }
    }
}
