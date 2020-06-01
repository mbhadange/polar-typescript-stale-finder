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
const path = __importStar(require("path"));
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
var myArgs = process.argv[2];
var fileMap = Search.find(myArgs, opts);
for (var k = 0; k < fileMap.length; k++) {
    if (fileMap[k].name.includes('test.ts') || fileMap[k].name.includes('.d.ts')) {
        continue;
    }
    else if (fileMap[k].name.split('.').pop() === 'ts' || fileMap[k].name.split('.').pop() === 'tsx') {
        hitMap.set(fileMap[k].path, 0);
    }
}
for (var i = 0; i < fileMap.length; i++) {
    var file = fileMap[i];
    var initialFileName = file.name;
    var initialFilePath = file.path;
    if (file.name.includes('test.ts') || file.name.includes('.d.ts')) {
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
                var fullPath;
                if (filePath != undefined) {
                    if (filePath.includes('./') || filePath.includes('../')) {
                        filePath = filePath.replace(/['"]+/g, '');
                        if (filePath.includes('.ts') == false) {
                            filePath = filePath.replace(filePath.substring(filePath.length - 1), "");
                            filePath = filePath + '.ts';
                        }
                        var fullDirectory = path.dirname(initialFilePath);
                        fullPath = path.resolve(fullDirectory, filePath);
                        if (fs.existsSync(fullPath) == false) {
                            fullPath = fullPath + 'x';
                            if (fs.existsSync(fullPath) == false) {
                                fullPath = fullPath.replace(fullPath.substring(fullPath.length - 3), "");
                                fullPath = fullPath + 'd.ts';
                                if (fullPath.includes('utils.js.d.ts')) {
                                    fullPath = fullPath.replace(fullPath.substring(fullPath.length - 7), "");
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
                    if (hitMap.has(fullPath) === true) {
                        var currVal = hitMap.get(fullPath);
                        hitMap.set(fullPath, currVal + 1);
                    }
                    else {
                        hitMap.set(fullPath, 1);
                    }
                }
            }
        });
    }
}
hitMap[Symbol.iterator] = function* () {
    yield* [...this.entries()].sort((a, b) => a[1] - b[1]);
};
var updatedHitMap = [...hitMap];
var finalHitMap = [];
for (var index = 0; index < updatedHitMap.length; index++) {
    var currentArray = updatedHitMap[index];
    var key = currentArray[0];
    var value = currentArray[1];
    finalHitMap[index] = [value, key];
}
for (var j = 0; j < finalHitMap.length; j++) {
    var curr = finalHitMap[j];
    console.log(curr[0], ' ', curr[1], '\n');
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2VhcmNoLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU2VhcmNoLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBLDhDQUFnQztBQUNoQyx1Q0FBeUI7QUFDekIsK0RBQTBEO0FBRTFELDJDQUE2QjtBQUU3QixNQUFhLE1BQU07SUFDUixNQUFNLENBQUMsSUFBSSxDQUFDLEdBQVcsRUFBRSxPQUFhLElBQUksV0FBVyxFQUFFO1FBQzFELE1BQU0sS0FBSyxHQUFHLEVBQUUsQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUM7UUFFbEMsTUFBTSxNQUFNLEdBQVksRUFBRSxDQUFDO1FBRTNCLEtBQUssTUFBTSxJQUFJLElBQUksS0FBSyxFQUFFO1lBRXRCLE1BQU0sSUFBSSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQ3JDLE1BQU0sSUFBSSxHQUFHLEVBQUUsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7WUFFL0IsTUFBTSxVQUFVLEdBQUcsR0FBeUIsRUFBRTtnQkFDMUMsSUFBSSxJQUFJLENBQUMsV0FBVyxFQUFFLEVBQUU7b0JBQ3BCLE9BQU8sV0FBVyxDQUFDO2lCQUN0QjtnQkFFRCxJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUUsRUFBRTtvQkFDZixPQUFPLE1BQU0sQ0FBQztpQkFDakI7Z0JBQ0QsT0FBTyxTQUFTLENBQUM7WUFDckIsQ0FBQyxDQUFDO1lBQ0YsTUFBTSxJQUFJLEdBQUcsVUFBVSxFQUFFLENBQUM7WUFDMUIsSUFBSSxDQUFFLElBQUksRUFBRTtnQkFDUixTQUFTO2FBQ1o7WUFDRCxNQUFNLFlBQVksR0FBRyxHQUFVLEVBQUU7Z0JBQzdCLE9BQU8sRUFBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBQyxDQUFDO1lBQzlCLENBQUMsQ0FBQztZQUVGLE1BQU0sSUFBSSxHQUFHLFlBQVksRUFBRSxDQUFDO1lBSzVCLE1BQU0sVUFBVSxHQUFH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QUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxXQUFXLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO0lBQ3pDLElBQUksSUFBSSxHQUFHLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUMxQixPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO0NBQzVDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEVycm5vRXhjZXB0aW9uID0gTm9kZUpTLkVycm5vRXhjZXB0aW9uO1xuaW1wb3J0ICogYXMgbGlicGF0aCBmcm9tIFwicGF0aFwiO1xuaW1wb3J0ICogYXMgZnMgZnJvbSBcImZzXCI7XG5pbXBvcnQge0ZpbGVQYXRoc30gZnJvbSBcInBvbGFyLXNoYXJlZC9zcmMvdXRpbC9GaWxlUGF0aHNcIjtcbmltcG9ydCB7UGF0aFN0cn0gZnJvbSBcInBvbGFyLXNoYXJlZC9zcmMvdXRpbC9TdHJpbmdzXCI7XG5pbXBvcnQgKiBhcyBwYXRoIGZyb20gJ3BhdGgnO1xuXG5leHBvcnQgY2xhc3MgU2VhcmNoIHtcbiAgICBwdWJsaWMgc3RhdGljIGZpbmQoZGlyOiBzdHJpbmcsIG9wdHM6IE9wdHMgPSBuZXcgRGVmYXVsdE9wdHMoKSk6IFJlYWRvbmx5QXJyYXk8SUZpbGU+IHtcbiAgICAgICAgY29uc3QgZmlsZXMgPSBmcy5yZWFkZGlyU3luYyhkaXIpO1xuXG4gICAgICAgIGNvbnN0IHJlc3VsdDogSUZpbGVbXSA9IFtdO1xuXG4gICAgICAgIGZvciAoY29uc3QgbmFtZSBvZiBmaWxlcykge1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBjb25zdCBwYXRoID0gbGlicGF0aC5qb2luKGRpciwgbmFtZSk7XG4gICAgICAgICAgICBjb25zdCBzdGF0ID0gZnMuc3RhdFN5bmMocGF0aCk7XG5cbiAgICAgICAgICAgIGNvbnN0IGNyZWF0ZVR5cGUgPSAoKTogRmlsZVR5cGUgfCB1bmRlZmluZWQgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChzdGF0LmlzRGlyZWN0b3J5KCkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICdkaXJlY3RvcnknO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChzdGF0LmlzRmlsZSgpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAnZmlsZSc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgY29uc3QgdHlwZSA9IGNyZWF0ZVR5cGUoKTtcbiAgICAgICAgICAgIGlmICghIHR5cGUpIHtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IGNyZWF0ZVJlY29yZCA9ICgpOiBJRmlsZSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHt0eXBlLCBuYW1lLCBwYXRofTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIGNvbnN0IGZpbGUgPSBjcmVhdGVSZWNvcmQoKTtcblxuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBSZXR1cm4gdHJ1ZSBpZiB3ZSBzaG91bGQgYWNjZXB0IHRoZSBmaWxlLlxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBjb25zdCBhY2NlcHRGaWxlID0gKCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGFjY2VwdEV4dGVuc2lvbiA9ICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEgb3B0cy5leHRlbnNpb25zKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBjb25zdCBleHQgPSBGaWxlUGF0aHMudG9FeHRlbnNpb24ocGF0aCkuZ2V0T3JVbmRlZmluZWQoKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGV4dCAmJiBvcHRzLmV4dGVuc2lvbnMuaW5jbHVkZXMoZXh0KTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIGNvbnN0IGFjY2VwdFR5cGUgPSAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghIG9wdHMudHlwZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBvcHRzLnR5cGVzLmluY2x1ZGVzKHR5cGUpO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgcmV0dXJuIGFjY2VwdEV4dGVuc2lvbigpICYmIGFjY2VwdFR5cGUoKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBpZiAoYWNjZXB0RmlsZSgpKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0LnB1c2goZmlsZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAob3B0cy5yZWN1cnNlICYmIHR5cGUgPT09ICdkaXJlY3RvcnknKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0LnB1c2goLi4udGhpcy5maW5kKHBhdGgsIG9wdHMpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbn1cblxuLy8vIHRoZSBmaWxlIHR5cGUgdGhhdCBpcyBjb21wYXRpYmFsZVxuZXhwb3J0IHR5cGUgRmlsZVR5cGUgPSAnZmlsZScgfCAnZGlyZWN0b3J5Jztcbi8vLyBBIGZpbGUgZXh0ZW5zaW9uIHdpdGhvdXQgdGhlICcuJyBwcmVmaXguICBFeGFtcGxlOiBqcGcsIGpwZWcsIHR4dFxuZXhwb3J0IHR5cGUgRmlsZUV4dCA9IHN0cmluZztcblxuY2xhc3MgRGVmYXVsdE9wdHMgaW1wbGVtZW50cyBPcHRzIHtcbiAgICBwdWJsaWMgcmVhZG9ubHkgcmVjdXJzZSA9IHRydWU7XG4gICAgcHVibGljIHJlYWRvbmx5IHR5cGVzOiBSZWFkb25seUFycmF5PEZpbGVUeXBlPiA9IFsnZmlsZSddO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIE9wdHMge1xuICAgIHJlYWRvbmx5IHJlY3Vyc2U/OiBib29sZWFuO1xuICAgIC8vLyBPbmx5IGFjY2VwdCB0aGUgZ2l2ZW4gZmlsZSB0eXBlcy4gIEJ5IGRlZmF1bHQgYWxsIHR5cGVzIGFyZSBhY2NlcHRlZC5cbiAgICByZWFkb25seSB0eXBlcz86IFJlYWRvbmx5QXJyYXk8RmlsZVR5cGU+OyBcbiAgICAvLy8gT25seSBhY2NlcHQgdGhlIGdpdmVuIGV4dGVuc2lvbnMuIEJ5IGRlZmF1bHQgYWxsIGV4dGVuc2lvbiBhcmUgYWNjZXB0ZWQuXG4gICAgcmVhZG9ubHkgZXh0ZW5zaW9ucz86IFJlYWRvbmx5QXJyYXk8RmlsZUV4dD47IFxufVxuXG5leHBvcnQgaW50ZXJmYWNlIElGaWxlIHtcbiAgICByZWFkb25seSBuYW1lOiBzdHJpbmc7IFxuICAgIHJlYWRvbmx5IHBhdGg6IFBhdGhTdHI7IC8vLyB0aGUgZW50aXJlIHBhdGggb2YgdGhlIGZpbGVcbiAgICByZWFkb25seSB0eXBlOiBGaWxlVHlwZTsgLy8vIHdoYXQgdHlwZSB0aGUgZmlsZSBpc1xufVxuXG4vLy8gY3JlYXRlcyBhbiBlbXB0eSBtYXBcbmxldCBoaXRNYXAgPSBuZXcgTWFwKCk7XG5sZXQgb3B0cyA9IG5ldyBEZWZhdWx0T3B0cygpO1xuXG4vKipcbiAqIHVzZXMgcHJvY2Vzcy5hcmd2IHRvIHNlZSB3aGljaCBkaXJlY3RvcnkgdG8gcGFyc2UgdGhyb3VnaCB1c2luZyB0aGUgY29tbWFuZCBsaW5lXG4gKiBleGFtcGxlOiBub2RlIFNlYXJjaC5qcyAvVXNlcnMvbWloaXJtYWNwcm8xMy9Eb2N1bWVudHMvR2l0SHViL3BvbGFyLWJvb2tzaGVsZi93ZWIvanNcbiAqLyBcbnZhciBteUFyZ3MgPSBwcm9jZXNzLmFyZ3ZbMl07XG4vLy8gU2VhcmNoLmZpbmQgcmV0dXJucyBhbiBhcnJheSB3aXRoIGFsbCB0aGUgZmlsZXMgaW4gdGhlIGRpcmVjdG9yeVxuLy8vIGl0ZXJhdGVzIHRocm91Z2ggZWFjaCBmaWxlIGluIHRoZSBkaXJlY3RvcnlcbnZhciBmaWxlTWFwID0gU2VhcmNoLmZpbmQobXlBcmdzLCBvcHRzKTtcbmZvciAodmFyIGsgPSAwOyBrIDwgZmlsZU1hcC5sZW5ndGg7IGsrKykge1xuICAgIGlmIChmaWxlTWFwW2tdLm5hbWUuaW5jbHVkZXMoJ3Rlc3QudHMnKSAgfHwgZmlsZU1hcFtrXS5uYW1lLmluY2x1ZGVzKCcuZC50cycpKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgIH1cbiAgICAvLy8gY2hlY2tzIHRvIG1ha2Ugc3VyZSB0aGF0IHRoZSBmaWxlIHR5cGUgaXMgZWl0aGVyIC50cyBvciAudHN4XG4gICAgZWxzZSBpZiAoZmlsZU1hcFtrXS5uYW1lLnNwbGl0KCcuJykucG9wKCkgPT09ICd0cycgfHwgZmlsZU1hcFtrXS5uYW1lLnNwbGl0KCcuJykucG9wKCkgPT09ICd0c3gnKSB7XG4gICAgICAgIC8vLyBpbml0aWFsaXplcyBoaXRNYXBcbiAgICAgICAgaGl0TWFwLnNldChmaWxlTWFwW2tdLnBhdGgsIDApO1xuICAgIH1cbn1cblxuZm9yICh2YXIgaSA9IDA7IGkgPCBmaWxlTWFwLmxlbmd0aDsgaSsrKSB7XG5cbiAgICAvLy8gbWFwIG9mIHRoZSBmaWxlIHR5cGUsIG5hbWUsIHBhdGggXG4gICAgdmFyIGZpbGUgPSBmaWxlTWFwW2ldO1xuICAgIHZhciBpbml0aWFsRmlsZU5hbWUgPSBmaWxlLm5hbWU7XG4gICAgdmFyIGluaXRpYWxGaWxlUGF0aCA9IGZpbGUucGF0aDtcbiAgICBcbiAgICAvLy8gY2hlY2tzIHRvIHNlZSBpZiB0aGUgZmlsZSBuYW1lIGlzIHRlc3QudHNcbiAgICAvLy8gaWYgaXQgaXMgdGhlbiBjb250aW51ZXMgdG8gdGhlIG5leHQgZmlsZVxuICAgIGlmIChmaWxlLm5hbWUuaW5jbHVkZXMoJ3Rlc3QudHMnKSAgfHwgZmlsZS5uYW1lLmluY2x1ZGVzKCcuZC50cycpKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgIH1cbiAgICAvLy8gY2hlY2tzIHRvIG1ha2Ugc3VyZSB0aGF0IHRoZSBmaWxlIHR5cGUgaXMgZWl0aGVyIC50cyBvciAudHN4XG4gICAgZWxzZSBpZiAoaW5pdGlhbEZpbGVOYW1lLnNwbGl0KCcuJykucG9wKCkgPT09ICd0cycgfHwgaW5pdGlhbEZpbGVOYW1lLnNwbGl0KCcuJykucG9wKCkgPT09ICd0c3gnKSB7XG4gICAgICAgIC8vLyBnZXRzIGFsbCB0aGUgY29udGVudHMgb2YgdGhlIGN1cnJlbnQgZmlsZVxuICAgICAgICBjb25zdCBkYXRhID0gZnMucmVhZEZpbGVTeW5jKGluaXRpYWxGaWxlUGF0aCwndXRmOCcpO1xuICAgICAgICAvLy8gc3BsaXRzIGVhY2ggbGluZSBvZiBkYXRhIHRvIGFsbG93IHVzIHRvIHBhcnNlIHRocm91Z2ggZWFjaCBvbmVcbiAgICAgICAgY29uc3QgbGluZXMgPSBkYXRhLnNwbGl0KC9cXHI/XFxuLyk7XG4gICAgICAgIC8vLyBjcmVhdGVzIGEgcmVndWxhciBleHByZXNzaW9uIGZvciB0aGUgaW1wb3J0IGxpbmVzXG4gICAgICAgIGxldCByZSA9IC9pbXBvcnQoPzpbXCInXFxzXSooW1xcdyp7fVxcblxcclxcdCwgXSspZnJvbVxccyopP1tcIidcXHNdLiooW0BcXHdfLV0rKVtcIidcXHNdLio7JC87XG4gICAgICAgIC8vLyBpdGVyYXRlcyB0aHJvdWdoIGVhY2ggbGluZSBvZiB0aGUgZmlsZVxuICAgICAgICBsaW5lcy5mb3JFYWNoKChsaW5lKSA9PiB7XG4gICAgICAgICAgICAvLy8gY2hlY2tzIHRvIHNlZSBpZiB0aGUgbGluZSBtYXRjaGVzIHRoZSBmb3JtYXQgb2YgdGhlIHJlZ3VsYXIgZXhwcmVzc2lvblxuICAgICAgICAgICAgbGV0IGltcG9ydExpbmUgPSBsaW5lLm1hdGNoKHJlKTtcbiAgICAgICAgICAgIC8vLyBtYWtlcyBzdXJlIHRoYXQgdGhlIGxpbmUgYWN0dWFsbHkgaGFzIHRoZSBwcm9wZXIgZm9ybWF0IG9mIHRoZSByZWdFeFxuICAgICAgICAgICAgaWYgKGltcG9ydExpbmUgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIC8vLyBnZXRzIHRoZSBlbnRpcmUgaW1wb3J0IGxpbmVzIGNvbnRlbnRzXG4gICAgICAgICAgICAgICAgbGV0IGltcG9ydFZhbCA9IGltcG9ydExpbmVbMF07XG4gICAgICAgICAgICAgICAgLy8vIHNwbGl0cyB0aGUgbGluZSBiYXNlZCBvZmYgc3BhY2VzIGFuZCBnZXRzIG9ubHkgdGhlIGZpbGUgcGF0aFxuICAgICAgICAgICAgICAgIGxldCBmaWxlUGF0aCA9IGltcG9ydFZhbC5zcGxpdCgnICcpLnBvcCgpO1xuICAgICAgICAgICAgICAgIHZhciBmdWxsUGF0aDtcbiAgICAgICAgICAgICAgICAvLy8gY29udmVydHMgdGhhdCBmaWxlIHBhdGggaW50byBhIGZ1bGwgZmlsZSBwYXRoXG4gICAgICAgICAgICAgICAgaWYgKGZpbGVQYXRoICE9IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZmlsZVBhdGguaW5jbHVkZXMoJy4vJykgfHwgZmlsZVBhdGguaW5jbHVkZXMoJy4uLycpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLy8gZml4ZXMgdGhlIHB1bmN0dWF0aW9uIG9mIHRoZSBmaWxlIHBhdGggb2YgdGhlIGltcG9ydFxuICAgICAgICAgICAgICAgICAgICAgICAgZmlsZVBhdGggPSBmaWxlUGF0aC5yZXBsYWNlKC9bJ1wiXSsvZywgJycpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGZpbGVQYXRoLmluY2x1ZGVzKCcudHMnKSA9PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbGVQYXRoID0gZmlsZVBhdGgucmVwbGFjZShmaWxlUGF0aC5zdWJzdHJpbmcoZmlsZVBhdGgubGVuZ3RoLTEpLCBcIlwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWxlUGF0aCA9IGZpbGVQYXRoICsgJy50cyc7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgICAgICAgICAqIGNyZWF0ZXMgdGhlIGZ1bGwgcGF0aCB3aXRoIHRoZSBwcm9wZXIgZGlyZWN0b3J5IG5hbWUgXG4gICAgICAgICAgICAgICAgICAgICAgICAgKiBjaGVja3MgdG8gbWFrZSBzdXJlIHRoYXQgdGhlIHBhdGggZXhpc3RzXG4gICAgICAgICAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBmdWxsRGlyZWN0b3J5ID0gcGF0aC5kaXJuYW1lKGluaXRpYWxGaWxlUGF0aCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBmdWxsUGF0aCA9IHBhdGgucmVzb2x2ZShmdWxsRGlyZWN0b3J5LCBmaWxlUGF0aCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZnMuZXhpc3RzU3luYyhmdWxsUGF0aCkgPT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmdWxsUGF0aCA9IGZ1bGxQYXRoICsgJ3gnO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChmcy5leGlzdHNTeW5jKGZ1bGxQYXRoKSA9PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmdWxsUGF0aCA9IGZ1bGxQYXRoLnJlcGxhY2UoZnVsbFBhdGguc3Vic3RyaW5nKGZ1bGxQYXRoLmxlbmd0aC0zKSwgXCJcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZ1bGxQYXRoID0gZnVsbFBhdGggKyAnZC50cyc7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChmdWxsUGF0aC5pbmNsdWRlcygndXRpbHMuanMuZC50cycpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmdWxsUGF0aCA9IGZ1bGxQYXRoLnJlcGxhY2UoZnVsbFBhdGguc3Vic3RyaW5nKGZ1bGxQYXRoLmxlbmd0aC03KSwgXCJcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmdWxsUGF0aCA9IGZ1bGxQYXRoICsgJ3RzJztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZnMuZXhpc3RzU3luYyhmdWxsUGF0aCkgPT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihcIkZpbGUgZG9lcyBub3QgZXhpc3Q6IFwiICsgZnVsbFBhdGgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgaWYgKGZ1bGxQYXRoICE9IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICAgLy8vIGNoZWNrcyB0byBzZWUgaWYgdGhlIGhpdG1hcCBhbHJlYWR5IGhhcyB0aGF0IHBhdGhcbiAgICAgICAgICAgICAgICAgICAgaWYgKGhpdE1hcC5oYXMoZnVsbFBhdGgpID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLy8gaWYgaXQgZG9lcyB0aGVuIGluY3JlbWVudHMgdGhlIHZhbHVlIG9mIHRoYXQgZmlsZSBieSAxXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgY3VyclZhbCA9IGhpdE1hcC5nZXQoZnVsbFBhdGgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaGl0TWFwLnNldChmdWxsUGF0aCwgY3VyclZhbCArIDEpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIC8vLyBpZiB0aGUgaGl0bWFwIGRvZXMgbm90IGhhdmUgdGhhdCBwYXRoIGFzIGEga2V5IGFscmVhZHlcbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLy8gdGhlbiBzZXRzIHRoYXQgZmlsZSBwYXRoIHRvIGhhdmUgYSB2YWx1ZSBvZiAxXG4gICAgICAgICAgICAgICAgICAgICAgICBoaXRNYXAuc2V0KGZ1bGxQYXRoLCAxKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxufVxuXG4vKipcbiAqIFNvcnRzIHRoZSBtYXAgaW4gb3JkZXIgYmFzZWQgb24gdGhlIHZhbHVlcyBcbiAqL1xuaGl0TWFwW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbiogKCkge1xuICAgIHlpZWxkKiBbLi4udGhpcy5lbnRyaWVzKCldLnNvcnQoKGEsIGIpID0+IGFbMV0gLSBiWzFdKTtcbn1cblxuLy8vIG1ha2VzIHRoZSBtYXAgaW50byBhIHRhYmxlIHR5cGUgZm9ybWF0IHdpdGggYSBuZXN0ZWQgYXJyYXlcbnZhciB1cGRhdGVkSGl0TWFwID0gWy4uLmhpdE1hcF07XG5cbi8qKlxuICogc3dhcHMgdGhlIGtleSBhbmQgdGhlIHZhbHVlIG9mIHRoZSBtYXAsIHNvIHRoZSBudW1iZXIgb2YgaGl0cyBpcyBmb3JtYXR0ZWQgdG8gdGhlIGxlZnQgb2YgdGhlIGZ1bGwgZmlsZSBwYXRoXG4gKi9cbnZhciBmaW5hbEhpdE1hcCA9IFtdO1xuZm9yICh2YXIgaW5kZXggPSAwOyBpbmRleCA8IHVwZGF0ZWRIaXRNYXAubGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgdmFyIGN1cnJlbnRBcnJheSA9IHVwZGF0ZWRIaXRNYXBbaW5kZXhdO1xuICAgIHZhciBrZXkgPSBjdXJyZW50QXJyYXlbMF07XG4gICAgdmFyIHZhbHVlID0gY3VycmVudEFycmF5WzFdO1xuICAgIGZpbmFsSGl0TWFwW2luZGV4XSA9IFt2YWx1ZSwga2V5XTtcbn1cblxuLyoqXG4gKiBwcmludHMgb3V0IHRoZSBmaW5hbEhpdE1hcFxuICovXG5mb3IgKHZhciBqID0gMDsgaiA8IGZpbmFsSGl0TWFwLmxlbmd0aDsgaisrKSB7XG4gICAgdmFyIGN1cnIgPSBmaW5hbEhpdE1hcFtqXTtcbiAgICBjb25zb2xlLmxvZyhjdXJyWzBdLCAnICcsIGN1cnJbMV0sICdcXG4nKTtcbn0iXX0=