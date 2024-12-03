import {Instruction} from "../instructions/Instruction";

export interface IInstructionParser {
    getInstructions(): Instruction[];
}

