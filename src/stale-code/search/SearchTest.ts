import { Stale } from "./Search";
import { assert } from 'chai';

describe ('GetExtension', function() {
    it ("File extension getter", function() {
        var data = "file.txt";
        assert.notEqual(Stale.getExtension(data), undefined);
    });
});
