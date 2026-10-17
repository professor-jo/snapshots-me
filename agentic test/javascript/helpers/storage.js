import {vi} from 'vitest';
// A deterministic Storage-compatible implementation avoids Node's experimental storage global.
export class TestStorage {
  constructor(){this.data=new Map();}
  get length(){return this.data.size;}
  key(i){return [...this.data.keys()][i]??null;}
  getItem(key){return this.data.get(String(key))??null;}
  setItem(key,value){this.data.set(String(key),String(value));}
  removeItem(key){this.data.delete(String(key));}
  clear(){this.data.clear();}
}
export function installStorage(){vi.stubGlobal('Storage',TestStorage);vi.stubGlobal('localStorage',new TestStorage());}
