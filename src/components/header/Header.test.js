import { render, screen } from '@testing-library/react';
import Header from './Header'

test('test render header to have required note', () => {
  render(<Header title="Broccoli & Co." />);

  expect(screen.getByText("Broccoli & Co.")).toBeInTheDocument();
});
