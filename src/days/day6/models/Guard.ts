import { IPosition } from "./IPosition";

export enum Direction {
    Up,
    Down,
    Left,
    Right
}

export class Guard {
    private _direction: Direction;
    private _position: IPosition;

    constructor(position: IPosition, direction: Direction) {
        this._position = position;
        this._direction = direction;
    }

    get position(): IPosition {
        return this._position;
    }

    get direction(): Direction {
        return this._direction;
    }

    public moveTo(position: IPosition) {
        this._position = position;
    }

    public changeDirection() {
        switch (this._direction) {
            case Direction.Up:
                this._direction = Direction.Right;
                break;
            case Direction.Right:
                this._direction = Direction.Down;
                break;
            case Direction.Down:
                this._direction = Direction.Left;
                break;
            case Direction.Left:
                this._direction = Direction.Up;
                break;
        }
    }
}