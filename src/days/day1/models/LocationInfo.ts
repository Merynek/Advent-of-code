export class LocationInfo {
    private readonly _number: number;

    constructor(id: number) {
        this._number = id;
    }

    get number(): number {
        return this._number;
    }
}