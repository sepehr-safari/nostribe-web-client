import { create } from 'zustand';

import createPoolSlice, { PoolSlice } from './PoolSlice';
import createAuthSlice, { AuthSlice } from './AuthSlice';

const useStore = create<PoolSlice & AuthSlice>()((...a) => ({
  ...createPoolSlice(...a),
  ...createAuthSlice(...a),
}));

export default useStore;
