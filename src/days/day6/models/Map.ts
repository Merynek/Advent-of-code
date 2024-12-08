import {Field} from "./Item/Field";
import {Direction, Guard} from "./Guard";
import {Empty} from "./Item/Empty";
import {Obstacle} from "./Item/Obstacle";

export class Map {
    private readonly _matrix: Field[][];
    private _guard: Guard|null;

    constructor(matrix: Field[][]) {
        this._matrix = matrix;
        this._guard = null;
    }

    public setGuard(guard: Guard|null) {
        this._guard = guard;
        this._matrix[guard.position.y][guard.position.x].markAsVisitedByGuard();
    }

    public moveGuardAway() {
        if (this._guard) {
            const nextMoveField = this._getFieldForNextGuardsMove(this._guard);
            if (!nextMoveField) {
                return;
            }
            switch (true) {
                case nextMoveField instanceof Empty:
                    this._guard.position.x = nextMoveField.position.x;
                    this._guard.position.y = nextMoveField.position.y;
                    nextMoveField.markAsVisitedByGuard();
                    break;
                case nextMoveField instanceof Obstacle:
                    this._guard.changeDirection();
                    break;
            }
            this.moveGuardAway();
        }
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