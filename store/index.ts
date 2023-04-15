import { create } from 'zustand';

import createPoolSlice, { PoolSlice } from './PoolSlice';
import createAuthSlice, { AuthSlice } from './AuthSlice';
import createFeedSlice, { FeedSlice } from './FeedSlice';

const useStore = create<PoolSlice & AuthSlice & FeedSlice>()((...a) => ({
  ...createPoolSlice(...a),
  ...createAuthSlice(...a),
  ...createFeedSlice(...a),
}));

export default useStore;
