/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Red Hat. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { isNodesEqual, newMap, newMapping, newScalar, newSeq } from '../src';
import { expect } from 'chai';

suite('YAML AST', () => {
  suite('AST Node Equality', () => {

    test('should not be equal when nodes has different kind', () => {
      const a = newScalar('a');
      const b = newSeq();
      const result = isNodesEqual(a, b);
      expect(result).is.false;
    });

    suite('Scalar Nodes', () => {

      test('should be equal if both has same value', () => {
        const a = newScalar('a');
        const b = newScalar('a');
        const result = isNodesEqual(a, b);
        expect(result).is.true;
      });
  
      test('should not be equal when the Scalar Nodes do not equal each other', () => {
        const a = newScalar('a');
        const b = newScalar('b');
        const result = isNodesEqual(a, b);
        expect(result).is.false;
      });
    });
    
    suite('Seq Nodes', () => {
      test('should not be equal if they has different size', () => {
        const a = newSeq();
        a.items = [newScalar('a'), newScalar('b')];
  
        const b = newSeq();
        b.items = [newScalar('a')];
  
        const result = isNodesEqual(a, b);
        expect(result).is.false;
      });
  
      test('should be equal if they has same values ', () => {
        const a = newSeq();
        a.items = [newScalar('a')];
  
        const b = newSeq();
        b.items = [newScalar('a')];
  
        const result = isNodesEqual(a, b);
        expect(result).is.true;
      });
  
      test('should not be equal if seq contains different items', () => {
        const a = newSeq();
        a.items = [newScalar('a')];
  
        const b = newSeq();
        b.items = [newScalar('b')];
  
        const result = isNodesEqual(a, b);
        expect(result).is.false;
      });
    });
    
    suite('Map Nodes', () => {
      test('should be equal', () => {
        const a = newMap([newMapping(newScalar('keyA'), newScalar('valA'))]);
        const b = newMap([newMapping(newScalar('keyA'), newScalar('valA'))]);

        const result = isNodesEqual(a, b);

        expect(result).is.true;
      });

      test('should not be equal if map has different size', () => {
        const a = newMap([newMapping(newScalar('keyA'), newScalar('valA'))]);
        const b = newMap([newMapping(newScalar('keyA'), newScalar('valA')), newMapping(newScalar('keyB'), newScalar('valB'))]);

        const result = isNodesEqual(a, b);
        
        expect(result).is.false;
      });

      test('should not be equal if map has different key', () => {
        const a = newMap([newMapping(newScalar('keyA'), newScalar('valA'))]);
        const b = newMap([newMapping(newScalar('keyB'), newScalar('valA'))]);

        const result = isNodesEqual(a, b);
        
        expect(result).is.false;
      });

      test('should not be equal if map has different value for same key', () => {
        const a = newMap([newMapping(newScalar('keyA'), newScalar('valA'))]);
        const b = newMap([newMapping(newScalar('keyA'), newScalar('valB'))]);

        const result = isNodesEqual(a, b);
        
        expect(result).is.false;
      });
      
    });
  });
});
