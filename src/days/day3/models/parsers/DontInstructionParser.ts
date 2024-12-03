import {DontInstruction} from "../instructions/DontInstruction";
import {IInstructionParser} from "./IInstructionParser";

export class DontInstructionParser implements IInstructionParser {
    private readonly _input: string;
    private readonly _instructionString: string;

    constructor(input: string) {
        this._input = input;
        this._instructionString = "don't()";
    }

    public getInstructions(): DontInstruction[] {
        const instructions: DontInstruction[] = [];
        let index = this._input.indexOf(this._instructionString);
        while (index > -1) {
            instructions.push(new DontInstruction(index));
            index = this._input.indexOf(this._instructionString, index + 1);
        }
        return instructions;
    }
}