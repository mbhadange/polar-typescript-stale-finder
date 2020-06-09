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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2VhcmNoVGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNlYXJjaFRlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsaUNBQXVDO0FBQ3ZDLCtCQUFzQztBQUN0QyxpQ0FBMEM7QUFDMUMsMkNBQTZCO0FBRTdCLFFBQVEsQ0FBRSxjQUFjLEVBQUU7SUFDdEIsRUFBRSxDQUFFLFFBQVEsRUFBRTtRQUNWLGFBQU0sQ0FBQyxLQUFLLENBQUMsWUFBSyxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQztJQUN4RCxDQUFDLENBQUMsQ0FBQztJQUNILEVBQUUsQ0FBRSxRQUFRLEVBQUU7UUFDVixhQUFNLENBQUMsS0FBSyxDQUFDLFlBQUssQ0FBQyxZQUFZLENBQUMsd0JBQXdCLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNyRSxDQUFDLENBQUMsQ0FBQztJQUNILEVBQUUsQ0FBRSxRQUFRLEVBQUU7UUFDVixhQUFNLENBQUMsS0FBSyxDQUFDLFlBQUssQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLEVBQUUsU0FBUyxDQUFDLENBQUM7SUFDeEQsQ0FBQyxDQUFDLENBQUM7SUFDSCxFQUFFLENBQUUsUUFBUSxFQUFFO1FBQ1YsYUFBTSxDQUFDLEtBQUssQ0FBQyxZQUFLLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxFQUFFLFNBQVMsQ0FBQyxDQUFDO0lBQ3JELENBQUMsQ0FBQyxDQUFDO0lBQ0gsRUFBRSxDQUFFLFFBQVEsRUFBRTtRQUNWLGFBQU0sQ0FBQyxLQUFLLENBQUMsWUFBSyxDQUFDLFlBQVksQ0FBQyxxQkFBcUIsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ2xFLENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQyxDQUFDLENBQUM7QUFFSCxRQUFRLENBQUUsc0JBQXNCLEVBQUU7SUFDOUIsRUFBRSxDQUFFLFFBQVEsRUFBRTtRQUNWLElBQUksSUFBSSxH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QUMsWUFBSyxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsRUFBRSxXQUFXLENBQUMsQ0FBQztJQUM3RCxDQUFDLENBQUMsQ0FBQztBQUNQLENBQUMsQ0FBQyxDQUFDO0FBRUgsUUFBUSxDQUFFLFlBQVksRUFBRTtJQUNwQixFQUFFLENBQUUsUUFBUSxFQUFFO1FBQ1YsSUFBSSxJQUFJLEdBQUcsU0FBUyxDQUFDO1FBQ3JCLGFBQU0sQ0FBQyxLQUFLLENBQUMsWUFBSyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsRUFBRSxXQUFXLENBQUMsQ0FBQztJQUN0RCxDQUFDLENBQUMsQ0FBQztJQUNILEVBQUUsQ0FBRSxRQUFRLEVBQUU7UUFDVixJQUFJLElBQUksR0FBRyxvQkFBb0IsQ0FBQztRQUNoQyxhQUFNLENBQUMsS0FBSyxDQUFDLFlBQUssQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEVBQUUsb0JBQW9CLENBQUMsQ0FBQztJQUMvRCxDQUFDLENBQUMsQ0FBQztJQUNILEVBQUUsQ0FBRSxRQUFRLEVBQUU7UUFDVixJQUFJLElBQUksR0FBRyxHQUFHLENBQUM7UUFDZixhQUFNLENBQUMsS0FBSyxDQUFDLFlBQUssQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDaEQsQ0FBQyxDQUFDLENBQUM7QUFDUCxDQUFDLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFN0YWxlLCBTZWFyY2ggfSBmcm9tIFwiLi9maW5kXCI7XG5pbXBvcnQgeyBhc3NlcnQsIGV4cGVjdCB9IGZyb20gJ2NoYWknO1xuaW1wb3J0IHtEZWZhdWx0T3B0cywgSUZpbGV9IGZyb20gXCIuL2ZpbmRcIjtcbmltcG9ydCAqIGFzIHBhdGggZnJvbSAncGF0aCc7XG5cbmRlc2NyaWJlICgnR2V0RXh0ZW5zaW9uJywgZnVuY3Rpb24oKSB7XG4gICAgaXQgKFwiVGVzdCAxXCIsIGZ1bmN0aW9uKCkge1xuICAgICAgICBhc3NlcnQuZXF1YWwoU3RhbGUuZ2V0RXh0ZW5zaW9uKFwiZmlsZS50eHRcIiksIFwidHh0XCIpO1xuICAgIH0pO1xuICAgIGl0IChcIlRlc3QgMlwiLCBmdW5jdGlvbigpIHtcbiAgICAgICAgYXNzZXJ0LmVxdWFsKFN0YWxlLmdldEV4dGVuc2lvbihcImZpbGUubmFtZS53aXRoLmRvdHMuanNcIiksIFwianNcIik7XG4gICAgfSk7XG4gICAgaXQgKFwiVGVzdCAzXCIsIGZ1bmN0aW9uKCkge1xuICAgICAgICBhc3NlcnQuZXF1YWwoU3RhbGUuZ2V0RXh0ZW5zaW9uKFwiZmlsZVwiKSwgdW5kZWZpbmVkKTtcbiAgICB9KTtcbiAgICBpdCAoXCJUZXN0IDRcIiwgZnVuY3Rpb24oKSB7XG4gICAgICAgIGFzc2VydC5lcXVhbChTdGFsZS5nZXRFeHRlbnNpb24oXCIgXCIpLCB1bmRlZmluZWQpO1xuICAgIH0pO1xuICAgIGl0IChcIlRlc3QgNVwiLCBmdW5jdGlvbigpIHtcbiAgICAgICAgYXNzZXJ0LmVxdWFsKFN0YWxlLmdldEV4dGVuc2lvbihcImN1cnJlbnRmaWxlL2ZpbGUudHNcIiksIFwidHNcIik7XG4gICAgfSk7XG59KTtcblxuZGVzY3JpYmUgKCdGaW5kRmlsZXNSZWN1cnNpdmVseScsIGZ1bmN0aW9uKCkge1xuICAgIGl0IChcIlRlc3QgMVwiLCBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGRhdGEgPSBwYXRoLnJlc29sdmUoKTtcbiAgICAgICAgY29uc3Qgb3B0cyA9IG5ldyBEZWZhdWx0T3B0cygpO1xuICAgICAgICBhc3NlcnQubm90RXF1YWwoU2VhcmNoLmZpbmRGaWxlc1JlY3Vyc2l2ZWx5KGRhdGEsIG9wdHMpLCBbXSk7XG4gICAgfSk7XG4gICAgaXQgKFwiVGVzdCAyXCIsIGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgZGF0YSA9IHBhdGgucmVzb2x2ZSgpO1xuICAgICAgICBjb25zdCBvcHRzID0gbmV3IERlZmF1bHRPcHRzKCk7XG4gICAgICAgIHZhciBzZWFyY2hBcnJheUxlbmd0aCA9IChTZWFyY2guZmluZEZpbGVzUmVjdXJzaXZlbHkoZGF0YSwgb3B0cykpLmxlbmd0aDtcbiAgICAgICAgdmFyIGVtcHR5QXJyYXlMZW5ndGggPSAoW10pLmxlbmd0aDtcbiAgICAgICAgYXNzZXJ0Lm5vdEVxdWFsKHNlYXJjaEFycmF5TGVuZ3RoLCBlbXB0eUFycmF5TGVuZ3RoKTtcbiAgICB9KTtcbn0pO1xuXG5kZXNjcmliZSAoJ0luaXRpYWxpemVUeXBlc2NyaXB0TWFwRmlsZXMnLCBmdW5jdGlvbigpIHtcbiAgICBpdCAoXCJUZXN0IDFcIiwgZnVuY3Rpb24oKSB7XG4gICAgICAgIGNvbnN0IGRhdGEgOiBJRmlsZVtdID0gW107XG4gICAgICAgIHZhciBjdXJyTWFwID0gbmV3IE1hcCgpO1xuICAgICAgICB2YXIgZmluYWxNYXAgPSBTdGFsZS5pbml0aWFsaXplVHlwZXNjcmlwdE1hcEZpbGVzKGRhdGEsIGN1cnJNYXApO1xuICAgICAgICB2YXIgbmV3TWFwTGVuZ3RoID0gWyAuLi5maW5hbE1hcC5rZXlzKCkgXS5sZW5ndGg7XG4gICAgICAgIGFzc2VydC5lcXVhbChuZXdNYXBMZW5ndGgsIDApO1xuICAgIH0pO1xuICAgIGl0IChcIlRlc3QgMlwiLCBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGRhdGEgPSBwYXRoLnJlc29sdmUoKTtcbiAgICAgICAgY29uc3Qgb3B0cyA9IG5ldyBEZWZhdWx0T3B0cygpO1xuICAgICAgICB2YXIgZmlsZUFycmF5ID0gU2VhcmNoLmZpbmRGaWxlc1JlY3Vyc2l2ZWx5KGRhdGEsIG9wdHMpO1xuICAgICAgICB2YXIgY3Vyck1hcCA9IG5ldyBNYXAoKTtcbiAgICAgICAgdmFyIGZpbmFsTWFwID0gU3RhbGUuaW5pdGlhbGl6ZVR5cGVzY3JpcHRNYXBGaWxlcyhmaWxlQXJyYXksIGN1cnJNYXApO1xuICAgICAgICB2YXIgbWFwTGVuZ3RoID0gWyAuLi5maW5hbE1hcC5rZXlzKCkgXS5sZW5ndGg7XG4gICAgICAgIGFzc2VydC5lcXVhbChtYXBMZW5ndGgsMyk7XG4gICAgfSk7XG59KTtcblxuZGVzY3JpYmUgKCdVcGRhdGVIaXRNYXAnLCBmdW5jdGlvbigpIHtcbiAgICBpdCAoXCJUZXN0IDFcIiwgZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBkYXRhID0gcGF0aC5yZXNvbHZlKCk7XG4gICAgICAgIHZhciBjdXJyTWFwID0gbmV3IE1hcCgpO1xuICAgICAgICBjdXJyTWFwLnNldCgnYScsIDEpO1xuICAgICAgICBhc3NlcnQubm90RXF1YWwoU3RhbGUudXBkYXRlSGl0TWFwKGRhdGEsIGN1cnJNYXApLCB1bmRlZmluZWQpO1xuICAgIH0pO1xuICAgIGl0IChcIlRlc3QgMlwiLCBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGRhdGEgPSBwYXRoLnJlc29sdmUoKTtcbiAgICAgICAgdmFyIGN1cnJNYXAgPSBuZXcgTWFwKCk7XG4gICAgICAgIHZhciBmaW5hbCA9IFsgLi4uU3RhbGUudXBkYXRlSGl0TWFwKGRhdGEsIGN1cnJNYXApIF0ubGVuZ3RoO1xuICAgICAgICBhc3NlcnQubm90RXF1YWwoZmluYWwsIDApO1xuICAgIH0pO1xuICAgIGl0IChcIlRlc3QgM1wiLCBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGRhdGEgPSBwYXRoLnJlc29sdmUoKTtcbiAgICAgICAgY29uc3Qgb3B0cyA9IG5ldyBEZWZhdWx0T3B0cygpOyBcbiAgICAgICAgdmFyIGZpbGVBcnJheSA9IFNlYXJjaC5maW5kRmlsZXNSZWN1cnNpdmVseShkYXRhLCBvcHRzKTtcbiAgICAgICAgdmFyIGN1cnJNYXAgPSBuZXcgTWFwKCk7XG4gICAgICAgIHZhciBmaW5hbE1hcCA9IFN0YWxlLmluaXRpYWxpemVUeXBlc2NyaXB0TWFwRmlsZXMoZmlsZUFycmF5LCBjdXJyTWFwKTtcbiAgICAgICAgdmFyIG1hcExlbmd0aCA9IFsgLi4uZmluYWxNYXAua2V5cygpIF0ubGVuZ3RoO1xuICAgICAgICB2YXIgbmV3TWFwTGVuZ3RoID0gWyAuLi5TdGFsZS51cGRhdGVIaXRNYXAoZGF0YSwgZmluYWxNYXApLmtleXMoKSBdLmxlbmd0aDtcbiAgICAgICAgYXNzZXJ0Lm5vdEVxdWFsKG1hcExlbmd0aCwgbmV3TWFwTGVuZ3RoKTtcbiAgICB9KTtcbn0pO1xuXG5kZXNjcmliZSAoJ0NoZWNrRnVsbFBhdGgnLCBmdW5jdGlvbigpIHtcbiAgICBpdCAoXCJUZXN0IDFcIiwgZnVuY3Rpb24oKSB7XG4gICAgICAgIGFzc2VydC5lcXVhbChTdGFsZS5jaGVja0Z1bGxQYXRoKHBhdGgucmVzb2x2ZSgpKSwgcGF0aC5yZXNvbHZlKCkpO1xuICAgIH0pO1xuICAgIGl0IChcIlRlc3QgMlwiLCBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGN1cnJQYXRoID0gXCJmaWxlLnRzXCI7XG4gICAgICAgIGFzc2VydC5lcXVhbChTdGFsZS5jaGVja0Z1bGxQYXRoKGN1cnJQYXRoKSwgXCJmaWxlLmQudHNcIik7XG4gICAgfSk7XG59KTtcblxuZGVzY3JpYmUgKCdFeHBhbmRQYXRoJywgZnVuY3Rpb24oKSB7XG4gICAgaXQgKFwiVGVzdCAxXCIsIGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgZmlsZSA9IFwiLi9maWxlO1wiO1xuICAgICAgICBhc3NlcnQuZXF1YWwoU3RhbGUuZXhwYW5kUGF0aChmaWxlKSwgXCIuL2ZpbGUudHNcIik7XG4gICAgfSk7XG4gICAgaXQgKFwiVGVzdCAyXCIsIGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgZmlsZSA9IFwiLi9wYXRoL3RvL2ZpbGUudHM7XCI7XG4gICAgICAgIGFzc2VydC5lcXVhbChTdGFsZS5leHBhbmRQYXRoKGZpbGUpLCBcIi4vcGF0aC90by9maWxlLnRzO1wiKTtcbiAgICB9KTtcbiAgICBpdCAoXCJUZXN0IDNcIiwgZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBmaWxlID0gXCI7XCI7XG4gICAgICAgIGFzc2VydC5lcXVhbChTdGFsZS5leHBhbmRQYXRoKGZpbGUpLCBcIi50c1wiKTtcbiAgICB9KTtcbn0pOyJdfQ==