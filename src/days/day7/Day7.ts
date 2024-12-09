import {IDay} from "../../IDay";
import {Day} from "../../Day";
import {getInputStrings} from "../../services/input-service";
import {Calculation, Operation} from "./models/Calculation";

export class Day7 extends Day implements IDay {
    constructor() {
        super("day7");
    }

    private _createCalculations(operations: Operation[] = []): Calculation[] {
        const calculations: Calculation[] = [];
        getInputStrings(this._input).forEach((line) => {
            const parsed = line.split(":");
            const result = parseInt(parsed[0]);
            const values = parsed[1].trim().split(" ").map(v => parseInt(v));
            calculations.push(new Calculation(values, result, operations));
        })
        return calculations;
    }

    private _computeCalibrationResult(operations: Operation[] = []) {
        let calibrationResult = 0;
        const calculations = this._createCalculations(operations);

        calculations.forEach(calculation => {
            if (calculation.isValid()) {
                calibrationResult += calculation.result
            }
        })
        return calibrationResult.toString();
    }

    runSilver(): string {
        return this._computeCalibrationResult([Operation.ADD, Operation.MULTIPLY]);
    }

    runGold(): string {
        return this._computeCalibrationResult([Operation.ADD, Operation.MULTIPLY, Operation.CONCATENATION]);
    }
}



