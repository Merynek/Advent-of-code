import {generateVariations} from "../../../services/combinatorics";

export enum Operation {
    ADD = "ADD",
    MULTIPLY = "MULTIPLY",
    CONCATENATION = "CONCATENATION"
}

export class Calculation {
    private readonly _values: number[];
    private readonly _result: number;
    private readonly _operations: Operation[];

    constructor(values: number[], result: number, operations: Operation[]) {
        this._values = values;
        this._result = result;
        this._operations = operations;
    }

    get result(): number {
        return this._result;
    }

    public isValid(): boolean {
        let isValid = false;
        generateVariations(this._operations, this._values.length - 1, (variations) => {
            const [first, ...rest] = this._values;
            let result = first;
            rest.forEach((value, i) => {
                result = this._calculate([result, value], variations[i])
            })
            if (result === this._result) {
                isValid = true;
                return false;
            }
            return true;

        });
        return isValid;
    }

    private _calculate(values: number[], operation: Operation): number {
        switch (operation) {
            case Operation.ADD:
                return values.reduce((arr, a) => arr + a, 0);
            case Operation.MULTIPLY:
                return values.reduce((arr, a) => arr * a, 1);
            case Operation.CONCATENATION:
                return parseInt(values.join(""));
        }
    }
}