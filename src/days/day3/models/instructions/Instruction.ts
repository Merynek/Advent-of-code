export abstract class Instruction {
    private readonly _lastIndexInInput: number;

    constructor(lastIndex: number) {
        this._lastIndexInInput = lastIndex;
    }

    get lastIndexInInput(): number {
        return this._lastIndexInInput;
    }
}
