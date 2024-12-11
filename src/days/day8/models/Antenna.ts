export class Antenna {
    private readonly _frequency: string;

    constructor(frequency: string) {
        this._frequency = frequency;
    }

    get frequency() {
        return this._frequency;
    }

}