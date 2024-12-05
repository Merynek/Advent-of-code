export class Page {
    private readonly _number: number;

    constructor(number: number) {
        this._number = number;
    }

    get number(): number {
        return this._number;
    }
}