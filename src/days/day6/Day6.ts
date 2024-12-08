import {IDay} from "../../IDay";
import {Day} from "../../Day";
import {MapParser} from "./models/MapParser";
import {Obstacle} from "./models/Item/Obstacle";
import {Empty} from "./models/Item/Empty";
import {Direction, Guard} from "./models/Guard";

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
        const mapParser = new MapParser(this._input);
        const map = mapParser.parseMap();
        const guardPosition = map.guard.position;
        let loopCount = 0;

        map.matrix.forEach((row, y) => {
            row.forEach((field, x) => {
                if (field instanceof Empty) {
                    map.setField(new Obstacle({x, y}));
                    if (!map.moveGuardAway()) {
                        loopCount++;
                    }
                    map.reset();
                    map.setField(new Empty({x, y}));
                    map.guard = new Guard(guardPosition, Direction.Up);
                }
            })
        })

        return loopCount.toString()
    }
}



