
export const generateVariations = <T>(arr: T[], length: number, needNext?: (variations: T[]) => boolean): T[][] => {
    const result: T[][] = [];
    const indices = new Array(length).fill(0);

    while (true) {

        const variation = indices.map(i => arr[i]);
        if (needNext && !needNext(variation)) {
            break;
        }
        result.push(variation);

        let i = length  - 1;
        while (i >= 0 && indices[i] === arr.length - 1) {
            indices[i] = 0;
            i--;
        }

        if (i < 0) {
            break;
        }

        indices[i]++;
    }

    return result;
}