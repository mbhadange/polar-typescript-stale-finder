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
const find_1 = require("./find");
const chai_1 = require("chai");
const find_2 = require("./find");
const path = __importStar(require("path"));
const fs = __importStar(require("fs"));
describe('GetExtension', function () {
    it("Test 1", function () {
        chai_1.assert.equal(find_1.Stale.getExtension("file.txt"), "txt");
    });
    it("Test 2", function () {
        chai_1.assert.equal(find_1.Stale.getExtension("file.name.with.dots.js"), "js");
    });
    it("Test 3", function () {
        chai_1.assert.equal(find_1.Stale.getExtension("file"), undefined);
    });
    it("Test 4", function () {
        chai_1.assert.equal(find_1.Stale.getExtension(" "), undefined);
    });
    it("Test 5", function () {
        chai_1.assert.equal(find_1.Stale.getExtension("currentfile/file.ts"), "ts");
    });
});
describe('FindFilesRecursively', function () {
    it("Test 1", function () {
        var data = path.resolve();
        const opts = new find_2.DefaultOpts();
        chai_1.assert.notEqual(find_1.Search.findFilesRecursively(data, opts), []);
    });
    it("Test 2", function () {
        var data = path.resolve();
        const opts = new find_2.DefaultOpts();
        var searchArrayLength = (find_1.Search.findFilesRecursively(data, opts)).length;
        var emptyArrayLength = ([]).length;
        chai_1.assert.notEqual(searchArrayLength, emptyArrayLength);
    });
});
describe('InitializeTypescriptMapFiles', function () {
    it("Test 1", function () {
        const data = [];
        var currMap = new Map();
        var finalMap = find_1.Stale.initializeTypescriptMapFiles(data, currMap);
        var newMapLength = [...finalMap.keys()].length;
        chai_1.assert.equal(newMapLength, 0);
    });
    it("Test 2", function () {
        var data = path.resolve();
        const opts = new find_2.DefaultOpts();
        var fileArray = find_1.Search.findFilesRecursively(data, opts);
        var currMap = new Map();
        var finalMap = find_1.Stale.initializeTypescriptMapFiles(fileArray, currMap);
        var mapLength = [...finalMap.keys()].length;
        chai_1.assert.equal(mapLength, 3);
    });
});
describe('UpdateHitMap', function () {
    it("Test 1", function () {
        var data = path.resolve();
        var currMap = new Map();
        currMap.set('a', 1);
        chai_1.assert.notEqual(find_1.Stale.updateHitMap(data, currMap), undefined);
    });
    it("Test 2", function () {
        var data = path.resolve();
        var currMap = new Map();
        var final = [...find_1.Stale.updateHitMap(data, currMap)].length;
        chai_1.assert.notEqual(final, 0);
    });
    it("Test 3", function () {
        var data = path.resolve();
        const opts = new find_2.DefaultOpts();
        var fileArray = find_1.Search.findFilesRecursively(data, opts);
        var currMap = new Map();
        var finalMap = find_1.Stale.initializeTypescriptMapFiles(fileArray, currMap);
        var mapLength = [...finalMap.keys()].length;
        var newMapLength = [...find_1.Stale.updateHitMap(data, finalMap).keys()].length;
        chai_1.assert.notEqual(mapLength, newMapLength);
    });
});
describe('CheckFullPath', function () {
    it("Test 1", function () {
        chai_1.assert.equal(find_1.Stale.checkFullPath(path.resolve()), path.resolve());
    });
    it("Test 2", function () {
        var currPath = "file.ts";
        chai_1.assert.equal(find_1.Stale.checkFullPath(currPath), "file.d.ts");
    });
});
describe('ExpandPath', function () {
    it("Test 1", function () {
        var file = "./file;";
        chai_1.assert.equal(find_1.Stale.expandPath(file), "./file.ts");
    });
    it("Test 2", function () {
        var file = "./path/to/file.ts;";
        chai_1.assert.equal(find_1.Stale.expandPath(file), "./path/to/file.ts;");
    });
    it("Test 3", function () {
        var file = ";";
        chai_1.assert.equal(find_1.Stale.expandPath(file), ".ts");
    });
});
describe('SortMap', function () {
    it("Test 1", function () {
        var currMap = new Map();
        currMap.set('a', 3);
        currMap.set('b', 6);
        currMap.set('d', 1);
        currMap.set('z', 0);
        var finalMap = find_1.Stale.sortMap(currMap);
        let map = new Map([
            ["a", 0],
            ["b", 1],
            ["d", 3],
            ["z", 6]
        ]);
        chai_1.assert.notEqual(finalMap, map);
    });
});
describe('SwapMapValues', function () {
    it("Test 1", function () {
        var currArray = [['a', 1], ['b', 2], ['c', 3]];
        chai_1.assert.notEqual(find_1.Stale.swapMapValues(currArray), currArray);
    });
    it("Test 2", function () {
        var currArray = [['a', 1], ['b', 2], ['c', 3]];
        var finalArray = [[1, 'a'], [2, 'b'], [3, 'c']];
        chai_1.assert.deepEqual(find_1.Stale.swapMapValues(currArray), finalArray);
    });
});
describe('IsNotStale', function () {
    it("Test 1", function () {
        const data = fs.readFileSync("./src/stale-code/search/Search.ts", 'utf8');
        chai_1.assert.equal(find_1.Stale.isNotStale(data), true);
    });
    it("Test 2", function () {
        const data = fs.readFileSync("./src/stale-code/search/find.ts", 'utf8');
        chai_1.assert.equal(find_1.Stale.isNotStale(data), true);
    });
});
describe('ParseImports', function () {
    it("Test 1", function () {
        const data = `
        import {DocMetaFileRef, DocMetaRef} from './DocMetaRef';
        `;
        chai_1.assert.equal(find_1.Stale.parseImports(data)[0], "import {DocMetaFileRef, DocMetaRef} from './DocMetaRef';");
    });
    it("Test 2", function () {
        const data = `
        import {DocMetas} from "../metadata/DocMetas";
        import {
            BackendFileRefData,
            BinaryFileData,
            Datastore,
            DatastoreCapabilities,
            DatastoreInitOpts,
            DatastoreOverview,
            DeleteResult, DocMetaSnapshot,
            DocMetaSnapshotEventListener, DocMetaSnapshotOpts, DocMetaSnapshotResult,
            ErrorListener,
            GetFileOpts,
            GroupIDStr,
            SnapshotResult,
            WriteFileOpts
        } from './Datastore';
        import {Backend} from 'polar-shared/src/datastore/Backend';
        `;
        const result = [
            'import {DocMetas} from "../metadata/DocMetas";',
            'import {\n' +
                '            BackendFileRefData,\n' +
                '            BinaryFileData,\n' +
                '            Datastore,\n' +
                '            DatastoreCapabilities,\n' +
                '            DatastoreInitOpts,\n' +
                '            DatastoreOverview,\n' +
                '            DeleteResult, DocMetaSnapshot,\n' +
                '            DocMetaSnapshotEventListener, DocMetaSnapshotOpts, DocMetaSnapshotResult,\n' +
                '            ErrorListener,\n' +
                '            GetFileOpts,\n' +
                '            GroupIDStr,\n' +
                '            SnapshotResult,\n' +
                '            WriteFileOpts\n' +
                "        } from './Datastore';",
            "import {Backend} from 'polar-shared/src/datastore/Backend';"
        ];
        chai_1.assert.deepEqual(find_1.Stale.parseImports(data), result);
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2VhcmNoVGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNlYXJjaFRlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsaUNBQXVDO0FBQ3ZDLCtCQUE4QjtBQUM5QixpQ0FBMEM7QUFDMUMsMkNBQTZCO0FBQzdCLHVDQUF5QjtBQUt6QixRQUFRLENBQUUsY0FBYyxFQUFFO0lBQ3RCLEVBQUUsQ0FBRSxRQUFRLEVBQUU7UUFDVixhQUFNLENBQUMsS0FBSyxDQUFDLFlBQUssQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDeEQsQ0FBQyxDQUFDLENBQUM7SUFDSCxFQUFFLENBQUUsUUFBUSxFQUFFO1FBQ1YsYUFBTSxDQUFDLEtBQUssQ0FBQyxZQUFLLENBQUMsWUFBWSxDQUFDLHdCQUF3QixDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDckUsQ0FBQyxDQUFDLENBQUM7SUFDSCxFQUFFLENBQUUsUUFBUSxFQUFFO1FBQ1YsYUFBTSxDQUFDLEtBQUssQ0FBQyxZQUFLLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxFQUFFLFNBQVMsQ0FBQyxDQUFDO0lBQ3hELENBQUMsQ0FBQyxDQUFDO0lBQ0gsRUFBRSxDQUFFLFFBQVEsRUFBRTtRQUNWLGFBQU0sQ0FBQyxLQUFLLENBQUMsWUFBSyxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsRUFBRSxTQUFTLENBQUMsQ0FBQztJQUNyRCxDQUFDLENBQUMsQ0FBQztJQUNILEVBQUUsQ0FBRSxRQUFRLEVBQUU7UUFDVixhQUFNLENBQUMsS0FBSyxDQUFDLFlBQUssQ0FBQyxZQUFZLENBQUMscUJBQXFCLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNsRSxDQUFDLENBQUMsQ0FBQztBQUNQLENBQUMsQ0FBQyxDQUFDO0FBS0gsUUFBUSxDQUFFLHNCQUFzQixFQUFFO0lBQzlCLEVBQUUsQ0FBRSxRQUFRLEVBQUU7UUFD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LDhDQUE4QztnQkFDOUMseUZBQXlGO2dCQUN6Riw4QkFBOEI7Z0JBQzlCLDRCQUE0QjtnQkFDNUIsMkJBQTJCO2dCQUMzQiwrQkFBK0I7Z0JBQy9CLDZCQUE2QjtnQkFDN0IsK0JBQStCO1lBQ2pDLDZEQUE2RDtTQUNoRSxDQUFDO1FBQ0YsYUFBTSxDQUFDLFNBQVMsQ0FBQyxZQUFLLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQ3ZELENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQyxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBTdGFsZSwgU2VhcmNoIH0gZnJvbSBcIi4vZmluZFwiO1xuaW1wb3J0IHsgYXNzZXJ0IH0gZnJvbSAnY2hhaSc7XG5pbXBvcnQge0RlZmF1bHRPcHRzLCBJRmlsZX0gZnJvbSBcIi4vZmluZFwiO1xuaW1wb3J0ICogYXMgcGF0aCBmcm9tICdwYXRoJztcbmltcG9ydCAqIGFzIGZzIGZyb20gXCJmc1wiO1xuXG4vKipcbiAqIFRlc3RzIHRvIG1ha2Ugc3VyZSB0aGF0IHRoZSBleHRlbnNpb25zIG9mIHRoZSBmaWxlIG5hbWUvcGF0aCBhcmUgcHJvcGVybHkgZm91bmQgXG4gKi9cbmRlc2NyaWJlICgnR2V0RXh0ZW5zaW9uJywgZnVuY3Rpb24oKSB7XG4gICAgaXQgKFwiVGVzdCAxXCIsIGZ1bmN0aW9uKCkge1xuICAgICAgICBhc3NlcnQuZXF1YWwoU3RhbGUuZ2V0RXh0ZW5zaW9uKFwiZmlsZS50eHRcIiksIFwidHh0XCIpO1xuICAgIH0pO1xuICAgIGl0IChcIlRlc3QgMlwiLCBmdW5jdGlvbigpIHtcbiAgICAgICAgYXNzZXJ0LmVxdWFsKFN0YWxlLmdldEV4dGVuc2lvbihcImZpbGUubmFtZS53aXRoLmRvdHMuanNcIiksIFwianNcIik7XG4gICAgfSk7XG4gICAgaXQgKFwiVGVzdCAzXCIsIGZ1bmN0aW9uKCkge1xuICAgICAgICBhc3NlcnQuZXF1YWwoU3RhbGUuZ2V0RXh0ZW5zaW9uKFwiZmlsZVwiKSwgdW5kZWZpbmVkKTtcbiAgICB9KTtcbiAgICBpdCAoXCJUZXN0IDRcIiwgZnVuY3Rpb24oKSB7XG4gICAgICAgIGFzc2VydC5lcXVhbChTdGFsZS5nZXRFeHRlbnNpb24oXCIgXCIpLCB1bmRlZmluZWQpO1xuICAgIH0pO1xuICAgIGl0IChcIlRlc3QgNVwiLCBmdW5jdGlvbigpIHtcbiAgICAgICAgYXNzZXJ0LmVxdWFsKFN0YWxlLmdldEV4dGVuc2lvbihcImN1cnJlbnRmaWxlL2ZpbGUudHNcIiksIFwidHNcIik7XG4gICAgfSk7XG59KTtcblxuLyoqXG4gKiBUZXN0cyB0byBtYWtlIHN1cmUgdGhhdCB0aGUgZnVuY3Rpb24gaXMgcmV0dXJuaW5nIHRoZSBwcm9wZXIgYXJyYXkgb2YgZmlsZXMgYW5kIGlzIG5vdCByZXR1cm5pbmcgYW4gZW1wdHkgYXJyYXlcbiAqL1xuZGVzY3JpYmUgKCdGaW5kRmlsZXNSZWN1cnNpdmVseScsIGZ1bmN0aW9uKCkge1xuICAgIGl0IChcIlRlc3QgMVwiLCBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGRhdGEgPSBwYXRoLnJlc29sdmUoKTtcbiAgICAgICAgY29uc3Qgb3B0cyA9IG5ldyBEZWZhdWx0T3B0cygpO1xuICAgICAgICBhc3NlcnQubm90RXF1YWwoU2VhcmNoLmZpbmRGaWxlc1JlY3Vyc2l2ZWx5KGRhdGEsIG9wdHMpLCBbXSk7XG4gICAgfSk7XG4gICAgaXQgKFwiVGVzdCAyXCIsIGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgZGF0YSA9IHBhdGgucmVzb2x2ZSgpO1xuICAgICAgICBjb25zdCBvcHRzID0gbmV3IERlZmF1bHRPcHRzKCk7XG4gICAgICAgIHZhciBzZWFyY2hBcnJheUxlbmd0aCA9IChTZWFyY2guZmluZEZpbGVzUmVjdXJzaXZlbHkoZGF0YSwgb3B0cykpLmxlbmd0aDtcbiAgICAgICAgdmFyIGVtcHR5QXJyYXlMZW5ndGggPSAoW10pLmxlbmd0aDtcbiAgICAgICAgYXNzZXJ0Lm5vdEVxdWFsKHNlYXJjaEFycmF5TGVuZ3RoLCBlbXB0eUFycmF5TGVuZ3RoKTtcbiAgICB9KTtcbn0pO1xuXG4vKipcbiAqIFRlc3RzIHRvIG1ha2Ugc3VyZSB0aGF0IHRoZSBmaWxlcyB0aGF0IGZpdCB0aGUgcmVxdWlyZW1lbnQgYXJlIHByb3Blcmx5IGJlaW5nIGFkZGVkIHRvIHRoZSBoaXRtYXBcbiAqIENoZWNrcyB0aGlzIGJ5IG1ha2luZyBzdXJlIHRoYXQgdGhlIGxlbmd0aCBvZiB0aGUgbWFwIG1hdGNoZXMgb3IgZG9lc24ndHQgbWF0Y2ggdGhlIGdpdmVuIGxlbmd0aFxuICovXG5kZXNjcmliZSAoJ0luaXRpYWxpemVUeXBlc2NyaXB0TWFwRmlsZXMnLCBmdW5jdGlvbigpIHtcbiAgICBpdCAoXCJUZXN0IDFcIiwgZnVuY3Rpb24oKSB7XG4gICAgICAgIGNvbnN0IGRhdGEgOiBJRmlsZVtdID0gW107XG4gICAgICAgIHZhciBjdXJyTWFwID0gbmV3IE1hcCgpO1xuICAgICAgICB2YXIgZmluYWxNYXAgPSBTdGFsZS5pbml0aWFsaXplVHlwZXNjcmlwdE1hcEZpbGVzKGRhdGEsIGN1cnJNYXApO1xuICAgICAgICB2YXIgbmV3TWFwTGVuZ3RoID0gWyAuLi5maW5hbE1hcC5rZXlzKCkgXS5sZW5ndGg7XG4gICAgICAgIGFzc2VydC5lcXVhbChuZXdNYXBMZW5ndGgsIDApO1xuICAgIH0pO1xuICAgIGl0IChcIlRlc3QgMlwiLCBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGRhdGEgPSBwYXRoLnJlc29sdmUoKTtcbiAgICAgICAgY29uc3Qgb3B0cyA9IG5ldyBEZWZhdWx0T3B0cygpO1xuICAgICAgICB2YXIgZmlsZUFycmF5ID0gU2VhcmNoLmZpbmRGaWxlc1JlY3Vyc2l2ZWx5KGRhdGEsIG9wdHMpO1xuICAgICAgICB2YXIgY3Vyck1hcCA9IG5ldyBNYXAoKTtcbiAgICAgICAgdmFyIGZpbmFsTWFwID0gU3RhbGUuaW5pdGlhbGl6ZVR5cGVzY3JpcHRNYXBGaWxlcyhmaWxlQXJyYXksIGN1cnJNYXApO1xuICAgICAgICB2YXIgbWFwTGVuZ3RoID0gWyAuLi5maW5hbE1hcC5rZXlzKCkgXS5sZW5ndGg7XG4gICAgICAgIGFzc2VydC5lcXVhbChtYXBMZW5ndGgsMyk7XG4gICAgfSk7XG59KTtcblxuLyoqXG4gKiBUZXN0cyB0byBtYWtlIHN1cmUgdGhhdCB0aGUgaGl0IHZhbHVlcyBhcmUgcHJvcGVybHkgYmVpbmcgdXBkYXRlZCBpZiB0aGUgc2FtZSBmaWxlIGlzIGZvdW5kIGFzIGFuIGltcG9ydFxuICovXG5kZXNjcmliZSAoJ1VwZGF0ZUhpdE1hcCcsIGZ1bmN0aW9uKCkge1xuICAgIGl0IChcIlRlc3QgMVwiLCBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGRhdGEgPSBwYXRoLnJlc29sdmUoKTtcbiAgICAgICAgdmFyIGN1cnJNYXAgPSBuZXcgTWFwKCk7XG4gICAgICAgIGN1cnJNYXAuc2V0KCdhJywgMSk7XG4gICAgICAgIGFzc2VydC5ub3RFcXVhbChTdGFsZS51cGRhdGVIaXRNYXAoZGF0YSwgY3Vyck1hcCksIHVuZGVmaW5lZCk7XG4gICAgfSk7XG4gICAgaXQgKFwiVGVzdCAyXCIsIGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgZGF0YSA9IHBhdGgucmVzb2x2ZSgpO1xuICAgICAgICB2YXIgY3Vyck1hcCA9IG5ldyBNYXAoKTtcbiAgICAgICAgdmFyIGZpbmFsID0gWyAuLi5TdGFsZS51cGRhdGVIaXRNYXAoZGF0YSwgY3Vyck1hcCkgXS5sZW5ndGg7XG4gICAgICAgIGFzc2VydC5ub3RFcXVhbChmaW5hbCwgMCk7XG4gICAgfSk7XG4gICAgaXQgKFwiVGVzdCAzXCIsIGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgZGF0YSA9IHBhdGgucmVzb2x2ZSgpO1xuICAgICAgICBjb25zdCBvcHRzID0gbmV3IERlZmF1bHRPcHRzKCk7IFxuICAgICAgICB2YXIgZmlsZUFycmF5ID0gU2VhcmNoLmZpbmRGaWxlc1JlY3Vyc2l2ZWx5KGRhdGEsIG9wdHMpO1xuICAgICAgICB2YXIgY3Vyck1hcCA9IG5ldyBNYXAoKTtcbiAgICAgICAgdmFyIGZpbmFsTWFwID0gU3RhbGUuaW5pdGlhbGl6ZVR5cGVzY3JpcHRNYXBGaWxlcyhmaWxlQXJyYXksIGN1cnJNYXApO1xuICAgICAgICB2YXIgbWFwTGVuZ3RoID0gWyAuLi5maW5hbE1hcC5rZXlzKCkgXS5sZW5ndGg7XG4gICAgICAgIHZhciBuZXdNYXBMZW5ndGggPSBbIC4uLlN0YWxlLnVwZGF0ZUhpdE1hcChkYXRhLCBmaW5hbE1hcCkua2V5cygpIF0ubGVuZ3RoO1xuICAgICAgICBhc3NlcnQubm90RXF1YWwobWFwTGVuZ3RoLCBuZXdNYXBMZW5ndGgpO1xuICAgIH0pO1xufSk7XG5cbi8qKlxuICogVGVzdHMgdG8gc2VlIGlmIHRoZSBwYXRoIGlzIHByb3Blcmx5IGZvcm1lZCBhbmQgdGhhdCBpdCBwb2ludHMgdG8gYSBwcm9wZXIgZmlsZVxuICovXG5kZXNjcmliZSAoJ0NoZWNrRnVsbFBhdGgnLCBmdW5jdGlvbigpIHtcbiAgICBpdCAoXCJUZXN0IDFcIiwgZnVuY3Rpb24oKSB7XG4gICAgICAgIGFzc2VydC5lcXVhbChTdGFsZS5jaGVja0Z1bGxQYXRoKHBhdGgucmVzb2x2ZSgpKSwgcGF0aC5yZXNvbHZlKCkpO1xuICAgIH0pO1xuICAgIGl0IChcIlRlc3QgMlwiLCBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGN1cnJQYXRoID0gXCJmaWxlLnRzXCI7XG4gICAgICAgIGFzc2VydC5lcXVhbChTdGFsZS5jaGVja0Z1bGxQYXRoKGN1cnJQYXRoKSwgXCJmaWxlLmQudHNcIik7XG4gICAgfSk7XG59KTtcblxuLyoqXG4gKiBUZXN0cyB0byBzZWUgd2hldGhlciB0aGUgZmlsZSBpcyBiZWluZyBwcm9wZXJseSBleHBhbmRlZCBhbmQgZ2l2ZXMgdGhlIHBhdGggdGhhdCB3ZSBhcmUgbG9va2luZyBmb3JcbiAqIFVzZXMgdGhlICdDaGVjayBmdWxsIHBhdGgnIGZ1bmN0aW9uIGFmdGVyd2FyZHMgdG8gbWFrZSBzdXJlIHRoYXQgdGhlIHBhdGggaXMgY29ycmVjdCBhbmQgaXMgYWNlc3NpYmxlXG4gKi9cbmRlc2NyaWJlICgnRXhwYW5kUGF0aCcsIGZ1bmN0aW9uKCkge1xuICAgIGl0IChcIlRlc3QgMVwiLCBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGZpbGUgPSBcIi4vZmlsZTtcIjtcbiAgICAgICAgYXNzZXJ0LmVxdWFsKFN0YWxlLmV4cGFuZFBhdGgoZmlsZSksIFwiLi9maWxlLnRzXCIpO1xuICAgIH0pO1xuICAgIGl0IChcIlRlc3QgMlwiLCBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGZpbGUgPSBcIi4vcGF0aC90by9maWxlLnRzO1wiO1xuICAgICAgICBhc3NlcnQuZXF1YWwoU3RhbGUuZXhwYW5kUGF0aChmaWxlKSwgXCIuL3BhdGgvdG8vZmlsZS50cztcIik7XG4gICAgfSk7XG4gICAgaXQgKFwiVGVzdCAzXCIsIGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgZmlsZSA9IFwiO1wiO1xuICAgICAgICBhc3NlcnQuZXF1YWwoU3RhbGUuZXhwYW5kUGF0aChmaWxlKSwgXCIudHNcIik7XG4gICAgfSk7XG59KTtcblxuLyoqXG4gKiBUZXN0cyB0byBzZWUgd2hldGhlciBtYXBzIGFyZSBwcm9wZXJseSBiZWluZyBzb3J0ZWQgd2hlbiB0aGlzIGZ1bmN0aW9uIGlzIGNhbGxlZCAuLi4gXG4gKiBCb3RoIHRoZSB2YWx1ZSBhbmQga2V5IHNob3VsZCBtb3ZlIHRvIHRoZSBwcm9wZXIgc3BvdCwgbm90IGp1c3Qgb25lIG9yIHRoZSBvdGhlclxuICovXG5kZXNjcmliZSAoJ1NvcnRNYXAnLCBmdW5jdGlvbigpIHtcbiAgICBpdCAoXCJUZXN0IDFcIiwgZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBjdXJyTWFwID0gbmV3IE1hcCgpO1xuICAgICAgICBjdXJyTWFwLnNldCgnYScsIDMpO1xuICAgICAgICBjdXJyTWFwLnNldCgnYicsIDYpO1xuICAgICAgICBjdXJyTWFwLnNldCgnZCcsIDEpO1xuICAgICAgICBjdXJyTWFwLnNldCgneicsIDApO1xuICAgICAgICB2YXIgZmluYWxNYXAgPSBTdGFsZS5zb3J0TWFwKGN1cnJNYXApO1xuICAgICAgICBsZXQgbWFwID0gbmV3IE1hcChbXG4gICAgICAgICAgICBbIFwiYVwiLCAwIF0sXG4gICAgICAgICAgICBbIFwiYlwiLCAxIF0sXG4gICAgICAgICAgICBbIFwiZFwiLCAzIF0sXG4gICAgICAgICAgICBbIFwielwiLCA2IF1cbiAgICAgICAgXSk7XG4gICAgICAgIGFzc2VydC5ub3RFcXVhbChmaW5hbE1hcCwgbWFwKTtcbiAgICB9KTtcbn0pO1xuXG4vKipcbiAqIFRlc3RzIHRvIG1ha2Ugc3VyZSB0aGF0IHRoZSBrZXkgYW5kIHZhbHVlIG9mIHRoZSBtYXAgYXJlIHByb3Blcmx5IGJlaW5nIHN3YXBwZWQgdG8gbWF0Y2ggZmluYWwgZm9ybWF0dGluZ1xuICovXG5kZXNjcmliZSAoJ1N3YXBNYXBWYWx1ZXMnLCBmdW5jdGlvbigpIHtcbiAgICBpdCAoXCJUZXN0IDFcIiwgZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBjdXJyQXJyYXkgPSBbWydhJywgMV0sIFsnYicsIDJdLCBbJ2MnLCAzXV07XG4gICAgICAgIGFzc2VydC5ub3RFcXVhbChTdGFsZS5zd2FwTWFwVmFsdWVzKGN1cnJBcnJheSksIGN1cnJBcnJheSk7XG4gICAgfSk7XG4gICAgaXQgKFwiVGVzdCAyXCIsIGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgY3VyckFycmF5ID0gW1snYScsIDFdLCBbJ2InLCAyXSwgWydjJywgM11dO1xuICAgICAgICB2YXIgZmluYWxBcnJheSA9IFtbMSwgJ2EnXSwgWzIsICdiJ10sIFszLCAnYyddXTtcbiAgICAgICAgYXNzZXJ0LmRlZXBFcXVhbChTdGFsZS5zd2FwTWFwVmFsdWVzKGN1cnJBcnJheSksIGZpbmFsQXJyYXkpO1xuICAgIH0pO1xufSk7XG5cbi8qKlxuICogVGVzdHMgdG8gc2VlIHRoYXQgaWYgdGhlcmUgaXMgYSBcIkBOb3RTdGFsZVwiIHN0cmluZyBpbiBhIGZpbGUsIHRoZW4gdGhhdCBmaWxlIGlzIG5vdCBhZGRlZCB0byB0aGUgaGl0bWFwXG4gKi9cbmRlc2NyaWJlICgnSXNOb3RTdGFsZScsIGZ1bmN0aW9uKCkge1xuICAgIGl0IChcIlRlc3QgMVwiLCBmdW5jdGlvbigpIHtcbiAgICAgICAgY29uc3QgZGF0YSA9IGZzLnJlYWRGaWxlU3luYyhcIi4vc3JjL3N0YWxlLWNvZGUvc2VhcmNoL1NlYXJjaC50c1wiLCd1dGY4Jyk7XG4gICAgICAgIGFzc2VydC5lcXVhbChTdGFsZS5pc05vdFN0YWxlKGRhdGEpLCB0cnVlKTtcbiAgICB9KTtcbiAgICBpdCAoXCJUZXN0IDJcIiwgZnVuY3Rpb24oKSB7XG4gICAgICAgIGNvbnN0IGRhdGEgPSBmcy5yZWFkRmlsZVN5bmMoXCIuL3NyYy9zdGFsZS1jb2RlL3NlYXJjaC9maW5kLnRzXCIsICd1dGY4Jyk7XG4gICAgICAgIGFzc2VydC5lcXVhbChTdGFsZS5pc05vdFN0YWxlKGRhdGEpLCB0cnVlKTtcbiAgICB9KTtcbn0pO1xuXG4vKipcbiAqIFRlc3RzIHRvIHNlZSB0aGF0IHRoZSBwYXJzZUltcG9ydHMgZnVuY3Rpb24gZ2V0cyBhbGwgdHlwZXMgb2YgaW1wb3J0cyBpbiBhbiBhcnJheSBmb3JtYXRcbiAqL1xuZGVzY3JpYmUgKCdQYXJzZUltcG9ydHMnLCBmdW5jdGlvbigpIHtcbiAgICBpdCAoXCJUZXN0IDFcIiwgZnVuY3Rpb24oKSB7XG4gICAgICAgIGNvbnN0IGRhdGEgPSBcbiAgICAgICAgYFxuICAgICAgICBpbXBvcnQge0RvY01ldGFGaWxlUmVmLCBEb2NNZXRhUmVmfSBmcm9tICcuL0RvY01ldGFSZWYnO1xuICAgICAgICBgO1xuICAgICAgICBhc3NlcnQuZXF1YWwoU3RhbGUucGFyc2VJbXBvcnRzKGRhdGEpWzBdLCBcImltcG9ydCB7RG9jTWV0YUZpbGVSZWYsIERvY01ldGFSZWZ9IGZyb20gJy4vRG9jTWV0YVJlZic7XCIpO1xuICAgIH0pO1xuICAgIGl0IChcIlRlc3QgMlwiLCBmdW5jdGlvbigpIHtcbiAgICAgICAgY29uc3QgZGF0YSA9IFxuICAgICAgICBgXG4gICAgICAgIGltcG9ydCB7RG9jTWV0YXN9IGZyb20gXCIuLi9tZXRhZGF0YS9Eb2NNZXRhc1wiO1xuICAgICAgICBpbXBvcnQge1xuICAgICAgICAgICAgQmFja2VuZEZpbGVSZWZEYXRhLFxuICAgICAgICAgICAgQmluYXJ5RmlsZURhdGEsXG4gICAgICAgICAgICBEYXRhc3RvcmUsXG4gICAgICAgICAgICBEYXRhc3RvcmVDYXBhYmlsaXRpZXMsXG4gICAgICAgICAgICBEYXRhc3RvcmVJbml0T3B0cyxcbiAgICAgICAgICAgIERhdGFzdG9yZU92ZXJ2aWV3LFxuICAgICAgICAgICAgRGVsZXRlUmVzdWx0LCBEb2NNZXRhU25hcHNob3QsXG4gICAgICAgICAgICBEb2NNZXRhU25hcHNob3RFdmVudExpc3RlbmVyLCBEb2NNZXRhU25hcHNob3RPcHRzLCBEb2NNZXRhU25hcHNob3RSZXN1bHQsXG4gICAgICAgICAgICBFcnJvckxpc3RlbmVyLFxuICAgICAgICAgICAgR2V0RmlsZU9wdHMsXG4gICAgICAgICAgICBHcm91cElEU3RyLFxuICAgICAgICAgICAgU25hcHNob3RSZXN1bHQsXG4gICAgICAgICAgICBXcml0ZUZpbGVPcHRzXG4gICAgICAgIH0gZnJvbSAnLi9EYXRhc3RvcmUnO1xuICAgICAgICBpbXBvcnQge0JhY2tlbmR9IGZyb20gJ3BvbGFyLXNoYXJlZC9zcmMvZGF0YXN0b3JlL0JhY2tlbmQnO1xuICAgICAgICBgXG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IFtcbiAgICAgICAgICAgICdpbXBvcnQge0RvY01ldGFzfSBmcm9tIFwiLi4vbWV0YWRhdGEvRG9jTWV0YXNcIjsnLFxuICAgICAgICAgICAgJ2ltcG9ydCB7XFxuJyArXG4gICAgICAgICAgICAgICcgICAgICAgICAgICBCYWNrZW5kRmlsZVJlZkRhdGEsXFxuJyArXG4gICAgICAgICAgICAgICcgICAgICAgICAgICBCaW5hcnlGaWxlRGF0YSxcXG4nICtcbiAgICAgICAgICAgICAgJyAgICAgICAgICAgIERhdGFzdG9yZSxcXG4nICtcbiAgICAgICAgICAgICAgJyAgICAgICAgICAgIERhdGFzdG9yZUNhcGFiaWxpdGllcyxcXG4nICtcbiAgICAgICAgICAgICAgJyAgICAgICAgICAgIERhdGFzdG9yZUluaXRPcHRzLFxcbicgK1xuICAgICAgICAgICAgICAnICAgICAgICAgICAgRGF0YXN0b3JlT3ZlcnZpZXcsXFxuJyArXG4gICAgICAgICAgICAgICcgICAgICAgICAgICBEZWxldGVSZXN1bHQsIERvY01ldGFTbmFwc2hvdCxcXG4nICtcbiAgICAgICAgICAgICAgJyAgICAgICAgICAgIERvY01ldGFTbmFwc2hvdEV2ZW50TGlzdGVuZXIsIERvY01ldGFTbmFwc2hvdE9wdHMsIERvY01ldGFTbmFwc2hvdFJlc3VsdCxcXG4nICtcbiAgICAgICAgICAgICAgJyAgICAgICAgICAgIEVycm9yTGlzdGVuZXIsXFxuJyArXG4gICAgICAgICAgICAgICcgICAgICAgICAgICBHZXRGaWxlT3B0cyxcXG4nICtcbiAgICAgICAgICAgICAgJyAgICAgICAgICAgIEdyb3VwSURTdHIsXFxuJyArXG4gICAgICAgICAgICAgICcgICAgICAgICAgICBTbmFwc2hvdFJlc3VsdCxcXG4nICtcbiAgICAgICAgICAgICAgJyAgICAgICAgICAgIFdyaXRlRmlsZU9wdHNcXG4nICtcbiAgICAgICAgICAgICAgXCIgICAgICAgIH0gZnJvbSAnLi9EYXRhc3RvcmUnO1wiLFxuICAgICAgICAgICAgXCJpbXBvcnQge0JhY2tlbmR9IGZyb20gJ3BvbGFyLXNoYXJlZC9zcmMvZGF0YXN0b3JlL0JhY2tlbmQnO1wiXG4gICAgICAgIF07XG4gICAgICAgIGFzc2VydC5kZWVwRXF1YWwoU3RhbGUucGFyc2VJbXBvcnRzKGRhdGEpLCByZXN1bHQpOyAgICBcbiAgICB9KTtcbn0pOyJdfQ==