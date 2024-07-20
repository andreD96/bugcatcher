import Page from "./page";


/**
 * sub-page containing specific selectors and methods for a specific page
 */

class SearchPage extends Page {
    /**
     * define selectors using getter methods
     */

    constructor() {
        super();
    }

    get searchQueryTerm() {
        return $('span[data-cy=\'query-text\']')
    }

    get searchResultsCards() {
        return $$('div[data-cy=\'GridCol\'] a[data-cy=\'link\']')
    }

    public async open(): Promise<void> {
        await super.open("search/");
    }

    public async resultsShown(): Promise<WebdriverIO.ElementArray> {
        let results: WebdriverIO.ElementArray
        results = await this.searchResultsCards
        return results
    }

}

export default new SearchPage()
