import {Field} from "./Item/Field";
import {Map} from "./Map";
import {Direction, Guard} from "./Guard";
import {Empty} from "./Item/Empty";
import {Obstacle} from "./Item/Obstacle";
import {getInputStrings} from "../../../services/input-service";

export class MapParser {
    private readonly _input: string;

    constructor(input: string) {
        this._input = input;
    }

    public parseMap() {
        const matrix: Field[][] = [];
        let guard: Guard|undefined = undefined;
        getInputStrings(this._input).forEach((line, y) => {
            matrix[y] = [];
            line.split("").forEach((char, x) => {
                matrix[y][x] = this._createField(char, x, y);
                if (!guard) {
                    guard = this._findGuard(char, x, y)
                }
            })
        })

        const map = new Map(matrix);
        map.setGuard(guard || null);
        return map;
    }

    private _createField(char: string, x: number, y: number): Field {
        switch (char) {
            case "#":
                return new Obstacle({x, y});
            case ".":
            default:
                return new Empty({x, y});
        }
    }

    private _findGuard(char: string, x: number, y: number): Guard|undefined {
        if (char === "^") {
            return new Guard({x, y}, Direction.Up);
        }
        return undefined;
    }


}