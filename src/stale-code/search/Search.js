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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2VhcmNoLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU2VhcmNoLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSx1Q0FBeUI7QUFDekIsMkNBQTZCO0FBQzdCLGlDQUE4QjtBQUM5QixpQ0FBbUM7QUFDbkMsaUNBQStCO0FBRS9CLFNBQWdCLElBQUk7SUFHaEIsSUFBSSxRQUFRLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQztJQUU1QixJQUFJLE1BQU0sR0FBRyxJQUFJLEdBQUcsRUFBRSxDQUFDO0lBQ3ZCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQ3RDLE1BQU0sSUFBSSxHQUFHLElBQUksa0JBQVcsRUFBRSxDQUFDO1FBQy9CLElBQUksTUFBTSxHQUFHLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUV6QixJQUFJLE9BQU8sR0FBRyxhQUFNLENBQUMsb0JBQW9CLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBRXhELE1BQU0sR0FBRyxZQUFLLENBQUMsNEJBQTRCLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBRTdELEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBRXJDLElBQUksSUFBSSxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN0QixJQUFJLGVBQWUsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO1lBQ2hDLElBQUksZUFBZSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDaEMsSUFBSSxHQUFHLEdBQUcsWUFBSyxDQUFDLFlBQVksQ0FBQyxlQUFlLENBQUMsQ0FBQztZQUk5QyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxJQUFLLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxFQUFFO2dCQUMvRCxTQUFTO2FBQ1o7aUJBRUksSUFBSSxHQUFHLElBQUksU0FBUyxJQUFJLENBQUMsSUFBSSxFQUFDLEtBQUssQ0FBQyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsRUFBRTtnQkFFckQsTUFBTSxJQUFJLEdBQUcsRUFBRSxDQUFDLFlBQVksQ0FBQyxlQUFlLEVBQUMsTUFBTSxDQUFDLENBQUM7Z0JBRXJELE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7Z0JBRWxDLE1BQU0sRUFBRSxHQUFHLHlFQUF5RSxDQUFDO2dCQUVyRixLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7b0JBRW5CLElBQUksVUFBVSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUM7b0JBRWhDLElBQUksVUFBVSxJQUFJLElBQUksRUFBRTt3QkFFcEIsSUFBSSxTQUFTLEdBQUcsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUU5QixJQUFJLFFBQVEsR0FBRyxTQUFTLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDO3dCQUMxQyxJQUFJLFFBQVEsQ0FBQzt3QkFFYixJQUFJLFFBQVEsSUFBSSxTQUFTLEVBQUU7NEJBQ3ZCLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxFQUFFO2dDQUNyRCxRQUFRLEdBQUcsWUFBSyxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQztnQ0FFdEMsSUFBSSxhQUFhLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUMsQ0FBQztnQ0FDbEQsUUFBUSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxFQUFFLFFBQVEsQ0FBQyxDQUFDO2dDQUNqRCxRQUFRLEdBQUcsWUFBSyxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQzs2QkFDNUM7eUJBQ0o7d0JBQ0QsSUFBSSxRQUFRLElBQUksU0FBUyxFQUFFOzRCQUV2QixNQUFNLEdBQUcsWUFBSyxDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDLENBQUM7eUJBQ2pEO3FCQUNKO2dCQUNMLENBQUMsQ0FBQyxDQUFDO2FBQ047U0FDSjtLQUNKO0lBRUQsTUFBTSxHQUFHLFlBQUssQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7SUFFL0IsSUFBSSxhQUFhLEdBQUcsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxDQUFDO0lBRWhDLElBQUksUUFBUSxHQUFHLFlBQUssQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDLENBQUM7SUFFbEQsWUFBSyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUM3QixDQUFDO0FBeEVELG9CQXdFQztBQUdELElBQUksRUFBRSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEVycm5vRXhjZXB0aW9uID0gTm9kZUpTLkVycm5vRXhjZXB0aW9uO1xuaW1wb3J0ICogYXMgZnMgZnJvbSBcImZzXCI7XG5pbXBvcnQgKiBhcyBwYXRoIGZyb20gJ3BhdGgnO1xuaW1wb3J0IHtTZWFyY2h9IGZyb20gXCIuL2ZpbmRcIjtcbmltcG9ydCB7RGVmYXVsdE9wdHN9IGZyb20gXCIuL2ZpbmRcIjtcbmltcG9ydCB7IFN0YWxlIH0gZnJvbSBcIi4vZmluZFwiO1xuXG5leHBvcnQgZnVuY3Rpb24gbWFpbigpIHtcbiAgICAvLy8gdXNlcyBwcm9jZXNzLmFyZ3YgdG8gc2VlIHRha2UgaW4gYW55IG51bWJlciBvZiBkaXJlY3RvcmllcyBpbiB0aGUgY29tbWFuZCBsaW5lXG4gICAgLy8vIGV4YW1wbGU6IG5vZGUgU2VhcmNoLmpzIC9Vc2Vycy9taWhpcm1hY3BybzEzL0RvY3VtZW50cy9HaXRIdWIvcG9sYXItYm9va3NoZWxmL3dlYi9qcyAvVXNlcnMvbWloaXJtYWNwcm8xMy9Eb2N1bWVudHMvR2l0SHViL3BvbGFyLWJvb2tzaGVsZi9hcHBzXG4gICAgdmFyIGFyZ3VtZW50ID0gcHJvY2Vzcy5hcmd2O1xuICAgIC8vLyBjcmVhdGVzIGFuIGVtcHR5IG1hcFxuICAgIHZhciBoaXRNYXAgPSBuZXcgTWFwKCk7XG4gICAgZm9yICh2YXIgeCA9IDI7IHggPCBhcmd1bWVudC5sZW5ndGg7IHgrKykge1xuICAgICAgICBjb25zdCBvcHRzID0gbmV3IERlZmF1bHRPcHRzKCk7XG4gICAgICAgIHZhciBteUFyZ3MgPSBhcmd1bWVudFt4XTtcbiAgICAgICAgLy8vIHJldHVybnMgYW4gYXJyYXkgd2l0aCBhbGwgdGhlIGZpbGVzIGluIHRoZSBkaXJlY3RvcnlcbiAgICAgICAgdmFyIGZpbGVNYXAgPSBTZWFyY2guZmluZEZpbGVzUmVjdXJzaXZlbHkobXlBcmdzLCBvcHRzKTtcbiAgICAgICAgLy8vIGl0ZXJhdGVzIHRocm91Z2ggZWFjaCBmaWxlIGluIHRoZSBkaXJlY3RvcnkgYW5kIGFkZHMgdG8gdGhlIG1hcFxuICAgICAgICBoaXRNYXAgPSBTdGFsZS5pbml0aWFsaXplVHlwZXNjcmlwdE1hcEZpbGVzKGZpbGVNYXAsIGhpdE1hcCk7XG5cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBmaWxlTWFwLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAvLy8gbWFwIG9mIHRoZSBmaWxlIHR5cGUsIG5hbWUsIHBhdGggXG4gICAgICAgICAgICB2YXIgZmlsZSA9IGZpbGVNYXBbaV07XG4gICAgICAgICAgICB2YXIgaW5pdGlhbEZpbGVOYW1lID0gZmlsZS5uYW1lO1xuICAgICAgICAgICAgdmFyIGluaXRpYWxGaWxlUGF0aCA9IGZpbGUucGF0aDtcbiAgICAgICAgICAgIHZhciBleHQgPSBTdGFsZS5nZXRFeHRlbnNpb24oaW5pdGlhbEZpbGVOYW1lKTtcblxuICAgICAgICAgICAgLy8vIGNoZWNrcyB0byBzZWUgaWYgdGhlIGZpbGUgbmFtZSBpcyB0ZXN0LnRzXG4gICAgICAgICAgICAvLy8gaWYgaXQgaXMgdGhlbiBjb250aW51ZXMgdG8gdGhlIG5leHQgZmlsZVxuICAgICAgICAgICAgaWYgKGZpbGUubmFtZS5pbmNsdWRlcygndGVzdC50cycpICB8fCBmaWxlLm5hbWUuaW5jbHVkZXMoJy5kLnRzJykpIHtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vLyBjaGVja3MgdG8gbWFrZSBzdXJlIHRoYXQgdGhlIGZpbGUgdHlwZSBpcyBlaXRoZXIgLnRzIG9yIC50c3hcbiAgICAgICAgICAgIGVsc2UgaWYgKGV4dCAhPSB1bmRlZmluZWQgJiYgWyd0cycsJ3RzeCddLmluY2x1ZGVzKGV4dCkpIHtcbiAgICAgICAgICAgICAgICAvLy8gZ2V0cyBhbGwgdGhlIGNvbnRlbnRzIG9mIHRoZSBjdXJyZW50IGZpbGVcbiAgICAgICAgICAgICAgICBjb25zdCBkYXRhID0gZnMucmVhZEZpbGVTeW5jKGluaXRpYWxGaWxlUGF0aCwndXRmOCcpO1xuICAgICAgICAgICAgICAgIC8vLyBzcGxpdHMgZWFjaCBsaW5lIG9mIGRhdGEgdG8gYWxsb3cgdXMgdG8gcGFyc2UgdGhyb3VnaCBlYWNoIG9uZVxuICAgICAgICAgICAgICAgIGNvbnN0IGxpbmVzID0gZGF0YS5zcGxpdCgvXFxyP1xcbi8pO1xuICAgICAgICAgICAgICAgIC8vLyBjcmVhdGVzIGEgcmVndWxhciBleHByZXNzaW9uIGZvciB0aGUgaW1wb3J0IGxpbmVzXG4gICAgICAgICAgICAgICAgY29uc3QgcmUgPSAvaW1wb3J0KD86W1wiJ1xcc10qKFtcXHcqe31cXG5cXHJcXHQsIF0rKWZyb21cXHMqKT9bXCInXFxzXS4qKFtAXFx3Xy1dKylbXCInXFxzXS4qOyQvO1xuICAgICAgICAgICAgICAgIC8vLyBpdGVyYXRlcyB0aHJvdWdoIGVhY2ggbGluZSBvZiB0aGUgZmlsZVxuICAgICAgICAgICAgICAgIGxpbmVzLmZvckVhY2goKGxpbmUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgLy8vIGNoZWNrcyB0byBzZWUgaWYgdGhlIGxpbmUgbWF0Y2hlcyB0aGUgZm9ybWF0IG9mIHRoZSByZWd1bGFyIGV4cHJlc3Npb25cbiAgICAgICAgICAgICAgICAgICAgdmFyIGltcG9ydExpbmUgPSBsaW5lLm1hdGNoKHJlKTtcbiAgICAgICAgICAgICAgICAgICAgLy8vIG1ha2VzIHN1cmUgdGhhdCB0aGUgbGluZSBhY3R1YWxseSBoYXMgdGhlIHByb3BlciBmb3JtYXQgb2YgdGhlIHJlZ0V4XG4gICAgICAgICAgICAgICAgICAgIGlmIChpbXBvcnRMaW5lICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vLyBnZXRzIHRoZSBlbnRpcmUgaW1wb3J0IGxpbmVzIGNvbnRlbnRzXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgaW1wb3J0VmFsID0gaW1wb3J0TGluZVswXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vLyBzcGxpdHMgdGhlIGxpbmUgYmFzZWQgb2ZmIHNwYWNlcyBhbmQgZ2V0cyBvbmx5IHRoZSBmaWxlIHBhdGhcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBmaWxlUGF0aCA9IGltcG9ydFZhbC5zcGxpdCgnICcpLnBvcCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGZ1bGxQYXRoO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8vIGNvbnZlcnRzIHRoYXQgZmlsZSBwYXRoIGludG8gYSBmdWxsIGZpbGUgcGF0aFxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGZpbGVQYXRoICE9IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChmaWxlUGF0aC5pbmNsdWRlcygnLi8nKSB8fCBmaWxlUGF0aC5pbmNsdWRlcygnLi4vJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsZVBhdGggPSBTdGFsZS5leHBhbmRQYXRoKGZpbGVQYXRoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8vIGNyZWF0ZXMgdGhlIGZ1bGwgcGF0aCB3aXRoIHRoZSBwcm9wZXIgZGlyZWN0b3J5IG5hbWVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGZ1bGxEaXJlY3RvcnkgPSBwYXRoLmRpcm5hbWUoaW5pdGlhbEZpbGVQYXRoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZnVsbFBhdGggPSBwYXRoLnJlc29sdmUoZnVsbERpcmVjdG9yeSwgZmlsZVBhdGgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmdWxsUGF0aCA9IFN0YWxlLmNoZWNrRnVsbFBhdGgoZnVsbFBhdGgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChmdWxsUGF0aCAhPSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLy8gdXBkYXRlcyB0aGUgdmFsdWUgb2YgdGhlIGZpbGUgaW4gdGhlIGhpdE1hcFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhpdE1hcCA9IFN0YWxlLnVwZGF0ZUhpdE1hcChmdWxsUGF0aCwgaGl0TWFwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIC8vLyBzb3J0cyB0aGUgbWFwIGJhc2VkIG9uIHZhbHVlc1xuICAgIGhpdE1hcCA9IFN0YWxlLnNvcnRNYXAoaGl0TWFwKTtcbiAgICAvLy8gbWFrZXMgdGhlIG1hcCBpbnRvIGEgdGFibGUgdHlwZSBmb3JtYXQgd2l0aCBhIG5lc3RlZCBhcnJheVxuICAgIHZhciB1cGRhdGVkSGl0TWFwID0gWy4uLmhpdE1hcF07XG4gICAgLy8vIHN3YXBzIHRoZSBrZXkgYW5kIHZhbHVlXG4gICAgdmFyIGZpbmFsTWFwID0gU3RhbGUuc3dhcE1hcFZhbHVlcyh1cGRhdGVkSGl0TWFwKTtcbiAgICAvLy8gcHJpbnRzIHRoZSBtYXAgb3V0IGluIHRhYmxlIGZvcm1hdCAoZm9ybWF0OiBoaXRWYWx1ZSAuLi4gW3RhYl0gLi4uIFBhdGgpXG4gICAgU3RhbGUucHJpbnRNYXAoZmluYWxNYXApO1xufVxuXG4vLy8gcnVucyB0aGUgbWFpbiBmdW5jdGlvbiBhbmQgcHJpbnRzIG91dCB0aGUgdGFibGUgd2l0aCB0aGUgbnVtYmVyIG9mIGhpdHMgYXMgdGhlIGtleSBhbmQgdGhlIHBhdGggYXMgdGhlIHZhbHVlXG5tYWluKCk7ICJdfQ==