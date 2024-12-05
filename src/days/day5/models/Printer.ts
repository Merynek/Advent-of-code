import {Rule} from "./Rule";
import {Update} from "./Update";
import {Page} from "./Page";
import sumBy from "lodash/sumBy"

export class Printer {
    private readonly _rules: Rule[];
    private readonly _updates: Update[];

    constructor(rules: Rule[], updates: Update[]) {
        this._rules = rules;
        this._updates = updates;
    }

    get computeFixedValidation(): number {
        return this._computeMiddleUpdates(this.fixInvalidUpdates);
    }

    get computeValidation(): number {
        return this._computeMiddleUpdates(this.validatedUpdates.valid);
    }

    get fixInvalidUpdates(): Update[] {
        const validUpdates: Update[] = [];
        this.validatedUpdates.invalid.filter(update => {
            const invalidPages = update.pages;
            const validPages: Page[] = [];

            let _collectingValidPages: Page[] = [invalidPages[0]];
            for (let i = 0; i < invalidPages.length; i++) {
                for (let j = 0; j < _collectingValidPages.length + 1; j++) {
                    const _test = [..._collectingValidPages.slice(0, j), invalidPages[i], ..._collectingValidPages.slice(j)]
                    if (this._updateIsValid(new Update(_test))) {
                        _collectingValidPages = _test;
                        if (i === invalidPages.length - 1) {
                            validPages.push(..._test);
                        }
                        break;
                    }
                }
            }

            validUpdates.push(new Update(validPages));
        })
        return validUpdates;
    }

    get validatedUpdates(): {valid: Update[], invalid: Update[]} {
        const validUpdates: Update[] = [];
        const invalidUpdates: Update[] = [];
        this._updates.forEach(update => {
            if (this._updateIsValid(update)) {
                validUpdates.push(update);
            } else {
                invalidUpdates.push(update);
            }
        })
        return {valid: validUpdates, invalid: invalidUpdates};
    }

    private _computeMiddleUpdates(updates: Update[]) {
        const middlePages: Page[] = [];

        updates.forEach(update => {
            const middleIndex = Math.floor(update.pages.length / 2);
            middlePages.push(update.pages[middleIndex]);
        })

        return sumBy(middlePages, page => page.number);
    }

    private _updateIsValid(update: Update) {
        return this._rules.every(r => update.isValid(r));
    }
}