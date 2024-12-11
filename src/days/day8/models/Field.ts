import {Antenna} from "./Antenna";
import {IPosition} from "./IPosition";

export class Field {
    private readonly _antenna: Antenna|null;
    private _antiNode: boolean;
    private readonly _position: IPosition;

    constructor(position: IPosition, antenna?: Antenna) {
        this._position = position;
        this._antenna = antenna || null;
        this._antiNode = false;
    }

    get antenna() {
        return this._antenna;
    }

    get position() {
        return this._position;
    }

    get antiNode() {
        return this._antiNode;
    }

    set antiNode(value: boolean) {
        this._antiNode = value;
    }

    public getAntiNodesPositions(field: Field, maxX: number, maxY: number, tuning: boolean): IPosition[] {
        const positions: IPosition[] = [];
        if (this.antenna && field.antenna) {
            if (this.antenna.frequency === field.antenna.frequency) {
                if (tuning) {
                    positions.push({
                        x: this._position.x,
                        y: this._position.y
                    })
                    positions.push({
                        x: field.position.x,
                        y: field.position.y
                    })
                }

                let needMore = true;
                let _loopCounter = 1;
                while (needMore) {
                    let _addedCounter = 0;
                    const xDiff = this._position.x - field.position.x
                    const yDiff = this._position.y - field.position.y;

                    const firstX = this._position.x + (xDiff * _loopCounter);
                    const firstY = this._position.y + (yDiff * _loopCounter);

                    const secondX = field.position.x + (xDiff * (-1 * _loopCounter));
                    const secondY = field.position.y + (yDiff * (-1 * _loopCounter));

                    if (firstX >= 0 && firstX <= maxX) {
                        if (firstY >= 0 && firstY <= maxY) {
                            _addedCounter++;
                            positions.push({
                                x: firstX,
                                y: firstY
                            })
                        }
                    }
                    if (secondX >= 0 && secondX <= maxX) {
                        if (secondY >= 0 && secondY <= maxY) {
                            _addedCounter++;
                            positions.push({
                                x: secondX,
                                y: secondY
                            })
                        }
                    }
                    _loopCounter++;
                    if (_addedCounter === 0 || !tuning) {
                        needMore = false;
                    }
                }
            }
        }
        return positions;
    }

}