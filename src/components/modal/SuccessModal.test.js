import { render, screen } from '@testing-library/react';
import SuccessModal from './SuccessModal';
import userEvent from '@testing-library/user-event';

const handleHide = jest.fn();

// setup a DOM element as a render target

const container = document.createElement('div');
document.body.appendChild(container);

test('test render success modal to have required note and function', () => {    
    render(<SuccessModal show={true} onHide={handleHide}/>, container);
    
    expect(screen.getByText(/All done!/i)).toBeInTheDocument();
    expect(screen.getByText(/first to experience/i)).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveTextContent("OK");

    // If button was hit then modal should be closed.

    const btn = screen.getByRole("button");
    expect(btn).not.toBeDisabled();
    userEvent.click(btn);

    // Expect modal to be closed.

    expect(handleHide).toHaveBeenCalledTimes(1);
});

// Clear the DOM.

afterEach(() => {
    var node = global.document.body;
    while (node.firstChild) {
      node.removeChild(node.firstChild);
    }
}); 
