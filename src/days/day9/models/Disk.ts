import {MemoryItem} from "./memory/MemoryItem";
import {File} from "./memory/File";
import {FreeSpace} from "./memory/FreeSpace";
import {MemoryBlock} from "./memory/MemoryBlock";

export class Disk {
    private readonly _memoryItems: MemoryItem[];
    private readonly _filesCount: number;
    private readonly _freeSpacesCount: number;

    constructor(memoryItems: MemoryItem[]) {
        this._memoryItems = memoryItems;
        this._filesCount = this._memoryItems.filter(item => item instanceof File).length;
        this._freeSpacesCount = this._memoryItems.filter(item => item instanceof FreeSpace).length;
    }

    public fileCheckSum() {
        let result = 0;
        this._memoryItems.forEach((item, i) => {
            if (item instanceof File) {
                result += i * item.id;
            }
        });
        return result;

    }

    public fragmentation() {
        let lastFreeSpace = 0;
        const length = this._memoryItems.length;
        for (let i = length - 1; i >= 0; i--) {
            const item = this._memoryItems[i];
            if (!this._isFragmented()) {
                if (item instanceof File) {
                    for (let j = lastFreeSpace; j < length - (length - i); j++) {
                        const item2 = this._memoryItems[j];
                        if (item2 instanceof FreeSpace) {
                            this._memoryItems[i] = item2
                            this._memoryItems[j] = item;
                            lastFreeSpace = j;
                            break;
                        }
                    }
                }
            }
        }
    }

    public compacting() {
        const blocks = this.memoryBlocks;
        blocks.reverse().forEach(block => {
            const newPointer = this._findNewPointerForBlock(block);
            if (newPointer > -1) {
                block.files.forEach((file, i) => {
                    this._memoryItems[block.pointer + i] = new FreeSpace();
                    this._memoryItems[newPointer + i] = file;
                });
            }
        })
    }

    get memoryBlocks(): MemoryBlock[] {
        const blocks: MemoryBlock[] = [];
        let currentBlock = new MemoryBlock([], 0);
        for (let i = 0; i < this._memoryItems.length; i++) {
            const item = this._memoryItems[i];
            if (item instanceof File) {
                const lastFile = currentBlock.files[currentBlock.files.length - 1];
                if (lastFile && lastFile.id === item.id) {
                    currentBlock.files.push(item);
                } else {
                    currentBlock = new MemoryBlock([item], i);
                    blocks.push(currentBlock);
                }
            }
        }
        return blocks;
    }

    private _findNewPointerForBlock(block: MemoryBlock): number {
        let currentFreeSpace = 0;
        for (let i = 0; i < block.pointer; i++) {
            const item = this._memoryItems[i];
            if (item instanceof FreeSpace) {
                currentFreeSpace++;
                if (currentFreeSpace === block.size) {
                    return i - (currentFreeSpace - 1);
                }
            } else {
                currentFreeSpace = 0;
            }
        }
        return -1;
    }

    private _isFragmented(): boolean {
        return this._memoryItems.slice(this._filesCount -1, this._memoryItems.length).length === this._freeSpacesCount;
    }

    private _print() {
        let result = "";
        this._memoryItems.forEach(item => result += item.toString());
        console.log(result);
    }
}