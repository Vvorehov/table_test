import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Campaign, campaignsData } from "../api/data"
import { formatCampaignList } from "../helpers/helpers"

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
            state.campaignsList = state.campaignsList.concat(formatCampaignList(action.payload) as Campaign[])
        },
    }
})

export const {addCampaigns} = campaignsSlice.actions
export default campaignsSlice.reducer