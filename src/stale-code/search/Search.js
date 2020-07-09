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
exports.main = void 0;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const find_1 = require("./find");
const find_2 = require("./find");
const find_3 = require("./find");
function main() {
    var argument = process.argv;
    var hitMap = new Map();
    for (var x = 2; x < argument.length; x++) {
        const opts = new find_2.DefaultOpts();
        var myArgs = argument[x];
        var fileMap = find_1.Search.findFilesRecursively(myArgs, opts);
        hitMap = find_3.Stale.initializeTypescriptMapFiles(fileMap, hitMap);
        for (var i = 0; i < fileMap.length; i++) {
            var file = fileMap[i];
            var initialFileName = file.name;
            var initialFilePath = file.path;
            var ext = find_3.Stale.getExtension(initialFileName);
            if (file.name.includes('test.ts') || file.name.includes('.d.ts')) {
                continue;
            }
            else if (ext != undefined && ['ts', 'tsx'].includes(ext)) {
                const data = fs.readFileSync(initialFilePath, 'utf8');
                const importArray = find_3.Stale.parseImports(data);
                if ([undefined, null].includes(importArray)) {
                    continue;
                }
                for (var val = 0; val < importArray.length; val++) {
                    var importLine = importArray[val];
                    var filePath = importLine.split(' ').pop();
                    var fullPath;
                    if (filePath != undefined) {
                        if (filePath.includes('./') || filePath.includes('../')) {
                            filePath = find_3.Stale.expandPath(filePath);
                            var fullDirectory = path.dirname(initialFilePath);
                            fullPath = path.resolve(fullDirectory, filePath);
                            fullPath = find_3.Stale.checkFullPath(fullPath);
                        }
                    }
                    if (fullPath != undefined) {
                        hitMap = find_3.Stale.updateHitMap(fullPath, hitMap);
                    }
                }
                ;
            }
        }
    }
    hitMap = find_3.Stale.sortMap(hitMap);
    var updatedHitMap = [...hitMap];
    var finalMap = find_3.Stale.swapMapValues(updatedHitMap);
    var finalArray = find_3.Stale.isNotStale(finalMap);
    find_3.Stale.printMap(finalArray);
}
exports.main = main;
main();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2VhcmNoLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU2VhcmNoLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFQSx1Q0FBeUI7QUFDekIsMkNBQTZCO0FBQzdCLGlDQUE4QjtBQUM5QixpQ0FBbUM7QUFDbkMsaUNBQStCO0FBRS9CLFNBQWdCLElBQUk7SUFHaEIsSUFBSSxRQUFRLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQztJQUU1QixJQUFJLE1BQU0sR0FBRyxJQUFJLEdBQUcsRUFBRSxDQUFDO0lBQ3ZCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQ3RDLE1BQU0sSUFBSSxHQUFHLElBQUksa0JBQVcsRUFBRSxDQUFDO1FBQy9CLElBQUksTUFBTSxHQUFHLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUV6QixJQUFJLE9BQU8sR0FBRyxhQUFNLENBQUMsb0JBQW9CLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBRXhELE1BQU0sR0FBRyxZQUFLLENBQUMsNEJBQTRCLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBRTdELEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBRXJDLElBQUksSUFBSSxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN0QixJQUFJLGVBQWUsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO1lBQ2hDLElBQUksZUFBZSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDaEMsSUFBSSxHQUFHLEdBQUcsWUFBSyxDQUFDLFlBQVksQ0FBQyxlQUFlLENBQUMsQ0FBQztZQUk5QyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxJQUFLLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxFQUFFO2dCQUMvRCxTQUFTO2FBQ1o7aUJBRUksSUFBSSxHQUFHLElBQUksU0FBUyxJQUFJLENBQUMsSUFBSSxFQUFDLEtBQUssQ0FBQyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsRUFBRTtnQkFFckQsTUFBTSxJQUFJLEdBQUcsRUFBRSxDQUFDLFlBQVksQ0FBQyxlQUFlLEVBQUMsTUFBTSxDQUFDLENBQUM7Z0JBRXJELE1BQU0sV0FBVyxHQUFHLFlBQUssQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBRTdDLElBQUksQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxFQUFFO29CQUN6QyxTQUFTO2lCQUNaO2dCQUVELEtBQUssSUFBSSxHQUFHLEdBQUcsQ0FBQyxFQUFFLEdBQUcsR0FBRyxXQUFXLENBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRSxFQUFFO29CQUMvQyxJQUFJLFVBQVUsR0FBRyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUM7b0JBRWxDLElBQUksUUFBUSxHQUFHLFVBQVUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUM7b0JBQzNDLElBQUksUUFBUSxDQUFDO29CQUViLElBQUksUUFBUSxJQUFJLFNBQVMsRUFBRTt3QkFDdkIsSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEVBQUU7NEJBQ3JELFFBQVEsR0FBRyxZQUFLLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDOzRCQUV0QyxJQUFJLGFBQWEsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLGVBQWUsQ0FBQyxDQUFDOzRCQUNsRCxRQUFRLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLEVBQUUsUUFBUSxDQUFDLENBQUM7NEJBQ2pELFFBQVEsR0FBRyxZQUFLLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDO3lCQUM1QztxQkFDSjtvQkFDRCxJQUFJLFFBQVEsSUFBSSxTQUFTLEVBQUU7d0JBRXZCLE1BQU0sR0FBRyxZQUFLLENBQUMsWUFBWSxDQUFDLFFBQVEsRUFBRSxNQUFNLENBQUMsQ0FBQztxQkFDakQ7aUJBQ0o7Z0JBQUEsQ0FBQzthQUNMO1NBQ0o7S0FDSjtJQUVELE1BQU0sR0FBRyxZQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBRS9CLElBQUksYUFBYSxHQUFHLENBQUMsR0FBRyxNQUFNLENBQUMsQ0FBQztJQUVoQyxJQUFJLFFBQVEsR0FBRyxZQUFLLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBRWxELElBQUksVUFBVSxHQUFHLFlBQUssQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUM7SUFFNUMsWUFBSyxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQztBQUMvQixDQUFDO0FBdEVELG9CQXNFQztBQUdELElBQUksRUFBRSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLy8vIFwiQE5vdFN0YWxlXCJcbmltcG9ydCBFcnJub0V4Y2VwdGlvbiA9IE5vZGVKUy5FcnJub0V4Y2VwdGlvbjtcbmltcG9ydCAqIGFzIGZzIGZyb20gXCJmc1wiO1xuaW1wb3J0ICogYXMgcGF0aCBmcm9tICdwYXRoJztcbmltcG9ydCB7U2VhcmNofSBmcm9tIFwiLi9maW5kXCI7XG5pbXBvcnQge0RlZmF1bHRPcHRzfSBmcm9tIFwiLi9maW5kXCI7XG5pbXBvcnQgeyBTdGFsZSB9IGZyb20gXCIuL2ZpbmRcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIG1haW4oKSB7XG4gICAgLy8vIHVzZXMgcHJvY2Vzcy5hcmd2IHRvIHNlZSB0YWtlIGluIGFueSBudW1iZXIgb2YgZGlyZWN0b3JpZXMgaW4gdGhlIGNvbW1hbmQgbGluZVxuICAgIC8vLyBleGFtcGxlOiBub2RlIFNlYXJjaC5qcyAvVXNlcnMvbWloaXJtYWNwcm8xMy9Eb2N1bWVudHMvR2l0SHViL3BvbGFyLWJvb2tzaGVsZi93ZWIvanMgL1VzZXJzL21paGlybWFjcHJvMTMvRG9jdW1lbnRzL0dpdEh1Yi9wb2xhci1ib29rc2hlbGYvYXBwc1xuICAgIHZhciBhcmd1bWVudCA9IHByb2Nlc3MuYXJndjtcbiAgICAvLy8gY3JlYXRlcyBhbiBlbXB0eSBtYXBcbiAgICB2YXIgaGl0TWFwID0gbmV3IE1hcCgpO1xuICAgIGZvciAodmFyIHggPSAyOyB4IDwgYXJndW1lbnQubGVuZ3RoOyB4KyspIHtcbiAgICAgICAgY29uc3Qgb3B0cyA9IG5ldyBEZWZhdWx0T3B0cygpO1xuICAgICAgICB2YXIgbXlBcmdzID0gYXJndW1lbnRbeF07XG4gICAgICAgIC8vLyByZXR1cm5zIGFuIGFycmF5IHdpdGggYWxsIHRoZSBmaWxlcyBpbiB0aGUgZGlyZWN0b3J5XG4gICAgICAgIHZhciBmaWxlTWFwID0gU2VhcmNoLmZpbmRGaWxlc1JlY3Vyc2l2ZWx5KG15QXJncywgb3B0cyk7XG4gICAgICAgIC8vLyBpdGVyYXRlcyB0aHJvdWdoIGVhY2ggZmlsZSBpbiB0aGUgZGlyZWN0b3J5IGFuZCBhZGRzIHRvIHRoZSBtYXBcbiAgICAgICAgaGl0TWFwID0gU3RhbGUuaW5pdGlhbGl6ZVR5cGVzY3JpcHRNYXBGaWxlcyhmaWxlTWFwLCBoaXRNYXApO1xuXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZmlsZU1hcC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgLy8vIG1hcCBvZiB0aGUgZmlsZSB0eXBlLCBuYW1lLCBwYXRoIFxuICAgICAgICAgICAgdmFyIGZpbGUgPSBmaWxlTWFwW2ldO1xuICAgICAgICAgICAgdmFyIGluaXRpYWxGaWxlTmFtZSA9IGZpbGUubmFtZTtcbiAgICAgICAgICAgIHZhciBpbml0aWFsRmlsZVBhdGggPSBmaWxlLnBhdGg7XG4gICAgICAgICAgICB2YXIgZXh0ID0gU3RhbGUuZ2V0RXh0ZW5zaW9uKGluaXRpYWxGaWxlTmFtZSk7XG5cbiAgICAgICAgICAgIC8vLyBjaGVja3MgdG8gc2VlIGlmIHRoZSBmaWxlIG5hbWUgaXMgdGVzdC50c1xuICAgICAgICAgICAgLy8vIGlmIGl0IGlzIHRoZW4gY29udGludWVzIHRvIHRoZSBuZXh0IGZpbGVcbiAgICAgICAgICAgIGlmIChmaWxlLm5hbWUuaW5jbHVkZXMoJ3Rlc3QudHMnKSAgfHwgZmlsZS5uYW1lLmluY2x1ZGVzKCcuZC50cycpKSB7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLy8gY2hlY2tzIHRvIG1ha2Ugc3VyZSB0aGF0IHRoZSBmaWxlIHR5cGUgaXMgZWl0aGVyIC50cyBvciAudHN4XG4gICAgICAgICAgICBlbHNlIGlmIChleHQgIT0gdW5kZWZpbmVkICYmIFsndHMnLCd0c3gnXS5pbmNsdWRlcyhleHQpKSB7XG4gICAgICAgICAgICAgICAgLy8vIGdldHMgYWxsIHRoZSBjb250ZW50cyBvZiB0aGUgY3VycmVudCBmaWxlXG4gICAgICAgICAgICAgICAgY29uc3QgZGF0YSA9IGZzLnJlYWRGaWxlU3luYyhpbml0aWFsRmlsZVBhdGgsJ3V0ZjgnKTtcbiAgICAgICAgICAgICAgICAvLy8gZ2V0cyBhbiBhcnJheSBvZiBhbGwgaW1wb3J0cyBpbiB0aGUgZmlsZVxuICAgICAgICAgICAgICAgIGNvbnN0IGltcG9ydEFycmF5ID0gU3RhbGUucGFyc2VJbXBvcnRzKGRhdGEpO1xuICAgICAgICAgICAgICAgIC8vLyBtYWtlcyBzdXJlIHRoYXQgdGhlIGltcG9ydEFycmF5IGlzIG5vdCB1bmRlZmluZWQgb3IgbnVsbFxuICAgICAgICAgICAgICAgIGlmIChbdW5kZWZpbmVkLCBudWxsXS5pbmNsdWRlcyhpbXBvcnRBcnJheSkpIHtcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vLyBpdGVyYXRlcyB0aHJvdWdoIGVhY2ggaW1wb3J0IG9mIHRoZSBmaWxlIHdoaWNoIGlzIHN0b3JlZCBpbiB0aGUgYXJyYXlcbiAgICAgICAgICAgICAgICBmb3IgKHZhciB2YWwgPSAwOyB2YWwgPCBpbXBvcnRBcnJheS5sZW5ndGg7IHZhbCsrKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBpbXBvcnRMaW5lID0gaW1wb3J0QXJyYXlbdmFsXTtcbiAgICAgICAgICAgICAgICAgICAgLy8vIHNwbGl0cyB0aGUgbGluZSBiYXNlZCBvZmYgc3BhY2VzIGFuZCBnZXRzIG9ubHkgdGhlIGZpbGUgcGF0aFxuICAgICAgICAgICAgICAgICAgICB2YXIgZmlsZVBhdGggPSBpbXBvcnRMaW5lLnNwbGl0KCcgJykucG9wKCk7XG4gICAgICAgICAgICAgICAgICAgIHZhciBmdWxsUGF0aDtcbiAgICAgICAgICAgICAgICAgICAgLy8vIGNvbnZlcnRzIHRoYXQgZmlsZSBwYXRoIGludG8gYSBmdWxsIGZpbGUgcGF0aFxuICAgICAgICAgICAgICAgICAgICBpZiAoZmlsZVBhdGggIT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZmlsZVBhdGguaW5jbHVkZXMoJy4vJykgfHwgZmlsZVBhdGguaW5jbHVkZXMoJy4uLycpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsZVBhdGggPSBTdGFsZS5leHBhbmRQYXRoKGZpbGVQYXRoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLy8gY3JlYXRlcyB0aGUgZnVsbCBwYXRoIHdpdGggdGhlIHByb3BlciBkaXJlY3RvcnkgbmFtZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBmdWxsRGlyZWN0b3J5ID0gcGF0aC5kaXJuYW1lKGluaXRpYWxGaWxlUGF0aCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZnVsbFBhdGggPSBwYXRoLnJlc29sdmUoZnVsbERpcmVjdG9yeSwgZmlsZVBhdGgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZ1bGxQYXRoID0gU3RhbGUuY2hlY2tGdWxsUGF0aChmdWxsUGF0aCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKGZ1bGxQYXRoICE9IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8vIHVwZGF0ZXMgdGhlIHZhbHVlIG9mIHRoZSBmaWxlIGluIHRoZSBoaXRNYXBcbiAgICAgICAgICAgICAgICAgICAgICAgIGhpdE1hcCA9IFN0YWxlLnVwZGF0ZUhpdE1hcChmdWxsUGF0aCwgaGl0TWFwKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgLy8vIHNvcnRzIHRoZSBtYXAgYmFzZWQgb24gdmFsdWVzXG4gICAgaGl0TWFwID0gU3RhbGUuc29ydE1hcChoaXRNYXApO1xuICAgIC8vLyBtYWtlcyB0aGUgbWFwIGludG8gYSB0YWJsZSB0eXBlIGZvcm1hdCB3aXRoIGEgbmVzdGVkIGFycmF5XG4gICAgdmFyIHVwZGF0ZWRIaXRNYXAgPSBbLi4uaGl0TWFwXTtcbiAgICAvLy8gc3dhcHMgdGhlIGtleSBhbmQgdmFsdWVcbiAgICB2YXIgZmluYWxNYXAgPSBTdGFsZS5zd2FwTWFwVmFsdWVzKHVwZGF0ZWRIaXRNYXApO1xuICAgIC8vLyByZW1vdmVzIGZpbGVzIHRoYXQgY29udGFpbiBub3Qgc3RhbGUgdGFnIGZyb20gdGhlIGZpbmFsIHJlc3VsdFxuICAgIHZhciBmaW5hbEFycmF5ID0gU3RhbGUuaXNOb3RTdGFsZShmaW5hbE1hcCk7XG4gICAgLy8vIHByaW50cyB0aGUgbWFwIG91dCBpbiB0YWJsZSBmb3JtYXQgKGZvcm1hdDogaGl0VmFsdWUgLi4uIFt0YWJdIC4uLiBQYXRoKVxuICAgIFN0YWxlLnByaW50TWFwKGZpbmFsQXJyYXkpO1xufVxuXG4vLy8gcnVucyB0aGUgbWFpbiBmdW5jdGlvbiBhbmQgcHJpbnRzIG91dCB0aGUgdGFibGUgd2l0aCB0aGUgbnVtYmVyIG9mIGhpdHMgYXMgdGhlIGtleSBhbmQgdGhlIHBhdGggYXMgdGhlIHZhbHVlXG5tYWluKCk7ICJdfQ==