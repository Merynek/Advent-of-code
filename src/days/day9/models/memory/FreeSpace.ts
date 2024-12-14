import {MemoryItem} from "./MemoryItem";
import {IMemoryItem} from "./IMemoryItem";

export class FreeSpace extends MemoryItem implements IMemoryItem {
    public toString(): string {
        return ".";
    }
}