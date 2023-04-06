import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Campaign, campaignsData } from "../api/data"

interface CampaignsState {
    campaignsList: Campaign[]
}

export const initialCampaignState: CampaignsState = {
    campaignsList: campaignsData
}

const campaignsSlice = createSlice({
    name: "campaigns",
    initialState: initialCampaignState,
    reducers: {
        addCampaigns(state: CampaignsState, action: PayloadAction<Campaign[]>) {
            state.campaignsList = state.campaignsList.concat(action.payload)
        },
    }
})

export const {addCampaigns} = campaignsSlice.actions
export default campaignsSlice.reducer