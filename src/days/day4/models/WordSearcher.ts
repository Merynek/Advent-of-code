import {getInputStrings} from "../../../services/input-service";
import {rotateMatrix} from "../../../services/matrix-service";
import {IWord} from "./IWord";
import {IPosition} from "./IPosition";

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

    get wordsCount(): number {
        const matrix = this._matrix;
        const rotatedMatrix = rotateMatrix(this._matrix);

        const horizontalLines = this._getLinesFromMatrix(matrix);
        const verticalLines = this._getLinesFromMatrix(rotatedMatrix);

        const horizontalWords = this._getStraightWordPositions(horizontalLines);
        const verticalWords = this._getStraightWordPositions(verticalLines);
        const diagonalWords = this._getDiagonalWordPositions();

        const _validPositions = [...horizontalWords, ...verticalWords, ...diagonalWords].filter(p => p.positions.length);
        return _validPositions.length;
    }

    public crossWordsCountByChar(char: string): number {
        const diagonalWords = this._getDiagonalWordPositions();
        const centerPositions: IPosition[] = [];
        diagonalWords.forEach(word => {
            word.positions.filter(p => p.char === char).forEach(p => centerPositions.push(p));
        });
        const samePositions: IPosition[] = [];
        for (let i = 0; i < centerPositions.length; i++) {
            for (let j = i + 1; j < centerPositions.length; j++) {
                if (centerPositions[i].x === centerPositions[j].x && centerPositions[i].y === centerPositions[j].y) {
                    samePositions.push(centerPositions[i]);
                }
            }
        }

        return samePositions.length
    }

    private _createMatrix(input: string): string[][] {
        const matrix: string[][] = [];
        const lines = getInputStrings(input);
        lines.forEach(line => {
            matrix.push(line.split(""));
        })
        return matrix;
    }

    private _getLinesFromMatrix(matrix: string[][]): string[] {
        let lines: string[] = [];
        matrix.forEach(line => {
            lines.push(line.join(""));
        })
        return lines;
    }

    private _getDiagonalWordPositions(): IWord[] {
        const potentialPositions = this._getPotentialPositions(this._word[0]);
        const wordPositions: IWord[] = [];
        potentialPositions.forEach(pos => {
            wordPositions.push(...this._getDiagonalPositionsByDirection(pos, true));
            wordPositions.push(...this._getDiagonalPositionsByDirection(pos, false));
        })
        return wordPositions;
    }

    private _getStraightWordPositions(lines: string[]): IWord[] {
        const words: IWord[] = [];
        lines.forEach((line, y) => {
            words.push(...this._getWordPositionFromLine(line, y));
            words.push(...this._getWordPositionFromLine(line.split("").reverse().join(""), y));
        })
        return words;
    }

    private _getWordPositionFromLine(line: string, y: number): IWord[] {
        const words: IWord[] = [];
        let index = line.indexOf(this._word);
        while (index > -1) {
            const positions: IPosition[] = [];
            for (let i = 0; i < this.wordLength; i++) {
                positions.push({ x: index + i, y: y, char: line[index + i] });
            }
            words.push({
                text: this._word,
                positions: positions
            })
            index = line.indexOf(this._word, index + 1);
        }
        return words;
    }

    private _getDiagonalPositionsByDirection(pos: IPosition, top: boolean): IWord[] {
        const _words: IWord[] = [];
        let _positions: IPosition[] = [];
        let _word: string[] = [];
        const reset = () => {
            _positions = [];
            _word = [];
        }
        const addWord = () => {
            if (_word.join("") === this._word) {
                _words.push({
                    text: this._word,
                    positions: _positions
                })
            }
        }
        for (let i = 0; i < this.wordLength; i++) {
            const x = pos.x + (top ? i : -i);
            const y = pos.y + (top ? -i : i);
            if (this._matrix[y] && this._matrix[y][x]) {
                _positions.push({x: x, y: y, char: this._matrix[y][x]});
                _word.push(this._matrix[y][x]);
            }
        }
        addWord();
        reset();
        for (let i = 0; i < this.wordLength; i++) {
            const x = pos.x + (top ? -i : i);
            const y = pos.y + (top ? -i : i);
            if (this._matrix[y] && this._matrix[y][x]) {
                _positions.push({x: x, y: y, char: this._matrix[y][x]});
                _word.push(this._matrix[y][x]);
            }
        }
        addWord();
        return _words;
    }

    private _getPotentialPositions(char: string): IPosition[] {
        const positions: IPosition[] = [];
        this._matrix.forEach((line, y) => {
            line.forEach((lineChar, x) => {
                if (lineChar === char) {
                    positions.push({ x, y: y, char: this._matrix[y][x]});
                }
            })
        })

        return positions;
    }

}