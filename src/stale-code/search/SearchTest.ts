import { getExtension } from "./Search";
import { assert } from 'chai';

describe ('GetExtension', function() {
    it ("File extension getter", function() {
        assert.equal(getExtension("file.txt"), "txt");
    });
});
