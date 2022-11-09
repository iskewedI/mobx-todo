/*  States  */
type ModalState = {
  open: boolean;
  currentFormType: FormType;
};

/*  Props  */
type ToDoProps = {
  id: string;
  description: string;
  isCompleted: boolean;
  index: number;
};
