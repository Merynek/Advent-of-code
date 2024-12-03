import {IDay} from "../../IDay";
import {getInputStrings, getNumbersFromLine} from "../../services/input-service";
import {Day} from "../../Day";
import {Level} from "./models/Level";
import {Report} from "./models/Report";

export class Day2 extends Day implements IDay {
    constructor() {
        super("day2");
    }

    private _createReports(lines: string[]): Report[] {
        const reports: Report[] = [];

        lines.forEach(line => {
            const report = new Report([]);
            const numbers = getNumbersFromLine(line);
            numbers.forEach(number => {
                report.levels.push(new Level(number));
            })
            reports.push(report);
        })
        return reports;
    }

    runSilver(): string {
        const lines =  getInputStrings(this._input);
        const reports = this._createReports(lines);
        const safeReports = reports.filter(report => report.isSafe(0));

        return safeReports.length.toString();
    }

    runGold(): string {
        const lines =  getInputStrings(this._input);
        const reports = this._createReports(lines);
        const safeReports = reports.filter(report => report.isSafe(1));

        return safeReports.length.toString();
    }
}


