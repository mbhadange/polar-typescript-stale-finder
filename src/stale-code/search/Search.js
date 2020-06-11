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
                const isStaleCode = find_3.Stale.isNotStale(data);
                if (isStaleCode == true) {
                    hitMap.delete(initialFilePath);
                    continue;
                }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2VhcmNoLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU2VhcmNoLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFQSx1Q0FBeUI7QUFDekIsMkNBQTZCO0FBQzdCLGlDQUE4QjtBQUM5QixpQ0FBbUM7QUFDbkMsaUNBQStCO0FBRS9CLFNBQWdCLElBQUk7SUFHaEIsSUFBSSxRQUFRLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQztJQUU1QixJQUFJLE1BQU0sR0FBRyxJQUFJLEdBQUcsRUFBRSxDQUFDO0lBQ3ZCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQ3RDLE1BQU0sSUFBSSxHQUFHLElBQUksa0JBQVcsRUFBRSxDQUFDO1FBQy9CLElBQUksTUFBTSxHQUFHLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUV6QixJQUFJLE9BQU8sR0FBRyxhQUFNLENBQUMsb0JBQW9CLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBRXhELE1BQU0sR0FBRyxZQUFLLENBQUMsNEJBQTRCLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBRTdELEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBRXJDLElBQUksSUFBSSxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN0QixJQUFJLGVBQWUsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO1lBQ2hDLElBQUksZUFBZSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDaEMsSUFBSSxHQUFHLEdBQUcsWUFBSyxDQUFDLFlBQVksQ0FBQyxlQUFlLENBQUMsQ0FBQztZQUk5QyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxJQUFLLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxFQUFFO2dCQUMvRCxTQUFTO2FBQ1o7aUJBRUksSUFBSSxHQUFHLElBQUksU0FBUyxJQUFJLENBQUMsSUFBSSxFQUFDLEtBQUssQ0FBQyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsRUFBRTtnQkFFckQsTUFBTSxJQUFJLEdBQUcsRUFBRSxDQUFDLFlBQVksQ0FBQyxlQUFlLEVBQUMsTUFBTSxDQUFDLENBQUM7Z0JBRXJELE1BQU0sV0FBVyxHQUFHLFlBQUssQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQzNDLElBQUksV0FBVyxJQUFJLElBQUksRUFBRTtvQkFDckIsTUFBTSxDQUFDLE1BQU0sQ0FBQyxlQUFlLENBQUMsQ0FBQztvQkFDL0IsU0FBUztpQkFDWjtnQkFFRCxNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUVsQyxNQUFNLEVBQUUsR0FBRyx5RUFBeUUsQ0FBQztnQkFFckYsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO29CQUVuQixJQUFJLFVBQVUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDO29CQUVoQyxJQUFJLFVBQVUsSUFBSSxJQUFJLEVBQUU7d0JBRXBCLElBQUksU0FBUyxHQUFHLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFFOUIsSUFBSSxRQUFRLEdBQUcsU0FBUyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQzt3QkFDMUMsSUFBSSxRQUFRLENBQUM7d0JBRWIsSUFBSSxRQUFRLElBQUksU0FBUyxFQUFFOzRCQUN2QixJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsRUFBRTtnQ0FDckQsUUFBUSxHQUFHLFlBQUssQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUM7Z0NBRXRDLElBQUksYUFBYSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLENBQUM7Z0NBQ2xELFFBQVEsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsRUFBRSxRQUFRLENBQUMsQ0FBQztnQ0FDakQsUUFBUSxHQUFHLFlBQUssQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUM7NkJBQzVDO3lCQUNKO3dCQUNELElBQUksUUFBUSxJQUFJLFNBQVMsRUFBRTs0QkFFdkIsTUFBTSxHQUFHLFlBQUssQ0FBQyxZQUFZLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxDQUFDO3lCQUNqRDtxQkFDSjtnQkFDTCxDQUFDLENBQUMsQ0FBQzthQUNOO1NBQ0o7S0FDSjtJQUVELE1BQU0sR0FBRyxZQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBRS9CLElBQUksYUFBYSxHQUFHLENBQUMsR0FBRyxNQUFNLENBQUMsQ0FBQztJQUVoQyxJQUFJLFFBQVEsR0FBRyxZQUFLLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBRWxELFlBQUssQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDN0IsQ0FBQztBQTlFRCxvQkE4RUM7QUFHRCxJQUFJLEVBQUUsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8vLyBcIkBOb3RTdGFsZVwiXG5pbXBvcnQgRXJybm9FeGNlcHRpb24gPSBOb2RlSlMuRXJybm9FeGNlcHRpb247XG5pbXBvcnQgKiBhcyBmcyBmcm9tIFwiZnNcIjtcbmltcG9ydCAqIGFzIHBhdGggZnJvbSAncGF0aCc7XG5pbXBvcnQge1NlYXJjaH0gZnJvbSBcIi4vZmluZFwiO1xuaW1wb3J0IHtEZWZhdWx0T3B0c30gZnJvbSBcIi4vZmluZFwiO1xuaW1wb3J0IHsgU3RhbGUgfSBmcm9tIFwiLi9maW5kXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBtYWluKCkge1xuICAgIC8vLyB1c2VzIHByb2Nlc3MuYXJndiB0byBzZWUgdGFrZSBpbiBhbnkgbnVtYmVyIG9mIGRpcmVjdG9yaWVzIGluIHRoZSBjb21tYW5kIGxpbmVcbiAgICAvLy8gZXhhbXBsZTogbm9kZSBTZWFyY2guanMgL1VzZXJzL21paGlybWFjcHJvMTMvRG9jdW1lbnRzL0dpdEh1Yi9wb2xhci1ib29rc2hlbGYvd2ViL2pzIC9Vc2Vycy9taWhpcm1hY3BybzEzL0RvY3VtZW50cy9HaXRIdWIvcG9sYXItYm9va3NoZWxmL2FwcHNcbiAgICB2YXIgYXJndW1lbnQgPSBwcm9jZXNzLmFyZ3Y7XG4gICAgLy8vIGNyZWF0ZXMgYW4gZW1wdHkgbWFwXG4gICAgdmFyIGhpdE1hcCA9IG5ldyBNYXAoKTtcbiAgICBmb3IgKHZhciB4ID0gMjsgeCA8IGFyZ3VtZW50Lmxlbmd0aDsgeCsrKSB7XG4gICAgICAgIGNvbnN0IG9wdHMgPSBuZXcgRGVmYXVsdE9wdHMoKTtcbiAgICAgICAgdmFyIG15QXJncyA9IGFyZ3VtZW50W3hdO1xuICAgICAgICAvLy8gcmV0dXJucyBhbiBhcnJheSB3aXRoIGFsbCB0aGUgZmlsZXMgaW4gdGhlIGRpcmVjdG9yeVxuICAgICAgICB2YXIgZmlsZU1hcCA9IFNlYXJjaC5maW5kRmlsZXNSZWN1cnNpdmVseShteUFyZ3MsIG9wdHMpO1xuICAgICAgICAvLy8gaXRlcmF0ZXMgdGhyb3VnaCBlYWNoIGZpbGUgaW4gdGhlIGRpcmVjdG9yeSBhbmQgYWRkcyB0byB0aGUgbWFwXG4gICAgICAgIGhpdE1hcCA9IFN0YWxlLmluaXRpYWxpemVUeXBlc2NyaXB0TWFwRmlsZXMoZmlsZU1hcCwgaGl0TWFwKTtcblxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGZpbGVNYXAubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIC8vLyBtYXAgb2YgdGhlIGZpbGUgdHlwZSwgbmFtZSwgcGF0aCBcbiAgICAgICAgICAgIHZhciBmaWxlID0gZmlsZU1hcFtpXTtcbiAgICAgICAgICAgIHZhciBpbml0aWFsRmlsZU5hbWUgPSBmaWxlLm5hbWU7XG4gICAgICAgICAgICB2YXIgaW5pdGlhbEZpbGVQYXRoID0gZmlsZS5wYXRoO1xuICAgICAgICAgICAgdmFyIGV4dCA9IFN0YWxlLmdldEV4dGVuc2lvbihpbml0aWFsRmlsZU5hbWUpO1xuXG4gICAgICAgICAgICAvLy8gY2hlY2tzIHRvIHNlZSBpZiB0aGUgZmlsZSBuYW1lIGlzIHRlc3QudHNcbiAgICAgICAgICAgIC8vLyBpZiBpdCBpcyB0aGVuIGNvbnRpbnVlcyB0byB0aGUgbmV4dCBmaWxlXG4gICAgICAgICAgICBpZiAoZmlsZS5uYW1lLmluY2x1ZGVzKCd0ZXN0LnRzJykgIHx8IGZpbGUubmFtZS5pbmNsdWRlcygnLmQudHMnKSkge1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8vIGNoZWNrcyB0byBtYWtlIHN1cmUgdGhhdCB0aGUgZmlsZSB0eXBlIGlzIGVpdGhlciAudHMgb3IgLnRzeFxuICAgICAgICAgICAgZWxzZSBpZiAoZXh0ICE9IHVuZGVmaW5lZCAmJiBbJ3RzJywndHN4J10uaW5jbHVkZXMoZXh0KSkge1xuICAgICAgICAgICAgICAgIC8vLyBnZXRzIGFsbCB0aGUgY29udGVudHMgb2YgdGhlIGN1cnJlbnQgZmlsZVxuICAgICAgICAgICAgICAgIGNvbnN0IGRhdGEgPSBmcy5yZWFkRmlsZVN5bmMoaW5pdGlhbEZpbGVQYXRoLCd1dGY4Jyk7XG4gICAgICAgICAgICAgICAgLy8vIGtub3dzIGlmIHRoZSBmaWxlIGluY2x1ZGVzIFwiQE5vdFN0YWxlXCIgLi4uIGlmIGl0IGRvZXMgdGhlbiBza2lwcyB0aGUgZmlsZVxuICAgICAgICAgICAgICAgIGNvbnN0IGlzU3RhbGVDb2RlID0gU3RhbGUuaXNOb3RTdGFsZShkYXRhKTtcbiAgICAgICAgICAgICAgICBpZiAoaXNTdGFsZUNvZGUgPT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgICAgICBoaXRNYXAuZGVsZXRlKGluaXRpYWxGaWxlUGF0aCk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLy8gc3BsaXRzIGVhY2ggbGluZSBvZiBkYXRhIHRvIGFsbG93IHVzIHRvIHBhcnNlIHRocm91Z2ggZWFjaCBvbmVcbiAgICAgICAgICAgICAgICBjb25zdCBsaW5lcyA9IGRhdGEuc3BsaXQoL1xccj9cXG4vKTtcbiAgICAgICAgICAgICAgICAvLy8gY3JlYXRlcyBhIHJlZ3VsYXIgZXhwcmVzc2lvbiBmb3IgdGhlIGltcG9ydCBsaW5lc1xuICAgICAgICAgICAgICAgIGNvbnN0IHJlID0gL2ltcG9ydCg/OltcIidcXHNdKihbXFx3Knt9XFxuXFxyXFx0LCBdKylmcm9tXFxzKik/W1wiJ1xcc10uKihbQFxcd18tXSspW1wiJ1xcc10uKjskLztcbiAgICAgICAgICAgICAgICAvLy8gaXRlcmF0ZXMgdGhyb3VnaCBlYWNoIGxpbmUgb2YgdGhlIGZpbGVcbiAgICAgICAgICAgICAgICBsaW5lcy5mb3JFYWNoKChsaW5lKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIC8vLyBjaGVja3MgdG8gc2VlIGlmIHRoZSBsaW5lIG1hdGNoZXMgdGhlIGZvcm1hdCBvZiB0aGUgcmVndWxhciBleHByZXNzaW9uXG4gICAgICAgICAgICAgICAgICAgIHZhciBpbXBvcnRMaW5lID0gbGluZS5tYXRjaChyZSk7XG4gICAgICAgICAgICAgICAgICAgIC8vLyBtYWtlcyBzdXJlIHRoYXQgdGhlIGxpbmUgYWN0dWFsbHkgaGFzIHRoZSBwcm9wZXIgZm9ybWF0IG9mIHRoZSByZWdFeFxuICAgICAgICAgICAgICAgICAgICBpZiAoaW1wb3J0TGluZSAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLy8gZ2V0cyB0aGUgZW50aXJlIGltcG9ydCBsaW5lcyBjb250ZW50c1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGltcG9ydFZhbCA9IGltcG9ydExpbmVbMF07XG4gICAgICAgICAgICAgICAgICAgICAgICAvLy8gc3BsaXRzIHRoZSBsaW5lIGJhc2VkIG9mZiBzcGFjZXMgYW5kIGdldHMgb25seSB0aGUgZmlsZSBwYXRoXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZmlsZVBhdGggPSBpbXBvcnRWYWwuc3BsaXQoJyAnKS5wb3AoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBmdWxsUGF0aDtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vLyBjb252ZXJ0cyB0aGF0IGZpbGUgcGF0aCBpbnRvIGEgZnVsbCBmaWxlIHBhdGhcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChmaWxlUGF0aCAhPSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZmlsZVBhdGguaW5jbHVkZXMoJy4vJykgfHwgZmlsZVBhdGguaW5jbHVkZXMoJy4uLycpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbGVQYXRoID0gU3RhbGUuZXhwYW5kUGF0aChmaWxlUGF0aCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vLyBjcmVhdGVzIHRoZSBmdWxsIHBhdGggd2l0aCB0aGUgcHJvcGVyIGRpcmVjdG9yeSBuYW1lXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBmdWxsRGlyZWN0b3J5ID0gcGF0aC5kaXJuYW1lKGluaXRpYWxGaWxlUGF0aCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZ1bGxQYXRoID0gcGF0aC5yZXNvbHZlKGZ1bGxEaXJlY3RvcnksIGZpbGVQYXRoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZnVsbFBhdGggPSBTdGFsZS5jaGVja0Z1bGxQYXRoKGZ1bGxQYXRoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZnVsbFBhdGggIT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8vIHVwZGF0ZXMgdGhlIHZhbHVlIG9mIHRoZSBmaWxlIGluIHRoZSBoaXRNYXBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoaXRNYXAgPSBTdGFsZS51cGRhdGVIaXRNYXAoZnVsbFBhdGgsIGhpdE1hcCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICAvLy8gc29ydHMgdGhlIG1hcCBiYXNlZCBvbiB2YWx1ZXNcbiAgICBoaXRNYXAgPSBTdGFsZS5zb3J0TWFwKGhpdE1hcCk7XG4gICAgLy8vIG1ha2VzIHRoZSBtYXAgaW50byBhIHRhYmxlIHR5cGUgZm9ybWF0IHdpdGggYSBuZXN0ZWQgYXJyYXlcbiAgICB2YXIgdXBkYXRlZEhpdE1hcCA9IFsuLi5oaXRNYXBdO1xuICAgIC8vLyBzd2FwcyB0aGUga2V5IGFuZCB2YWx1ZVxuICAgIHZhciBmaW5hbE1hcCA9IFN0YWxlLnN3YXBNYXBWYWx1ZXModXBkYXRlZEhpdE1hcCk7XG4gICAgLy8vIHByaW50cyB0aGUgbWFwIG91dCBpbiB0YWJsZSBmb3JtYXQgKGZvcm1hdDogaGl0VmFsdWUgLi4uIFt0YWJdIC4uLiBQYXRoKVxuICAgIFN0YWxlLnByaW50TWFwKGZpbmFsTWFwKTtcbn1cblxuLy8vIHJ1bnMgdGhlIG1haW4gZnVuY3Rpb24gYW5kIHByaW50cyBvdXQgdGhlIHRhYmxlIHdpdGggdGhlIG51bWJlciBvZiBoaXRzIGFzIHRoZSBrZXkgYW5kIHRoZSBwYXRoIGFzIHRoZSB2YWx1ZVxubWFpbigpOyAiXX0=