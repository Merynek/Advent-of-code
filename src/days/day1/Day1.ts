import {IDay} from "../../IDay";
import {getInputNumbers, getInputStrings} from "../../services/input-service";
import {Day} from "../../Day";

export class Day1 extends Day implements IDay {
    constructor() {
        super("day1");
    }

    runSilver(): string {
        const input = this.loadSilverInput();
        const numbers =  getInputNumbers(input);
        return numbers.join(",");
    }

    runGold(): string {
        const input = this.loadGoldInput();
        const numbers =  getInputStrings(input);
        return numbers.join(",");
    }
}