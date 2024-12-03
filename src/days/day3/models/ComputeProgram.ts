import {MulInstructionParser} from "./parsers/MulInstructionParser";
import {DoInstructionParser} from "./parsers/DoInstructionParser";
import {DontInstructionParser} from "./parsers/DontInstructionParser";
import {Instruction} from "./instructions/Instruction";
import sortBy from "lodash/sortBy";
import {MulInstruction} from "./instructions/MulInstruction";
import {DoInstruction} from "./instructions/DoInstruction";
import {DontInstruction} from "./instructions/DontInstruction";
import sum from "lodash/sum";

export class ComputeProgram {
    private readonly _input: string;

    constructor(input: string) {
        this._input = input;
    }

    public run(): number {
        const mulInstructions = new MulInstructionParser(this._input).getInstructions();
        const doInstructions = new DoInstructionParser(this._input).getInstructions();
        const dontInstructions = new DontInstructionParser(this._input).getInstructions();
        const sortedInstructions = sortBy([...mulInstructions, ...doInstructions, ...dontInstructions], i => i.lastIndexInInput);

        return this._runComputing(sortedInstructions);
    }

    private _runComputing(instructions: Instruction[]) {
        const instructionsToExecute: MulInstruction[] = [];
        let canComputing = true;

        instructions.forEach(instruction => {
            switch (true) {
                case instruction instanceof MulInstruction:
                    if (canComputing) {
                        instructionsToExecute.push(instruction);
                    }
                    break;
                case instruction instanceof DoInstruction:
                    canComputing = true;
                    break;
                case instruction instanceof DontInstruction:
                    canComputing = false;
                    break;
            }
        })
        return sum(instructionsToExecute.map(i => i.compute()));
    }
}