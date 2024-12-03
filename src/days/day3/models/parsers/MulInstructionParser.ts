import {MulInstruction} from "../instructions/MulInstruction";
import {IInstructionParser} from "./IInstructionParser";

export class MulInstructionParser implements IInstructionParser {
    private readonly _input: string;
    private readonly _instructionPrefix: string;

    constructor(input: string) {
        this._input = input;
        this._instructionPrefix = "mul(";
    }

    public getInstructions(): MulInstruction[] {
        const instructions: MulInstruction[] = [];
        const potentialIndexes = this._getPotentialInstructionsIndexes();
        potentialIndexes.forEach(index => {
            const parsed = this._tryParseMulInstruction(index + this._instructionPrefix.length);
            if (parsed) {
                instructions.push(parsed);
            }
        });
        return instructions;
    }

    private _getPotentialInstructionsIndexes(): number[] {
        const indexes: number[] = [];
        let index = this._input.indexOf(this._instructionPrefix);
        while (index > -1) {
            indexes.push(index);
            index = this._input.indexOf(this._instructionPrefix, index + 1);
        }
        return indexes;
    }

    private _tryParseMulInstruction(index: number): MulInstruction|null {
        const firstArgument = this._parseNumber(index);
        if (firstArgument.number) {
            const _divider = this._parseParamsDivider(firstArgument.lastIndex);
            if (_divider.char) {
                const secondArgument = this._parseNumber(_divider.lastIndex);
                if (secondArgument.number) {
                    const closeInstruction = this._parseCloseInstruction(secondArgument.lastIndex);
                    if (closeInstruction.char) {
                        return new MulInstruction(firstArgument.number, secondArgument.number, closeInstruction.lastIndex)
                    }
                }
            }
        }
        return null;
    }

    private _isNumber(char: string) {
        return !isNaN(Number(char));
    }

    private _numberIsValid(number: string): boolean {
        if (isNaN(Number(number))) {
            return false;
        }
        return number.length >= 1 && number.length <= 3;
    }

    private _parseCloseInstruction(index: number): {char: string|null, lastIndex: number} {
        const char = this._input[index];
        if (char === ")") {
            return {
                char: char,
                lastIndex: index + 1
            }
        }
        return {char: null, lastIndex: index};
    }

    private _parseParamsDivider(index: number): {char: string|null, lastIndex: number} {
        const char = this._input[index];
        if (char === ",") {
            return {
                char: char,
                lastIndex: index + 1
            }
        }
        return {char: null, lastIndex: index};
    }

    private _parseNumber(index: number): {number: number|null, lastIndex: number} {
        let currentSegment: string = "";
        for(let i = index; i < this._input.length; i++) {
            const char = this._input[i];
            if (this._isNumber(char)) {
                currentSegment += char;
            } else {
                return {
                    number: this._numberIsValid(currentSegment) ? Number(currentSegment) : null,
                    lastIndex: i
                }
            }
        }
        return {number: null, lastIndex: index};
    }
}
