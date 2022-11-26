import { render, screen } from '@testing-library/react';
import Footer from './Footer'

test('test render footer to have required note', () => {
  render(<Footer note="Made in Melbourne" />);

  expect(screen.getByText("Made in Melbourne")).toBeInTheDocument();
});
