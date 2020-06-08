import { IFile } from "./find";
export declare class Stale {
    static getExtension(filename: string): string | undefined;
}
export declare function initializeTypescriptMapFiles(data: ReadonlyArray<IFile>, currMap: Map<string, number>): void;
export declare function updateHitMap(currFullPath: string, currMap: Map<string, number>): void;
export declare function checkFullPath(finalPath: string): string;
export declare function expandPath(currPath: string): string;
export declare function sortMap(currMap: Map<string, number>): Map<string, number>;
export declare function swapMapValues(currMap: any[][]): any[][];
export declare function printMap(finalMap: any[][]): void;
export declare function main(): void;
