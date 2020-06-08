import ErrnoException = NodeJS.ErrnoException;
import * as fs from "fs";
import * as path from 'path';
import {Search, IFile} from "./find";
import {DefaultOpts} from "./find";

export class Stale {
    /**
     * gets the extension of the filename
     * @param filename 
     */
    public static getExtension (filename : string) : string | undefined {
        var extension = filename.split('.').pop();
        return extension;
    }
}
/**
 * iterates through each file in the directory and adds to the map
 * @param data 
 * @param currMap 
 */
export function initializeTypescriptMapFiles (data : ReadonlyArray<IFile>, currMap : Map<string,number>) {
    for (var k = 0; k < data.length; k++) {
        if (currMap.has(data[k].path) == false) {
            if (data[k].name.includes('test.ts')  || data[k].name.includes('.d.ts')) {
                continue;
            }
            /// checks to make sure that the file type is either .ts or .tsx
            else if (data[k].name.split('.').pop() === 'ts' || data[k].name.split('.').pop() === 'tsx') {
                /// initializes hitMap
                currMap.set(data[k].path, 0);
            }
        } 
    }
}

/**
 * updates the value of the file in the hitMap
 * @param currFullPath 
 * @param currMap 
 */
export function updateHitMap (currFullPath : string, currMap : Map<string,number>) {
    if (currFullPath != undefined) {
        /// checks to see if the hitmap already has that path
        if (currMap.has(currFullPath) === true) {
            /// if it does then increments the value of that file by 1
            var currVal = currMap.get(currFullPath);
            if (currVal != undefined) {
                currMap.set(currFullPath, currVal + 1);
            }
        }
        /// if the hitmap does not have that path as a key already
        else {
            /// then sets that file path to have a value of 1
            currMap.set(currFullPath, 1);
        }
    }
}

/**
 * checks to make sure that the path exists                         
 * @param finalPath 
 */
export function checkFullPath (finalPath : string) : string {
    if (fs.existsSync(finalPath) == false) {
        finalPath = finalPath + 'x';
        if (fs.existsSync(finalPath) == false) {
            finalPath = finalPath.replace(finalPath.substring(finalPath.length-3), "");
            finalPath = finalPath + 'd.ts';
            if (finalPath.includes('utils.js.d.ts')) {
                finalPath = finalPath.replace(finalPath.substring(finalPath.length-7), "");
                finalPath = finalPath + 'ts';
            }
            if (fs.existsSync(finalPath) == false) {
                console.warn("File does not exist: " + finalPath);
            }
        }
    }
    return finalPath;
}

/**
 * converts that file path into a full file path
 * @param currPath 
 */
export function expandPath (currPath : string) : string {
    /// fixes the punctuation of the file path of the import
    currPath = currPath.replace(/['"]+/g, '');
    if (currPath.includes('.ts') == false) {
        currPath = currPath.replace(currPath.substring(currPath.length-1), "");
        currPath = currPath + '.ts';
    }
    return currPath;
}

/**
 * Sorts the map in order based on the hit values 
 * @param currMap 
 */
export function sortMap(currMap : Map<string,number>) : Map<string,number> {
    currMap[Symbol.iterator] = function* () {
        yield* [...this.entries()].sort((a, b) => a[1] - b[1]);
    }
    return currMap;
}

/**
 * swaps the key and the value of the map, so the number of hits is formatted to the left of the full file path
 * @param currMap 
 */
export function swapMapValues(currMap : any[][]) : any[][] {
    var finalHitMap = [];
    for (var index = 0; index < currMap.length; index++) {
        var currentArray = currMap[index];
        var key = currentArray[0];
        var value = currentArray[1];
        finalHitMap[index] = [value, key];
    }
    return finalHitMap;
}

/**
 * prints out the final Map
 * @param finalMap 
 */
export function printMap(finalMap : any[][]) {
    for (var j = 0; j < finalMap.length; j++) {
        var curr = finalMap[j];
        if (curr[1].includes('Test') == false && curr[1].includes('test') == false) {
            console.log(curr[0], ' ', curr[1]);
        }
    }
}



export function main() {
    /// uses process.argv to see take in any number of directories in the command line
    /// example: node Search.js /Users/mihirmacpro13/Documents/GitHub/polar-bookshelf/web/js /Users/mihirmacpro13/Documents/GitHub/polar-bookshelf/apps
    var argument = process.argv;
    /// creates an empty map
    var hitMap = new Map();
    for (var x = 2; x < argument.length; x++) {
        const opts = new DefaultOpts();
        var myArgs = argument[x];
        /// returns an array with all the files in the directory
        var fileMap = Search.findFilesRecursively(myArgs, opts);
        /// iterates through each file in the directory and adds to the map
        initializeTypescriptMapFiles(fileMap, hitMap);

        for (var i = 0; i < fileMap.length; i++) {
            /// map of the file type, name, path 
            var file = fileMap[i];
            var initialFileName = file.name;
            var initialFilePath = file.path;
            var ext = Stale.getExtension(initialFileName);

            /// checks to see if the file name is test.ts
            /// if it is then continues to the next file
            if (file.name.includes('test.ts')  || file.name.includes('.d.ts')) {
                continue;
            }
            /// checks to make sure that the file type is either .ts or .tsx
            else if (ext != undefined && ['ts','tsx'].includes(ext)) {
                /// gets all the contents of the current file
                const data = fs.readFileSync(initialFilePath,'utf8');
                /// splits each line of data to allow us to parse through each one
                const lines = data.split(/\r?\n/);
                /// creates a regular expression for the import lines
                const re = /import(?:["'\s]*([\w*{}\n\r\t, ]+)from\s*)?["'\s].*([@\w_-]+)["'\s].*;$/;
                /// iterates through each line of the file
                lines.forEach((line) => {
                    /// checks to see if the line matches the format of the regular expression
                    var importLine = line.match(re);
                    /// makes sure that the line actually has the proper format of the regEx
                    if (importLine != null) {
                        /// gets the entire import lines contents
                        var importVal = importLine[0];
                        /// splits the line based off spaces and gets only the file path
                        var filePath = importVal.split(' ').pop();
                        var fullPath;
                        /// converts that file path into a full file path
                        if (filePath != undefined) {
                            if (filePath.includes('./') || filePath.includes('../')) {
                                filePath = expandPath(filePath);
                                /// creates the full path with the proper directory name
                                var fullDirectory = path.dirname(initialFilePath);
                                fullPath = path.resolve(fullDirectory, filePath);
                                fullPath = checkFullPath(fullPath);
                            }
                        }
                        if (fullPath != undefined) {
                            /// updates the value of the file in the hitMap
                            updateHitMap(fullPath, hitMap);
                        }
                    }
                });
            }
        }
    }
    /// sorts the map based on values
    hitMap = sortMap(hitMap);
    /// makes the map into a table type format with a nested array
    var updatedHitMap = [...hitMap];
    /// swaps the key and value
    var finalMap = swapMapValues(updatedHitMap);
    /// prints the map out in table format (format: hitValue ... [tab] ... Path)
    printMap(finalMap);
}

/// runs the main function and prints out the table with the number of hits as the key and the path as the value
main(); 