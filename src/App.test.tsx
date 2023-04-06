import {fireEvent, render, screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import App from './App';
import { renderWithProviders } from './utils/test-utils';

test('Drawer toggler functionality', () => {
  renderWithProviders(<App />)

  const drawerToggler = screen.getByRole('drawerToggler')
  const drawerText = screen.getByText(new RegExp('Filter Results'))
  expect(drawerText).not.toBeVisible()
  expect(drawerToggler).toBeInTheDocument();
  fireEvent.click(drawerToggler)
  expect(drawerText).toBeVisible()
})
