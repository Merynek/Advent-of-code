export class Level {
    private readonly  _data: number;

    constructor(data: number) {
        this._data = data;
    }

    get data(): number {
        return this._data;
    }
}