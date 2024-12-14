import {Disk} from "./Disk";
import {MemoryItem} from "./memory/MemoryItem";
import {File} from "./memory/File";
import {FreeSpace} from "./memory/FreeSpace";

export class DiskParser {
    private readonly _input: string;

    constructor(input: string) {
        this._input = input;
    }

    public parse(): Disk {
        const items: MemoryItem[] = [];
        const numbers = this._input.split("").map(item => Number(item));
        let id = 0;

        numbers.forEach((item, i) => {
            if (i % 2 === 0) {
                items.push(...this._createFiles(item, id));
                id++;
            } else {
                items.push(...this._createFreeMemory(item));
            }
        });

        return new Disk(items);
    }

    private _createFiles(count: number, id: number): File[] {
        const items: File[] = [];
        for (let i = 0; i < count; i++) {
            items.push(new File(id));
        }
        return items;
    }

    private _createFreeMemory(count: number): FreeSpace[] {
        const items: FreeSpace[] = [];
        for (let i = 0; i < count; i++) {
            items.push(new FreeSpace());
        }
        return items;
    }
}