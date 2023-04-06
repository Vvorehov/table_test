import { screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import CampaignList from "./CampaignList";
import { campaignsData } from '../api/data';
import { renderWithProviders } from '../utils/test-utils';

test('render campaigns list', async () => {
    renderWithProviders(<CampaignList />)

    const campaign = screen.getByText(new RegExp(campaignsData[0].name))
    expect(campaign).toBeInTheDocument();
})

test('Set new campaign list functionality', async () => {
    renderWithProviders(<CampaignList />)
    window.AddCampaigns([{"id":1111111,"name":"Test","startDate":"9/19/2017","endDate":"3/9/2018","budget":100000},])
    jest.useFakeTimers()
    setTimeout(
        () => {
            const campaignTest = screen.getByText(new RegExp('Test'))
            expect(campaignTest).toBeInTheDocument();
        }, 0
    )
})


