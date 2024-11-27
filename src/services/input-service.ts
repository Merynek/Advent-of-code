export function getInputNumbers(input: string): number[] {
    return input.toString()
        .trim()
        .split('\n')
        .map((num) => parseInt(num, 10));
}

export function getInputStrings(input: string): string[] {
    return input.toString()
        .trim()
        .split('\n')
        .map(str => str.replace(/(\r)/gm, ""))
}

export function getInputStringsNoTrim(input: string): string[] {
    return input.toString()
        .split('\n')
        .map(str => str.replace(/(\r)/gm, ""))
}