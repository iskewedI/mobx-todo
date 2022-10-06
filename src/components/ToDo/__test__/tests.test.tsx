import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ToDo from '../index';
import { randomUUID } from 'crypto';
import '@testing-library/jest-dom';

const BUTTON_STATUS = {
  checked: '☑',
  notChecked: '☐',
};

it('should render the component without any unexpected error', async () => {
  // HTML Setup
  const data: ToDoModel = {
    id: randomUUID(),
    description: 'Test todo',
    isCompleted: false,
    place: 1,
  };

  render(<ToDo {...data} />);

  const completedButton = screen.getAllByRole('button')[0];

  // Acts
  expect(completedButton).toHaveTextContent(BUTTON_STATUS.notChecked);
  expect(screen.queryByText(data.description)).toHaveTextContent(data.description);
});

it("should call the button methods if they're pressed", async () => {
  // HTML Setup
  const data: ToDoModel = {
    id: randomUUID(),
    description: 'Test todo',
    isCompleted: false,
    place: 1,
  };

  let calledCheckClick = false;
  let calledDescriptionChange = false;
  let calledDelete = false;

  render(
    <ToDo
      {...data}
      onCheckClick={() => {
        calledCheckClick = true;
      }}
      onDescriptionChange={() => {
        calledDescriptionChange = true;
      }}
      onDelete={() => {
        calledDelete = true;
      }}
    />
  );

  const descriptionElement = screen.getByText(data.description);
  const completedButton = screen.getAllByRole('button')[0];
  const deleteButton = screen.getAllByRole('button')[1];

  userEvent.click(completedButton);
  userEvent.click(deleteButton);

  userEvent.dblClick(descriptionElement);

  const formElement = screen.getByDisplayValue(data.description).parentElement;
  if (!formElement) throw new Error("Couldn't find form  element");

  fireEvent.change(screen.getByDisplayValue(data.description), {
    target: { value: 'New value' },
  });
  fireEvent.submit(formElement);

  expect(calledCheckClick).toBe(true);
  expect(calledDelete).toBe(true);
  expect(calledDescriptionChange).toBe(true);
});
