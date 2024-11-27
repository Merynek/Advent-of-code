import {readFileSync} from "fs";

export abstract class Day {
    private readonly _dayFolder: string;

    protected constructor(dayFolder: string) {
        this._dayFolder = dayFolder;
    }

    protected loadSilverInput(): string {
        return this._loadInput(`src/days/${this._dayFolder}/input_silver.txt`)
    }

    protected loadGoldInput(): string {
        return this._loadInput(`src/days/${this._dayFolder}/input_gold.txt`)
    }

    private _loadInput(path: string) {
        return readFileSync(path, 'utf-8');
    }
}