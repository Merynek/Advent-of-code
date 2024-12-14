import {IDay} from "../../IDay";
import {Day} from "../../Day";
import {DiskParser} from "./models/DiskParser";

export class Day9 extends Day implements IDay {
    constructor() {
        super("day9");
    }

    runSilver(): string {
        const parser = new DiskParser(this._input);
        const disk = parser.parse();
        disk.fragmentation();
        return disk.fileCheckSum().toString();
    }

    runGold(): string {
        const parser = new DiskParser(this._input);
        const disk = parser.parse();
        disk.compacting();
        return disk.fileCheckSum().toString();
    }
}



