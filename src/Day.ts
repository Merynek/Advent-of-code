import {readFileSync} from "fs";

export abstract class Day {
    private readonly _dayFolder: string;
    protected _input: string;

    protected constructor(dayFolder: string) {
        this._dayFolder = dayFolder;
        this._input = this._loadInput();
    }

    private _loadInput() {
        return readFileSync(`src/days/${this._dayFolder}/input.txt`, 'utf-8');
    }
}