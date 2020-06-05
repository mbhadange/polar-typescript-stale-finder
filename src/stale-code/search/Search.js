"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const find_1 = require("./find");
const find_2 = require("./find");
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
function expandPath(currPath) {
    currPath = currPath.replace(/['"]+/g, '');
    if (currPath.includes('.ts') == false) {
        currPath = currPath.replace(currPath.substring(currPath.length - 1), "");
        currPath = currPath + '.ts';
    }
    return currPath;
}
function sortMap(currMap) {
    currMap[Symbol.iterator] = function* () {
        yield* [...this.entries()].sort((a, b) => a[1] - b[1]);
    };
    return currMap;
}
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
function printMap(finalMap) {
    for (var j = 0; j < finalMap.length; j++) {
        var curr = finalMap[j];
        if (curr[1].includes('Test') == false && curr[1].includes('test') == false) {
            console.log(curr[0], ' ', curr[1]);
        }
    }
}
function getExtension(filename) {
    var extension = filename.split('.').pop();
    if (extension != undefined) {
        return extension;
    }
    else {
        return 'undefined';
    }
}
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
            var ext = getExtension(initialFileName);
            if (file.name.includes('test.ts') || file.name.includes('.d.ts')) {
                continue;
            }
            else if (['ts', 'tsx'].includes(ext)) {
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
main();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2VhcmNoLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU2VhcmNoLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBLHVDQUF5QjtBQUN6QiwyQ0FBNkI7QUFDN0IsaUNBQXFDO0FBQ3JDLGlDQUFtQztBQU9uQyxTQUFTLDRCQUE0QixDQUFFLElBQTJCLEVBQUUsT0FBNEI7SUFDNUYsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7UUFDbEMsSUFBSSxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxLQUFLLEVBQUU7WUFDcEMsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsSUFBSyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsRUFBRTtnQkFDckUsU0FBUzthQUNaO2lCQUVJLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLEtBQUssSUFBSSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxLQUFLLEtBQUssRUFBRTtnQkFFeEYsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO2FBQ2hDO1NBQ0o7S0FDSjtBQUNMLENBQUM7QUFPRCxTQUFTLFlBQVksQ0FBRSxZQUFxQixFQUFFLE9BQTRCO0lBQ3RFLElBQUksWUFBWSxJQUFJLFNBQVMsRUFBRTtRQUUzQixJQUFJLE9BQU8sQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLEtB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QkFFcEIsSUFBSSxTQUFTLEdBQUcsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUU5QixJQUFJLFFBQVEsR0FBRyxTQUFTLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDO3dCQUMxQyxJQUFJLFFBQVEsQ0FBQzt3QkFFYixJQUFJLFFBQVEsSUFBSSxTQUFTLEVBQUU7NEJBQ3ZCLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxFQUFFO2dDQUNyRCxRQUFRLEdBQUcsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dDQUVoQyxJQUFJLGFBQWEsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLGVBQWUsQ0FBQyxDQUFDO2dDQUNsRCxRQUFRLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLEVBQUUsUUFBUSxDQUFDLENBQUM7Z0NBQ2pELFFBQVEsR0FBRyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUM7NkJBQ3RDO3lCQUNKO3dCQUNELElBQUksUUFBUSxJQUFJLFNBQVMsRUFBRTs0QkFFdkIsWUFBWSxDQUFDLFFBQVEsRUFBRSxNQUFNLENBQUMsQ0FBQzt5QkFDbEM7cUJBQ0o7Z0JBQ0wsQ0FBQyxDQUFDLENBQUM7YUFDTjtTQUNKO0tBQ0o7SUFFRCxNQUFNLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBRXpCLElBQUksYUFBYSxHQUFHLENBQUMsR0FBRyxNQUFNLENBQUMsQ0FBQztJQUVoQyxJQUFJLFFBQVEsR0FBRyxhQUFhLENBQUMsYUFBYSxDQUFDLENBQUM7SUFFNUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQ3ZCLENBQUM7QUFHRCxJQUFJLEVBQUUsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBFcnJub0V4Y2VwdGlvbiA9IE5vZGVKUy5FcnJub0V4Y2VwdGlvbjtcbmltcG9ydCAqIGFzIGZzIGZyb20gXCJmc1wiO1xuaW1wb3J0ICogYXMgcGF0aCBmcm9tICdwYXRoJztcbmltcG9ydCB7U2VhcmNoLCBJRmlsZX0gZnJvbSBcIi4vZmluZFwiO1xuaW1wb3J0IHtEZWZhdWx0T3B0c30gZnJvbSBcIi4vZmluZFwiO1xuXG4vKipcbiAqIGl0ZXJhdGVzIHRocm91Z2ggZWFjaCBmaWxlIGluIHRoZSBkaXJlY3RvcnkgYW5kIGFkZHMgdG8gdGhlIG1hcFxuICogQHBhcmFtIGRhdGEgXG4gKiBAcGFyYW0gY3Vyck1hcCBcbiAqL1xuZnVuY3Rpb24gaW5pdGlhbGl6ZVR5cGVzY3JpcHRNYXBGaWxlcyAoZGF0YSA6IFJlYWRvbmx5QXJyYXk8SUZpbGU+LCBjdXJyTWFwIDogTWFwPHN0cmluZyxudW1iZXI+KSB7XG4gICAgZm9yICh2YXIgayA9IDA7IGsgPCBkYXRhLmxlbmd0aDsgaysrKSB7XG4gICAgICAgIGlmIChjdXJyTWFwLmhhcyhkYXRhW2tdLnBhdGgpID09IGZhbHNlKSB7XG4gICAgICAgICAgICBpZiAoZGF0YVtrXS5uYW1lLmluY2x1ZGVzKCd0ZXN0LnRzJykgIHx8IGRhdGFba10ubmFtZS5pbmNsdWRlcygnLmQudHMnKSkge1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8vIGNoZWNrcyB0byBtYWtlIHN1cmUgdGhhdCB0aGUgZmlsZSB0eXBlIGlzIGVpdGhlciAudHMgb3IgLnRzeFxuICAgICAgICAgICAgZWxzZSBpZiAoZGF0YVtrXS5uYW1lLnNwbGl0KCcuJykucG9wKCkgPT09ICd0cycgfHwgZGF0YVtrXS5uYW1lLnNwbGl0KCcuJykucG9wKCkgPT09ICd0c3gnKSB7XG4gICAgICAgICAgICAgICAgLy8vIGluaXRpYWxpemVzIGhpdE1hcFxuICAgICAgICAgICAgICAgIGN1cnJNYXAuc2V0KGRhdGFba10ucGF0aCwgMCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gXG4gICAgfVxufVxuXG4vKipcbiAqIHVwZGF0ZXMgdGhlIHZhbHVlIG9mIHRoZSBmaWxlIGluIHRoZSBoaXRNYXBcbiAqIEBwYXJhbSBjdXJyRnVsbFBhdGggXG4gKiBAcGFyYW0gY3Vyck1hcCBcbiAqL1xuZnVuY3Rpb24gdXBkYXRlSGl0TWFwIChjdXJyRnVsbFBhdGggOiBzdHJpbmcsIGN1cnJNYXAgOiBNYXA8c3RyaW5nLG51bWJlcj4pIHtcbiAgICBpZiAoY3VyckZ1bGxQYXRoICE9IHVuZGVmaW5lZCkge1xuICAgICAgICAvLy8gY2hlY2tzIHRvIHNlZSBpZiB0aGUgaGl0bWFwIGFscmVhZHkgaGFzIHRoYXQgcGF0aFxuICAgICAgICBpZiAoY3Vyck1hcC5oYXMoY3VyckZ1bGxQYXRoKSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgLy8vIGlmIGl0IGRvZXMgdGhlbiBpbmNyZW1lbnRzIHRoZSB2YWx1ZSBvZiB0aGF0IGZpbGUgYnkgMVxuICAgICAgICAgICAgdmFyIGN1cnJWYWwgPSBjdXJyTWFwLmdldChjdXJyRnVsbFBhdGgpO1xuICAgICAgICAgICAgaWYgKGN1cnJWYWwgIT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgY3Vyck1hcC5zZXQoY3VyckZ1bGxQYXRoLCBjdXJyVmFsICsgMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8vIGlmIHRoZSBoaXRtYXAgZG9lcyBub3QgaGF2ZSB0aGF0IHBhdGggYXMgYSBrZXkgYWxyZWFkeVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIC8vLyB0aGVuIHNldHMgdGhhdCBmaWxlIHBhdGggdG8gaGF2ZSBhIHZhbHVlIG9mIDFcbiAgICAgICAgICAgIGN1cnJNYXAuc2V0KGN1cnJGdWxsUGF0aCwgMSk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbi8qKlxuICogY2hlY2tzIHRvIG1ha2Ugc3VyZSB0aGF0IHRoZSBwYXRoIGV4aXN0cyAgICAgICAgICAgICAgICAgICAgICAgICBcbiAqIEBwYXJhbSBmaW5hbFBhdGggXG4gKi9cbmZ1bmN0aW9uIGNoZWNrRnVsbFBhdGggKGZpbmFsUGF0aCA6IHN0cmluZykgOiBzdHJpbmcge1xuICAgIGlmIChmcy5leGlzdHNTeW5jKGZpbmFsUGF0aCkgPT0gZmFsc2UpIHtcbiAgICAgICAgZmluYWxQYXRoID0gZmluYWxQYXRoICsgJ3gnO1xuICAgICAgICBpZiAoZnMuZXhpc3RzU3luYyhmaW5hbFBhdGgpID09IGZhbHNlKSB7XG4gICAgICAgICAgICBmaW5hbFBhdGggPSBmaW5hbFBhdGgucmVwbGFjZShmaW5hbFBhdGguc3Vic3RyaW5nKGZpbmFsUGF0aC5sZW5ndGgtMyksIFwiXCIpO1xuICAgICAgICAgICAgZmluYWxQYXRoID0gZmluYWxQYXRoICsgJ2QudHMnO1xuICAgICAgICAgICAgaWYgKGZpbmFsUGF0aC5pbmNsdWRlcygndXRpbHMuanMuZC50cycpKSB7XG4gICAgICAgICAgICAgICAgZmluYWxQYXRoID0gZmluYWxQYXRoLnJlcGxhY2UoZmluYWxQYXRoLnN1YnN0cmluZyhmaW5hbFBhdGgubGVuZ3RoLTcpLCBcIlwiKTtcbiAgICAgICAgICAgICAgICBmaW5hbFBhdGggPSBmaW5hbFBhdGggKyAndHMnO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGZzLmV4aXN0c1N5bmMoZmluYWxQYXRoKSA9PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihcIkZpbGUgZG9lcyBub3QgZXhpc3Q6IFwiICsgZmluYWxQYXRoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZmluYWxQYXRoO1xufVxuXG4vKipcbiAqIGNvbnZlcnRzIHRoYXQgZmlsZSBwYXRoIGludG8gYSBmdWxsIGZpbGUgcGF0aFxuICogQHBhcmFtIGN1cnJQYXRoIFxuICovXG5mdW5jdGlvbiBleHBhbmRQYXRoIChjdXJyUGF0aCA6IHN0cmluZykgOiBzdHJpbmcge1xuICAgIC8vLyBmaXhlcyB0aGUgcHVuY3R1YXRpb24gb2YgdGhlIGZpbGUgcGF0aCBvZiB0aGUgaW1wb3J0XG4gICAgY3VyclBhdGggPSBjdXJyUGF0aC5yZXBsYWNlKC9bJ1wiXSsvZywgJycpO1xuICAgIGlmIChjdXJyUGF0aC5pbmNsdWRlcygnLnRzJykgPT0gZmFsc2UpIHtcbiAgICAgICAgY3VyclBhdGggPSBjdXJyUGF0aC5yZXBsYWNlKGN1cnJQYXRoLnN1YnN0cmluZyhjdXJyUGF0aC5sZW5ndGgtMSksIFwiXCIpO1xuICAgICAgICBjdXJyUGF0aCA9IGN1cnJQYXRoICsgJy50cyc7XG4gICAgfVxuICAgIHJldHVybiBjdXJyUGF0aDtcbn1cblxuLyoqXG4gKiBTb3J0cyB0aGUgbWFwIGluIG9yZGVyIGJhc2VkIG9uIHRoZSBoaXQgdmFsdWVzIFxuICogQHBhcmFtIGN1cnJNYXAgXG4gKi9cbmZ1bmN0aW9uIHNvcnRNYXAoY3Vyck1hcCA6IE1hcDxzdHJpbmcsbnVtYmVyPikgOiBNYXA8c3RyaW5nLG51bWJlcj4ge1xuICAgIGN1cnJNYXBbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgIHlpZWxkKiBbLi4udGhpcy5lbnRyaWVzKCldLnNvcnQoKGEsIGIpID0+IGFbMV0gLSBiWzFdKTtcbiAgICB9XG4gICAgcmV0dXJuIGN1cnJNYXA7XG59XG5cbi8qKlxuICogc3dhcHMgdGhlIGtleSBhbmQgdGhlIHZhbHVlIG9mIHRoZSBtYXAsIHNvIHRoZSBudW1iZXIgb2YgaGl0cyBpcyBmb3JtYXR0ZWQgdG8gdGhlIGxlZnQgb2YgdGhlIGZ1bGwgZmlsZSBwYXRoXG4gKiBAcGFyYW0gY3Vyck1hcCBcbiAqL1xuZnVuY3Rpb24gc3dhcE1hcFZhbHVlcyhjdXJyTWFwIDogYW55W11bXSkgOiBhbnlbXVtdIHtcbiAgICB2YXIgZmluYWxIaXRNYXAgPSBbXTtcbiAgICBmb3IgKHZhciBpbmRleCA9IDA7IGluZGV4IDwgY3Vyck1hcC5sZW5ndGg7IGluZGV4KyspIHtcbiAgICAgICAgdmFyIGN1cnJlbnRBcnJheSA9IGN1cnJNYXBbaW5kZXhdO1xuICAgICAgICB2YXIga2V5ID0gY3VycmVudEFycmF5WzBdO1xuICAgICAgICB2YXIgdmFsdWUgPSBjdXJyZW50QXJyYXlbMV07XG4gICAgICAgIGZpbmFsSGl0TWFwW2luZGV4XSA9IFt2YWx1ZSwga2V5XTtcbiAgICB9XG4gICAgcmV0dXJuIGZpbmFsSGl0TWFwO1xufVxuXG4vKipcbiAqIHByaW50cyBvdXQgdGhlIGZpbmFsIE1hcFxuICogQHBhcmFtIGZpbmFsTWFwIFxuICovXG5mdW5jdGlvbiBwcmludE1hcChmaW5hbE1hcCA6IGFueVtdW10pIHtcbiAgICBmb3IgKHZhciBqID0gMDsgaiA8IGZpbmFsTWFwLmxlbmd0aDsgaisrKSB7XG4gICAgICAgIHZhciBjdXJyID0gZmluYWxNYXBbal07XG4gICAgICAgIGlmIChjdXJyWzFdLmluY2x1ZGVzKCdUZXN0JykgPT0gZmFsc2UgJiYgY3VyclsxXS5pbmNsdWRlcygndGVzdCcpID09IGZhbHNlKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhjdXJyWzBdLCAnICcsIGN1cnJbMV0pO1xuICAgICAgICB9XG4gICAgfVxufVxuXG4vKipcbiAqIGdldHMgdGhlIGV4dGVuc2lvbiBvZiB0aGUgZmlsZW5hbWVcbiAqIEBwYXJhbSBmaWxlbmFtZSBcbiAqL1xuZnVuY3Rpb24gZ2V0RXh0ZW5zaW9uIChmaWxlbmFtZSA6IHN0cmluZykgOiBzdHJpbmcge1xuICAgIHZhciBleHRlbnNpb24gPSBmaWxlbmFtZS5zcGxpdCgnLicpLnBvcCgpO1xuICAgIGlmIChleHRlbnNpb24gIT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJldHVybiBleHRlbnNpb247XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICByZXR1cm4gJ3VuZGVmaW5lZCc7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBtYWluKCkge1xuICAgIC8vLyB1c2VzIHByb2Nlc3MuYXJndiB0byBzZWUgdGFrZSBpbiBhbnkgbnVtYmVyIG9mIGRpcmVjdG9yaWVzIGluIHRoZSBjb21tYW5kIGxpbmVcbiAgICAvLy8gZXhhbXBsZTogbm9kZSBTZWFyY2guanMgL1VzZXJzL21paGlybWFjcHJvMTMvRG9jdW1lbnRzL0dpdEh1Yi9wb2xhci1ib29rc2hlbGYvd2ViL2pzIC9Vc2Vycy9taWhpcm1hY3BybzEzL0RvY3VtZW50cy9HaXRIdWIvcG9sYXItYm9va3NoZWxmL2FwcHNcbiAgICB2YXIgYXJndW1lbnQgPSBwcm9jZXNzLmFyZ3Y7XG4gICAgLy8vIGNyZWF0ZXMgYW4gZW1wdHkgbWFwXG4gICAgdmFyIGhpdE1hcCA9IG5ldyBNYXAoKTtcbiAgICBmb3IgKHZhciB4ID0gMjsgeCA8IGFyZ3VtZW50Lmxlbmd0aDsgeCsrKSB7XG4gICAgICAgIGNvbnN0IG9wdHMgPSBuZXcgRGVmYXVsdE9wdHMoKTtcbiAgICAgICAgdmFyIG15QXJncyA9IGFyZ3VtZW50W3hdO1xuICAgICAgICAvLy8gcmV0dXJucyBhbiBhcnJheSB3aXRoIGFsbCB0aGUgZmlsZXMgaW4gdGhlIGRpcmVjdG9yeVxuICAgICAgICB2YXIgZmlsZU1hcCA9IFNlYXJjaC5maW5kRmlsZXNSZWN1cnNpdmVseShteUFyZ3MsIG9wdHMpO1xuICAgICAgICAvLy8gaXRlcmF0ZXMgdGhyb3VnaCBlYWNoIGZpbGUgaW4gdGhlIGRpcmVjdG9yeSBhbmQgYWRkcyB0byB0aGUgbWFwXG4gICAgICAgIGluaXRpYWxpemVUeXBlc2NyaXB0TWFwRmlsZXMoZmlsZU1hcCwgaGl0TWFwKTtcblxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGZpbGVNYXAubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIC8vLyBtYXAgb2YgdGhlIGZpbGUgdHlwZSwgbmFtZSwgcGF0aCBcbiAgICAgICAgICAgIHZhciBmaWxlID0gZmlsZU1hcFtpXTtcbiAgICAgICAgICAgIHZhciBpbml0aWFsRmlsZU5hbWUgPSBmaWxlLm5hbWU7XG4gICAgICAgICAgICB2YXIgaW5pdGlhbEZpbGVQYXRoID0gZmlsZS5wYXRoO1xuICAgICAgICAgICAgdmFyIGV4dCA9IGdldEV4dGVuc2lvbihpbml0aWFsRmlsZU5hbWUpO1xuXG4gICAgICAgICAgICAvLy8gY2hlY2tzIHRvIHNlZSBpZiB0aGUgZmlsZSBuYW1lIGlzIHRlc3QudHNcbiAgICAgICAgICAgIC8vLyBpZiBpdCBpcyB0aGVuIGNvbnRpbnVlcyB0byB0aGUgbmV4dCBmaWxlXG4gICAgICAgICAgICBpZiAoZmlsZS5uYW1lLmluY2x1ZGVzKCd0ZXN0LnRzJykgIHx8IGZpbGUubmFtZS5pbmNsdWRlcygnLmQudHMnKSkge1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8vIGNoZWNrcyB0byBtYWtlIHN1cmUgdGhhdCB0aGUgZmlsZSB0eXBlIGlzIGVpdGhlciAudHMgb3IgLnRzeFxuICAgICAgICAgICAgZWxzZSBpZiAoWyd0cycsJ3RzeCddLmluY2x1ZGVzKGV4dCkpIHtcbiAgICAgICAgICAgICAgICAvLy8gZ2V0cyBhbGwgdGhlIGNvbnRlbnRzIG9mIHRoZSBjdXJyZW50IGZpbGVcbiAgICAgICAgICAgICAgICBjb25zdCBkYXRhID0gZnMucmVhZEZpbGVTeW5jKGluaXRpYWxGaWxlUGF0aCwndXRmOCcpO1xuICAgICAgICAgICAgICAgIC8vLyBzcGxpdHMgZWFjaCBsaW5lIG9mIGRhdGEgdG8gYWxsb3cgdXMgdG8gcGFyc2UgdGhyb3VnaCBlYWNoIG9uZVxuICAgICAgICAgICAgICAgIGNvbnN0IGxpbmVzID0gZGF0YS5zcGxpdCgvXFxyP1xcbi8pO1xuICAgICAgICAgICAgICAgIC8vLyBjcmVhdGVzIGEgcmVndWxhciBleHByZXNzaW9uIGZvciB0aGUgaW1wb3J0IGxpbmVzXG4gICAgICAgICAgICAgICAgY29uc3QgcmUgPSAvaW1wb3J0KD86W1wiJ1xcc10qKFtcXHcqe31cXG5cXHJcXHQsIF0rKWZyb21cXHMqKT9bXCInXFxzXS4qKFtAXFx3Xy1dKylbXCInXFxzXS4qOyQvO1xuICAgICAgICAgICAgICAgIC8vLyBpdGVyYXRlcyB0aHJvdWdoIGVhY2ggbGluZSBvZiB0aGUgZmlsZVxuICAgICAgICAgICAgICAgIGxpbmVzLmZvckVhY2goKGxpbmUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgLy8vIGNoZWNrcyB0byBzZWUgaWYgdGhlIGxpbmUgbWF0Y2hlcyB0aGUgZm9ybWF0IG9mIHRoZSByZWd1bGFyIGV4cHJlc3Npb25cbiAgICAgICAgICAgICAgICAgICAgdmFyIGltcG9ydExpbmUgPSBsaW5lLm1hdGNoKHJlKTtcbiAgICAgICAgICAgICAgICAgICAgLy8vIG1ha2VzIHN1cmUgdGhhdCB0aGUgbGluZSBhY3R1YWxseSBoYXMgdGhlIHByb3BlciBmb3JtYXQgb2YgdGhlIHJlZ0V4XG4gICAgICAgICAgICAgICAgICAgIGlmIChpbXBvcnRMaW5lICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vLyBnZXRzIHRoZSBlbnRpcmUgaW1wb3J0IGxpbmVzIGNvbnRlbnRzXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgaW1wb3J0VmFsID0gaW1wb3J0TGluZVswXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vLyBzcGxpdHMgdGhlIGxpbmUgYmFzZWQgb2ZmIHNwYWNlcyBhbmQgZ2V0cyBvbmx5IHRoZSBmaWxlIHBhdGhcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBmaWxlUGF0aCA9IGltcG9ydFZhbC5zcGxpdCgnICcpLnBvcCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGZ1bGxQYXRoO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8vIGNvbnZlcnRzIHRoYXQgZmlsZSBwYXRoIGludG8gYSBmdWxsIGZpbGUgcGF0aFxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGZpbGVQYXRoICE9IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChmaWxlUGF0aC5pbmNsdWRlcygnLi8nKSB8fCBmaWxlUGF0aC5pbmNsdWRlcygnLi4vJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsZVBhdGggPSBleHBhbmRQYXRoKGZpbGVQYXRoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8vIGNyZWF0ZXMgdGhlIGZ1bGwgcGF0aCB3aXRoIHRoZSBwcm9wZXIgZGlyZWN0b3J5IG5hbWVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGZ1bGxEaXJlY3RvcnkgPSBwYXRoLmRpcm5hbWUoaW5pdGlhbEZpbGVQYXRoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZnVsbFBhdGggPSBwYXRoLnJlc29sdmUoZnVsbERpcmVjdG9yeSwgZmlsZVBhdGgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmdWxsUGF0aCA9IGNoZWNrRnVsbFBhdGgoZnVsbFBhdGgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChmdWxsUGF0aCAhPSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLy8gdXBkYXRlcyB0aGUgdmFsdWUgb2YgdGhlIGZpbGUgaW4gdGhlIGhpdE1hcFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVwZGF0ZUhpdE1hcChmdWxsUGF0aCwgaGl0TWFwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIC8vLyBzb3J0cyB0aGUgbWFwIGJhc2VkIG9uIHZhbHVlc1xuICAgIGhpdE1hcCA9IHNvcnRNYXAoaGl0TWFwKTtcbiAgICAvLy8gbWFrZXMgdGhlIG1hcCBpbnRvIGEgdGFibGUgdHlwZSBmb3JtYXQgd2l0aCBhIG5lc3RlZCBhcnJheVxuICAgIHZhciB1cGRhdGVkSGl0TWFwID0gWy4uLmhpdE1hcF07XG4gICAgLy8vIHN3YXBzIHRoZSBrZXkgYW5kIHZhbHVlXG4gICAgdmFyIGZpbmFsTWFwID0gc3dhcE1hcFZhbHVlcyh1cGRhdGVkSGl0TWFwKTtcbiAgICAvLy8gcHJpbnRzIHRoZSBtYXAgb3V0IGluIHRhYmxlIGZvcm1hdCAoZm9ybWF0OiBoaXRWYWx1ZSAuLi4gW3RhYl0gLi4uIFBhdGgpXG4gICAgcHJpbnRNYXAoZmluYWxNYXApO1xufVxuXG4vLy8gcnVucyB0aGUgbWFpbiBmdW5jdGlvbiBhbmQgcHJpbnRzIG91dCB0aGUgdGFibGUgd2l0aCB0aGUgbnVtYmVyIG9mIGhpdHMgYXMgdGhlIGtleSBhbmQgdGhlIHBhdGggYXMgdGhlIHZhbHVlXG5tYWluKCk7ICJdfQ==