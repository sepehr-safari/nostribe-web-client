import Fuse from 'fuse.js';
import { throttle } from 'lodash';

// import localState from './LocalState';

type SearchResult = {
  name: string;
  display_name: string;
  key: string;
};

const options = {
  keys: ['name', 'display_name'],
  includeScore: true,
  includeMatches: true,
  threshold: 0.3,
};

const notifyUpdate = throttle(() => {
  //  localState.get('searchIndexUpdated').put(true);
}, 2000);

const FuzzySearch = {
  index: new Fuse<SearchResult>([], options),
  keys: new Set<string>(),
  add(doc: SearchResult) {
    if (this.keys.has(doc.key)) {
      return;
    }
    this.keys.add(doc.key);
    this.index.add(doc);
    notifyUpdate();
  },
  remove(key: string) {
    this.keys.delete(key);
    this.index.remove((doc: SearchResult) => doc.key === key);
    notifyUpdate();
  },
  search(query: string) {
    return this.index.search(query);
  },
};

export default FuzzySearch;
