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
            
            const path = libpath.join(dir, name);
            const stat = fs.statSync(path);

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

/// the file type that is compatibale
export type FileType = 'file' | 'directory';
/// A file extension without the '.' prefix.  Example: jpg, jpeg, txt
export type FileExt = string;

class DefaultOpts implements Opts {
    public readonly recurse = true;
    public readonly types: ReadonlyArray<FileType> = ['file'];
}

export interface Opts {
    readonly recurse?: boolean;
    /// Only accept the given file types.  By default all types are accepted.
    readonly types?: ReadonlyArray<FileType>; 
    /// Only accept the given extensions. By default all extension are accepted.
    readonly extensions?: ReadonlyArray<FileExt>; 
}

export interface IFile {
    readonly name: string; 
    readonly path: PathStr; /// the entire path of the file
    readonly type: FileType; /// what type the file is
}

/// creates an empty map
let hitMap = new Map();
let opts = new DefaultOpts();
/// allows us to take user input
let rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

/**
 * asks user to see which directory to parse through
 * example: /Users/mihirmacpro13/Documents/GitHub/stale-finder-test-directory/
 */ 
rl.question('Enter the entire directory path to be parsed through: ', (currDirectory) => {
    /// Search.find returns an array with all the files in the directory
    /// iterates through each file in the directory
    var fileMap = Search.find(currDirectory, opts);
    for (var i = 0; i < fileMap.length; i++) {
        /// map of the file type, name, path 
        var file = fileMap[i];
        var initialFileName = file.name;
        var initialFilePath = file.path;

        /// checks to see if the file name is test.ts
        /// if it is then continues to the next file
        if (file.name === 'test.ts') {
            continue;
        }
        /// checks to make sure that the file type is either .ts or .tsx
        else if (initialFileName.split('.').pop() === 'ts' || initialFileName.split('.').pop() === 'tsx') {
            /// gets all the contents of the current file
            const data = fs.readFileSync(initialFilePath,'utf8');
            /// splits each line of data to allow us to parse through each one
            const lines = data.split(/\r?\n/);
            /// creates a regular expression for the import lines
            let re = /import(?:["'\s]*([\w*{}\n\r\t, ]+)from\s*)?["'\s].*([@\w_-]+)["'\s].*;$/;
            /// iterates through each line of the file
            lines.forEach((line) => {
                /// checks to see if the line matches the format of the regular expression
                let importLine = line.match(re);
                /// makes sure that the line actually has the proper format of the regEx
                if (importLine != null) {
                    /// gets the entire import lines contents
                    let importVal = importLine[0];
                    /// splits the line based off spaces and gets only the file path
                    let filePath = importVal.split(' ').pop();
                    /// converts that file path into a full file path
                    var fullPath = __dirname + filePath;
                    /// checks to see if the hitmap already has that path
                    if (hitMap.has(fullPath) === true) {
                        /// if it does then increments the value of that file by 1
                        var currVal = hitMap.get(fullPath);
                        hitMap.set(fullPath, currVal + 1);
                    }
                    /// if the hitmap does not have that path as a key already
                    else {
                        /// then sets that file path to have a value of 1
                        hitMap.set(fullPath, 1);
                    }
                }
            });
        }
    }
    /// prints out the hitmap
    console.log(hitMap);
    rl.close();
});

