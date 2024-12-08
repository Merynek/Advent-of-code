import {IPosition} from "../IPosition";

export abstract class Field {
    private _position: IPosition;
    private _visitedByGuard: boolean;

    constructor(position: IPosition) {
        this._position = position
        this._visitedByGuard = false;
    }

    get position(): IPosition {
        return this._position;
    }

    get visitedByGuard(): boolean {
        return this._visitedByGuard;
    }

    public markAsVisitedByGuard() {
        this._visitedByGuard = true;
    }
}