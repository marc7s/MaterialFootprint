import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { act } from 'react-dom/test-utils';

test('renders footer', async () => {
  await act(async () => {
    render(<App />);
  });
  const footer = await screen.findByText(/Source code/i);
  expect(footer).toBeInTheDocument();
});
