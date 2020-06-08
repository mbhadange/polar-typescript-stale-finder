import { Stale } from "./find";
import { assert } from 'chai';

describe ('GetExtension', function() {
    it ("File extension getter", function() {
        assert.equal(Stale.getExtension("file.txt"), "txt");
    });
});
