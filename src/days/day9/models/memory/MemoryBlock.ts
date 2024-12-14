import {File} from "./File";

export class MemoryBlock {
    private readonly _files: File[];
    private readonly _pointer: number;

    constructor(files: File[], pointer: number) {
        this._files = files;
        this._pointer = pointer;
    }

    get files(): File[] {
        return this._files;
    }

    get pointer() {
        return this._pointer;
    }

    get size() {
        return this._files.length;
    }
}