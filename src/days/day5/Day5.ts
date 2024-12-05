import {IDay} from "../../IDay";
import {Day} from "../../Day";
import {Printer} from "./models/Printer";
import {getInputStrings} from "../../services/input-service";
import {Rule} from "./models/Rule";
import {Update} from "./models/Update";
import {Page} from "./models/Page";

export class Day5 extends Day implements IDay {
    constructor() {
        super("day5");
    }

    private _createRule(text: string): Rule {
        const numbers = text.split("|");
        return new Rule(new Page(Number(numbers[0])), new Page(Number(numbers[1])));
    }

    private _createUpdate(text: string): Update {
        const numbers = text.split(",");
        return new Update(numbers.map(page => new Page(Number(page))));
    }

    private _createPrinter() {
        const input = getInputStrings(this._input);
        const dividerIndex = input.indexOf("");
        const _stringRules = input.slice(0, dividerIndex);
        const _stringUpdates = input.slice(dividerIndex + 1);

        const rules = _stringRules.map(this._createRule);
        const updates = _stringUpdates.map(this._createUpdate);
        return new Printer(rules, updates);
    }

    runSilver(): string {
        const printer = this._createPrinter();
        return printer.computeValidation.toString()
    }

    runGold(): string {
        const printer = this._createPrinter();
        return printer.computeFixedValidation.toString()
    }
}



