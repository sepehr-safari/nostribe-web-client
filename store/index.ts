import { create } from 'zustand';

import createPoolSlice, { PoolSlice } from './PoolSlice';
import createUserSlice, { UserSlice } from './UserSlice';
import createFeedSlice, { FeedSlice } from './FeedSlice';

const useStore = create<PoolSlice & UserSlice & FeedSlice>()((...a) => ({
  ...createPoolSlice(...a),
  ...createUserSlice(...a),
  ...createFeedSlice(...a),
}));

export default useStore;
