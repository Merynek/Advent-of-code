import {MemoryItem} from "./MemoryItem";
import {IMemoryItem} from "./IMemoryItem";

export class File extends MemoryItem implements IMemoryItem {
    private readonly _id: number;

    constructor(id: number) {
        super();
        this._id = id;
    }

    get id(): number {
        return this._id;
    }

    public toString(): string {
        return this._id.toString();
    }
}