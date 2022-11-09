type FormInputProps = {
  title: string;
  debounce?: boolean;
  debounceMs?: number;
  inputAutofocus?: boolean;
  onSubmit?: (value: string) => void;
  onChange?: (value: string | undefined) => void;
};

type ExpandInputProps = {
  onSubmit: (value: string) => void;
};

type AuthFormProps = {
  type: FormType;
  emailInputRef: RefObject<HTMLDivElement>;
};
