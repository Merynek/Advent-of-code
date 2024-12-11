import {IDay} from "../../IDay";
import {Day} from "../../Day";
import {MapParser} from "./models/MapParser";

export class Day8 extends Day implements IDay {
    constructor() {
        super("day8");
    }

    runSilver(): string {
        const mapParser = new MapParser(this._input);
        const map = mapParser.parseMap();
        map.fillAntiNodes();

        return map.antiNodesCount.toString();
    }

    runGold(): string {
        const mapParser = new MapParser(this._input);
        const map = mapParser.parseMap();
        map.improve = true;
        map.fillAntiNodes();

        return map.antiNodesCount.toString();
    }
}



