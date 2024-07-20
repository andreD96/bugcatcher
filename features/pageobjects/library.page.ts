import Page from './page.js';
import {browser} from "@wdio/globals";

class LibraryPage extends Page {

    constructor() {
        super();
    }

    /**
     * define selectors using getter methods
     */

    get librarySearchBar() {
        return $('div[data-cy=\'search-bar\']')
    }

    get librarySearchBarInput() {
        return $('#search-bar-input')
    }

    public async open(): Promise<void> {
        await super.open("library/");
    }

    public async searchFor(term: string): Promise<void>{
        while(!this.librarySearchBar.isDisplayedInViewport()){
            await browser.scroll(0,300)
        }
        await this.librarySearchBar.scrollIntoView({ block: 'center', inline: 'center' })
        await this.librarySearchBar.click()
        await this.librarySearchBarInput.setValue(term)
    }

}

export default new LibraryPage();
