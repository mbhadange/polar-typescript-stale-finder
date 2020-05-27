"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const libpath = __importStar(require("path"));
const fs = __importStar(require("fs"));
const FilePaths_1 = require("polar-shared/src/util/FilePaths");
const readline = __importStar(require("readline"));
class Search {
    static find(dir, opts = new DefaultOpts()) {
        const files = fs.readdirSync(dir);
        const result = [];
        for (const name of files) {
            const path = libpath.join(dir, name);
            const stat = fs.statSync(path);
            const createType = () => {
                if (stat.isDirectory()) {
                    return 'directory';
                }
                if (stat.isFile()) {
                    return 'file';
                }
                return undefined;
            };
            const type = createType();
            if (!type) {
                continue;
            }
            const createRecord = () => {
                return { type, name, path };
            };
            const file = createRecord();
            const acceptFile = () => {
                const acceptExtension = () => {
                    if (!opts.extensions) {
                        return true;
                    }
                    const ext = FilePaths_1.FilePaths.toExtension(path).getOrUndefined();
                    return ext && opts.extensions.includes(ext);
                };
                const acceptType = () => {
                    if (!opts.types) {
                        return true;
                    }
                    return opts.types.includes(type);
                };
                return acceptExtension() && acceptType();
            };
            if (acceptFile()) {
                result.push(file);
            }
            if (opts.recurse && type === 'directory') {
                result.push(...this.find(path, opts));
            }
        }
        return result;
    }
}
exports.Search = Search;
class DefaultOpts {
    constructor() {
        this.recurse = true;
        this.types = ['file'];
    }
}
let hitMap = new Map();
let opts = new DefaultOpts();
let rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
rl.question('Enter the entire directory path to be parsed through: ', (currDirectory) => {
    var fileMap = Search.find(currDirectory, opts);
    for (var i = 0; i < fileMap.length; i++) {
        var file = fileMap[i];
        var initialFileName = file.name;
        var initialFilePath = file.path;
        if (file.name === 'test.ts') {
            continue;
        }
        else if (initialFileName.split('.').pop() === 'ts' || initialFileName.split('.').pop() === 'tsx') {
            const data = fs.readFileSync(initialFilePath, 'utf8');
            const lines = data.split(/\r?\n/);
            let re = /import(?:["'\s]*([\w*{}\n\r\t, ]+)from\s*)?["'\s].*([@\w_-]+)["'\s].*;$/;
            lines.forEach((line) => {
                let importLine = line.match(re);
                if (importLine != null) {
                    let importVal = importLine[0];
                    let filePath = importVal.split(' ').pop();
                    var fullPath = __dirname + filePath;
                    if (hitMap.has(fullPath) === true) {
                        var currVal = hitMap.get(fullPath);
                        hitMap.set(fullPath, currVal + 1);
                    }
                    else {
                        hitMap.set(fullPath, 1);
                    }
                }
            });
        }
    }
    hitMap[Symbol.iterator] = function* () {
        yield* [...this.entries()].sort((a, b) => a[1] - b[1]);
    };
    console.log([...hitMap]);
    rl.close();
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2VhcmNoLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU2VhcmNoLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBLDhDQUFnQztBQUNoQyx1Q0FBeUI7QUFDekIsK0RBQTBEO0FBRTFELG1EQUFxQztBQUVyQyxNQUFhLE1BQU07SUFDUixNQUFNLENBQUMsSUFBSSxDQUFDLEdBQVcsRUFBRSxPQUFhLElBQUksV0FBVyxFQUFFO1FBQzFELE1BQU0sS0FBSyxHQUFHLEVBQUUsQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUM7UUFFbEMsTUFBTSxNQUFNLEdBQVksRUFBRSxDQUFDO1FBRTNCLEtBQUssTUFBTSxJQUFJLElBQUksS0FBSyxFQUFFO1lBRXRCLE1BQU0sSUFBSSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQ3JDLE1BQU0sSUFBSSxHQUFHLEVBQUUsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7WUFFL0IsTUFBTSxVQUFVLEdBQUcsR0FBeUIsRUFBRTtnQkFDMUMsSUFBSSxJQUFJLENBQUMsV0FBVyxFQUFFLEVBQUU7b0JBQ3BCLE9BQU8sV0FBVyxDQUFDO2lCQUN0QjtnQkFFRCxJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUUsRUFBRTtvQkFDZixPQUFPLE1BQU0sQ0FBQztpQkFDakI7Z0JBQ0QsT0FBTyxTQUFTLENBQUM7WUFDckIsQ0FBQyxDQUFDO1lBQ0YsTUFBTSxJQUFJLEdBQUcsVUFBVSxFQUFFLENBQUM7WUFDMUIsSUFBSSxDQUFFLElBQUksRUFBRTtnQkFDUixTQUFTO2FBQ1o7WUFDRCxNQUFNLFlBQVksR0FBRyxHQUFVLEVBQUU7Z0JBQzdCLE9BQU8sRUFBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBQyxDQUFDO1lBQzlCLENBQUMsQ0FBQztZQUVGLE1BQU0sSUFBSSxHQUFHLFlBQVksRUFBRSxDQUFDO1lBSzVCLE1BQU0sVUFBVSxHQUFH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dGlvbjtcbmltcG9ydCAqIGFzIGxpYnBhdGggZnJvbSBcInBhdGhcIjtcbmltcG9ydCAqIGFzIGZzIGZyb20gXCJmc1wiO1xuaW1wb3J0IHtGaWxlUGF0aHN9IGZyb20gXCJwb2xhci1zaGFyZWQvc3JjL3V0aWwvRmlsZVBhdGhzXCI7XG5pbXBvcnQge1BhdGhTdHJ9IGZyb20gXCJwb2xhci1zaGFyZWQvc3JjL3V0aWwvU3RyaW5nc1wiO1xuaW1wb3J0ICogYXMgcmVhZGxpbmUgZnJvbSAncmVhZGxpbmUnO1xuXG5leHBvcnQgY2xhc3MgU2VhcmNoIHtcbiAgICBwdWJsaWMgc3RhdGljIGZpbmQoZGlyOiBzdHJpbmcsIG9wdHM6IE9wdHMgPSBuZXcgRGVmYXVsdE9wdHMoKSk6IFJlYWRvbmx5QXJyYXk8SUZpbGU+IHtcbiAgICAgICAgY29uc3QgZmlsZXMgPSBmcy5yZWFkZGlyU3luYyhkaXIpO1xuXG4gICAgICAgIGNvbnN0IHJlc3VsdDogSUZpbGVbXSA9IFtdO1xuXG4gICAgICAgIGZvciAoY29uc3QgbmFtZSBvZiBmaWxlcykge1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBjb25zdCBwYXRoID0gbGlicGF0aC5qb2luKGRpciwgbmFtZSk7XG4gICAgICAgICAgICBjb25zdCBzdGF0ID0gZnMuc3RhdFN5bmMocGF0aCk7XG5cbiAgICAgICAgICAgIGNvbnN0IGNyZWF0ZVR5cGUgPSAoKTogRmlsZVR5cGUgfCB1bmRlZmluZWQgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChzdGF0LmlzRGlyZWN0b3J5KCkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICdkaXJlY3RvcnknO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChzdGF0LmlzRmlsZSgpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAnZmlsZSc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgY29uc3QgdHlwZSA9IGNyZWF0ZVR5cGUoKTtcbiAgICAgICAgICAgIGlmICghIHR5cGUpIHtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IGNyZWF0ZVJlY29yZCA9ICgpOiBJRmlsZSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHt0eXBlLCBuYW1lLCBwYXRofTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIGNvbnN0IGZpbGUgPSBjcmVhdGVSZWNvcmQoKTtcblxuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBSZXR1cm4gdHJ1ZSBpZiB3ZSBzaG91bGQgYWNjZXB0IHRoZSBmaWxlLlxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBjb25zdCBhY2NlcHRGaWxlID0gKCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGFjY2VwdEV4dGVuc2lvbiA9ICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEgb3B0cy5leHRlbnNpb25zKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBjb25zdCBleHQgPSBGaWxlUGF0aHMudG9FeHRlbnNpb24ocGF0aCkuZ2V0T3JVbmRlZmluZWQoKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGV4dCAmJiBvcHRzLmV4dGVuc2lvbnMuaW5jbHVkZXMoZXh0KTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIGNvbnN0IGFjY2VwdFR5cGUgPSAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghIG9wdHMudHlwZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBvcHRzLnR5cGVzLmluY2x1ZGVzKHR5cGUpO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgcmV0dXJuIGFjY2VwdEV4dGVuc2lvbigpICYmIGFjY2VwdFR5cGUoKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBpZiAoYWNjZXB0RmlsZSgpKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0LnB1c2goZmlsZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAob3B0cy5yZWN1cnNlICYmIHR5cGUgPT09ICdkaXJlY3RvcnknKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0LnB1c2goLi4udGhpcy5maW5kKHBhdGgsIG9wdHMpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbn1cblxuLy8vIHRoZSBmaWxlIHR5cGUgdGhhdCBpcyBjb21wYXRpYmFsZVxuZXhwb3J0IHR5cGUgRmlsZVR5cGUgPSAnZmlsZScgfCAnZGlyZWN0b3J5Jztcbi8vLyBBIGZpbGUgZXh0ZW5zaW9uIHdpdGhvdXQgdGhlICcuJyBwcmVmaXguICBFeGFtcGxlOiBqcGcsIGpwZWcsIHR4dFxuZXhwb3J0IHR5cGUgRmlsZUV4dCA9IHN0cmluZztcblxuY2xhc3MgRGVmYXVsdE9wdHMgaW1wbGVtZW50cyBPcHRzIHtcbiAgICBwdWJsaWMgcmVhZG9ubHkgcmVjdXJzZSA9IHRydWU7XG4gICAgcHVibGljIHJlYWRvbmx5IHR5cGVzOiBSZWFkb25seUFycmF5PEZpbGVUeXBlPiA9IFsnZmlsZSddO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIE9wdHMge1xuICAgIHJlYWRvbmx5IHJlY3Vyc2U/OiBib29sZWFuO1xuICAgIC8vLyBPbmx5IGFjY2VwdCB0aGUgZ2l2ZW4gZmlsZSB0eXBlcy4gIEJ5IGRlZmF1bHQgYWxsIHR5cGVzIGFyZSBhY2NlcHRlZC5cbiAgICByZWFkb25seSB0eXBlcz86IFJlYWRvbmx5QXJyYXk8RmlsZVR5cGU+OyBcbiAgICAvLy8gT25seSBhY2NlcHQgdGhlIGdpdmVuIGV4dGVuc2lvbnMuIEJ5IGRlZmF1bHQgYWxsIGV4dGVuc2lvbiBhcmUgYWNjZXB0ZWQuXG4gICAgcmVhZG9ubHkgZXh0ZW5zaW9ucz86IFJlYWRvbmx5QXJyYXk8RmlsZUV4dD47IFxufVxuXG5leHBvcnQgaW50ZXJmYWNlIElGaWxlIHtcbiAgICByZWFkb25seSBuYW1lOiBzdHJpbmc7IFxuICAgIHJlYWRvbmx5IHBhdGg6IFBhdGhTdHI7IC8vLyB0aGUgZW50aXJlIHBhdGggb2YgdGhlIGZpbGVcbiAgICByZWFkb25seSB0eXBlOiBGaWxlVHlwZTsgLy8vIHdoYXQgdHlwZSB0aGUgZmlsZSBpc1xufVxuXG4vLy8gY3JlYXRlcyBhbiBlbXB0eSBtYXBcbmxldCBoaXRNYXAgPSBuZXcgTWFwKCk7XG5sZXQgb3B0cyA9IG5ldyBEZWZhdWx0T3B0cygpO1xuLy8vIGFsbG93cyB1cyB0byB0YWtlIHVzZXIgaW5wdXRcbmxldCBybCA9IHJlYWRsaW5lLmNyZWF0ZUludGVyZmFjZSh7XG4gICAgaW5wdXQ6IHByb2Nlc3Muc3RkaW4sXG4gICAgb3V0cHV0OiBwcm9jZXNzLnN0ZG91dFxufSk7XG5cbi8qKlxuICogYXNrcyB1c2VyIHRvIHNlZSB3aGljaCBkaXJlY3RvcnkgdG8gcGFyc2UgdGhyb3VnaFxuICogZXhhbXBsZTogL1VzZXJzL21paGlybWFjcHJvMTMvRG9jdW1lbnRzL0dpdEh1Yi9zdGFsZS1maW5kZXItdGVzdC1kaXJlY3RvcnkvXG4gKi8gXG5ybC5xdWVzdGlvbignRW50ZXIgdGhlIGVudGlyZSBkaXJlY3RvcnkgcGF0aCB0byBiZSBwYXJzZWQgdGhyb3VnaDogJywgKGN1cnJEaXJlY3RvcnkpID0+IHtcbiAgICAvLy8gU2VhcmNoLmZpbmQgcmV0dXJucyBhbiBhcnJheSB3aXRoIGFsbCB0aGUgZmlsZXMgaW4gdGhlIGRpcmVjdG9yeVxuICAgIC8vLyBpdGVyYXRlcyB0aHJvdWdoIGVhY2ggZmlsZSBpbiB0aGUgZGlyZWN0b3J5XG4gICAgdmFyIGZpbGVNYXAgPSBTZWFyY2guZmluZChjdXJyRGlyZWN0b3J5LCBvcHRzKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGZpbGVNYXAubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgLy8vIG1hcCBvZiB0aGUgZmlsZSB0eXBlLCBuYW1lLCBwYXRoIFxuICAgICAgICB2YXIgZmlsZSA9IGZpbGVNYXBbaV07XG4gICAgICAgIHZhciBpbml0aWFsRmlsZU5hbWUgPSBmaWxlLm5hbWU7XG4gICAgICAgIHZhciBpbml0aWFsRmlsZVBhdGggPSBmaWxlLnBhdGg7XG5cbiAgICAgICAgLy8vIGNoZWNrcyB0byBzZWUgaWYgdGhlIGZpbGUgbmFtZSBpcyB0ZXN0LnRzXG4gICAgICAgIC8vLyBpZiBpdCBpcyB0aGVuIGNvbnRpbnVlcyB0byB0aGUgbmV4dCBmaWxlXG4gICAgICAgIGlmIChmaWxlLm5hbWUgPT09ICd0ZXN0LnRzJykge1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgLy8vIGNoZWNrcyB0byBtYWtlIHN1cmUgdGhhdCB0aGUgZmlsZSB0eXBlIGlzIGVpdGhlciAudHMgb3IgLnRzeFxuICAgICAgICBlbHNlIGlmIChpbml0aWFsRmlsZU5hbWUuc3BsaXQoJy4nKS5wb3AoKSA9PT0gJ3RzJyB8fCBpbml0aWFsRmlsZU5hbWUuc3BsaXQoJy4nKS5wb3AoKSA9PT0gJ3RzeCcpIHtcbiAgICAgICAgICAgIC8vLyBnZXRzIGFsbCB0aGUgY29udGVudHMgb2YgdGhlIGN1cnJlbnQgZmlsZVxuICAgICAgICAgICAgY29uc3QgZGF0YSA9IGZzLnJlYWRGaWxlU3luYyhpbml0aWFsRmlsZVBhdGgsJ3V0ZjgnKTtcbiAgICAgICAgICAgIC8vLyBzcGxpdHMgZWFjaCBsaW5lIG9mIGRhdGEgdG8gYWxsb3cgdXMgdG8gcGFyc2UgdGhyb3VnaCBlYWNoIG9uZVxuICAgICAgICAgICAgY29uc3QgbGluZXMgPSBkYXRhLnNwbGl0KC9cXHI/XFxuLyk7XG4gICAgICAgICAgICAvLy8gY3JlYXRlcyBhIHJlZ3VsYXIgZXhwcmVzc2lvbiBmb3IgdGhlIGltcG9ydCBsaW5lc1xuICAgICAgICAgICAgbGV0IHJlID0gL2ltcG9ydCg/OltcIidcXHNdKihbXFx3Knt9XFxuXFxyXFx0LCBdKylmcm9tXFxzKik/W1wiJ1xcc10uKihbQFxcd18tXSspW1wiJ1xcc10uKjskLztcbiAgICAgICAgICAgIC8vLyBpdGVyYXRlcyB0aHJvdWdoIGVhY2ggbGluZSBvZiB0aGUgZmlsZVxuICAgICAgICAgICAgbGluZXMuZm9yRWFjaCgobGluZSkgPT4ge1xuICAgICAgICAgICAgICAgIC8vLyBjaGVja3MgdG8gc2VlIGlmIHRoZSBsaW5lIG1hdGNoZXMgdGhlIGZvcm1hdCBvZiB0aGUgcmVndWxhciBleHByZXNzaW9uXG4gICAgICAgICAgICAgICAgbGV0IGltcG9ydExpbmUgPSBsaW5lLm1hdGNoKHJlKTtcbiAgICAgICAgICAgICAgICAvLy8gbWFrZXMgc3VyZSB0aGF0IHRoZSBsaW5lIGFjdHVhbGx5IGhhcyB0aGUgcHJvcGVyIGZvcm1hdCBvZiB0aGUgcmVnRXhcbiAgICAgICAgICAgICAgICBpZiAoaW1wb3J0TGluZSAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vLyBnZXRzIHRoZSBlbnRpcmUgaW1wb3J0IGxpbmVzIGNvbnRlbnRzXG4gICAgICAgICAgICAgICAgICAgIGxldCBpbXBvcnRWYWwgPSBpbXBvcnRMaW5lWzBdO1xuICAgICAgICAgICAgICAgICAgICAvLy8gc3BsaXRzIHRoZSBsaW5lIGJhc2VkIG9mZiBzcGFjZXMgYW5kIGdldHMgb25seSB0aGUgZmlsZSBwYXRoXG4gICAgICAgICAgICAgICAgICAgIGxldCBmaWxlUGF0aCA9IGltcG9ydFZhbC5zcGxpdCgnICcpLnBvcCgpO1xuICAgICAgICAgICAgICAgICAgICAvLy8gY29udmVydHMgdGhhdCBmaWxlIHBhdGggaW50byBhIGZ1bGwgZmlsZSBwYXRoXG4gICAgICAgICAgICAgICAgICAgIHZhciBmdWxsUGF0aCA9IF9fZGlybmFtZSArIGZpbGVQYXRoO1xuICAgICAgICAgICAgICAgICAgICAvLy8gY2hlY2tzIHRvIHNlZSBpZiB0aGUgaGl0bWFwIGFscmVhZHkgaGFzIHRoYXQgcGF0aFxuICAgICAgICAgICAgICAgICAgICBpZiAoaGl0TWFwLmhhcyhmdWxsUGF0aCkgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vLyBpZiBpdCBkb2VzIHRoZW4gaW5jcmVtZW50cyB0aGUgdmFsdWUgb2YgdGhhdCBmaWxlIGJ5IDFcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjdXJyVmFsID0gaGl0TWFwLmdldChmdWxsUGF0aCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBoaXRNYXAuc2V0KGZ1bGxQYXRoLCBjdXJyVmFsICsgMSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgLy8vIGlmIHRoZSBoaXRtYXAgZG9lcyBub3QgaGF2ZSB0aGF0IHBhdGggYXMgYSBrZXkgYWxyZWFkeVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vLyB0aGVuIHNldHMgdGhhdCBmaWxlIHBhdGggdG8gaGF2ZSBhIHZhbHVlIG9mIDFcbiAgICAgICAgICAgICAgICAgICAgICAgIGhpdE1hcC5zZXQoZnVsbFBhdGgsIDEpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTb3J0cyB0aGUgbWFwIGluIG9yZGVyIGJhc2VkIG9uIHRoZSB2YWx1ZXMgXG4gICAgICovXG4gICAgaGl0TWFwW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbiogKCkge1xuICAgICAgICB5aWVsZCogWy4uLnRoaXMuZW50cmllcygpXS5zb3J0KChhLCBiKSA9PiBhWzFdIC0gYlsxXSk7XG4gICAgfVxuXG4gICAgXG4gICAgLy8vIHByaW50cyBvdXQgdGhlIGhpdE1hcFxuICAgIGNvbnNvbGUubG9nKFsuLi5oaXRNYXBdKTsgXG4gICAgcmwuY2xvc2UoKTtcbn0pO1xuXG4iXX0=