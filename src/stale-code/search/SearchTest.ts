import { Stale, Search } from "./find";
import { assert, expect } from 'chai';
import {DefaultOpts, IFile} from "./find";
import * as path from 'path';

describe ('GetExtension', function() {
    it ("Test 1", function() {
        assert.equal(Stale.getExtension("file.txt"), "txt");
    });
    it ("Test 2", function() {
        assert.equal(Stale.getExtension("file.name.with.dots.js"), "js");
    });
    it ("Test 3", function() {
        assert.equal(Stale.getExtension("file"), undefined);
    });
    it ("Test 4", function() {
        assert.equal(Stale.getExtension(" "), undefined);
    });
    it ("Test 5", function() {
        assert.equal(Stale.getExtension("currentfile/file.ts"), "ts");
    });
});

describe ('FindFilesRecursively', function() {
    it ("Test 1", function() {
        var data = path.resolve();
        const opts = new DefaultOpts();
        assert.notEqual(Search.findFilesRecursively(data, opts), []);
    });
    it ("Test 2", function() {
        var data = path.resolve();
        const opts = new DefaultOpts();
        var searchArrayLength = (Search.findFilesRecursively(data, opts)).length;
        var emptyArrayLength = ([]).length;
        assert.notEqual(searchArrayLength, emptyArrayLength);
    });
});

describe ('InitializeTypescriptMapFiles', function() {
    it ("Test 1", function() {
        const data : IFile[] = [];
        var currMap = new Map();
        var finalMap = Stale.initializeTypescriptMapFiles(data, currMap);
        var newMapLength = [ ...finalMap.keys() ].length;
        assert.equal(newMapLength, 0);
    });
    it ("Test 2", function() {
        var data = path.resolve();
        const opts = new DefaultOpts();
        var fileArray = Search.findFilesRecursively(data, opts);
        var currMap = new Map();
        var finalMap = Stale.initializeTypescriptMapFiles(fileArray, currMap);
        var mapLength = [ ...finalMap.keys() ].length;
        assert.equal(mapLength,3);
    });
});

describe ('UpdateHitMap', function() {
    it ("Test 1", function() {
        var data = path.resolve();
        var currMap = new Map();
        currMap.set('a', 1);
        assert.notEqual(Stale.updateHitMap(data, currMap), undefined);
    });
    it ("Test 2", function() {
        var data = path.resolve();
        var currMap = new Map();
        var final = [ ...Stale.updateHitMap(data, currMap) ].length;
        assert.notEqual(final, 0);
    });
    it ("Test 3", function() {
        var data = path.resolve();
        const opts = new DefaultOpts(); 
        var fileArray = Search.findFilesRecursively(data, opts);
        var currMap = new Map();
        var finalMap = Stale.initializeTypescriptMapFiles(fileArray, currMap);
        var mapLength = [ ...finalMap.keys() ].length;
        var newMapLength = [ ...Stale.updateHitMap(data, finalMap).keys() ].length;
        assert.notEqual(mapLength, newMapLength);
    });
});

describe ('CheckFullPath', function() {
    it ("Test 1", function() {
        assert.equal(Stale.checkFullPath(path.resolve()), path.resolve());
    });
    it ("Test 2", function() {
        var currPath = "file.ts";
        assert.equal(Stale.checkFullPath(currPath), "file.d.ts");
    });
});

describe ('ExpandPath', function() {
    it ("Test 1", function() {
        var file = "./file;";
        assert.equal(Stale.expandPath(file), "./file.ts");
    });
    it ("Test 2", function() {
        var file = "./path/to/file.ts;";
        assert.equal(Stale.expandPath(file), "./path/to/file.ts;");
    });
    it ("Test 3", function() {
        var file = ";";
        assert.equal(Stale.expandPath(file), ".ts");
    });
});

describe ('SortMap', function() {
    it ("Test 1", function() {
        var currMap = new Map();
        currMap.set('a', 3);
        currMap.set('b', 6);
        currMap.set('d', 1);
        currMap.set('z', 0);
        var finalMap = Stale.sortMap(currMap);
        let map = new Map([
            [ "a", 0 ],
            [ "b", 1 ],
            [ "d", 3 ],
            [ "z", 6 ]
        ]);
        assert.notEqual(finalMap, map);
    });
});

describe ('SwapMapValues', function() {
    it ("Test 1", function() {
        var currArray = [['a', 1], ['b', 2], ['c', 3]];
        assert.notEqual(Stale.swapMapValues(currArray), currArray);
    });
    it ("Test 2", function() {
        var currArray = [['a', 1], ['b', 2], ['c', 3]];
        var finalArray = [[1, 'a'], [2, 'b'], [3, 'c']];
        assert.deepEqual(Stale.swapMapValues(currArray), finalArray);
    });
});

describe ('IsNotStale', function() {
    it ("Test 1", function() {
        assert.equal(Stale.isNotStale("./src/stale-code/search/Search.ts"), true);
    });
});