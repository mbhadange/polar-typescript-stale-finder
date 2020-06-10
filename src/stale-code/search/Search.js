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
                var isStaleCode = find_3.Stale.isNotStale(initialFilePath);
                if (isStaleCode == true) {
                    hitMap.delete(initialFilePath);
                    continue;
                }
                const data = fs.readFileSync(initialFilePath, 'utf8');
                const lines = data.split(/\r?\n/);
                const re = /import(?:["'\s]*([\w*{}\n\r\t, ]+)from\s*)?["'\s].*([@\w_-]+)["'\s].*;$/;
                var fullPath;
                lines.forEach((line) => {
                    var importLine = line.match(re);
                    if (importLine != null) {
                        var importVal = importLine[0];
                        var filePath = importVal.split(' ').pop();
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
                });
            }
        }
    }
    hitMap = find_3.Stale.sortMap(hitMap);
    var updatedHitMap = [...hitMap];
    var finalMap = find_3.Stale.swapMapValues(updatedHitMap);
    find_3.Stale.printMap(finalMap);
}
exports.main = main;
main();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2VhcmNoLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU2VhcmNoLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFQSx1Q0FBeUI7QUFDekIsMkNBQTZCO0FBQzdCLGlDQUE4QjtBQUM5QixpQ0FBbUM7QUFDbkMsaUNBQStCO0FBRS9CLFNBQWdCLElBQUk7SUFHaEIsSUFBSSxRQUFRLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQztJQUU1QixJQUFJLE1BQU0sR0FBRyxJQUFJLEdBQUcsRUFBRSxDQUFDO0lBQ3ZCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQ3RDLE1BQU0sSUFBSSxHQUFHLElBQUksa0JBQVcsRUFBRSxDQUFDO1FBQy9CLElBQUksTUFBTSxHQUFHLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUV6QixJQUFJLE9BQU8sR0FBRyxhQUFNLENBQUMsb0JBQW9CLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBRXhELE1BQU0sR0FBRyxZQUFLLENBQUMsNEJBQTRCLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBRTdELEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBRXJDLElBQUksSUFBSSxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN0QixJQUFJLGVBQWUsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO1lBQ2hDLElBQUksZUFBZSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDaEMsSUFBSSxHQUFHLEdBQUcsWUFBSyxDQUFDLFlBQVksQ0FBQyxlQUFlLENBQUMsQ0FBQztZQUk5QyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxJQUFLLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxFQUFFO2dCQUMvRCxTQUFTO2FBQ1o7aUJBRUksSUFBSSxHQUFHLElBQUksU0FBUyxJQUFJLENBQUMsSUFBSSxFQUFDLEtBQUssQ0FBQyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsRUFBRTtnQkFFckQsSUFBSSxXQUFXLEdBQUcsWUFBSyxDQUFDLFVBQVUsQ0FBQyxlQUFlLENBQUMsQ0FBQztnQkFDcEQsSUFBSSxXQUFXLElBQUksSUFBSSxFQUFFO29CQUNyQixNQUFNLENBQUMsTUFBTSxDQUFDLGVBQWUsQ0FBQyxDQUFDO29CQUMvQixTQUFTO2lCQUNaO2dCQUVELE1BQU0sSUFBSSxHQUFHLEVBQUUsQ0FBQyxZQUFZLENBQUMsZUFBZSxFQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUVyRCxNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUVsQyxNQUFNLEVBQUUsR0FBRyx5RUFBeUUsQ0FBQztnQkFFckYsSUFBSSxRQUFnQixDQUFDO2dCQUNyQixLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7b0JBRW5CLElBQUksVUFBVSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUM7b0JBRWhDLElBQUksVUFBVSxJQUFJLElBQUksRUFBRTt3QkFFcEIsSUFBSSxTQUFTLEdBQUcsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUU5QixJQUFJLFFBQVEsR0FBRyxTQUFTLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDO3dCQUUxQyxJQUFJLFFBQVEsSUFBSSxTQUFTLEVBQUU7NEJBQ3ZCLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxFQUFFO2dDQUNyRCxRQUFRLEdBQUcsWUFBSyxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQztnQ0FFdEMsSUFBSSxhQUFhLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUMsQ0FBQztnQ0FDbEQsUUFBUSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxFQUFFLFFBQVEsQ0FBQyxDQUFDO2dDQUNqRCxRQUFRLEdBQUcsWUFBSyxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQzs2QkFDNUM7eUJBQ0o7d0JBQ0QsSUFBSSxRQUFRLElBQUksU0FBUyxFQUFFOzRCQUV2QixNQUFNLEdBQUcsWUFBSyxDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDLENBQUM7eUJBQ2pEO3FCQUNKO2dCQUNMLENBQUMsQ0FBQyxDQUFDO2FBQ047U0FDSjtLQUNKO0lBRUQsTUFBTSxHQUFHLFlBQUssQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7SUFFL0IsSUFBSSxhQUFhLEdBQUcsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxDQUFDO0lBRWhDLElBQUksUUFBUSxHQUFHLFlBQUssQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDLENBQUM7SUFFbEQsWUFBSyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUM3QixDQUFDO0FBOUVELG9CQThFQztBQUdELElBQUksRUFBRSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLy8vIFwiQE5vdFN0YWxlXCJcbmltcG9ydCBFcnJub0V4Y2VwdGlvbiA9IE5vZGVKUy5FcnJub0V4Y2VwdGlvbjtcbmltcG9ydCAqIGFzIGZzIGZyb20gXCJmc1wiO1xuaW1wb3J0ICogYXMgcGF0aCBmcm9tICdwYXRoJztcbmltcG9ydCB7U2VhcmNofSBmcm9tIFwiLi9maW5kXCI7XG5pbXBvcnQge0RlZmF1bHRPcHRzfSBmcm9tIFwiLi9maW5kXCI7XG5pbXBvcnQgeyBTdGFsZSB9IGZyb20gXCIuL2ZpbmRcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIG1haW4oKSB7XG4gICAgLy8vIHVzZXMgcHJvY2Vzcy5hcmd2IHRvIHNlZSB0YWtlIGluIGFueSBudW1iZXIgb2YgZGlyZWN0b3JpZXMgaW4gdGhlIGNvbW1hbmQgbGluZVxuICAgIC8vLyBleGFtcGxlOiBub2RlIFNlYXJjaC5qcyAvVXNlcnMvbWloaXJtYWNwcm8xMy9Eb2N1bWVudHMvR2l0SHViL3BvbGFyLWJvb2tzaGVsZi93ZWIvanMgL1VzZXJzL21paGlybWFjcHJvMTMvRG9jdW1lbnRzL0dpdEh1Yi9wb2xhci1ib29rc2hlbGYvYXBwc1xuICAgIHZhciBhcmd1bWVudCA9IHByb2Nlc3MuYXJndjtcbiAgICAvLy8gY3JlYXRlcyBhbiBlbXB0eSBtYXBcbiAgICB2YXIgaGl0TWFwID0gbmV3IE1hcCgpO1xuICAgIGZvciAodmFyIHggPSAyOyB4IDwgYXJndW1lbnQubGVuZ3RoOyB4KyspIHtcbiAgICAgICAgY29uc3Qgb3B0cyA9IG5ldyBEZWZhdWx0T3B0cygpO1xuICAgICAgICB2YXIgbXlBcmdzID0gYXJndW1lbnRbeF07XG4gICAgICAgIC8vLyByZXR1cm5zIGFuIGFycmF5IHdpdGggYWxsIHRoZSBmaWxlcyBpbiB0aGUgZGlyZWN0b3J5XG4gICAgICAgIHZhciBmaWxlTWFwID0gU2VhcmNoLmZpbmRGaWxlc1JlY3Vyc2l2ZWx5KG15QXJncywgb3B0cyk7XG4gICAgICAgIC8vLyBpdGVyYXRlcyB0aHJvdWdoIGVhY2ggZmlsZSBpbiB0aGUgZGlyZWN0b3J5IGFuZCBhZGRzIHRvIHRoZSBtYXBcbiAgICAgICAgaGl0TWFwID0gU3RhbGUuaW5pdGlhbGl6ZVR5cGVzY3JpcHRNYXBGaWxlcyhmaWxlTWFwLCBoaXRNYXApO1xuXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZmlsZU1hcC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgLy8vIG1hcCBvZiB0aGUgZmlsZSB0eXBlLCBuYW1lLCBwYXRoIFxuICAgICAgICAgICAgdmFyIGZpbGUgPSBmaWxlTWFwW2ldO1xuICAgICAgICAgICAgdmFyIGluaXRpYWxGaWxlTmFtZSA9IGZpbGUubmFtZTtcbiAgICAgICAgICAgIHZhciBpbml0aWFsRmlsZVBhdGggPSBmaWxlLnBhdGg7XG4gICAgICAgICAgICB2YXIgZXh0ID0gU3RhbGUuZ2V0RXh0ZW5zaW9uKGluaXRpYWxGaWxlTmFtZSk7XG5cbiAgICAgICAgICAgIC8vLyBjaGVja3MgdG8gc2VlIGlmIHRoZSBmaWxlIG5hbWUgaXMgdGVzdC50c1xuICAgICAgICAgICAgLy8vIGlmIGl0IGlzIHRoZW4gY29udGludWVzIHRvIHRoZSBuZXh0IGZpbGVcbiAgICAgICAgICAgIGlmIChmaWxlLm5hbWUuaW5jbHVkZXMoJ3Rlc3QudHMnKSAgfHwgZmlsZS5uYW1lLmluY2x1ZGVzKCcuZC50cycpKSB7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLy8gY2hlY2tzIHRvIG1ha2Ugc3VyZSB0aGF0IHRoZSBmaWxlIHR5cGUgaXMgZWl0aGVyIC50cyBvciAudHN4XG4gICAgICAgICAgICBlbHNlIGlmIChleHQgIT0gdW5kZWZpbmVkICYmIFsndHMnLCd0c3gnXS5pbmNsdWRlcyhleHQpKSB7XG4gICAgICAgICAgICAgICAgLy8vIGtub3dzIGlmIGZpbGUgaW5jbHVkZXMgXCJAU3RhbGVDb2RlXCIgLi4uIGlmIGl0IGRvZXMgdGhlbiBza2lwcyB0aGF0IGZpbGVcbiAgICAgICAgICAgICAgICB2YXIgaXNTdGFsZUNvZGUgPSBTdGFsZS5pc05vdFN0YWxlKGluaXRpYWxGaWxlUGF0aCk7XG4gICAgICAgICAgICAgICAgaWYgKGlzU3RhbGVDb2RlID09IHRydWUpIHtcbiAgICAgICAgICAgICAgICAgICAgaGl0TWFwLmRlbGV0ZShpbml0aWFsRmlsZVBhdGgpO1xuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8vIGdldHMgYWxsIHRoZSBjb250ZW50cyBvZiB0aGUgY3VycmVudCBmaWxlXG4gICAgICAgICAgICAgICAgY29uc3QgZGF0YSA9IGZzLnJlYWRGaWxlU3luYyhpbml0aWFsRmlsZVBhdGgsJ3V0ZjgnKTtcbiAgICAgICAgICAgICAgICAvLy8gc3BsaXRzIGVhY2ggbGluZSBvZiBkYXRhIHRvIGFsbG93IHVzIHRvIHBhcnNlIHRocm91Z2ggZWFjaCBvbmVcbiAgICAgICAgICAgICAgICBjb25zdCBsaW5lcyA9IGRhdGEuc3BsaXQoL1xccj9cXG4vKTtcbiAgICAgICAgICAgICAgICAvLy8gY3JlYXRlcyBhIHJlZ3VsYXIgZXhwcmVzc2lvbiBmb3IgdGhlIGltcG9ydCBsaW5lc1xuICAgICAgICAgICAgICAgIGNvbnN0IHJlID0gL2ltcG9ydCg/OltcIidcXHNdKihbXFx3Knt9XFxuXFxyXFx0LCBdKylmcm9tXFxzKik/W1wiJ1xcc10uKihbQFxcd18tXSspW1wiJ1xcc10uKjskLztcbiAgICAgICAgICAgICAgICAvLy8gaXRlcmF0ZXMgdGhyb3VnaCBlYWNoIGxpbmUgb2YgdGhlIGZpbGVcbiAgICAgICAgICAgICAgICB2YXIgZnVsbFBhdGg6IHN0cmluZztcbiAgICAgICAgICAgICAgICBsaW5lcy5mb3JFYWNoKChsaW5lKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIC8vLyBjaGVja3MgdG8gc2VlIGlmIHRoZSBsaW5lIG1hdGNoZXMgdGhlIGZvcm1hdCBvZiB0aGUgcmVndWxhciBleHByZXNzaW9uXG4gICAgICAgICAgICAgICAgICAgIHZhciBpbXBvcnRMaW5lID0gbGluZS5tYXRjaChyZSk7XG4gICAgICAgICAgICAgICAgICAgIC8vLyBtYWtlcyBzdXJlIHRoYXQgdGhlIGxpbmUgYWN0dWFsbHkgaGFzIHRoZSBwcm9wZXIgZm9ybWF0IG9mIHRoZSByZWdFeFxuICAgICAgICAgICAgICAgICAgICBpZiAoaW1wb3J0TGluZSAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLy8gZ2V0cyB0aGUgZW50aXJlIGltcG9ydCBsaW5lcyBjb250ZW50c1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGltcG9ydFZhbCA9IGltcG9ydExpbmVbMF07XG4gICAgICAgICAgICAgICAgICAgICAgICAvLy8gc3BsaXRzIHRoZSBsaW5lIGJhc2VkIG9mZiBzcGFjZXMgYW5kIGdldHMgb25seSB0aGUgZmlsZSBwYXRoXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZmlsZVBhdGggPSBpbXBvcnRWYWwuc3BsaXQoJyAnKS5wb3AoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vLyBjb252ZXJ0cyB0aGF0IGZpbGUgcGF0aCBpbnRvIGEgZnVsbCBmaWxlIHBhdGhcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChmaWxlUGF0aCAhPSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZmlsZVBhdGguaW5jbHVkZXMoJy4vJykgfHwgZmlsZVBhdGguaW5jbHVkZXMoJy4uLycpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbGVQYXRoID0gU3RhbGUuZXhwYW5kUGF0aChmaWxlUGF0aCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vLyBjcmVhdGVzIHRoZSBmdWxsIHBhdGggd2l0aCB0aGUgcHJvcGVyIGRpcmVjdG9yeSBuYW1lXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBmdWxsRGlyZWN0b3J5ID0gcGF0aC5kaXJuYW1lKGluaXRpYWxGaWxlUGF0aCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZ1bGxQYXRoID0gcGF0aC5yZXNvbHZlKGZ1bGxEaXJlY3RvcnksIGZpbGVQYXRoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZnVsbFBhdGggPSBTdGFsZS5jaGVja0Z1bGxQYXRoKGZ1bGxQYXRoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZnVsbFBhdGggIT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8vIHVwZGF0ZXMgdGhlIHZhbHVlIG9mIHRoZSBmaWxlIGluIHRoZSBoaXRNYXBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoaXRNYXAgPSBTdGFsZS51cGRhdGVIaXRNYXAoZnVsbFBhdGgsIGhpdE1hcCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICAvLy8gc29ydHMgdGhlIG1hcCBiYXNlZCBvbiB2YWx1ZXNcbiAgICBoaXRNYXAgPSBTdGFsZS5zb3J0TWFwKGhpdE1hcCk7XG4gICAgLy8vIG1ha2VzIHRoZSBtYXAgaW50byBhIHRhYmxlIHR5cGUgZm9ybWF0IHdpdGggYSBuZXN0ZWQgYXJyYXlcbiAgICB2YXIgdXBkYXRlZEhpdE1hcCA9IFsuLi5oaXRNYXBdO1xuICAgIC8vLyBzd2FwcyB0aGUga2V5IGFuZCB2YWx1ZVxuICAgIHZhciBmaW5hbE1hcCA9IFN0YWxlLnN3YXBNYXBWYWx1ZXModXBkYXRlZEhpdE1hcCk7XG4gICAgLy8vIHByaW50cyB0aGUgbWFwIG91dCBpbiB0YWJsZSBmb3JtYXQgKGZvcm1hdDogaGl0VmFsdWUgLi4uIFt0YWJdIC4uLiBQYXRoKVxuICAgIFN0YWxlLnByaW50TWFwKGZpbmFsTWFwKTtcbn1cblxuLy8vIHJ1bnMgdGhlIG1haW4gZnVuY3Rpb24gYW5kIHByaW50cyBvdXQgdGhlIHRhYmxlIHdpdGggdGhlIG51bWJlciBvZiBoaXRzIGFzIHRoZSBrZXkgYW5kIHRoZSBwYXRoIGFzIHRoZSB2YWx1ZVxubWFpbigpOyAiXX0=