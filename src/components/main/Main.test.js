import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Main from './Main'

test('test render main to have required note and button', () => {
    render(<Main title="A better way to enjoy every day"
        content="Be the first to know when we launch"
        buttonTitle="Request an invite" />);

    expect(screen.getByRole("heading")).toHaveTextContent(/A better way to enjoy every day/);
    expect(screen.getByText("Be the first to know when we launch")).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveTextContent("Request an invite");
});

const mockRegisterForm = jest.fn();
jest.mock("../modal/RegisterForm", () => (props) => {
  mockRegisterForm(props);
  return <mock-registerForm />;
});

test('test invite button to make sure register form appear', () => {
    render(<Main title="A better way to enjoy every day"
        content="Be the first to know when we launch"
        buttonTitle="Request an invite" />);

    const inviteBtn = screen.getByRole("button");
    expect(inviteBtn).not.toBeDisabled();
    userEvent.click(inviteBtn);

    // expect register form appear.

    expect(mockRegisterForm).toHaveBeenCalledWith(
        expect.objectContaining({
          show: true,
        })
    );
})
