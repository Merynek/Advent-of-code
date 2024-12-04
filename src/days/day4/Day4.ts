import {IDay} from "../../IDay";
import {Day} from "../../Day";
import sum from "lodash/sum";
import {getInputStrings} from "../../services/input-service";

export class Day4 extends Day implements IDay {
    constructor() {
        super("day4");
    }

    runSilver(): string {
        const searcher = new WordSearcher(this._input, "XMAS");
        return searcher.wordsCount().toString();
    }

    runGold(): string {
        const searcher = new WordSearcher(this._input, "MAS");
        return searcher.crossWordsCount().toString();
    }
}

interface IWordPosition {
    positions: IPosition[];
}

interface IPosition {
    x: number;
    y: number;
}

export class WordSearcher {
    private readonly _matrix: string[][];
    private readonly _word: string;

    constructor(input: string, word: string) {
        this._matrix = this._createMatrix(input);
        this._word = word;
    }

    get wordLength() {
        return this._word.length;
    }

    private _createMatrix(input: string): string[][] {
        const matrix: string[][] = [];
        const lines = getInputStrings(input);
        lines.forEach(line => {
            matrix.push(line.split(""));
        })
        return matrix;
    }

    public crossWordsCount(): number {
        const positions = this._getWordsPositions();
        const _validPositions = positions.filter(p => p.positions.length);
        return _validPositions.length;
    }

    public wordsCount(): number {
        const positions = this._getWordsPositions();
        const _validPositions = positions.filter(p => p.positions.length);
        return _validPositions.length;
    }

    private _getWordsPositions(): IWordPosition[] {
        const potentialPositions = this._getPotentialPositions(this._word[0]);
        const wordPositions: IWordPosition[] = [];
        potentialPositions.forEach(pos => {
            wordPositions.push(this._detectHorizontalPositionsByDirection(pos, true));
            wordPositions.push(this._detectHorizontalPositionsByDirection(pos, false));
            wordPositions.push(this._detectVerticalPositionsByDirection(pos, true));
            wordPositions.push(this._detectVerticalPositionsByDirection(pos, false));
            wordPositions.push(...this._getDiagonalPositionsByDirection(pos, true));
            wordPositions.push(...this._getDiagonalPositionsByDirection(pos, false));
        })
        return wordPositions;
    }

    private _detectHorizontalPositionsByDirection(pos: IPosition, left: boolean): IWordPosition {
        const _positions: IPosition[] = [];
        const _word: string[] = [];
        for (let i = 0; i < this.wordLength; i++) {
            const index = pos.x + (left ? -i : i);
            if (this._matrix[pos.y][index]) {
                _positions.push({x: index, y: pos.y})
                _word.push(this._matrix[pos.y][index]);
            }
        }
        return {
            positions: _word.join("") === this._word ? _positions : []
        }
    }

    private _detectVerticalPositionsByDirection(pos: IPosition, top: boolean): IWordPosition {
        const _positions: IPosition[] = [];
        const _word: string[] = [];
        for (let i = 0; i < this.wordLength; i++) {
            const index = pos.y + (top ? -i : i);
            if (this._matrix[index]) {
                _positions.push({x: pos.x, y: index});
                _word.push(this._matrix[index][pos.x]);
            }
        }
        return {
            positions: _word.join("") === this._word ? _positions : []
        }
    }

    private _getDiagonalPositionsByDirection(pos: IPosition, top: boolean): IWordPosition[] {
        const _wordPositions: IWordPosition[] = [];
        let _positions: IPosition[] = [];
        let _word: string[] = [];
        for (let i = 0; i < this.wordLength; i++) {
            const x = pos.x + (top ? i : -i);
            const y = pos.y + (top ? -i : i);
            if (this._matrix[y] && this._matrix[y][x]) {
                _positions.push({x: x, y: y});
                _word.push(this._matrix[y][x]);
            }
        }
        if (_word.join("") === this._word) {
            _wordPositions.push({
                positions: _positions
            })
        }
        _positions = [];
        _word = [];
        for (let i = 0; i < this.wordLength; i++) {
            const x = pos.x + (top ? -i : i);
            const y = pos.y + (top ? -i : i);
            if (this._matrix[y] && this._matrix[y][x]) {
                _positions.push({x: x, y: y});
                _word.push(this._matrix[y][x]);
            }
        }
        if (_word.join("") === this._word) {
            _wordPositions.push({
                positions: _positions
            })
        }
        return _wordPositions;
    }

    private _getPotentialPositions(char: string): IPosition[] {
        const positions: IPosition[] = [];
        this._matrix.forEach((line, y) => {
            line.forEach((lineChar, x) => {
                if (lineChar === char) {
                    positions.push({ x, y });
                }
            })
        })

        return positions;
    }




}



