import {readFileSync} from "fs";

export abstract class Day {
    private readonly _dayFolder: string;

    protected constructor(dayFolder: string) {
        this._dayFolder = dayFolder;
    }

    public loadSilverInput(): string {
        return this._loadInput(`src/days/${this._dayFolder}/input_silver.txt`)
    }

    public loadGoldInput(): string {
        return this._loadInput(`src/days/${this._dayFolder}/input_gold.txt`)
    }

    private _loadInput(path: string) {
        return readFileSync(path, 'utf-8');
    }
}