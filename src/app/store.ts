import { configureStore } from '@reduxjs/toolkit';
import filtersReducer from './filters-slice';
import campaignsReducer, { addCampaigns } from './campaign-slice';
import { Campaign } from '../api/data';
import sidebarSlice from './sidebar-slice';
declare global {
  interface Window { AddCampaigns: (campaigns: Campaign[]) => void; }
}

export const store = configureStore({
  reducer: {
    filters: filtersReducer,
    campaigns: campaignsReducer,
    sidebar: sidebarSlice,
  },
});

export const AddCampaigns = (campaigns: Campaign[]) => store.dispatch(addCampaigns(campaigns))

window.AddCampaigns = AddCampaigns

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>