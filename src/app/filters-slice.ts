import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface FiltersState {
    startDate: string | null;
    endDate: string | null;
    searchFilter: string;
}

export const initialFiltersState: FiltersState = {
    startDate: null,
    endDate:  null,
    searchFilter: '',
}

const filtersSlice = createSlice({
    name: "filters",
    initialState: initialFiltersState,
    reducers: {
        filterStartDate(state: FiltersState, action: PayloadAction<string | null>) {
            state.startDate = action.payload
        },
        filterEndDate(state: FiltersState, action: PayloadAction<string | null>) {
            state.endDate = action.payload
        },
        filterSearch(state: FiltersState, action: PayloadAction<string>) {
            state.searchFilter = action.payload
        },
        clearAllFilters: (state: FiltersState) => {
            return {
                startDate: null,
                endDate:  null,
                searchFilter: '',
            }
        },
    }
})


export const {filterStartDate, filterEndDate, filterSearch, clearAllFilters} = filtersSlice.actions
export default filtersSlice.reducer