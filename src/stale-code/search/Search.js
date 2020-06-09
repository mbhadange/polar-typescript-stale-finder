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
                            find_3.Stale.updateHitMap(fullPath, hitMap);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2VhcmNoLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU2VhcmNoLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSx1Q0FBeUI7QUFDekIsMkNBQTZCO0FBQzdCLGlDQUE4QjtBQUM5QixpQ0FBbUM7QUFDbkMsaUNBQStCO0FBRS9CLFNBQWdCLElBQUk7SUFHaEIsSUFBSSxRQUFRLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQztJQUU1QixJQUFJLE1BQU0sR0FBRyxJQUFJLEdBQUcsRUFBRSxDQUFDO0lBQ3ZCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQ3RDLE1BQU0sSUFBSSxHQUFHLElBQUksa0JBQVcsRUFBRSxDQUFDO1FBQy9CLElBQUksTUFBTSxHQUFHLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUV6QixJQUFJLE9BQU8sR0FBRyxhQUFNLENBQUMsb0JBQW9CLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBRXhELE1BQU0sR0FBRyxZQUFLLENBQUMsNEJBQTRCLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBRTdELEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBRXJDLElBQUksSUFBSSxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN0QixJQUFJLGVBQWUsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO1lBQ2hDLElBQUksZUFBZSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDaEMsSUFBSSxHQUFHLEdBQUcsWUFBSyxDQUFDLFlBQVksQ0FBQyxlQUFlLENBQUMsQ0FBQztZQUk5QyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxJQUFLLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxFQUFFO2dCQUMvRCxTQUFTO2FBQ1o7aUJBRUksSUFBSSxHQUFHLElBQUksU0FBUyxJQUFJLENBQUMsSUFBSSxFQUFDLEtBQUssQ0FBQyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsRUFBRTtnQkFFckQsTUFBTSxJQUFJLEdBQUcsRUFBRSxDQUFDLFlBQVksQ0FBQyxlQUFlLEVBQUMsTUFBTSxDQUFDLENBQUM7Z0JBRXJELE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7Z0JBRWxDLE1BQU0sRUFBRSxHQUFHLHlFQUF5RSxDQUFDO2dCQUVyRixLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7b0JBRW5CLElBQUksVUFBVSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUM7b0JBRWhDLElBQUksVUFBVSxJQUFJLElBQUksRUFBRTt3QkFFcEIsSUFBSSxTQUFTLEdBQUcsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUU5QixJQUFJLFFBQVEsR0FBRyxTQUFTLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDO3dCQUMxQyxJQUFJLFFBQVEsQ0FBQzt3QkFFYixJQUFJLFFBQVEsSUFBSSxTQUFTLEVBQUU7NEJBQ3ZCLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxFQUFFO2dDQUNyRCxRQUFRLEdBQUcsWUFBSyxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQztnQ0FFdEMsSUFBSSxhQUFhLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUMsQ0FBQztnQ0FDbEQsUUFBUSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxFQUFFLFFBQVEsQ0FBQyxDQUFDO2dDQUNqRCxRQUFRLEdBQUcsWUFBSyxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQzs2QkFDNUM7eUJBQ0o7d0JBQ0QsSUFBSSxRQUFRLElBQUksU0FBUyxFQUFFOzRCQUV2QixZQUFLLENBQUMsWUFBWSxDQUFDLFFBQVEsRUFBRSxNQUFNLENBQUMsQ0FBQzt5QkFDeEM7cUJBQ0o7Z0JBQ0wsQ0FBQyxDQUFDLENBQUM7YUFDTjtTQUNKO0tBQ0o7SUFFRCxNQUFNLEdBQUcsWUFBSyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUUvQixJQUFJLGFBQWEsR0FBRyxDQUFDLEdBQUcsTUFBTSxDQUFDLENBQUM7SUFFaEMsSUFBSSxRQUFRLEdBQUcsWUFBSyxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUVsRCxZQUFLLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQzdCLENBQUM7QUF4RUQsb0JBd0VDO0FBR0QsSUFBSSxFQUFFLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgRXJybm9FeGNlcHRpb24gPSBOb2RlSlMuRXJybm9FeGNlcHRpb247XG5pbXBvcnQgKiBhcyBmcyBmcm9tIFwiZnNcIjtcbmltcG9ydCAqIGFzIHBhdGggZnJvbSAncGF0aCc7XG5pbXBvcnQge1NlYXJjaH0gZnJvbSBcIi4vZmluZFwiO1xuaW1wb3J0IHtEZWZhdWx0T3B0c30gZnJvbSBcIi4vZmluZFwiO1xuaW1wb3J0IHsgU3RhbGUgfSBmcm9tIFwiLi9maW5kXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBtYWluKCkge1xuICAgIC8vLyB1c2VzIHByb2Nlc3MuYXJndiB0byBzZWUgdGFrZSBpbiBhbnkgbnVtYmVyIG9mIGRpcmVjdG9yaWVzIGluIHRoZSBjb21tYW5kIGxpbmVcbiAgICAvLy8gZXhhbXBsZTogbm9kZSBTZWFyY2guanMgL1VzZXJzL21paGlybWFjcHJvMTMvRG9jdW1lbnRzL0dpdEh1Yi9wb2xhci1ib29rc2hlbGYvd2ViL2pzIC9Vc2Vycy9taWhpcm1hY3BybzEzL0RvY3VtZW50cy9HaXRIdWIvcG9sYXItYm9va3NoZWxmL2FwcHNcbiAgICB2YXIgYXJndW1lbnQgPSBwcm9jZXNzLmFyZ3Y7XG4gICAgLy8vIGNyZWF0ZXMgYW4gZW1wdHkgbWFwXG4gICAgdmFyIGhpdE1hcCA9IG5ldyBNYXAoKTtcbiAgICBmb3IgKHZhciB4ID0gMjsgeCA8IGFyZ3VtZW50Lmxlbmd0aDsgeCsrKSB7XG4gICAgICAgIGNvbnN0IG9wdHMgPSBuZXcgRGVmYXVsdE9wdHMoKTtcbiAgICAgICAgdmFyIG15QXJncyA9IGFyZ3VtZW50W3hdO1xuICAgICAgICAvLy8gcmV0dXJucyBhbiBhcnJheSB3aXRoIGFsbCB0aGUgZmlsZXMgaW4gdGhlIGRpcmVjdG9yeVxuICAgICAgICB2YXIgZmlsZU1hcCA9IFNlYXJjaC5maW5kRmlsZXNSZWN1cnNpdmVseShteUFyZ3MsIG9wdHMpO1xuICAgICAgICAvLy8gaXRlcmF0ZXMgdGhyb3VnaCBlYWNoIGZpbGUgaW4gdGhlIGRpcmVjdG9yeSBhbmQgYWRkcyB0byB0aGUgbWFwXG4gICAgICAgIGhpdE1hcCA9IFN0YWxlLmluaXRpYWxpemVUeXBlc2NyaXB0TWFwRmlsZXMoZmlsZU1hcCwgaGl0TWFwKTtcblxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGZpbGVNYXAubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIC8vLyBtYXAgb2YgdGhlIGZpbGUgdHlwZSwgbmFtZSwgcGF0aCBcbiAgICAgICAgICAgIHZhciBmaWxlID0gZmlsZU1hcFtpXTtcbiAgICAgICAgICAgIHZhciBpbml0aWFsRmlsZU5hbWUgPSBmaWxlLm5hbWU7XG4gICAgICAgICAgICB2YXIgaW5pdGlhbEZpbGVQYXRoID0gZmlsZS5wYXRoO1xuICAgICAgICAgICAgdmFyIGV4dCA9IFN0YWxlLmdldEV4dGVuc2lvbihpbml0aWFsRmlsZU5hbWUpO1xuXG4gICAgICAgICAgICAvLy8gY2hlY2tzIHRvIHNlZSBpZiB0aGUgZmlsZSBuYW1lIGlzIHRlc3QudHNcbiAgICAgICAgICAgIC8vLyBpZiBpdCBpcyB0aGVuIGNvbnRpbnVlcyB0byB0aGUgbmV4dCBmaWxlXG4gICAgICAgICAgICBpZiAoZmlsZS5uYW1lLmluY2x1ZGVzKCd0ZXN0LnRzJykgIHx8IGZpbGUubmFtZS5pbmNsdWRlcygnLmQudHMnKSkge1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8vIGNoZWNrcyB0byBtYWtlIHN1cmUgdGhhdCB0aGUgZmlsZSB0eXBlIGlzIGVpdGhlciAudHMgb3IgLnRzeFxuICAgICAgICAgICAgZWxzZSBpZiAoZXh0ICE9IHVuZGVmaW5lZCAmJiBbJ3RzJywndHN4J10uaW5jbHVkZXMoZXh0KSkge1xuICAgICAgICAgICAgICAgIC8vLyBnZXRzIGFsbCB0aGUgY29udGVudHMgb2YgdGhlIGN1cnJlbnQgZmlsZVxuICAgICAgICAgICAgICAgIGNvbnN0IGRhdGEgPSBmcy5yZWFkRmlsZVN5bmMoaW5pdGlhbEZpbGVQYXRoLCd1dGY4Jyk7XG4gICAgICAgICAgICAgICAgLy8vIHNwbGl0cyBlYWNoIGxpbmUgb2YgZGF0YSB0byBhbGxvdyB1cyB0byBwYXJzZSB0aHJvdWdoIGVhY2ggb25lXG4gICAgICAgICAgICAgICAgY29uc3QgbGluZXMgPSBkYXRhLnNwbGl0KC9cXHI/XFxuLyk7XG4gICAgICAgICAgICAgICAgLy8vIGNyZWF0ZXMgYSByZWd1bGFyIGV4cHJlc3Npb24gZm9yIHRoZSBpbXBvcnQgbGluZXNcbiAgICAgICAgICAgICAgICBjb25zdCByZSA9IC9pbXBvcnQoPzpbXCInXFxzXSooW1xcdyp7fVxcblxcclxcdCwgXSspZnJvbVxccyopP1tcIidcXHNdLiooW0BcXHdfLV0rKVtcIidcXHNdLio7JC87XG4gICAgICAgICAgICAgICAgLy8vIGl0ZXJhdGVzIHRocm91Z2ggZWFjaCBsaW5lIG9mIHRoZSBmaWxlXG4gICAgICAgICAgICAgICAgbGluZXMuZm9yRWFjaCgobGluZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAvLy8gY2hlY2tzIHRvIHNlZSBpZiB0aGUgbGluZSBtYXRjaGVzIHRoZSBmb3JtYXQgb2YgdGhlIHJlZ3VsYXIgZXhwcmVzc2lvblxuICAgICAgICAgICAgICAgICAgICB2YXIgaW1wb3J0TGluZSA9IGxpbmUubWF0Y2gocmUpO1xuICAgICAgICAgICAgICAgICAgICAvLy8gbWFrZXMgc3VyZSB0aGF0IHRoZSBsaW5lIGFjdHVhbGx5IGhhcyB0aGUgcHJvcGVyIGZvcm1hdCBvZiB0aGUgcmVnRXhcbiAgICAgICAgICAgICAgICAgICAgaWYgKGltcG9ydExpbmUgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8vIGdldHMgdGhlIGVudGlyZSBpbXBvcnQgbGluZXMgY29udGVudHNcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpbXBvcnRWYWwgPSBpbXBvcnRMaW5lWzBdO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8vIHNwbGl0cyB0aGUgbGluZSBiYXNlZCBvZmYgc3BhY2VzIGFuZCBnZXRzIG9ubHkgdGhlIGZpbGUgcGF0aFxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGZpbGVQYXRoID0gaW1wb3J0VmFsLnNwbGl0KCcgJykucG9wKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZnVsbFBhdGg7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLy8gY29udmVydHMgdGhhdCBmaWxlIHBhdGggaW50byBhIGZ1bGwgZmlsZSBwYXRoXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZmlsZVBhdGggIT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGZpbGVQYXRoLmluY2x1ZGVzKCcuLycpIHx8IGZpbGVQYXRoLmluY2x1ZGVzKCcuLi8nKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWxlUGF0aCA9IFN0YWxlLmV4cGFuZFBhdGgoZmlsZVBhdGgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLy8gY3JlYXRlcyB0aGUgZnVsbCBwYXRoIHdpdGggdGhlIHByb3BlciBkaXJlY3RvcnkgbmFtZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZnVsbERpcmVjdG9yeSA9IHBhdGguZGlybmFtZShpbml0aWFsRmlsZVBhdGgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmdWxsUGF0aCA9IHBhdGgucmVzb2x2ZShmdWxsRGlyZWN0b3J5LCBmaWxlUGF0aCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZ1bGxQYXRoID0gU3RhbGUuY2hlY2tGdWxsUGF0aChmdWxsUGF0aCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGZ1bGxQYXRoICE9IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vLyB1cGRhdGVzIHRoZSB2YWx1ZSBvZiB0aGUgZmlsZSBpbiB0aGUgaGl0TWFwXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgU3RhbGUudXBkYXRlSGl0TWFwKGZ1bGxQYXRoLCBoaXRNYXApO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgLy8vIHNvcnRzIHRoZSBtYXAgYmFzZWQgb24gdmFsdWVzXG4gICAgaGl0TWFwID0gU3RhbGUuc29ydE1hcChoaXRNYXApO1xuICAgIC8vLyBtYWtlcyB0aGUgbWFwIGludG8gYSB0YWJsZSB0eXBlIGZvcm1hdCB3aXRoIGEgbmVzdGVkIGFycmF5XG4gICAgdmFyIHVwZGF0ZWRIaXRNYXAgPSBbLi4uaGl0TWFwXTtcbiAgICAvLy8gc3dhcHMgdGhlIGtleSBhbmQgdmFsdWVcbiAgICB2YXIgZmluYWxNYXAgPSBTdGFsZS5zd2FwTWFwVmFsdWVzKHVwZGF0ZWRIaXRNYXApO1xuICAgIC8vLyBwcmludHMgdGhlIG1hcCBvdXQgaW4gdGFibGUgZm9ybWF0IChmb3JtYXQ6IGhpdFZhbHVlIC4uLiBbdGFiXSAuLi4gUGF0aClcbiAgICBTdGFsZS5wcmludE1hcChmaW5hbE1hcCk7XG59XG5cbi8vLyBydW5zIHRoZSBtYWluIGZ1bmN0aW9uIGFuZCBwcmludHMgb3V0IHRoZSB0YWJsZSB3aXRoIHRoZSBudW1iZXIgb2YgaGl0cyBhcyB0aGUga2V5IGFuZCB0aGUgcGF0aCBhcyB0aGUgdmFsdWVcbm1haW4oKTsgIl19