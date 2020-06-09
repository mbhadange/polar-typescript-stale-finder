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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2VhcmNoVGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNlYXJjaFRlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsaUNBQXVDO0FBQ3ZDLCtCQUFzQztBQUN0QyxpQ0FBMEM7QUFDMUMsMkNBQTZCO0FBRTdCLFFBQVEsQ0FBRSxjQUFjLEVBQUU7SUFDdEIsRUFBRSxDQUFFLFFBQVEsRUFBRTtRQUNWLGFBQU0sQ0FBQyxLQUFLLENBQUMsWUFBSyxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQztJQUN4RCxDQUFDLENBQUMsQ0FBQztJQUNILEVBQUUsQ0FBRSxRQUFRLEVBQUU7UUFDVixhQUFNLENBQUMsS0FBSyxDQUFDLFlBQUssQ0FBQyxZQUFZLENBQUMsd0JBQXdCLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNyRSxDQUFDLENBQUMsQ0FBQztJQUNILEVBQUUsQ0FBRSxRQUFRLEVBQUU7UUFDVixhQUFNLENBQUMsS0FBSyxDQUFDLFlBQUssQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLEVBQUUsU0FBUyxDQUFDLENBQUM7SUFDeEQsQ0FBQyxDQUFDLENBQUM7SUFDSCxFQUFFLENBQUUsUUFBUSxFQUFFO1FBQ1YsYUFBTSxDQUFDLEtBQUssQ0FBQyxZQUFLLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxFQUFFLFNBQVMsQ0FBQyxDQUFDO0lBQ3JELENBQUMsQ0FBQyxDQUFDO0lBQ0gsRUFBRSxDQUFFLFFBQVEsRUFBRTtRQUNWLGFBQU0sQ0FBQyxLQUFLLENBQUMsWUFBSyxDQUFDLFlBQVksQ0FBQyxxQkFBcUIsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ2xFLENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQyxDQUFDLENBQUM7QUFFSCxRQUFRLENBQUUsc0JBQXNCLEVBQUU7SUFDOUIsRUFBRSxDQUFFLFFBQVEsRUFBRTtRQUNWLElBQUksSUFBSSxH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Q0FBQyxNQUFNLENBQUM7UUFDNUQsYUFBTSxDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDOUIsQ0FBQyxDQUFDLENBQUM7SUFDSCxFQUFFLENBQUUsUUFBUSxFQUFFO1FBQ1YsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQzFCLE1BQU0sSUFBSSxHQUFHLElBQUksa0JBQVcsRUFBRSxDQUFDO1FBQy9CLElBQUksU0FBUyxHQUFHLGFBQU0sQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDeEQsSUFBSSxPQUFPLEdBQUcsSUFBSSxHQUFHLEVBQUUsQ0FBQztRQUN4QixJQUFJLFFBQVEsR0FBRyxZQUFLLENBQUMsNEJBQTRCLENBQUMsU0FBUyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQ3RFLElBQUksU0FBUyxHQUFHLENBQUUsR0FBRyxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUUsQ0FBQyxNQUFNLENBQUM7UUFDOUMsSUFBSSxZQUFZLEdBQUcsQ0FBRSxHQUFHLFlBQUssQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFFLENBQUMsTUFBTSxDQUFDO1FBQzNFLGFBQU0sQ0FBQyxRQUFRLENBQUMsU0FBUyxFQUFFLFlBQVksQ0FBQyxDQUFDO0lBQzdDLENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQyxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBTdGFsZSwgU2VhcmNoIH0gZnJvbSBcIi4vZmluZFwiO1xuaW1wb3J0IHsgYXNzZXJ0LCBleHBlY3QgfSBmcm9tICdjaGFpJztcbmltcG9ydCB7RGVmYXVsdE9wdHMsIElGaWxlfSBmcm9tIFwiLi9maW5kXCI7XG5pbXBvcnQgKiBhcyBwYXRoIGZyb20gJ3BhdGgnO1xuXG5kZXNjcmliZSAoJ0dldEV4dGVuc2lvbicsIGZ1bmN0aW9uKCkge1xuICAgIGl0IChcIlRlc3QgMVwiLCBmdW5jdGlvbigpIHtcbiAgICAgICAgYXNzZXJ0LmVxdWFsKFN0YWxlLmdldEV4dGVuc2lvbihcImZpbGUudHh0XCIpLCBcInR4dFwiKTtcbiAgICB9KTtcbiAgICBpdCAoXCJUZXN0IDJcIiwgZnVuY3Rpb24oKSB7XG4gICAgICAgIGFzc2VydC5lcXVhbChTdGFsZS5nZXRFeHRlbnNpb24oXCJmaWxlLm5hbWUud2l0aC5kb3RzLmpzXCIpLCBcImpzXCIpO1xuICAgIH0pO1xuICAgIGl0IChcIlRlc3QgM1wiLCBmdW5jdGlvbigpIHtcbiAgICAgICAgYXNzZXJ0LmVxdWFsKFN0YWxlLmdldEV4dGVuc2lvbihcImZpbGVcIiksIHVuZGVmaW5lZCk7XG4gICAgfSk7XG4gICAgaXQgKFwiVGVzdCA0XCIsIGZ1bmN0aW9uKCkge1xuICAgICAgICBhc3NlcnQuZXF1YWwoU3RhbGUuZ2V0RXh0ZW5zaW9uKFwiIFwiKSwgdW5kZWZpbmVkKTtcbiAgICB9KTtcbiAgICBpdCAoXCJUZXN0IDVcIiwgZnVuY3Rpb24oKSB7XG4gICAgICAgIGFzc2VydC5lcXVhbChTdGFsZS5nZXRFeHRlbnNpb24oXCJjdXJyZW50ZmlsZS9maWxlLnRzXCIpLCBcInRzXCIpO1xuICAgIH0pO1xufSk7XG5cbmRlc2NyaWJlICgnRmluZEZpbGVzUmVjdXJzaXZlbHknLCBmdW5jdGlvbigpIHtcbiAgICBpdCAoXCJUZXN0IDFcIiwgZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBkYXRhID0gcGF0aC5yZXNvbHZlKCk7XG4gICAgICAgIGNvbnN0IG9wdHMgPSBuZXcgRGVmYXVsdE9wdHMoKTtcbiAgICAgICAgYXNzZXJ0Lm5vdEVxdWFsKFNlYXJjaC5maW5kRmlsZXNSZWN1cnNpdmVseShkYXRhLCBvcHRzKSwgW10pO1xuICAgIH0pO1xuICAgIGl0IChcIlRlc3QgMlwiLCBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGRhdGEgPSBwYXRoLnJlc29sdmUoKTtcbiAgICAgICAgY29uc3Qgb3B0cyA9IG5ldyBEZWZhdWx0T3B0cygpO1xuICAgICAgICB2YXIgc2VhcmNoQXJyYXlMZW5ndGggPSAoU2VhcmNoLmZpbmRGaWxlc1JlY3Vyc2l2ZWx5KGRhdGEsIG9wdHMpKS5sZW5ndGg7XG4gICAgICAgIHZhciBlbXB0eUFycmF5TGVuZ3RoID0gKFtdKS5sZW5ndGg7XG4gICAgICAgIGFzc2VydC5ub3RFcXVhbChzZWFyY2hBcnJheUxlbmd0aCwgZW1wdHlBcnJheUxlbmd0aCk7XG4gICAgfSk7XG59KTtcblxuZGVzY3JpYmUgKCdJbml0aWFsaXplVHlwZXNjcmlwdE1hcEZpbGVzJywgZnVuY3Rpb24oKSB7XG4gICAgaXQgKFwiVGVzdCAxXCIsIGZ1bmN0aW9uKCkge1xuICAgICAgICBjb25zdCBkYXRhIDogSUZpbGVbXSA9IFtdO1xuICAgICAgICB2YXIgY3Vyck1hcCA9IG5ldyBNYXAoKTtcbiAgICAgICAgdmFyIGZpbmFsTWFwID0gU3RhbGUuaW5pdGlhbGl6ZVR5cGVzY3JpcHRNYXBGaWxlcyhkYXRhLCBjdXJyTWFwKTtcbiAgICAgICAgdmFyIG5ld01hcExlbmd0aCA9IFsgLi4uZmluYWxNYXAua2V5cygpIF0ubGVuZ3RoO1xuICAgICAgICBhc3NlcnQuZXF1YWwobmV3TWFwTGVuZ3RoLCAwKTtcbiAgICB9KTtcbiAgICBpdCAoXCJUZXN0IDJcIiwgZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBkYXRhID0gcGF0aC5yZXNvbHZlKCk7XG4gICAgICAgIGNvbnN0IG9wdHMgPSBuZXcgRGVmYXVsdE9wdHMoKTtcbiAgICAgICAgdmFyIGZpbGVBcnJheSA9IFNlYXJjaC5maW5kRmlsZXNSZWN1cnNpdmVseShkYXRhLCBvcHRzKTtcbiAgICAgICAgdmFyIGN1cnJNYXAgPSBuZXcgTWFwKCk7XG4gICAgICAgIHZhciBmaW5hbE1hcCA9IFN0YWxlLmluaXRpYWxpemVUeXBlc2NyaXB0TWFwRmlsZXMoZmlsZUFycmF5LCBjdXJyTWFwKTtcbiAgICAgICAgdmFyIG1hcExlbmd0aCA9IFsgLi4uZmluYWxNYXAua2V5cygpIF0ubGVuZ3RoO1xuICAgICAgICBhc3NlcnQuZXF1YWwobWFwTGVuZ3RoLDMpO1xuICAgIH0pO1xufSk7XG5cbmRlc2NyaWJlICgnVXBkYXRlSGl0TWFwJywgZnVuY3Rpb24oKSB7XG4gICAgaXQgKFwiVGVzdCAxXCIsIGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgZGF0YSA9IHBhdGgucmVzb2x2ZSgpO1xuICAgICAgICB2YXIgY3Vyck1hcCA9IG5ldyBNYXAoKTtcbiAgICAgICAgY3Vyck1hcC5zZXQoJ2EnLCAxKTtcbiAgICAgICAgYXNzZXJ0Lm5vdEVxdWFsKFN0YWxlLnVwZGF0ZUhpdE1hcChkYXRhLCBjdXJyTWFwKSwgdW5kZWZpbmVkKTtcbiAgICB9KTtcbiAgICBpdCAoXCJUZXN0IDJcIiwgZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBkYXRhID0gcGF0aC5yZXNvbHZlKCk7XG4gICAgICAgIHZhciBjdXJyTWFwID0gbmV3IE1hcCgpO1xuICAgICAgICB2YXIgZmluYWwgPSBbIC4uLlN0YWxlLnVwZGF0ZUhpdE1hcChkYXRhLCBjdXJyTWFwKSBdLmxlbmd0aDtcbiAgICAgICAgYXNzZXJ0Lm5vdEVxdWFsKGZpbmFsLCAwKTtcbiAgICB9KTtcbiAgICBpdCAoXCJUZXN0IDNcIiwgZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBkYXRhID0gcGF0aC5yZXNvbHZlKCk7XG4gICAgICAgIGNvbnN0IG9wdHMgPSBuZXcgRGVmYXVsdE9wdHMoKTsgXG4gICAgICAgIHZhciBmaWxlQXJyYXkgPSBTZWFyY2guZmluZEZpbGVzUmVjdXJzaXZlbHkoZGF0YSwgb3B0cyk7XG4gICAgICAgIHZhciBjdXJyTWFwID0gbmV3IE1hcCgpO1xuICAgICAgICB2YXIgZmluYWxNYXAgPSBTdGFsZS5pbml0aWFsaXplVHlwZXNjcmlwdE1hcEZpbGVzKGZpbGVBcnJheSwgY3Vyck1hcCk7XG4gICAgICAgIHZhciBtYXBMZW5ndGggPSBbIC4uLmZpbmFsTWFwLmtleXMoKSBdLmxlbmd0aDtcbiAgICAgICAgdmFyIG5ld01hcExlbmd0aCA9IFsgLi4uU3RhbGUudXBkYXRlSGl0TWFwKGRhdGEsIGZpbmFsTWFwKS5rZXlzKCkgXS5sZW5ndGg7XG4gICAgICAgIGFzc2VydC5ub3RFcXVhbChtYXBMZW5ndGgsIG5ld01hcExlbmd0aCk7XG4gICAgfSk7XG59KTsiXX0=