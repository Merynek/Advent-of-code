import zip from 'lodash/zip';
import reverse from 'lodash/reverse';

export function rotateMatrix<T>(matrix: T[][]): T[][] {
    const transposed = zip(...matrix);
    return transposed.map(row => reverse(row));
}