import React, { PropsWithChildren } from 'react'
import { render } from '@testing-library/react'
import type { RenderOptions } from '@testing-library/react'
import { configureStore } from '@reduxjs/toolkit'
import type { PreloadedState } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'

// As a basic setup, import your same slice reducers
import filtersSlice, { initialFiltersState } from '../app/filters-slice'
import { store, RootState, AddCampaigns } from '../app/store'
import campaignSlice, { initialCampaignState } from '../app/campaign-slice'
import sidebarSlice, { initialSidebarState } from '../app/sidebar-slice'

// This type interface extends the default options for render from RTL, as well
// as allows the user to specify other things such as initialState, store.
interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: PreloadedState<RootState>
  store?: typeof store
}

export function renderWithProviders(
  ui: React.ReactElement,
  {
    preloadedState = {filters: initialFiltersState, sidebar: initialSidebarState, campaigns: initialCampaignState},
    // Automatically create a store instance if no store was passed in
    store = configureStore({ reducer: { filters: filtersSlice, campaigns: campaignSlice, sidebar: sidebarSlice }, preloadedState }),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) {
  window.AddCampaigns = AddCampaigns
  function Wrapper({ children }: PropsWithChildren<{}>): JSX.Element {
    return <Provider store={store}>{children}</Provider>
  }

  // Return an object with the store and all of RTL's query functions
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) }
}