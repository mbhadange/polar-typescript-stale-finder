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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2VhcmNoVGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNlYXJjaFRlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsaUNBQXVDO0FBQ3ZDLCtCQUFzQztBQUN0QyxpQ0FBMEM7QUFDMUMsMkNBQTZCO0FBQzdCLHVDQUF5QjtBQUt6QixRQUFRLENBQUUsY0FBYyxFQUFFO0lBQ3RCLEVBQUUsQ0FBRSxRQUFRLEVBQUU7UUFDVixhQUFNLENBQUMsS0FBSyxDQUFDLFlBQUssQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDeEQsQ0FBQyxDQUFDLENBQUM7SUFDSCxFQUFFLENBQUUsUUFBUSxFQUFFO1FBQ1YsYUFBTSxDQUFDLEtBQUssQ0FBQyxZQUFLLENBQUMsWUFBWSxDQUFDLHdCQUF3QixDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDckUsQ0FBQyxDQUFDLENBQUM7SUFDSCxFQUFFLENBQUUsUUFBUSxFQUFFO1FBQ1YsYUFBTSxDQUFDLEtBQUssQ0FBQyxZQUFLLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxFQUFFLFNBQVMsQ0FBQyxDQUFDO0lBQ3hELENBQUMsQ0FBQyxDQUFDO0lBQ0gsRUFBRSxDQUFFLFFBQVEsRUFBRTtRQUNWLGFBQU0sQ0FBQyxLQUFLLENBQUMsWUFBSyxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsRUFBRSxTQUFTLENBQUMsQ0FBQztJQUNyRCxDQUFDLENBQUMsQ0FBQztJQUNILEVBQUUsQ0FBRSxRQUFRLEVBQUU7UUFDVixhQUFNLENBQUMsS0FBSyxDQUFDLFlBQUssQ0FBQyxZQUFZLENBQUMscUJBQXFCLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNsRSxDQUFDLENBQUMsQ0FBQztBQUNQLENBQUMsQ0FBQyxDQUFDO0FBS0gsUUFBUSxDQUFFLHNCQUFzQixFQUFFO0lBQzlCLEVBQUUsQ0FBRSxRQUFRLEVBQUU7UUFD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LDhDQUE4QztnQkFDOUMseUZBQXlGO2dCQUN6Riw4QkFBOEI7Z0JBQzlCLDRCQUE0QjtnQkFDNUIsMkJBQTJCO2dCQUMzQiwrQkFBK0I7Z0JBQy9CLDZCQUE2QjtnQkFDN0IsK0JBQStCO1lBQ2pDLDZEQUE2RDtTQUNoRSxDQUFDO1FBQ0YsYUFBTSxDQUFDLFNBQVMsQ0FBQyxZQUFLLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBRXZELENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQyxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBTdGFsZSwgU2VhcmNoIH0gZnJvbSBcIi4vZmluZFwiO1xuaW1wb3J0IHsgYXNzZXJ0LCBleHBlY3QgfSBmcm9tICdjaGFpJztcbmltcG9ydCB7RGVmYXVsdE9wdHMsIElGaWxlfSBmcm9tIFwiLi9maW5kXCI7XG5pbXBvcnQgKiBhcyBwYXRoIGZyb20gJ3BhdGgnO1xuaW1wb3J0ICogYXMgZnMgZnJvbSBcImZzXCI7XG5cbi8qKlxuICogVGVzdHMgdG8gbWFrZSBzdXJlIHRoYXQgdGhlIGV4dGVuc2lvbnMgb2YgdGhlIGZpbGUgbmFtZS9wYXRoIGFyZSBwcm9wZXJseSBmb3VuZCBcbiAqL1xuZGVzY3JpYmUgKCdHZXRFeHRlbnNpb24nLCBmdW5jdGlvbigpIHtcbiAgICBpdCAoXCJUZXN0IDFcIiwgZnVuY3Rpb24oKSB7XG4gICAgICAgIGFzc2VydC5lcXVhbChTdGFsZS5nZXRFeHRlbnNpb24oXCJmaWxlLnR4dFwiKSwgXCJ0eHRcIik7XG4gICAgfSk7XG4gICAgaXQgKFwiVGVzdCAyXCIsIGZ1bmN0aW9uKCkge1xuICAgICAgICBhc3NlcnQuZXF1YWwoU3RhbGUuZ2V0RXh0ZW5zaW9uKFwiZmlsZS5uYW1lLndpdGguZG90cy5qc1wiKSwgXCJqc1wiKTtcbiAgICB9KTtcbiAgICBpdCAoXCJUZXN0IDNcIiwgZnVuY3Rpb24oKSB7XG4gICAgICAgIGFzc2VydC5lcXVhbChTdGFsZS5nZXRFeHRlbnNpb24oXCJmaWxlXCIpLCB1bmRlZmluZWQpO1xuICAgIH0pO1xuICAgIGl0IChcIlRlc3QgNFwiLCBmdW5jdGlvbigpIHtcbiAgICAgICAgYXNzZXJ0LmVxdWFsKFN0YWxlLmdldEV4dGVuc2lvbihcIiBcIiksIHVuZGVmaW5lZCk7XG4gICAgfSk7XG4gICAgaXQgKFwiVGVzdCA1XCIsIGZ1bmN0aW9uKCkge1xuICAgICAgICBhc3NlcnQuZXF1YWwoU3RhbGUuZ2V0RXh0ZW5zaW9uKFwiY3VycmVudGZpbGUvZmlsZS50c1wiKSwgXCJ0c1wiKTtcbiAgICB9KTtcbn0pO1xuXG4vKipcbiAqIFRlc3RzIHRvIG1ha2Ugc3VyZSB0aGF0IHRoZSBmdW5jdGlvbiBpcyByZXR1cm5pbmcgdGhlIHByb3BlciBhcnJheSBvZiBmaWxlcyBhbmQgaXMgbm90IHJldHVybmluZyBhbiBlbXB0eSBhcnJheVxuICovXG5kZXNjcmliZSAoJ0ZpbmRGaWxlc1JlY3Vyc2l2ZWx5JywgZnVuY3Rpb24oKSB7XG4gICAgaXQgKFwiVGVzdCAxXCIsIGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgZGF0YSA9IHBhdGgucmVzb2x2ZSgpO1xuICAgICAgICBjb25zdCBvcHRzID0gbmV3IERlZmF1bHRPcHRzKCk7XG4gICAgICAgIGFzc2VydC5ub3RFcXVhbChTZWFyY2guZmluZEZpbGVzUmVjdXJzaXZlbHkoZGF0YSwgb3B0cyksIFtdKTtcbiAgICB9KTtcbiAgICBpdCAoXCJUZXN0IDJcIiwgZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBkYXRhID0gcGF0aC5yZXNvbHZlKCk7XG4gICAgICAgIGNvbnN0IG9wdHMgPSBuZXcgRGVmYXVsdE9wdHMoKTtcbiAgICAgICAgdmFyIHNlYXJjaEFycmF5TGVuZ3RoID0gKFNlYXJjaC5maW5kRmlsZXNSZWN1cnNpdmVseShkYXRhLCBvcHRzKSkubGVuZ3RoO1xuICAgICAgICB2YXIgZW1wdHlBcnJheUxlbmd0aCA9IChbXSkubGVuZ3RoO1xuICAgICAgICBhc3NlcnQubm90RXF1YWwoc2VhcmNoQXJyYXlMZW5ndGgsIGVtcHR5QXJyYXlMZW5ndGgpO1xuICAgIH0pO1xufSk7XG5cbi8qKlxuICogVGVzdHMgdG8gbWFrZSBzdXJlIHRoYXQgdGhlIGZpbGVzIHRoYXQgZml0IHRoZSByZXF1aXJlbWVudCBhcmUgcHJvcGVybHkgYmVpbmcgYWRkZWQgdG8gdGhlIGhpdG1hcFxuICogQ2hlY2tzIHRoaXMgYnkgbWFraW5nIHN1cmUgdGhhdCB0aGUgbGVuZ3RoIG9mIHRoZSBtYXAgbWF0Y2hlcyBvciBkb2Vzbid0dCBtYXRjaCB0aGUgZ2l2ZW4gbGVuZ3RoXG4gKi9cbmRlc2NyaWJlICgnSW5pdGlhbGl6ZVR5cGVzY3JpcHRNYXBGaWxlcycsIGZ1bmN0aW9uKCkge1xuICAgIGl0IChcIlRlc3QgMVwiLCBmdW5jdGlvbigpIHtcbiAgICAgICAgY29uc3QgZGF0YSA6IElGaWxlW10gPSBbXTtcbiAgICAgICAgdmFyIGN1cnJNYXAgPSBuZXcgTWFwKCk7XG4gICAgICAgIHZhciBmaW5hbE1hcCA9IFN0YWxlLmluaXRpYWxpemVUeXBlc2NyaXB0TWFwRmlsZXMoZGF0YSwgY3Vyck1hcCk7XG4gICAgICAgIHZhciBuZXdNYXBMZW5ndGggPSBbIC4uLmZpbmFsTWFwLmtleXMoKSBdLmxlbmd0aDtcbiAgICAgICAgYXNzZXJ0LmVxdWFsKG5ld01hcExlbmd0aCwgMCk7XG4gICAgfSk7XG4gICAgaXQgKFwiVGVzdCAyXCIsIGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgZGF0YSA9IHBhdGgucmVzb2x2ZSgpO1xuICAgICAgICBjb25zdCBvcHRzID0gbmV3IERlZmF1bHRPcHRzKCk7XG4gICAgICAgIHZhciBmaWxlQXJyYXkgPSBTZWFyY2guZmluZEZpbGVzUmVjdXJzaXZlbHkoZGF0YSwgb3B0cyk7XG4gICAgICAgIHZhciBjdXJyTWFwID0gbmV3IE1hcCgpO1xuICAgICAgICB2YXIgZmluYWxNYXAgPSBTdGFsZS5pbml0aWFsaXplVHlwZXNjcmlwdE1hcEZpbGVzKGZpbGVBcnJheSwgY3Vyck1hcCk7XG4gICAgICAgIHZhciBtYXBMZW5ndGggPSBbIC4uLmZpbmFsTWFwLmtleXMoKSBdLmxlbmd0aDtcbiAgICAgICAgYXNzZXJ0LmVxdWFsKG1hcExlbmd0aCwzKTtcbiAgICB9KTtcbn0pO1xuXG4vKipcbiAqIFRlc3RzIHRvIG1ha2Ugc3VyZSB0aGF0IHRoZSBoaXQgdmFsdWVzIGFyZSBwcm9wZXJseSBiZWluZyB1cGRhdGVkIGlmIHRoZSBzYW1lIGZpbGUgaXMgZm91bmQgYXMgYW4gaW1wb3J0XG4gKi9cbmRlc2NyaWJlICgnVXBkYXRlSGl0TWFwJywgZnVuY3Rpb24oKSB7XG4gICAgaXQgKFwiVGVzdCAxXCIsIGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgZGF0YSA9IHBhdGgucmVzb2x2ZSgpO1xuICAgICAgICB2YXIgY3Vyck1hcCA9IG5ldyBNYXAoKTtcbiAgICAgICAgY3Vyck1hcC5zZXQoJ2EnLCAxKTtcbiAgICAgICAgYXNzZXJ0Lm5vdEVxdWFsKFN0YWxlLnVwZGF0ZUhpdE1hcChkYXRhLCBjdXJyTWFwKSwgdW5kZWZpbmVkKTtcbiAgICB9KTtcbiAgICBpdCAoXCJUZXN0IDJcIiwgZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBkYXRhID0gcGF0aC5yZXNvbHZlKCk7XG4gICAgICAgIHZhciBjdXJyTWFwID0gbmV3IE1hcCgpO1xuICAgICAgICB2YXIgZmluYWwgPSBbIC4uLlN0YWxlLnVwZGF0ZUhpdE1hcChkYXRhLCBjdXJyTWFwKSBdLmxlbmd0aDtcbiAgICAgICAgYXNzZXJ0Lm5vdEVxdWFsKGZpbmFsLCAwKTtcbiAgICB9KTtcbiAgICBpdCAoXCJUZXN0IDNcIiwgZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBkYXRhID0gcGF0aC5yZXNvbHZlKCk7XG4gICAgICAgIGNvbnN0IG9wdHMgPSBuZXcgRGVmYXVsdE9wdHMoKTsgXG4gICAgICAgIHZhciBmaWxlQXJyYXkgPSBTZWFyY2guZmluZEZpbGVzUmVjdXJzaXZlbHkoZGF0YSwgb3B0cyk7XG4gICAgICAgIHZhciBjdXJyTWFwID0gbmV3IE1hcCgpO1xuICAgICAgICB2YXIgZmluYWxNYXAgPSBTdGFsZS5pbml0aWFsaXplVHlwZXNjcmlwdE1hcEZpbGVzKGZpbGVBcnJheSwgY3Vyck1hcCk7XG4gICAgICAgIHZhciBtYXBMZW5ndGggPSBbIC4uLmZpbmFsTWFwLmtleXMoKSBdLmxlbmd0aDtcbiAgICAgICAgdmFyIG5ld01hcExlbmd0aCA9IFsgLi4uU3RhbGUudXBkYXRlSGl0TWFwKGRhdGEsIGZpbmFsTWFwKS5rZXlzKCkgXS5sZW5ndGg7XG4gICAgICAgIGFzc2VydC5ub3RFcXVhbChtYXBMZW5ndGgsIG5ld01hcExlbmd0aCk7XG4gICAgfSk7XG59KTtcblxuLyoqXG4gKiBUZXN0cyB0byBzZWUgaWYgdGhlIHBhdGggaXMgcHJvcGVybHkgZm9ybWVkIGFuZCB0aGF0IGl0IHBvaW50cyB0byBhIHByb3BlciBmaWxlXG4gKi9cbmRlc2NyaWJlICgnQ2hlY2tGdWxsUGF0aCcsIGZ1bmN0aW9uKCkge1xuICAgIGl0IChcIlRlc3QgMVwiLCBmdW5jdGlvbigpIHtcbiAgICAgICAgYXNzZXJ0LmVxdWFsKFN0YWxlLmNoZWNrRnVsbFBhdGgocGF0aC5yZXNvbHZlKCkpLCBwYXRoLnJlc29sdmUoKSk7XG4gICAgfSk7XG4gICAgaXQgKFwiVGVzdCAyXCIsIGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgY3VyclBhdGggPSBcImZpbGUudHNcIjtcbiAgICAgICAgYXNzZXJ0LmVxdWFsKFN0YWxlLmNoZWNrRnVsbFBhdGgoY3VyclBhdGgpLCBcImZpbGUuZC50c1wiKTtcbiAgICB9KTtcbn0pO1xuXG4vKipcbiAqIFRlc3RzIHRvIHNlZSB3aGV0aGVyIHRoZSBmaWxlIGlzIGJlaW5nIHByb3Blcmx5IGV4cGFuZGVkIGFuZCBnaXZlcyB0aGUgcGF0aCB0aGF0IHdlIGFyZSBsb29raW5nIGZvclxuICogVXNlcyB0aGUgJ0NoZWNrIGZ1bGwgcGF0aCcgZnVuY3Rpb24gYWZ0ZXJ3YXJkcyB0byBtYWtlIHN1cmUgdGhhdCB0aGUgcGF0aCBpcyBjb3JyZWN0IGFuZCBpcyBhY2Vzc2libGVcbiAqL1xuZGVzY3JpYmUgKCdFeHBhbmRQYXRoJywgZnVuY3Rpb24oKSB7XG4gICAgaXQgKFwiVGVzdCAxXCIsIGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgZmlsZSA9IFwiLi9maWxlO1wiO1xuICAgICAgICBhc3NlcnQuZXF1YWwoU3RhbGUuZXhwYW5kUGF0aChmaWxlKSwgXCIuL2ZpbGUudHNcIik7XG4gICAgfSk7XG4gICAgaXQgKFwiVGVzdCAyXCIsIGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgZmlsZSA9IFwiLi9wYXRoL3RvL2ZpbGUudHM7XCI7XG4gICAgICAgIGFzc2VydC5lcXVhbChTdGFsZS5leHBhbmRQYXRoKGZpbGUpLCBcIi4vcGF0aC90by9maWxlLnRzO1wiKTtcbiAgICB9KTtcbiAgICBpdCAoXCJUZXN0IDNcIiwgZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBmaWxlID0gXCI7XCI7XG4gICAgICAgIGFzc2VydC5lcXVhbChTdGFsZS5leHBhbmRQYXRoKGZpbGUpLCBcIi50c1wiKTtcbiAgICB9KTtcbn0pO1xuXG4vKipcbiAqIFRlc3RzIHRvIHNlZSB3aGV0aGVyIG1hcHMgYXJlIHByb3Blcmx5IGJlaW5nIHNvcnRlZCB3aGVuIHRoaXMgZnVuY3Rpb24gaXMgY2FsbGVkIC4uLiBcbiAqIEJvdGggdGhlIHZhbHVlIGFuZCBrZXkgc2hvdWxkIG1vdmUgdG8gdGhlIHByb3BlciBzcG90LCBub3QganVzdCBvbmUgb3IgdGhlIG90aGVyXG4gKi9cbmRlc2NyaWJlICgnU29ydE1hcCcsIGZ1bmN0aW9uKCkge1xuICAgIGl0IChcIlRlc3QgMVwiLCBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGN1cnJNYXAgPSBuZXcgTWFwKCk7XG4gICAgICAgIGN1cnJNYXAuc2V0KCdhJywgMyk7XG4gICAgICAgIGN1cnJNYXAuc2V0KCdiJywgNik7XG4gICAgICAgIGN1cnJNYXAuc2V0KCdkJywgMSk7XG4gICAgICAgIGN1cnJNYXAuc2V0KCd6JywgMCk7XG4gICAgICAgIHZhciBmaW5hbE1hcCA9IFN0YWxlLnNvcnRNYXAoY3Vyck1hcCk7XG4gICAgICAgIGxldCBtYXAgPSBuZXcgTWFwKFtcbiAgICAgICAgICAgIFsgXCJhXCIsIDAgXSxcbiAgICAgICAgICAgIFsgXCJiXCIsIDEgXSxcbiAgICAgICAgICAgIFsgXCJkXCIsIDMgXSxcbiAgICAgICAgICAgIFsgXCJ6XCIsIDYgXVxuICAgICAgICBdKTtcbiAgICAgICAgYXNzZXJ0Lm5vdEVxdWFsKGZpbmFsTWFwLCBtYXApO1xuICAgIH0pO1xufSk7XG5cbi8qKlxuICogVGVzdHMgdG8gbWFrZSBzdXJlIHRoYXQgdGhlIGtleSBhbmQgdmFsdWUgb2YgdGhlIG1hcCBhcmUgcHJvcGVybHkgYmVpbmcgc3dhcHBlZCB0byBtYXRjaCBmaW5hbCBmb3JtYXR0aW5nXG4gKi9cbmRlc2NyaWJlICgnU3dhcE1hcFZhbHVlcycsIGZ1bmN0aW9uKCkge1xuICAgIGl0IChcIlRlc3QgMVwiLCBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGN1cnJBcnJheSA9IFtbJ2EnLCAxXSwgWydiJywgMl0sIFsnYycsIDNdXTtcbiAgICAgICAgYXNzZXJ0Lm5vdEVxdWFsKFN0YWxlLnN3YXBNYXBWYWx1ZXMoY3VyckFycmF5KSwgY3VyckFycmF5KTtcbiAgICB9KTtcbiAgICBpdCAoXCJUZXN0IDJcIiwgZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBjdXJyQXJyYXkgPSBbWydhJywgMV0sIFsnYicsIDJdLCBbJ2MnLCAzXV07XG4gICAgICAgIHZhciBmaW5hbEFycmF5ID0gW1sxLCAnYSddLCBbMiwgJ2InXSwgWzMsICdjJ11dO1xuICAgICAgICBhc3NlcnQuZGVlcEVxdWFsKFN0YWxlLnN3YXBNYXBWYWx1ZXMoY3VyckFycmF5KSwgZmluYWxBcnJheSk7XG4gICAgfSk7XG59KTtcblxuLyoqXG4gKiBUZXN0cyB0byBzZWUgdGhhdCBpZiB0aGVyZSBpcyBhIFwiQE5vdFN0YWxlXCIgc3RyaW5nIGluIGEgZmlsZSwgdGhlbiB0aGF0IGZpbGUgaXMgbm90IGFkZGVkIHRvIHRoZSBoaXRtYXBcbiAqL1xuZGVzY3JpYmUgKCdJc05vdFN0YWxlJywgZnVuY3Rpb24oKSB7XG4gICAgaXQgKFwiVGVzdCAxXCIsIGZ1bmN0aW9uKCkge1xuICAgICAgICBjb25zdCBkYXRhID0gZnMucmVhZEZpbGVTeW5jKFwiLi9zcmMvc3RhbGUtY29kZS9zZWFyY2gvU2VhcmNoLnRzXCIsJ3V0ZjgnKTtcbiAgICAgICAgYXNzZXJ0LmVxdWFsKFN0YWxlLmlzTm90U3RhbGUoZGF0YSksIHRydWUpO1xuICAgIH0pO1xuICAgIGl0IChcIlRlc3QgMlwiLCBmdW5jdGlvbigpIHtcbiAgICAgICAgY29uc3QgZGF0YSA9IGZzLnJlYWRGaWxlU3luYyhcIi4vc3JjL3N0YWxlLWNvZGUvc2VhcmNoL2ZpbmQudHNcIiwgJ3V0ZjgnKTtcbiAgICAgICAgYXNzZXJ0LmVxdWFsKFN0YWxlLmlzTm90U3RhbGUoZGF0YSksIHRydWUpO1xuICAgIH0pO1xufSk7XG5cbmRlc2NyaWJlICgnUGFyc2VJbXBvcnRzJywgZnVuY3Rpb24oKSB7XG4gICAgaXQgKFwiVGVzdCAxXCIsIGZ1bmN0aW9uKCkge1xuICAgICAgICBjb25zdCBkYXRhID0gXG4gICAgICAgIGBcbiAgICAgICAgaW1wb3J0IHtEb2NNZXRhRmlsZVJlZiwgRG9jTWV0YVJlZn0gZnJvbSAnLi9Eb2NNZXRhUmVmJztcbiAgICAgICAgYDtcbiAgICAgICAgYXNzZXJ0LmVxdWFsKFN0YWxlLnBhcnNlSW1wb3J0cyhkYXRhKVswXSwgXCJpbXBvcnQge0RvY01ldGFGaWxlUmVmLCBEb2NNZXRhUmVmfSBmcm9tICcuL0RvY01ldGFSZWYnO1wiKTtcbiAgICB9KTtcbiAgICBpdCAoXCJUZXN0IDJcIiwgZnVuY3Rpb24oKSB7XG4gICAgICAgIGNvbnN0IGRhdGEgPSBcbiAgICAgICAgYFxuICAgICAgICBpbXBvcnQge0RvY01ldGFzfSBmcm9tIFwiLi4vbWV0YWRhdGEvRG9jTWV0YXNcIjtcbiAgICAgICAgaW1wb3J0IHtcbiAgICAgICAgICAgIEJhY2tlbmRGaWxlUmVmRGF0YSxcbiAgICAgICAgICAgIEJpbmFyeUZpbGVEYXRhLFxuICAgICAgICAgICAgRGF0YXN0b3JlLFxuICAgICAgICAgICAgRGF0YXN0b3JlQ2FwYWJpbGl0aWVzLFxuICAgICAgICAgICAgRGF0YXN0b3JlSW5pdE9wdHMsXG4gICAgICAgICAgICBEYXRhc3RvcmVPdmVydmlldyxcbiAgICAgICAgICAgIERlbGV0ZVJlc3VsdCwgRG9jTWV0YVNuYXBzaG90LFxuICAgICAgICAgICAgRG9jTWV0YVNuYXBzaG90RXZlbnRMaXN0ZW5lciwgRG9jTWV0YVNuYXBzaG90T3B0cywgRG9jTWV0YVNuYXBzaG90UmVzdWx0LFxuICAgICAgICAgICAgRXJyb3JMaXN0ZW5lcixcbiAgICAgICAgICAgIEdldEZpbGVPcHRzLFxuICAgICAgICAgICAgR3JvdXBJRFN0cixcbiAgICAgICAgICAgIFNuYXBzaG90UmVzdWx0LFxuICAgICAgICAgICAgV3JpdGVGaWxlT3B0c1xuICAgICAgICB9IGZyb20gJy4vRGF0YXN0b3JlJztcbiAgICAgICAgaW1wb3J0IHtCYWNrZW5kfSBmcm9tICdwb2xhci1zaGFyZWQvc3JjL2RhdGFzdG9yZS9CYWNrZW5kJztcbiAgICAgICAgYFxuICAgICAgICBjb25zdCByZXN1bHQgPSBbXG4gICAgICAgICAgICAnaW1wb3J0IHtEb2NNZXRhc30gZnJvbSBcIi4uL21ldGFkYXRhL0RvY01ldGFzXCI7JyxcbiAgICAgICAgICAgICdpbXBvcnQge1xcbicgK1xuICAgICAgICAgICAgICAnICAgICAgICAgICAgQmFja2VuZEZpbGVSZWZEYXRhLFxcbicgK1xuICAgICAgICAgICAgICAnICAgICAgICAgICAgQmluYXJ5RmlsZURhdGEsXFxuJyArXG4gICAgICAgICAgICAgICcgICAgICAgICAgICBEYXRhc3RvcmUsXFxuJyArXG4gICAgICAgICAgICAgICcgICAgICAgICAgICBEYXRhc3RvcmVDYXBhYmlsaXRpZXMsXFxuJyArXG4gICAgICAgICAgICAgICcgICAgICAgICAgICBEYXRhc3RvcmVJbml0T3B0cyxcXG4nICtcbiAgICAgICAgICAgICAgJyAgICAgICAgICAgIERhdGFzdG9yZU92ZXJ2aWV3LFxcbicgK1xuICAgICAgICAgICAgICAnICAgICAgICAgICAgRGVsZXRlUmVzdWx0LCBEb2NNZXRhU25hcHNob3QsXFxuJyArXG4gICAgICAgICAgICAgICcgICAgICAgICAgICBEb2NNZXRhU25hcHNob3RFdmVudExpc3RlbmVyLCBEb2NNZXRhU25hcHNob3RPcHRzLCBEb2NNZXRhU25hcHNob3RSZXN1bHQsXFxuJyArXG4gICAgICAgICAgICAgICcgICAgICAgICAgICBFcnJvckxpc3RlbmVyLFxcbicgK1xuICAgICAgICAgICAgICAnICAgICAgICAgICAgR2V0RmlsZU9wdHMsXFxuJyArXG4gICAgICAgICAgICAgICcgICAgICAgICAgICBHcm91cElEU3RyLFxcbicgK1xuICAgICAgICAgICAgICAnICAgICAgICAgICAgU25hcHNob3RSZXN1bHQsXFxuJyArXG4gICAgICAgICAgICAgICcgICAgICAgICAgICBXcml0ZUZpbGVPcHRzXFxuJyArXG4gICAgICAgICAgICAgIFwiICAgICAgICB9IGZyb20gJy4vRGF0YXN0b3JlJztcIixcbiAgICAgICAgICAgIFwiaW1wb3J0IHtCYWNrZW5kfSBmcm9tICdwb2xhci1zaGFyZWQvc3JjL2RhdGFzdG9yZS9CYWNrZW5kJztcIlxuICAgICAgICBdO1xuICAgICAgICBhc3NlcnQuZGVlcEVxdWFsKFN0YWxlLnBhcnNlSW1wb3J0cyhkYXRhKSwgcmVzdWx0KTtcbiAgICAgICAgICBcbiAgICB9KTtcbn0pO1xuXG4vKipcbiAqIFxuaW1wb3J0IHtEb2NGaWxlTWV0YX0gZnJvbSAnLi9Eb2NGaWxlTWV0YSc7XG5pbXBvcnQge0RhdGFzdG9yZU11dGF0aW9ufSBmcm9tICcuL0RhdGFzdG9yZU11dGF0aW9uJztcbmltcG9ydCB7SURvY0luZm99IGZyb20gXCJwb2xhci1zaGFyZWQvc3JjL21ldGFkYXRhL0lEb2NJbmZvXCI7XG5pbXBvcnQge0lEb2NNZXRhfSBmcm9tIFwicG9sYXItc2hhcmVkL3NyYy9tZXRhZGF0YS9JRG9jTWV0YVwiO1xuaW1wb3J0IHtWaXNpYmlsaXR5fSBmcm9tIFwicG9sYXItc2hhcmVkL3NyYy9kYXRhc3RvcmUvVmlzaWJpbGl0eVwiO1xuaW1wb3J0IHtGaWxlUmVmfSBmcm9tIFwicG9sYXItc2hhcmVkL3NyYy9kYXRhc3RvcmUvRmlsZVJlZlwiO1xuaW1wb3J0IHtMaXN0ZW5hYmxlUGVyc2lzdGVuY2VMYXllcn0gZnJvbSBcIi4vTGlzdGVuYWJsZVBlcnNpc3RlbmNlTGF5ZXJcIjtcbmltcG9ydCB7VXNlclRhZ3NEQn0gZnJvbSBcIi4vVXNlclRhZ3NEQlwiO1xuaW1wb3J0IHsgTlVMTF9GVU5DVElPTiB9IGZyb20gJ3BvbGFyLXNoYXJlZC9zcmMvdXRpbC9GdW5jdGlvbnMnO1xuXG4gKi8iXX0=