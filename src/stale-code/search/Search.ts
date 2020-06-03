import ErrnoException = NodeJS.ErrnoException;
import * as fs from "fs";
import * as path from 'path';
import {Search} from "./find";
import {DefaultOpts} from "./find";

/// creates an empty map
var hitMap = new Map();

/**
 * uses process.argv to see take in any number of directories in the command line
 * example: node Search.js /Users/mihirmacpro13/Documents/GitHub/polar-bookshelf/web/js /Users/mihirmacpro13/Documents/GitHub/polar-bookshelf/apps
 */ 
var argument = process.argv;
for (var x = 2; x < argument.length; x++) {
    const opts = new DefaultOpts();
    var myArgs = argument[x];

    /// Search.find returns an array with all the files in the directory
    /// iterates through each file in the directory
    var fileMap = Search.find(myArgs, opts);
    for (var k = 0; k < fileMap.length; k++) {
        if (hitMap.has(fileMap[k].path) == false) {
            if (fileMap[k].name.includes('test.ts')  || fileMap[k].name.includes('.d.ts')) {
                continue;
            }
            /// checks to make sure that the file type is either .ts or .tsx
            else if (fileMap[k].name.split('.').pop() === 'ts' || fileMap[k].name.split('.').pop() === 'tsx') {
                /// initializes hitMap
                hitMap.set(fileMap[k].path, 0);
            }
        } 
    }

    for (var i = 0; i < fileMap.length; i++) {

        /// map of the file type, name, path 
        var file = fileMap[i];
        var initialFileName = file.name;
        var initialFilePath = file.path;
        
        /// checks to see if the file name is test.ts
        /// if it is then continues to the next file
        if (file.name.includes('test.ts')  || file.name.includes('.d.ts')) {
            continue;
        }
        /// checks to make sure that the file type is either .ts or .tsx
        else if (initialFileName.split('.').pop() === 'ts' || initialFileName.split('.').pop() === 'tsx') {
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
                            fullPath = path.resolve(fullDirectory, filePath);
                            if (fs.existsSync(fullPath) == false) {
                                fullPath = fullPath + 'x';
                                if (fs.existsSync(fullPath) == false) {
                                    fullPath = fullPath.replace(fullPath.substring(fullPath.length-3), "");
                                    fullPath = fullPath + 'd.ts';
                                    if (fullPath.includes('utils.js.d.ts')) {
                                        fullPath = fullPath.replace(fullPath.substring(fullPath.length-7), "");
                                        fullPath = fullPath + 'ts';
                                    }
                                    if (fs.existsSync(fullPath) == false) {
                                        console.warn("File does not exist: " + fullPath);
                                    }
                                }
                            }
                            
                        }
                    }
                    
                    if (fullPath != undefined) {
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
                }
            });
        }
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
 * swaps the key and the value of the map, so the number of hits is formatted to the left of the full file path
 */
var finalHitMap = [];
for (var index = 0; index < updatedHitMap.length; index++) {
    var currentArray = updatedHitMap[index];
    var key = currentArray[0];
    var value = currentArray[1];
    finalHitMap[index] = [value, key];
}

/**
 * prints out the finalHitMap
 */
for (var j = 0; j < finalHitMap.length; j++) {
    var curr = finalHitMap[j];
    if (curr[1].includes('Test') == false && curr[1].includes('test') == false) {
        console.log(curr[0], ' ', curr[1]);
    }
}