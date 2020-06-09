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
        chai_1.assert.notEqual(mapLength, 0);
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2VhcmNoVGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNlYXJjaFRlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsaUNBQXVDO0FBQ3ZDLCtCQUFzQztBQUN0QyxpQ0FBMEM7QUFDMUMsMkNBQTZCO0FBRTdCLFFBQVEsQ0FBRSxjQUFjLEVBQUU7SUFDdEIsRUFBRSxDQUFFLFFBQVEsRUFBRTtRQUNWLGFBQU0sQ0FBQyxLQUFLLENBQUMsWUFBSyxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQztJQUN4RCxDQUFDLENBQUMsQ0FBQztJQUNILEVBQUUsQ0FBRSxRQUFRLEVBQUU7UUFDVixhQUFNLENBQUMsS0FBSyxDQUFDLFlBQUssQ0FBQyxZQUFZLENBQUMsd0JBQXdCLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNyRSxDQUFDLENBQUMsQ0FBQztJQUNILEVBQUUsQ0FBRSxRQUFRLEVBQUU7UUFDVixhQUFNLENBQUMsS0FBSyxDQUFDLFlBQUssQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLEVBQUUsU0FBUyxDQUFDLENBQUM7SUFDeEQsQ0FBQyxDQUFDLENBQUM7SUFDSCxFQUFFLENBQUUsUUFBUSxFQUFFO1FBQ1YsYUFBTSxDQUFDLEtBQUssQ0FBQyxZQUFLLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxFQUFFLFNBQVMsQ0FBQyxDQUFDO0lBQ3JELENBQUMsQ0FBQyxDQUFDO0lBQ0gsRUFBRSxDQUFFLFFBQVEsRUFBRTtRQUNWLGFBQU0sQ0FBQyxLQUFLLENBQUMsWUFBSyxDQUFDLFlBQVksQ0FBQyxxQkFBcUIsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ2xFLENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQyxDQUFDLENBQUM7QUFFSCxRQUFRLENBQUUsc0JBQXNCLEVBQUU7SUFDOUIsRUFBRSxDQUFFLFFBQVEsRUFBRTtRQUNWLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUMxQixNQUFNLElBQUksR0FBRyxJQUFJLGtCQUFXLEVBQUUsQ0FBQztRQUMvQixhQUFNLENBQUMsUUFBUSxDQUFDLGFBQU0sQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDakUsQ0FBQyxDQUFDLENBQUM7SUFDSCxFQUFFLENBQUUsUUFBUSxFQUFFO1FBQ1YsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQzFCLE1BQU0sSUFBSSxHQUFHLElBQUksa0JBQVcsRUFBRSxDQUFDO1FBQy9CLElBQUksaUJBQWlCLEdBQUcsQ0FBQyxhQUFNLENBQUMsb0JBQW9CLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDO1FBQ3pFLElBQUksZ0JBQWdCLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUM7UUFDbkMsYUFBTSxDQUFDLFFBQVEsQ0FBQyxpQkFBaUIsRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDO0lBQ3pELENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQyxDQUFDLENBQUM7QUFFSCxRQUFRLENBQUUsOEJBQThCLEVBQUU7SUFDdEMsRUFBRSxDQUFFLFFBQVEsRUFBRTtRQUNWLE1BQU0sSUFBSSxHQUFhLEVBQUUsQ0FBQztRQUMxQixJQUFJLE9BQU8sR0FBRyxJQUFJLEdBQUcsRUFBRSxDQUFDO1FBQ3hCLElBQUksUUFBUSxHQUFHLFlBQUssQ0FBQyw0QkFBNEIsQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDakUsSUFBSSxZQUFZLEdBQUcsQ0FBRSxHQUFHLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBRSxDQUFDLE1BQU0sQ0FBQztRQUNqRCxhQUFNLENBQUMsS0FBSyxDQUFDLFlBQVksRUFBRSxDQUFDLENBQUMsQ0FBQztJQUNsQyxDQUFDLENBQUMsQ0FBQztJQUNILEVBQUUsQ0FBRSxRQUFRLEVBQUU7UUFDVixJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDMUIsTUFBTSxJQUFJLEdBQUcsSUFBSSxrQkFBVyxFQUFFLENBQUM7UUFDL0IsSUFBSSxTQUFTLEdBQUcsYUFBTSxDQUFDLG9CQUFvQixDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztRQUN4RCxJQUFJLE9BQU8sR0FBRyxJQUFJLEdBQUcsRUFBRSxDQUFDO1FBQ3hCLElBQUksUUFBUSxHQUFHLFlBQUssQ0FBQyw0QkFBNEIsQ0FBQyxTQUFTLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDdEUsSUFBSSxTQUFTLEdBQUcsQ0FBRSxHQUFHLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBRSxDQUFDLE1BQU0sQ0FBQztRQUM5QyxhQUFNLENBQUMsUUFBUSxDQUFDLFNBQVMsRUFBQyxDQUFDLENBQUMsQ0FBQztJQUNqQyxDQUFDLENBQUMsQ0FBQztBQUNQLENBQUMsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgU3RhbGUsIFNlYXJjaCB9IGZyb20gXCIuL2ZpbmRcIjtcbmltcG9ydCB7IGFzc2VydCwgZXhwZWN0IH0gZnJvbSAnY2hhaSc7XG5pbXBvcnQge0RlZmF1bHRPcHRzLCBJRmlsZX0gZnJvbSBcIi4vZmluZFwiO1xuaW1wb3J0ICogYXMgcGF0aCBmcm9tICdwYXRoJztcblxuZGVzY3JpYmUgKCdHZXRFeHRlbnNpb24nLCBmdW5jdGlvbigpIHtcbiAgICBpdCAoXCJUZXN0IDFcIiwgZnVuY3Rpb24oKSB7XG4gICAgICAgIGFzc2VydC5lcXVhbChTdGFsZS5nZXRFeHRlbnNpb24oXCJmaWxlLnR4dFwiKSwgXCJ0eHRcIik7XG4gICAgfSk7XG4gICAgaXQgKFwiVGVzdCAyXCIsIGZ1bmN0aW9uKCkge1xuICAgICAgICBhc3NlcnQuZXF1YWwoU3RhbGUuZ2V0RXh0ZW5zaW9uKFwiZmlsZS5uYW1lLndpdGguZG90cy5qc1wiKSwgXCJqc1wiKTtcbiAgICB9KTtcbiAgICBpdCAoXCJUZXN0IDNcIiwgZnVuY3Rpb24oKSB7XG4gICAgICAgIGFzc2VydC5lcXVhbChTdGFsZS5nZXRFeHRlbnNpb24oXCJmaWxlXCIpLCB1bmRlZmluZWQpO1xuICAgIH0pO1xuICAgIGl0IChcIlRlc3QgNFwiLCBmdW5jdGlvbigpIHtcbiAgICAgICAgYXNzZXJ0LmVxdWFsKFN0YWxlLmdldEV4dGVuc2lvbihcIiBcIiksIHVuZGVmaW5lZCk7XG4gICAgfSk7XG4gICAgaXQgKFwiVGVzdCA1XCIsIGZ1bmN0aW9uKCkge1xuICAgICAgICBhc3NlcnQuZXF1YWwoU3RhbGUuZ2V0RXh0ZW5zaW9uKFwiY3VycmVudGZpbGUvZmlsZS50c1wiKSwgXCJ0c1wiKTtcbiAgICB9KTtcbn0pO1xuXG5kZXNjcmliZSAoJ0ZpbmRGaWxlc1JlY3Vyc2l2ZWx5JywgZnVuY3Rpb24oKSB7XG4gICAgaXQgKFwiVGVzdCAxXCIsIGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgZGF0YSA9IHBhdGgucmVzb2x2ZSgpO1xuICAgICAgICBjb25zdCBvcHRzID0gbmV3IERlZmF1bHRPcHRzKCk7XG4gICAgICAgIGFzc2VydC5ub3RFcXVhbChTZWFyY2guZmluZEZpbGVzUmVjdXJzaXZlbHkoZGF0YSwgb3B0cyksIFtdKTtcbiAgICB9KTtcbiAgICBpdCAoXCJUZXN0IDJcIiwgZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBkYXRhID0gcGF0aC5yZXNvbHZlKCk7XG4gICAgICAgIGNvbnN0IG9wdHMgPSBuZXcgRGVmYXVsdE9wdHMoKTtcbiAgICAgICAgdmFyIHNlYXJjaEFycmF5TGVuZ3RoID0gKFNlYXJjaC5maW5kRmlsZXNSZWN1cnNpdmVseShkYXRhLCBvcHRzKSkubGVuZ3RoO1xuICAgICAgICB2YXIgZW1wdHlBcnJheUxlbmd0aCA9IChbXSkubGVuZ3RoO1xuICAgICAgICBhc3NlcnQubm90RXF1YWwoc2VhcmNoQXJyYXlMZW5ndGgsIGVtcHR5QXJyYXlMZW5ndGgpO1xuICAgIH0pO1xufSk7XG5cbmRlc2NyaWJlICgnSW5pdGlhbGl6ZVR5cGVzY3JpcHRNYXBGaWxlcycsIGZ1bmN0aW9uKCkge1xuICAgIGl0IChcIlRlc3QgMVwiLCBmdW5jdGlvbigpIHtcbiAgICAgICAgY29uc3QgZGF0YSA6IElGaWxlW10gPSBbXTtcbiAgICAgICAgdmFyIGN1cnJNYXAgPSBuZXcgTWFwKCk7XG4gICAgICAgIHZhciBmaW5hbE1hcCA9IFN0YWxlLmluaXRpYWxpemVUeXBlc2NyaXB0TWFwRmlsZXMoZGF0YSwgY3Vyck1hcCk7XG4gICAgICAgIHZhciBuZXdNYXBMZW5ndGggPSBbIC4uLmZpbmFsTWFwLmtleXMoKSBdLmxlbmd0aDtcbiAgICAgICAgYXNzZXJ0LmVxdWFsKG5ld01hcExlbmd0aCwgMCk7XG4gICAgfSk7XG4gICAgaXQgKFwiVGVzdCAyXCIsIGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgZGF0YSA9IHBhdGgucmVzb2x2ZSgpO1xuICAgICAgICBjb25zdCBvcHRzID0gbmV3IERlZmF1bHRPcHRzKCk7XG4gICAgICAgIHZhciBmaWxlQXJyYXkgPSBTZWFyY2guZmluZEZpbGVzUmVjdXJzaXZlbHkoZGF0YSwgb3B0cyk7XG4gICAgICAgIHZhciBjdXJyTWFwID0gbmV3IE1hcCgpO1xuICAgICAgICB2YXIgZmluYWxNYXAgPSBTdGFsZS5pbml0aWFsaXplVHlwZXNjcmlwdE1hcEZpbGVzKGZpbGVBcnJheSwgY3Vyck1hcCk7XG4gICAgICAgIHZhciBtYXBMZW5ndGggPSBbIC4uLmZpbmFsTWFwLmtleXMoKSBdLmxlbmd0aDtcbiAgICAgICAgYXNzZXJ0Lm5vdEVxdWFsKG1hcExlbmd0aCwwKTtcbiAgICB9KTtcbn0pOyJdfQ==