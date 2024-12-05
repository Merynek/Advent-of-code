import {Page} from "./Page";

export class Rule {
    private readonly _page1: Page;
    private readonly _page2: Page;

    constructor(page1: Page, page2: Page) {
        this._page1 = page1;
        this._page2 = page2;
    }

    public pairIsValid(page1: Page, page2: Page): boolean {
        if (this._hasPage(page1) && this._hasPage(page2)) {
            return page1.number === this._page1.number;
        }
        return true;

    }

    private _hasPage(page: Page) {
        return this._page1.number === page.number || this._page2.number === page.number;
    }
}