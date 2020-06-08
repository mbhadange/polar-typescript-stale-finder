"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.main = exports.printMap = exports.swapMapValues = exports.sortMap = exports.expandPath = exports.checkFullPath = exports.updateHitMap = exports.initializeTypescriptMapFiles = exports.Stale = void 0;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const find_1 = require("./find");
const find_2 = require("./find");
class Stale {
    static getExtension(filename) {
        var extension = filename.split('.').pop();
        return extension;
    }
}
exports.Stale = Stale;
function initializeTypescriptMapFiles(data, currMap) {
    for (var k = 0; k < data.length; k++) {
        if (currMap.has(data[k].path) == false) {
            if (data[k].name.includes('test.ts') || data[k].name.includes('.d.ts')) {
                continue;
            }
            else if (data[k].name.split('.').pop() === 'ts' || data[k].name.split('.').pop() === 'tsx') {
                currMap.set(data[k].path, 0);
            }
        }
    }
}
exports.initializeTypescriptMapFiles = initializeTypescriptMapFiles;
function updateHitMap(currFullPath, currMap) {
    if (currFullPath != undefined) {
        if (currMap.has(currFullPath) === true) {
            var currVal = currMap.get(currFullPath);
            if (currVal != undefined) {
                currMap.set(currFullPath, currVal + 1);
            }
        }
        else {
            currMap.set(currFullPath, 1);
        }
    }
}
exports.updateHitMap = updateHitMap;
function checkFullPath(finalPath) {
    if (fs.existsSync(finalPath) == false) {
        finalPath = finalPath + 'x';
        if (fs.existsSync(finalPath) == false) {
            finalPath = finalPath.replace(finalPath.substring(finalPath.length - 3), "");
            finalPath = finalPath + 'd.ts';
            if (finalPath.includes('utils.js.d.ts')) {
                finalPath = finalPath.replace(finalPath.substring(finalPath.length - 7), "");
                finalPath = finalPath + 'ts';
            }
            if (fs.existsSync(finalPath) == false) {
                console.warn("File does not exist: " + finalPath);
            }
        }
    }
    return finalPath;
}
exports.checkFullPath = checkFullPath;
function expandPath(currPath) {
    currPath = currPath.replace(/['"]+/g, '');
    if (currPath.includes('.ts') == false) {
        currPath = currPath.replace(currPath.substring(currPath.length - 1), "");
        currPath = currPath + '.ts';
    }
    return currPath;
}
exports.expandPath = expandPath;
function sortMap(currMap) {
    currMap[Symbol.iterator] = function* () {
        yield* [...this.entries()].sort((a, b) => a[1] - b[1]);
    };
    return currMap;
}
exports.sortMap = sortMap;
function swapMapValues(currMap) {
    var finalHitMap = [];
    for (var index = 0; index < currMap.length; index++) {
        var currentArray = currMap[index];
        var key = currentArray[0];
        var value = currentArray[1];
        finalHitMap[index] = [value, key];
    }
    return finalHitMap;
}
exports.swapMapValues = swapMapValues;
function printMap(finalMap) {
    for (var j = 0; j < finalMap.length; j++) {
        var curr = finalMap[j];
        if (curr[1].includes('Test') == false && curr[1].includes('test') == false) {
            console.log(curr[0], ' ', curr[1]);
        }
    }
}
exports.printMap = printMap;
function main() {
    var argument = process.argv;
    var hitMap = new Map();
    for (var x = 2; x < argument.length; x++) {
        const opts = new find_2.DefaultOpts();
        var myArgs = argument[x];
        var fileMap = find_1.Search.findFilesRecursively(myArgs, opts);
        initializeTypescriptMapFiles(fileMap, hitMap);
        for (var i = 0; i < fileMap.length; i++) {
            var file = fileMap[i];
            var initialFileName = file.name;
            var initialFilePath = file.path;
            var ext = Stale.getExtension(initialFileName);
            if (file.name.includes('test.ts') || file.name.includes('.d.ts')) {
                continue;
            }
            else if (ext != undefined && ['ts', 'tsx'].includes(ext)) {
                const data = fs.readFileSync(initialFilePath, 'utf8');
                const lines = data.split(/\r?\n/);
                const re = /import(?:["'\s]*([\w*{}\n\r\t, ]+)from\s*)?["'\s].*([@\w_-]+)["'\s].*;$/;
                lines.forEach((line) => {
                    var importLine = line.match(re);
                    if (importLine != null) {
                        var importVal = importLine[0];
                        var filePath = importVal.split(' ').pop();
                        var fullPath;
                        if (filePath != undefined) {
                            if (filePath.includes('./') || filePath.includes('../')) {
                                filePath = expandPath(filePath);
                                var fullDirectory = path.dirname(initialFilePath);
                                fullPath = path.resolve(fullDirectory, filePath);
                                fullPath = checkFullPath(fullPath);
                            }
                        }
                        if (fullPath != undefined) {
                            updateHitMap(fullPath, hitMap);
                        }
                    }
                });
            }
        }
    }
    hitMap = sortMap(hitMap);
    var updatedHitMap = [...hitMap];
    var finalMap = swapMapValues(updatedHitMap);
    printMap(finalMap);
}
exports.main = main;
main();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2VhcmNoLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU2VhcmNoLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSx1Q0FBeUI7QUFDekIsMkNBQTZCO0FBQzdCLGlDQUFxQztBQUNyQyxpQ0FBbUM7QUFFbkMsTUFBYSxLQUFLO0lBS1AsTUFBTSxDQUFDLFlBQVksQ0FBRSxRQUFpQjtRQUN6QyxJQUFJLFNBQVMsR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQzFDLE9BQU8sU0FBUyxDQUFDO0lBQ3JCLENBQUM7Q0FDSjtBQVRELHNCQVNDO0FBTUQsU0FBZ0IsNEJBQTRCLENBQUUsSUFBMkIsRUFBRSxPQUE0QjtJQUNuRyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtRQUNsQyxJQUFJLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLEtBQUssRUFBRTtZQUNwQyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxJQUFLLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxFQUFFO2dCQUNyRSxTQUFTO2FBQ1o7aUJBRUksSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEVBQUUsS0FBSyxJQUFJLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLEtBQUssS0FBSyxFQUFFO2dCQUV4RixPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FB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LCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgRXJybm9FeGNlcHRpb24gPSBOb2RlSlMuRXJybm9FeGNlcHRpb247XG5pbXBvcnQgKiBhcyBmcyBmcm9tIFwiZnNcIjtcbmltcG9ydCAqIGFzIHBhdGggZnJvbSAncGF0aCc7XG5pbXBvcnQge1NlYXJjaCwgSUZpbGV9IGZyb20gXCIuL2ZpbmRcIjtcbmltcG9ydCB7RGVmYXVsdE9wdHN9IGZyb20gXCIuL2ZpbmRcIjtcblxuZXhwb3J0IGNsYXNzIFN0YWxlIHtcbiAgICAvKipcbiAgICAgKiBnZXRzIHRoZSBleHRlbnNpb24gb2YgdGhlIGZpbGVuYW1lXG4gICAgICogQHBhcmFtIGZpbGVuYW1lIFxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgZ2V0RXh0ZW5zaW9uIChmaWxlbmFtZSA6IHN0cmluZykgOiBzdHJpbmcgfCB1bmRlZmluZWQge1xuICAgICAgICB2YXIgZXh0ZW5zaW9uID0gZmlsZW5hbWUuc3BsaXQoJy4nKS5wb3AoKTtcbiAgICAgICAgcmV0dXJuIGV4dGVuc2lvbjtcbiAgICB9XG59XG4vKipcbiAqIGl0ZXJhdGVzIHRocm91Z2ggZWFjaCBmaWxlIGluIHRoZSBkaXJlY3RvcnkgYW5kIGFkZHMgdG8gdGhlIG1hcFxuICogQHBhcmFtIGRhdGEgXG4gKiBAcGFyYW0gY3Vyck1hcCBcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGluaXRpYWxpemVUeXBlc2NyaXB0TWFwRmlsZXMgKGRhdGEgOiBSZWFkb25seUFycmF5PElGaWxlPiwgY3Vyck1hcCA6IE1hcDxzdHJpbmcsbnVtYmVyPikge1xuICAgIGZvciAodmFyIGsgPSAwOyBrIDwgZGF0YS5sZW5ndGg7IGsrKykge1xuICAgICAgICBpZiAoY3Vyck1hcC5oYXMoZGF0YVtrXS5wYXRoKSA9PSBmYWxzZSkge1xuICAgICAgICAgICAgaWYgKGRhdGFba10ubmFtZS5pbmNsdWRlcygndGVzdC50cycpICB8fCBkYXRhW2tdLm5hbWUuaW5jbHVkZXMoJy5kLnRzJykpIHtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vLyBjaGVja3MgdG8gbWFrZSBzdXJlIHRoYXQgdGhlIGZpbGUgdHlwZSBpcyBlaXRoZXIgLnRzIG9yIC50c3hcbiAgICAgICAgICAgIGVsc2UgaWYgKGRhdGFba10ubmFtZS5zcGxpdCgnLicpLnBvcCgpID09PSAndHMnIHx8IGRhdGFba10ubmFtZS5zcGxpdCgnLicpLnBvcCgpID09PSAndHN4Jykge1xuICAgICAgICAgICAgICAgIC8vLyBpbml0aWFsaXplcyBoaXRNYXBcbiAgICAgICAgICAgICAgICBjdXJyTWFwLnNldChkYXRhW2tdLnBhdGgsIDApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IFxuICAgIH1cbn1cblxuLyoqXG4gKiB1cGRhdGVzIHRoZSB2YWx1ZSBvZiB0aGUgZmlsZSBpbiB0aGUgaGl0TWFwXG4gKiBAcGFyYW0gY3VyckZ1bGxQYXRoIFxuICogQHBhcmFtIGN1cnJNYXAgXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB1cGRhdGVIaXRNYXAgKGN1cnJGdWxsUGF0aCA6IHN0cmluZywgY3Vyck1hcCA6IE1hcDxzdHJpbmcsbnVtYmVyPikge1xuICAgIGlmIChjdXJyRnVsbFBhdGggIT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIC8vLyBjaGVja3MgdG8gc2VlIGlmIHRoZSBoaXRtYXAgYWxyZWFkeSBoYXMgdGhhdCBwYXRoXG4gICAgICAgIGlmIChjdXJyTWFwLmhhcyhjdXJyRnVsbFBhdGgpID09PSB0cnVlKSB7XG4gICAgICAgICAgICAvLy8gaWYgaXQgZG9lcyB0aGVuIGluY3JlbWVudHMgdGhlIHZhbHVlIG9mIHRoYXQgZmlsZSBieSAxXG4gICAgICAgICAgICB2YXIgY3VyclZhbCA9IGN1cnJNYXAuZ2V0KGN1cnJGdWxsUGF0aCk7XG4gICAgICAgICAgICBpZiAoY3VyclZhbCAhPSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBjdXJyTWFwLnNldChjdXJyRnVsbFBhdGgsIGN1cnJWYWwgKyAxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvLy8gaWYgdGhlIGhpdG1hcCBkb2VzIG5vdCBoYXZlIHRoYXQgcGF0aCBhcyBhIGtleSBhbHJlYWR5XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgLy8vIHRoZW4gc2V0cyB0aGF0IGZpbGUgcGF0aCB0byBoYXZlIGEgdmFsdWUgb2YgMVxuICAgICAgICAgICAgY3Vyck1hcC5zZXQoY3VyckZ1bGxQYXRoLCAxKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuLyoqXG4gKiBjaGVja3MgdG8gbWFrZSBzdXJlIHRoYXQgdGhlIHBhdGggZXhpc3RzICAgICAgICAgICAgICAgICAgICAgICAgIFxuICogQHBhcmFtIGZpbmFsUGF0aCBcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNoZWNrRnVsbFBhdGggKGZpbmFsUGF0aCA6IHN0cmluZykgOiBzdHJpbmcge1xuICAgIGlmIChmcy5leGlzdHNTeW5jKGZpbmFsUGF0aCkgPT0gZmFsc2UpIHtcbiAgICAgICAgZmluYWxQYXRoID0gZmluYWxQYXRoICsgJ3gnO1xuICAgICAgICBpZiAoZnMuZXhpc3RzU3luYyhmaW5hbFBhdGgpID09IGZhbHNlKSB7XG4gICAgICAgICAgICBmaW5hbFBhdGggPSBmaW5hbFBhdGgucmVwbGFjZShmaW5hbFBhdGguc3Vic3RyaW5nKGZpbmFsUGF0aC5sZW5ndGgtMyksIFwiXCIpO1xuICAgICAgICAgICAgZmluYWxQYXRoID0gZmluYWxQYXRoICsgJ2QudHMnO1xuICAgICAgICAgICAgaWYgKGZpbmFsUGF0aC5pbmNsdWRlcygndXRpbHMuanMuZC50cycpKSB7XG4gICAgICAgICAgICAgICAgZmluYWxQYXRoID0gZmluYWxQYXRoLnJlcGxhY2UoZmluYWxQYXRoLnN1YnN0cmluZyhmaW5hbFBhdGgubGVuZ3RoLTcpLCBcIlwiKTtcbiAgICAgICAgICAgICAgICBmaW5hbFBhdGggPSBmaW5hbFBhdGggKyAndHMnO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGZzLmV4aXN0c1N5bmMoZmluYWxQYXRoKSA9PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihcIkZpbGUgZG9lcyBub3QgZXhpc3Q6IFwiICsgZmluYWxQYXRoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZmluYWxQYXRoO1xufVxuXG4vKipcbiAqIGNvbnZlcnRzIHRoYXQgZmlsZSBwYXRoIGludG8gYSBmdWxsIGZpbGUgcGF0aFxuICogQHBhcmFtIGN1cnJQYXRoIFxuICovXG5leHBvcnQgZnVuY3Rpb24gZXhwYW5kUGF0aCAoY3VyclBhdGggOiBzdHJpbmcpIDogc3RyaW5nIHtcbiAgICAvLy8gZml4ZXMgdGhlIHB1bmN0dWF0aW9uIG9mIHRoZSBmaWxlIHBhdGggb2YgdGhlIGltcG9ydFxuICAgIGN1cnJQYXRoID0gY3VyclBhdGgucmVwbGFjZSgvWydcIl0rL2csICcnKTtcbiAgICBpZiAoY3VyclBhdGguaW5jbHVkZXMoJy50cycpID09IGZhbHNlKSB7XG4gICAgICAgIGN1cnJQYXRoID0gY3VyclBhdGgucmVwbGFjZShjdXJyUGF0aC5zdWJzdHJpbmcoY3VyclBhdGgubGVuZ3RoLTEpLCBcIlwiKTtcbiAgICAgICAgY3VyclBhdGggPSBjdXJyUGF0aCArICcudHMnO1xuICAgIH1cbiAgICByZXR1cm4gY3VyclBhdGg7XG59XG5cbi8qKlxuICogU29ydHMgdGhlIG1hcCBpbiBvcmRlciBiYXNlZCBvbiB0aGUgaGl0IHZhbHVlcyBcbiAqIEBwYXJhbSBjdXJyTWFwIFxuICovXG5leHBvcnQgZnVuY3Rpb24gc29ydE1hcChjdXJyTWFwIDogTWFwPHN0cmluZyxudW1iZXI+KSA6IE1hcDxzdHJpbmcsbnVtYmVyPiB7XG4gICAgY3Vyck1hcFtTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24qICgpIHtcbiAgICAgICAgeWllbGQqIFsuLi50aGlzLmVudHJpZXMoKV0uc29ydCgoYSwgYikgPT4gYVsxXSAtIGJbMV0pO1xuICAgIH1cbiAgICByZXR1cm4gY3Vyck1hcDtcbn1cblxuLyoqXG4gKiBzd2FwcyB0aGUga2V5IGFuZCB0aGUgdmFsdWUgb2YgdGhlIG1hcCwgc28gdGhlIG51bWJlciBvZiBoaXRzIGlzIGZvcm1hdHRlZCB0byB0aGUgbGVmdCBvZiB0aGUgZnVsbCBmaWxlIHBhdGhcbiAqIEBwYXJhbSBjdXJyTWFwIFxuICovXG5leHBvcnQgZnVuY3Rpb24gc3dhcE1hcFZhbHVlcyhjdXJyTWFwIDogYW55W11bXSkgOiBhbnlbXVtdIHtcbiAgICB2YXIgZmluYWxIaXRNYXAgPSBbXTtcbiAgICBmb3IgKHZhciBpbmRleCA9IDA7IGluZGV4IDwgY3Vyck1hcC5sZW5ndGg7IGluZGV4KyspIHtcbiAgICAgICAgdmFyIGN1cnJlbnRBcnJheSA9IGN1cnJNYXBbaW5kZXhdO1xuICAgICAgICB2YXIga2V5ID0gY3VycmVudEFycmF5WzBdO1xuICAgICAgICB2YXIgdmFsdWUgPSBjdXJyZW50QXJyYXlbMV07XG4gICAgICAgIGZpbmFsSGl0TWFwW2luZGV4XSA9IFt2YWx1ZSwga2V5XTtcbiAgICB9XG4gICAgcmV0dXJuIGZpbmFsSGl0TWFwO1xufVxuXG4vKipcbiAqIHByaW50cyBvdXQgdGhlIGZpbmFsIE1hcFxuICogQHBhcmFtIGZpbmFsTWFwIFxuICovXG5leHBvcnQgZnVuY3Rpb24gcHJpbnRNYXAoZmluYWxNYXAgOiBhbnlbXVtdKSB7XG4gICAgZm9yICh2YXIgaiA9IDA7IGogPCBmaW5hbE1hcC5sZW5ndGg7IGorKykge1xuICAgICAgICB2YXIgY3VyciA9IGZpbmFsTWFwW2pdO1xuICAgICAgICBpZiAoY3VyclsxXS5pbmNsdWRlcygnVGVzdCcpID09IGZhbHNlICYmIGN1cnJbMV0uaW5jbHVkZXMoJ3Rlc3QnKSA9PSBmYWxzZSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coY3VyclswXSwgJyAnLCBjdXJyWzFdKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuXG5cbmV4cG9ydCBmdW5jdGlvbiBtYWluKCkge1xuICAgIC8vLyB1c2VzIHByb2Nlc3MuYXJndiB0byBzZWUgdGFrZSBpbiBhbnkgbnVtYmVyIG9mIGRpcmVjdG9yaWVzIGluIHRoZSBjb21tYW5kIGxpbmVcbiAgICAvLy8gZXhhbXBsZTogbm9kZSBTZWFyY2guanMgL1VzZXJzL21paGlybWFjcHJvMTMvRG9jdW1lbnRzL0dpdEh1Yi9wb2xhci1ib29rc2hlbGYvd2ViL2pzIC9Vc2Vycy9taWhpcm1hY3BybzEzL0RvY3VtZW50cy9HaXRIdWIvcG9sYXItYm9va3NoZWxmL2FwcHNcbiAgICB2YXIgYXJndW1lbnQgPSBwcm9jZXNzLmFyZ3Y7XG4gICAgLy8vIGNyZWF0ZXMgYW4gZW1wdHkgbWFwXG4gICAgdmFyIGhpdE1hcCA9IG5ldyBNYXAoKTtcbiAgICBmb3IgKHZhciB4ID0gMjsgeCA8IGFyZ3VtZW50Lmxlbmd0aDsgeCsrKSB7XG4gICAgICAgIGNvbnN0IG9wdHMgPSBuZXcgRGVmYXVsdE9wdHMoKTtcbiAgICAgICAgdmFyIG15QXJncyA9IGFyZ3VtZW50W3hdO1xuICAgICAgICAvLy8gcmV0dXJucyBhbiBhcnJheSB3aXRoIGFsbCB0aGUgZmlsZXMgaW4gdGhlIGRpcmVjdG9yeVxuICAgICAgICB2YXIgZmlsZU1hcCA9IFNlYXJjaC5maW5kRmlsZXNSZWN1cnNpdmVseShteUFyZ3MsIG9wdHMpO1xuICAgICAgICAvLy8gaXRlcmF0ZXMgdGhyb3VnaCBlYWNoIGZpbGUgaW4gdGhlIGRpcmVjdG9yeSBhbmQgYWRkcyB0byB0aGUgbWFwXG4gICAgICAgIGluaXRpYWxpemVUeXBlc2NyaXB0TWFwRmlsZXMoZmlsZU1hcCwgaGl0TWFwKTtcblxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGZpbGVNYXAubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIC8vLyBtYXAgb2YgdGhlIGZpbGUgdHlwZSwgbmFtZSwgcGF0aCBcbiAgICAgICAgICAgIHZhciBmaWxlID0gZmlsZU1hcFtpXTtcbiAgICAgICAgICAgIHZhciBpbml0aWFsRmlsZU5hbWUgPSBmaWxlLm5hbWU7XG4gICAgICAgICAgICB2YXIgaW5pdGlhbEZpbGVQYXRoID0gZmlsZS5wYXRoO1xuICAgICAgICAgICAgdmFyIGV4dCA9IFN0YWxlLmdldEV4dGVuc2lvbihpbml0aWFsRmlsZU5hbWUpO1xuXG4gICAgICAgICAgICAvLy8gY2hlY2tzIHRvIHNlZSBpZiB0aGUgZmlsZSBuYW1lIGlzIHRlc3QudHNcbiAgICAgICAgICAgIC8vLyBpZiBpdCBpcyB0aGVuIGNvbnRpbnVlcyB0byB0aGUgbmV4dCBmaWxlXG4gICAgICAgICAgICBpZiAoZmlsZS5uYW1lLmluY2x1ZGVzKCd0ZXN0LnRzJykgIHx8IGZpbGUubmFtZS5pbmNsdWRlcygnLmQudHMnKSkge1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8vIGNoZWNrcyB0byBtYWtlIHN1cmUgdGhhdCB0aGUgZmlsZSB0eXBlIGlzIGVpdGhlciAudHMgb3IgLnRzeFxuICAgICAgICAgICAgZWxzZSBpZiAoZXh0ICE9IHVuZGVmaW5lZCAmJiBbJ3RzJywndHN4J10uaW5jbHVkZXMoZXh0KSkge1xuICAgICAgICAgICAgICAgIC8vLyBnZXRzIGFsbCB0aGUgY29udGVudHMgb2YgdGhlIGN1cnJlbnQgZmlsZVxuICAgICAgICAgICAgICAgIGNvbnN0IGRhdGEgPSBmcy5yZWFkRmlsZVN5bmMoaW5pdGlhbEZpbGVQYXRoLCd1dGY4Jyk7XG4gICAgICAgICAgICAgICAgLy8vIHNwbGl0cyBlYWNoIGxpbmUgb2YgZGF0YSB0byBhbGxvdyB1cyB0byBwYXJzZSB0aHJvdWdoIGVhY2ggb25lXG4gICAgICAgICAgICAgICAgY29uc3QgbGluZXMgPSBkYXRhLnNwbGl0KC9cXHI/XFxuLyk7XG4gICAgICAgICAgICAgICAgLy8vIGNyZWF0ZXMgYSByZWd1bGFyIGV4cHJlc3Npb24gZm9yIHRoZSBpbXBvcnQgbGluZXNcbiAgICAgICAgICAgICAgICBjb25zdCByZSA9IC9pbXBvcnQoPzpbXCInXFxzXSooW1xcdyp7fVxcblxcclxcdCwgXSspZnJvbVxccyopP1tcIidcXHNdLiooW0BcXHdfLV0rKVtcIidcXHNdLio7JC87XG4gICAgICAgICAgICAgICAgLy8vIGl0ZXJhdGVzIHRocm91Z2ggZWFjaCBsaW5lIG9mIHRoZSBmaWxlXG4gICAgICAgICAgICAgICAgbGluZXMuZm9yRWFjaCgobGluZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAvLy8gY2hlY2tzIHRvIHNlZSBpZiB0aGUgbGluZSBtYXRjaGVzIHRoZSBmb3JtYXQgb2YgdGhlIHJlZ3VsYXIgZXhwcmVzc2lvblxuICAgICAgICAgICAgICAgICAgICB2YXIgaW1wb3J0TGluZSA9IGxpbmUubWF0Y2gocmUpO1xuICAgICAgICAgICAgICAgICAgICAvLy8gbWFrZXMgc3VyZSB0aGF0IHRoZSBsaW5lIGFjdHVhbGx5IGhhcyB0aGUgcHJvcGVyIGZvcm1hdCBvZiB0aGUgcmVnRXhcbiAgICAgICAgICAgICAgICAgICAgaWYgKGltcG9ydExpbmUgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8vIGdldHMgdGhlIGVudGlyZSBpbXBvcnQgbGluZXMgY29udGVudHNcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpbXBvcnRWYWwgPSBpbXBvcnRMaW5lWzBdO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8vIHNwbGl0cyB0aGUgbGluZSBiYXNlZCBvZmYgc3BhY2VzIGFuZCBnZXRzIG9ubHkgdGhlIGZpbGUgcGF0aFxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGZpbGVQYXRoID0gaW1wb3J0VmFsLnNwbGl0KCcgJykucG9wKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZnVsbFBhdGg7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLy8gY29udmVydHMgdGhhdCBmaWxlIHBhdGggaW50byBhIGZ1bGwgZmlsZSBwYXRoXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZmlsZVBhdGggIT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGZpbGVQYXRoLmluY2x1ZGVzKCcuLycpIHx8IGZpbGVQYXRoLmluY2x1ZGVzKCcuLi8nKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWxlUGF0aCA9IGV4cGFuZFBhdGgoZmlsZVBhdGgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLy8gY3JlYXRlcyB0aGUgZnVsbCBwYXRoIHdpdGggdGhlIHByb3BlciBkaXJlY3RvcnkgbmFtZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZnVsbERpcmVjdG9yeSA9IHBhdGguZGlybmFtZShpbml0aWFsRmlsZVBhdGgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmdWxsUGF0aCA9IHBhdGgucmVzb2x2ZShmdWxsRGlyZWN0b3J5LCBmaWxlUGF0aCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZ1bGxQYXRoID0gY2hlY2tGdWxsUGF0aChmdWxsUGF0aCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGZ1bGxQYXRoICE9IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vLyB1cGRhdGVzIHRoZSB2YWx1ZSBvZiB0aGUgZmlsZSBpbiB0aGUgaGl0TWFwXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXBkYXRlSGl0TWFwKGZ1bGxQYXRoLCBoaXRNYXApO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgLy8vIHNvcnRzIHRoZSBtYXAgYmFzZWQgb24gdmFsdWVzXG4gICAgaGl0TWFwID0gc29ydE1hcChoaXRNYXApO1xuICAgIC8vLyBtYWtlcyB0aGUgbWFwIGludG8gYSB0YWJsZSB0eXBlIGZvcm1hdCB3aXRoIGEgbmVzdGVkIGFycmF5XG4gICAgdmFyIHVwZGF0ZWRIaXRNYXAgPSBbLi4uaGl0TWFwXTtcbiAgICAvLy8gc3dhcHMgdGhlIGtleSBhbmQgdmFsdWVcbiAgICB2YXIgZmluYWxNYXAgPSBzd2FwTWFwVmFsdWVzKHVwZGF0ZWRIaXRNYXApO1xuICAgIC8vLyBwcmludHMgdGhlIG1hcCBvdXQgaW4gdGFibGUgZm9ybWF0IChmb3JtYXQ6IGhpdFZhbHVlIC4uLiBbdGFiXSAuLi4gUGF0aClcbiAgICBwcmludE1hcChmaW5hbE1hcCk7XG59XG5cbi8vLyBydW5zIHRoZSBtYWluIGZ1bmN0aW9uIGFuZCBwcmludHMgb3V0IHRoZSB0YWJsZSB3aXRoIHRoZSBudW1iZXIgb2YgaGl0cyBhcyB0aGUga2V5IGFuZCB0aGUgcGF0aCBhcyB0aGUgdmFsdWVcbm1haW4oKTsgIl19