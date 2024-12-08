import {Field} from "./Item/Field";
import {Direction, Guard} from "./Guard";
import {Empty} from "./Item/Empty";
import {Obstacle} from "./Item/Obstacle";
import {IPosition} from "./IPosition";

export class Map {
    private readonly _matrix: Field[][];
    private _guard: Guard|null;
    private _obstacleSituations: {position: IPosition, direction: Direction}[];

    constructor(matrix: Field[][]) {
        this._matrix = matrix;
        this._obstacleSituations = [];
        this._guard = null;
    }

    get matrix(): Field[][] {
        return this._matrix;
    }

    get guard(): Guard|null {
        return this._guard;
    }

    set guard(guard: Guard|null) {
        this._guard = guard;
        this._matrix[guard.position.y][guard.position.x].markAsVisitedByGuard();
    }

    public setField(field: Field) {
        const {x, y} = field.position;
        this._matrix[y][x] = field;
    }

    public reset() {
        this._guard = null;
        this._obstacleSituations = [];
        this._matrix.forEach(row => {
            row.forEach(item => {
                item.reset();
            })
        })
    }

    public moveGuardAway(): boolean {
        if (this._guard) {
            const nextField = this._getFieldForNextGuardsMove(this._guard);
            if (!nextField) {
                return true;
            }
            switch (true) {
                case nextField instanceof Empty:
                    this._guard.moveTo(nextField.position);
                    nextField.markAsVisitedByGuard();
                    break;
                case nextField instanceof Obstacle:
                    if (this._detectLoop(nextField)) {
                        return false;
                    }
                    this._guard.changeDirection();
                    break;
            }
            return this.moveGuardAway();
        }
        return true;
    }

    private _detectLoop(nextField: Field) {
        const foundSameSituation = this._obstacleSituations.find(item => {
            return item.direction === this._guard.direction && this._locationIsSame(item.position, nextField.position);
        })
        if (foundSameSituation) {
            return true;
        }
        this._obstacleSituations.push({position: nextField.position, direction: this._guard.direction});
        return false;
    }

    private _locationIsSame(loc1: IPosition, loc2: IPosition): boolean {
        return loc1.x === loc2.x && loc1.y === loc2.y;
    }

    private _getFieldForNextGuardsMove(guard: Guard): Field|undefined {
        const position = guard.position;
        const direction = guard.direction;
        try {
            switch (direction) {
                case Direction.Up:
                    return this._matrix[position.y - 1][position.x];
                case Direction.Right:
                    return this._matrix[position.y][position.x + 1];
                case Direction.Down:
                    return this._matrix[position.y + 1][position.x];
                case Direction.Left:
                    return this._matrix[position.y][position.x - 1];
            }
        } catch (e) {
            return undefined;
        }
    }

    get visitedFieldsByGuard(): Field[] {
        let visitedFields: Field[] = [];
        this._matrix.forEach(row => {
            row.forEach(item => {
                if (item.visitedByGuard) {
                    visitedFields.push(item);
                }
            })
        })
        return visitedFields;
    }
}