import {Page} from "./Page";
import {Rule} from "./Rule";

export class Update {
    private readonly _pages: Page[];

    constructor(pages: Page[]) {
        this._pages = pages
    }

    get pages(): Page[] {
        return this._pages;
    }

    public isValid(rule: Rule): boolean {
        const pairs = this._createPairs();
        return pairs.every(pair => rule.pairIsValid(pair[0], pair[1]));
    }

    private _createPairs(): [Page, Page][] {
        const pairs: [Page, Page][] = [];

        for (let i = 0; i < this._pages.length - 1; i++) {
            for (let j = i + 1; j < this._pages.length; j++) {
                pairs.push([this._pages[i], this._pages[j]]);
            }
        }

        return pairs;
    }
}