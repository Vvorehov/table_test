import { createSlice, PayloadAction } from "@reduxjs/toolkit"

type SidebarState = boolean;

export const initialSidebarState: SidebarState = false

const sidebarSlice = createSlice({
    name: "sidebar",
    initialState: initialSidebarState,
    reducers: {
        openSidebar: (state: boolean, action: PayloadAction<boolean>) => {
            return action.payload
        },
    }
})


export const {openSidebar} = sidebarSlice.actions
export default sidebarSlice.reducer