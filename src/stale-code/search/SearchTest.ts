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

