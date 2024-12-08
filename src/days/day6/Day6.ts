import {IDay} from "../../IDay";
import {Day} from "../../Day";
import {MapParser} from "./models/MapParser";

export class Day6 extends Day implements IDay {
    constructor() {
        super("day6");
    }

    runSilver(): string {
        const mapParser = new MapParser(this._input)
        const map = mapParser.parseMap();
        map.moveGuardAway();
        return map.visitedFieldsByGuard.length.toString();
    }

    runGold(): string {
        return "";
    }
}



