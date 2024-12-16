import {IDay} from "../../IDay";
import {Day} from "../../Day";
import {MapParser} from "./models/MapParser";

export class Day10 extends Day implements IDay {
    constructor() {
        super("day10");
    }

    runSilver(): string {
        const parser = new MapParser(this._input);
        const map = parser.parse();
        return map.score.toString();
    }

    runGold(): string {
        const parser = new MapParser(this._input);
        const map = parser.parse();
        return map.rating.toString();
    }
}



