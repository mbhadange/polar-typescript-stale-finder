import {
    ISODateString,
    ISODateTimeString,
    ISODateYearMonthString,
    ISODateYearString,
} from "polar-shared/src/metadata/ISODateTimeStrings";
import {DOIStr} from "polar-shared/src/util/Strings";

import ErrnoException = NodeJS.ErrnoException;
import * as libpath from "path";
import * as fs from "fs";
import {FilePaths} from "polar-shared/src/util/FilePaths";
import {PathStr} from "polar-shared/src/util/Strings";
import * as readline from 'readline';

export class Search {
    public static find(dir: string, opts: Opts = new DefaultOpts()): ReadonlyArray<IFile> {
        const files = fs.readdirSync(dir);

        const result: IFile[] = [];

        for (const name of files) {

            const createType = (): FileType | undefined => {
                if (stat.isDirectory()) {
                    return 'directory';
                }

                if (stat.isFile()) {
                    return 'file';
                }
                return undefined;
            };
            const type = createType();
            if (! type) {
                continue;
            }
            const createRecord = (): IFile => {
                return {type, name, path};
            };

            const file = createRecord();
            const path = libpath.join(dir, name);
            const stat = fs.statSync(path);

            /**
             * Return true if we should accept the file.
             */
            const acceptFile = () => {
                const acceptExtension = () => {
                    if (! opts.extensions) {
                        return true;
                    }
                    const ext = FilePaths.toExtension(path).getOrUndefined();
                    return ext && opts.extensions.includes(ext);
                };
                const acceptType = () => {
                    if (! opts.types) {
                        return true;
                    }
                    return opts.types.includes(type);
                };
                return acceptExtension() && acceptType();
            };
            if (acceptFile()) {
                result.push(file);
            }
            if (opts.recurse && type === 'directory') {
                result.push(...this.find(path, opts));
            }
        }
        return result;
    }
}

// the file type that is compatibale
export type FileType = 'file' | 'directory';
// A file extension without the '.' prefix.  Example: jpg, jpeg, txt
export type FileExt = string;

class DefaultOpts implements Opts {
    public readonly recurse = true;
    public readonly types: ReadonlyArray<FileType> = ['file'];
}

export interface Opts {
    readonly recurse?: boolean;
    // Only accept the given file types.  By default all types are accepted.
    readonly types?: ReadonlyArray<FileType>; 
    // Only accept the given extensions. By default all extension are accepted.
    readonly extensions?: ReadonlyArray<FileExt>; 
}

export interface IFile {
    readonly name: string; 
    readonly path: PathStr; // the entire path of the file
    readonly type: FileType; // what type the file is
}

let hitMap = new Map();
let opts = new DefaultOpts();
var file_array: IFile[] = [];
let rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
  
rl.question('Enter the directory to be parsed through: ', (currDirectory) => {
    currDirectory.toLowerCase();
    for (var file in Search.find(currDirectory, opts)) {
        if (file.split('.').pop() === 'ts' || file.split('.').pop() === 'tsx') {
            hitMap.set(file,0);
        }
    }
    rl.close();
});


  