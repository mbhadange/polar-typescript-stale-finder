import ErrnoException = NodeJS.ErrnoException;
import * as libpath from "path";
import * as fs from "fs";
import {FilePaths} from "polar-shared/src/util/FilePaths";
import {PathStr} from "polar-shared/src/util/Strings";
import * as path from 'path';

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

/**
 * uses process.argv to see which directory to parse through using the command line
 * example: node Search.js /Users/mihirmacpro13/Documents/GitHub/polar-bookshelf/web/js
 */ 
var myArgs = process.argv[2];
/// Search.find returns an array with all the files in the directory
/// iterates through each file in the directory
var fileMap = Search.find(myArgs, opts);
for (var i = 0; i < fileMap.length; i++) {
    /// map of the file type, name, path 
    var file = fileMap[i];
    var initialFileName = file.name;
    var initialFilePath = file.path;
    
    /// checks to see if the file name is test.ts
    /// if it is then continues to the next file
    if (file.name === 'test.ts'  || file.name.includes('.d.ts')) {
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
                var fullPath;
                /// converts that file path into a full file path
                if (filePath != undefined) {
                    if (filePath.includes('./') || filePath.includes('../')) {
                        /// fixes the punctuation of the file path of the import
                        filePath = filePath.replace(/['"]+/g, '');
                        if (filePath.includes('.ts') == false) {
                            filePath = filePath.replace(filePath.substring(filePath.length-1), "");
                            filePath = filePath + '.ts';
                        }
                        /**
                         * creates the full path with the proper directory name 
                         * checks to make sure that the path exists
                         */
                        var fullDirectory = path.dirname(initialFilePath);
                        fullPath = path.resolve(fullDirectory, initialFileName);
                        if (fs.existsSync(fullPath) == false) {
                            console.warn("File does not exist: " + fullPath);
                        }
                    }
                }

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

/**
 * Sorts the map in order based on the values 
 */
hitMap[Symbol.iterator] = function* () {
    yield* [...this.entries()].sort((a, b) => a[1] - b[1]);
}

/// makes the map into a table type format with a nested array
var updatedHitMap = [...hitMap];

/**
 * swaps the key and the value of the map, so the key is the number of hits and the value is the full file path
 */
var finalHitMap = [];
for (var index = 0; index < updatedHitMap.length; index++) {
    var currentArray = updatedHitMap[index];
    var key = currentArray[0];
    var value = currentArray[1];
    finalHitMap[index] = [value, key];
}
/// prints out the hitMap
console.log(finalHitMap); 
