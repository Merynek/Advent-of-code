import {TopographicMap} from "./map/TopographicMap";
import {getInputStrings} from "../../../services/input-service";
import {MapPosition} from "./map/MapPosition";

export class MapParser {
    private readonly _input: string;

    constructor(input: string) {
        this._input = input;
    }

    parse(): TopographicMap {
        const _map: MapPosition[][] = [];
        const lines = getInputStrings(this._input);
        lines.forEach((line, y) => {
            _map[y] = [];
            const numbers = line.split("").map(char => Number.parseInt(char));
            numbers.forEach((num, index) => {
                _map[y][index] = new MapPosition({
                    x: index,
                    y: y
                }, num);
            });
        });
        return new TopographicMap(_map);
    }
}