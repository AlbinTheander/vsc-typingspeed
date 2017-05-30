import { expect } from 'chai';
import RollingQueue from './rollingqueue';


describe('RollingQueue', () => {
    it('can be instantiated', () => {
        const rollingQueue = new RollingQueue(100);
        expect(rollingQueue).to.be.ok;
    });
    it('has size 0 from start', () => {
        const rq = new RollingQueue(100);
        expect(rq.size()).to.equal(0);
    });
    it('increases its size by one when inserting new data', () => {
        const rq = new RollingQueue(100);
        rq.add(10);
        expect(rq.size()).to.equal(1);
        rq.add(10);
        rq.add(10);
        expect(rq.size()).to.equal(3);
    });
    it('will never be larger than the initial capacity', () => {
        const rq = new RollingQueue(5);
        rq.add(10);
        rq.add(10);
        rq.add(10);
        rq.add(10);
        rq.add(10);
        expect(rq.size()).to.equal(5);
        rq.add(10);
        expect(rq.size()).to.equal(5);
        rq.add(10);
        expect(rq.size()).to.equal(5);
    });
    it('will return the last added element when calling last()', () => {
        const rq = new RollingQueue(5);
        rq.add(5);
        expect(rq.last()).to.equal(5);
        rq.add(89);
        expect(rq.last()).to.equal(89);
        rq.add(13);
        rq.add(15);
        rq.add(19);
        rq.add(21);
        expect(rq.last()).to.equal(21);
    });
    it('will return oldest element as first', () => {
        const rq = new RollingQueue(5);
        rq.add(5);
        expect(rq.first()).to.equal(5);
        rq.add(89);
        expect(rq.first()).to.equal(5);
        rq.add(13);
        rq.add(15);
        rq.add(19);
        rq.add(21);
        expect(rq.first()).to.equal(89);
    });
    it('will roll over several times', () => {
        const rq = new RollingQueue(7);
        for(let i = 1; i <= 100; i++)
            rq.add(i);
        expect(rq.last()).to.equal(100);
        expect(rq.first()).to.equal(94);
        expect(rq.size()).to.equal(7);
    });
});