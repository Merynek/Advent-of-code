import {MapPosition} from "./MapPosition";
import uniqBy from "lodash/uniqBy";

enum Direction {
    Up,
    Down,
    Left,
    Right
}

export class TopographicMap {
    private readonly _map: MapPosition[][];
    private readonly _maxHeight: number;
    private _validPaths: MapPosition[][];

    constructor(map: MapPosition[][]) {
        this._map = map;
        this._validPaths = [];
        this._maxHeight = 9;
    }

    get score() {
        let score = 0;
        this.trailHeads.forEach(head => {
            this._findPaths([head]);
            const uniq = uniqBy(this._validPaths, path => path[path.length - 1].position.x + "," + path[path.length - 1].position.y);
            score += uniq.length;
            this._validPaths = [];
        })
        return score;
    }

    get rating() {
        let rating = 0;
        this.trailHeads.forEach(head => {
            this._findPaths([head]);
            rating += this._validPaths.length;
            this._validPaths = [];
        })
        return rating;
    }

    private _findPaths(hikingPath: MapPosition[]) {
        const currentPosition = hikingPath[hikingPath.length - 1];
        if (currentPosition) {
            const nextValidMoves = this._getNextValidMoves(currentPosition);
            nextValidMoves.forEach(nextMove => {
                const newPath = [...hikingPath, nextMove];
                if (nextMove.height === this._maxHeight) {
                    this._validPaths.push(newPath);
                } else {
                    this._findPaths(newPath);
                }
            });
        }
    }

    private _getNextValidMoves(currentPosition: MapPosition): MapPosition[] {
        const potentialMoves: MapPosition[] = [];
        const moveUp = this._getNextMove(currentPosition, Direction.Up);
        const moveDown = this._getNextMove(currentPosition, Direction.Down);
        const moveRight = this._getNextMove(currentPosition, Direction.Right);
        const moveLeft = this._getNextMove(currentPosition, Direction.Left);
        if (moveUp && (moveUp.height - 1) === currentPosition.height) {
            potentialMoves.push(moveUp);
        }
        if (moveDown && (moveDown.height - 1) === currentPosition.height) {
            potentialMoves.push(moveDown);
        }
        if (moveRight && (moveRight.height - 1) === currentPosition.height) {
            potentialMoves.push(moveRight);
        }
        if (moveLeft && (moveLeft.height - 1) === currentPosition.height) {
            potentialMoves.push(moveLeft);
        }

        return potentialMoves;
    }

    private _getNextMove(currentPosition: MapPosition, direction: Direction): MapPosition|undefined {
        const x = currentPosition.position.x;
        const y = currentPosition.position.y;

        switch (direction) {
            case Direction.Up:
                return this._map[y - 1] ? this._map[y - 1][x] : undefined;
            case Direction.Down:
                return this._map[y + 1] ? this._map[y + 1][x] : undefined;
            case Direction.Left:
                return this._map[y][x - 1];
            case Direction.Right:
                return this._map[y][x + 1];
        }
    }

    get trailHeads(): MapPosition[] {
        const positions: MapPosition[] = [];
        this._map.forEach(row => {
            positions.push(...row.filter(r => r.isTrailHead));
        });
        return positions;
    }
}