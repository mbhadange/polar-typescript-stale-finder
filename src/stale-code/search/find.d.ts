import { PathStr } from "polar-shared/src/util/Strings";
export declare class Search {
    static findFilesRecursively(dir: string, opts?: Opts): ReadonlyArray<IFile>;
}
export declare type FileType = 'file' | 'directory';
export declare type FileExt = string;
export declare class DefaultOpts implements Opts {
    readonly recurse = true;
    readonly types: ReadonlyArray<FileType>;
}
export interface Opts {
    readonly recurse?: boolean;
    readonly types?: ReadonlyArray<FileType>;
    readonly extensions?: ReadonlyArray<FileExt>;
}
export interface IFile {
    readonly name: string;
    readonly path: PathStr;
    readonly type: FileType;
}
export declare class Stale {
    static getExtension(filename: string): string | undefined;
    static initializeTypescriptMapFiles(data: ReadonlyArray<IFile>, currMap: Map<string, number>): Map<string, number>;
    static updateHitMap(currFullPath: string, currMap: Map<string, number>): void;
    static checkFullPath(finalPath: string): string;
    static expandPath(currPath: string): string;
    static sortMap(currMap: Map<string, number>): Map<string, number>;
    static swapMapValues(currMap: any[][]): any[][];
    static printMap(finalMap: any[][]): void;
}
