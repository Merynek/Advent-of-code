import {IDay} from "../../IDay";
import {Day} from "../../Day";
import sum from "lodash/sum";
import {MulInstructionParser} from "./models/parsers/MulInstructionParser";
import {ComputeProgram} from "./models/ComputeProgram";

export class Day3 extends Day implements IDay {
    constructor() {
        super("day3");
    }

    runSilver(): string {
        const parser = new MulInstructionParser(this._input);
        const instructions = parser.getInstructions();
        const results = instructions.map(i => i.compute());
        return sum(results).toString();
    }

    runGold(): string {
        const program = new ComputeProgram(this._input);
        return program.run().toString();
    }
}



