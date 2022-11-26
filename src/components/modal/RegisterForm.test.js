import { render, screen, waitFor } from '@testing-library/react';
import RegisterForm from './RegisterForm';
import userEvent from '@testing-library/user-event';

const mockFunction = jest.fn();

// setup a DOM element as a render target

const container = document.createElement('div');
document.body.appendChild(container);

test('test render registerm form to have required text and button', () => {    
    render(<RegisterForm show={true} onHide={mockFunction} 
    showSuccessModal={mockFunction} />, container);
    
    expect(screen.getByText(/Request an invite/i)).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveTextContent("Send");
});

test('test required fields if we leave 1 or 3 fields blank', async  () => {
    render(<RegisterForm show={true} onHide={mockFunction} 
        showSuccessModal={mockFunction} />, container);

    // If we don't enter anything and hit send, error message should be displayed.

    const btn = screen.getByRole("button");
    expect(btn).not.toBeDisabled();
    userEvent.click(btn);
    
    await waitFor(() => {
        expect(screen.getByText(/Full name is required/i)).toBeInTheDocument()
        expect(screen.getByText(/Email is required/i)).toBeInTheDocument()
    })
});

test('test full name should have at least 3 characters', async  () => {
    render(<RegisterForm show={true} onHide={mockFunction} 
        showSuccessModal={mockFunction} />, container);

    const nameInput = screen.getByPlaceholderText(/Full name/i);
    userEvent.type(nameInput, 'An');

    const btn = screen.getByRole("button");
    expect(btn).not.toBeDisabled();
    userEvent.click(btn);
    
    await waitFor(() => {
        expect(screen.getByText(/at least 3 characters long/i)).toBeInTheDocument()
    })
});

test('test email should be in a valid email format', async  () => {
    render(<RegisterForm show={true} onHide={mockFunction} 
        showSuccessModal={mockFunction} />, container);

    const emailInput = screen.getByPlaceholderText("Email");
    userEvent.type(emailInput, 'A@gmail');

    const btn = screen.getByRole("button");
    expect(btn).not.toBeDisabled();
    userEvent.click(btn);
    
    await waitFor(() => {
        expect(screen.getByText(/Invalid email format/i)).toBeInTheDocument()
    })
});

test('test confirm email should be the same as email', async  () => {
    render(<RegisterForm show={true} onHide={mockFunction} 
        showSuccessModal={mockFunction} />, container);
    
    const emailInput = screen.getByPlaceholderText("Email");
    userEvent.type(emailInput, 'A@gmail.com');
    const confirmInput = screen.getByPlaceholderText("Confirm email");
    userEvent.type(confirmInput, 'An');

    const btn = screen.getByRole("button");
    expect(btn).not.toBeDisabled();
    userEvent.click(btn);
    
    await waitFor(() => {
        expect(screen.getByText(/does not match/i)).toBeInTheDocument()
    })
});

test('test submit form successfully', async  () => {
    render(<RegisterForm show={true} onHide={mockFunction} 
        showSuccessModal={mockFunction} />, container);
    
    const nameInput = screen.getByPlaceholderText(/Full name/i);
    userEvent.type(nameInput, 'Duc');
    const emailInput = screen.getByPlaceholderText("Email");
    userEvent.type(emailInput, 'Duc@gmail.com');
    const confirmInput = screen.getByPlaceholderText("Confirm email");
    userEvent.type(confirmInput, 'Duc@gmail.com');

    const btn = screen.getByRole("button");
    expect(btn).not.toBeDisabled();
    userEvent.click(btn);
    
    await waitFor(() => {       
        // Success Modal triggered and current form closes.

        expect(mockFunction).toHaveBeenCalledTimes(2);
    })
});

test('test case with email usedemail@blinq.app', async  () => {
    render(<RegisterForm show={true} onHide={mockFunction} 
        showSuccessModal={mockFunction} />, container);
    
    const nameInput = screen.getByPlaceholderText(/Full name/i);
    userEvent.type(nameInput, 'Duc');
    const emailInput = screen.getByPlaceholderText("Email");
    userEvent.type(emailInput, 'usedemail@blinq.app');
    const confirmInput = screen.getByPlaceholderText("Confirm email");
    userEvent.type(confirmInput, 'usedemail@blinq.app');

    const btn = screen.getByRole("button");
    expect(btn).not.toBeDisabled();
    userEvent.click(btn);
    
    await waitFor(() => {       
        // Return 400 error with specified message.

        expect(screen.getByText(/ is already in use/i)).toBeInTheDocument()
    })
});

// Clear the DOM.

afterEach(() => {
    var node = global.document.body;
    while (node.firstChild) {
      node.removeChild(node.firstChild);
    }
}); 
