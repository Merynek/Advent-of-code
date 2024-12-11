import {Field} from "./Field";
import {getInputStrings} from "../../../services/input-service";
import {CityMap} from "./CityMap";
import {Antenna} from "./Antenna";

export class MapParser {
    private readonly _input: string;

    constructor(input: string) {
        this._input = input;
    }

    public parseMap() {
        const matrix: Field[][] = [];
        getInputStrings(this._input).forEach((line, y) => {
            matrix[y] = [];
            line.split("").forEach((char, x) => {
                matrix[y][x] = this._createField(char, x, y);
            })
        })
        return new CityMap(matrix)
    }

    private _createField(char: string, x: number, y: number): Field {
        switch (char) {
            case ".":
                return new Field({x, y});
            default:
                const antenna = new Antenna(char);
                return new Field({x, y}, antenna);
            case "#":
        }
    }
}