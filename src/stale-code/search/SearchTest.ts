import {initializeTypescriptMapFiles, updateHitMap, checkFullPath, expandPath, 
    sortMap, swapMapValues, printMap, getExtension, main} from './Search';
import { expect } from 'chai';

describe ('CheckFullPath', function() {
    it('should return full proper path after checking', function() {
        var fileName = '/Users/mihirmacpro13/Documents/GitHub/polar-bookshelf/web/js/datastore/PersistenceLayer.ts'
        const result = checkFullPath(fileName);
        expect(result).to.equal('/Users/mihirmacpro13/Documents/GitHub/polar-bookshelf/web/js/datastore/PersistenceLayer.ts');
    })
});