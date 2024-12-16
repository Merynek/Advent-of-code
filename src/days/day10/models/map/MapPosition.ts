import {IPosition} from "../IPosition";

export class MapPosition {
    private readonly _position: IPosition;
    private readonly _height: number;

    constructor(position: IPosition, height: number) {
        this._position = position;
        this._height = height;
    }

    get position(): IPosition {
        return this._position;
    }

    get height(): number {
        return this._height;
    }

    get isTrailHead(): boolean {
        return this._height === 0;
    }
}