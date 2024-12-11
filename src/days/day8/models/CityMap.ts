import {Field} from "./Field";
import {IPosition} from "./IPosition";

export class CityMap {
    private readonly _matrix: Field[][];
    private _improve: boolean;

    constructor(matrix: Field[][]) {
        this._matrix = matrix;
        this._improve = false;
    }

    set improve(improve: boolean) {
        this._improve = improve;
    }

    public fillAntiNodes() {
        this.antiNodesPositions.forEach(position => {
            const field = this._matrix[position.y][position.x];
            field.antiNode = true;
        })
    }

    get antiNodesCount() {
        let count = 0;
        this._matrix.forEach(row => {
            row.forEach(field => {
                if (field.antiNode) {
                    count++;
                }
            })
        })
        return count;
    }

    get antiNodesPositions(): IPosition[] {
        const positions: IPosition[] = [];
        const _pairs:[Field, Field][] = [];
        this.antennasMap.forEach((fields) => {
            _pairs.push(...this._createPairs(fields));
        })
        _pairs.forEach(pair => {
            const potentialPositions = pair[0].getAntiNodesPositions(pair[1], this._matrix[0].length -1, this._matrix.length -1, this._improve);
            potentialPositions.forEach(position => {
                if (position.x >= 0 && position.x < this._matrix.length && position.y >= 0 && position.y < this._matrix[0].length) {
                    positions.push(position);
                }
            })
        })
        return positions;
    }

    get antennasMap() {
        const fieldsPerAntenna = new Map<string, Field[]>();
        this._matrix.forEach(row => {
            row.forEach(field => {
                if (field.antenna) {
                    const frequency = field.antenna.frequency;
                    if (fieldsPerAntenna.has(frequency)) {
                        fieldsPerAntenna.get(frequency).push(field);
                    } else {
                        fieldsPerAntenna.set(frequency, [field]);
                    }
                }
            })
        })
        return fieldsPerAntenna;
    }

    private _createPairs(fields: Field[]): [Field, Field][] {
        const pairs: [Field, Field][] = [];

        for (let i = 0; i < fields.length - 1; i++) {
            for (let j = i + 1; j < fields.length; j++) {
                pairs.push([fields[i], fields[j]]);
            }
        }

        return pairs;
    }

}