import {Level} from "./Level";

export class Report {
    private readonly _levels: Level[];

    constructor(levels: Level[]) {
        this._levels = levels;
    }

    get levels(): Level[] {
        return this._levels;
    }

    private _increasing(levels: Level[]) {
        return levels.every((lvl, i, arr) => i === 0 || lvl.data >= arr[i - 1].data);
    }

    private _decreasing(levels: Level[]) {
        return levels.every((lvl, i, arr) => i === 0 || lvl.data <= arr[i - 1].data);
    }

    private _differences(levels: Level[]) {
        return levels.slice(1).map((lvl, i) => this._computeDifference(lvl, levels[i]));
    }

    private _computeDifference(lvl1: Level, lvl2: Level) {
        return Math.abs(lvl1.data - lvl2.data);
    }

    private _removeLevelOnIndex(levels: Level[], index: number, tolerate: number) {
        const part1 = levels.slice(0, index);
        const part2 = levels.slice(index + tolerate);
        return part1.concat(part2);
    }

    private _levelsAreSafe(levels: Level[]) {
        if (!this._increasing(levels) && !this._decreasing(levels)) {
            return false;
        }
        const differences = this._differences(levels);
        const minDiff = Math.min(...differences);
        if (minDiff < 1) {
            return false;
        }
        const maxDiff = Math.max(...differences);
        return maxDiff <= 3;
    }

    public isSafe(tolerate = 0): boolean {
        const _safe = this._levelsAreSafe(this._levels);
        if (!_safe && tolerate > 0) {
            for (let i = 0; i < this._levels.length; i++) {
                const reducedLevels = this._removeLevelOnIndex(this._levels, i, tolerate);
                if (this._levelsAreSafe(reducedLevels)) {
                    return true;
                }
            }
        }
        return _safe;
    }
}