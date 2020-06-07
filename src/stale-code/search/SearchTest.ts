import {initializeTypescriptMapFiles, updateHitMap, checkFullPath, expandPath, 
    sortMap, swapMapValues, printMap, getExtension, main} from './Search';
import { expect } from 'chai';

describe ('CheckFullPath', () => {
    it('should return full proper path after checking', () => {
        var fileName = '/Users/mihirmacpro13/Documents/GitHub/polar-bookshelf/web/js/datastore/PersistenceLayer.ts'
        var result = checkFullPath(fileName);
        if (expect(result).to.equal('/Users/mihirmacpro13/Documents/GitHub/polar-bookshelf/web/js/datastore/PersistenceLayer.ts')) {
            console.log("yes");
        }
    })
});