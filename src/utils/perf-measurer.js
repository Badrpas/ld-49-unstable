import { allocArray, allocObj, get_alloc_bucket } from './alloc';
import { get_seconds_precise } from './micro-time';


export class PerfMeasurer {

  constructor (slot_count = 120) {
    this.slot_count = slot_count;
  }

  idx = 0;
  items = new Map;
  starts = new Map;

  getSlot (key) {
    if (!this.items.has(key)) {
      const slot = this._createSlot();
      this.items.set(key, slot);
      return slot;
    }

    return this.items.get(key);
  }

  _createSlot () {
    return new Array(this.slot_count).fill(0);
  }

  start (key) {
    this.starts.set(key, get_seconds_precise());
  }

  end (key) {
    this.markPerf(key, get_seconds_precise() - this.starts.get(key));
  }

  markPerf (key, val) {
    this.getSlot(key)[this.idx] = val;
  }

  markCycle () {
    this.idx = (this.idx + 1) % this.slot_count;
  }

  _cache = new WeakMap;
  _sum = (sum, x) => sum + x;

  collect () {
    const arr = get_alloc_bucket(this, this._cache, allocArray);

    for (const [name, slot] of this.items.entries()) {
      const info = get_alloc_bucket(slot, this._cache, allocObj);
      info.name = name;
      info.sum = slot.reduce(this._sum, 0);
      info.avg = info.sum / slot.length;

      if (!arr.includes(info)) arr.push(info);
    }

    arr.sort((a, b) => b.avg - a.avg);

    return arr;
  }

}


