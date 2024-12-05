import {IDay} from "../../IDay";
import {Day} from "../../Day";
import {WordSearcher} from "./models/WordSearcher";

export class Day4 extends Day implements IDay {
    constructor() {
        super("day4");
    }

    runSilver(): string {
        const searcher = new WordSearcher(this._input, "XMAS");
        return searcher.wordsCount.toString();
    }

    runGold(): string {
        const searcher = new WordSearcher(this._input, "MAS");
        return searcher.crossWordsCountByChar("A").toString();
    }
}



