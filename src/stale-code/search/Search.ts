/// "@NotStale"
import ErrnoException = NodeJS.ErrnoException;
import * as fs from "fs";
import * as path from 'path';
import {Search} from "./find";
import {DefaultOpts} from "./find";
import { Stale } from "./find";

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
        hitMap = Stale.initializeTypescriptMapFiles(fileMap, hitMap);

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
                /// knows if the file includes "@NotStale" ... if it does then skips the file
                const isStaleCode = Stale.isNotStale(data);
                if (isStaleCode == true) {
                    hitMap.delete(initialFilePath);
                    continue;
                }
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
                                filePath = Stale.expandPath(filePath);
                                /// creates the full path with the proper directory name
                                var fullDirectory = path.dirname(initialFilePath);
                                fullPath = path.resolve(fullDirectory, filePath);
                                fullPath = Stale.checkFullPath(fullPath);
                            }
                        }
                        if (fullPath != undefined) {
                            /// updates the value of the file in the hitMap
                            hitMap = Stale.updateHitMap(fullPath, hitMap);
                        }
                    }
                });
            }
        }
    }
    /// sorts the map based on values
    hitMap = Stale.sortMap(hitMap);
    /// makes the map into a table type format with a nested array
    var updatedHitMap = [...hitMap];
    /// swaps the key and value
    var finalMap = Stale.swapMapValues(updatedHitMap);
    /// prints the map out in table format (format: hitValue ... [tab] ... Path)
    Stale.printMap(finalMap);
}

/// runs the main function and prints out the table with the number of hits as the key and the path as the value
main(); 