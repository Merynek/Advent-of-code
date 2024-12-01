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

export function getNumbersFromLine(line: string): number[] {
    const numbers: number[] = [];
    let _currentStringNumber = "";
    line.split("").forEach(char => {
        const num = Number.parseInt(char)
        if (!isNaN(num)) {
            _currentStringNumber += char;
        } else {
            if (_currentStringNumber) {
                numbers.push(Number.parseInt(_currentStringNumber));
                _currentStringNumber = "";
            }
        }
    })
    if (_currentStringNumber) {
        numbers.push(Number.parseInt(_currentStringNumber));
    }
    return numbers;
}