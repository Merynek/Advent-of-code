import {Instruction} from "./Instruction";

export class MulInstruction extends Instruction {
    private readonly _x: number;
    private readonly _y: number;

    constructor(x: number, y: number, lastIndex: number) {
        super(lastIndex);
        this._x = x;
        this._y = y;
    }

    public compute(): number {
        return this._x * this._y;
    }
}