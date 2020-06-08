import { Stale } from "./find";
import { assert } from 'chai';

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
