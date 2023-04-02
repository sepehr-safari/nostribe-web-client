import { create } from 'zustand';

import createPoolSlice, { PoolSlice } from './PoolSlice';
import createProfileSlice, { ProfileSlice } from './ProfileSlice';
import createUserSlice, { UserSlice } from './UserSlice';
import createFeedSlice, { FeedSlice } from './FeedSlice';

const useStore = create<PoolSlice & UserSlice & FeedSlice & ProfileSlice>()(
  (...a) => ({
    ...createPoolSlice(...a),
    ...createUserSlice(...a),
    ...createFeedSlice(...a),
    ...createProfileSlice(...a),
  })
);

export default useStore;
