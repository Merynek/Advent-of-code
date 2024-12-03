import {DoInstruction} from "../instructions/DoInstruction";
import {IInstructionParser} from "./IInstructionParser";

export class DoInstructionParser implements IInstructionParser {
    private readonly _input: string;
    private readonly _instructionString: string;

    constructor(input: string) {
        this._input = input;
        this._instructionString = "do()";
    }

    public getInstructions(): DoInstruction[] {
        const instructions: DoInstruction[] = [];
        let index = this._input.indexOf(this._instructionString);
        while (index > -1) {
            instructions.push(new DoInstruction(index));
            index = this._input.indexOf(this._instructionString, index + 1);
        }
        return instructions;
    }
}