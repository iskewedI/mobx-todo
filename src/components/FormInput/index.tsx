import { useRef } from 'react';
import './FormInput.css';

interface Props {
  title: string;
  onSubmit: (value: string) => void;
}

const FormInput = ({ title, onSubmit }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleAdd = (
    event: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLElement>
  ) => {
    event.preventDefault();

    const inputValue = inputRef.current?.value;
    if (!inputValue) return;

    inputRef.current.value = '';
    inputRef.current.focus();

    onSubmit(inputValue);
  };

  return (
    <form className='form-input' onSubmit={handleAdd}>
      <input ref={inputRef} />
      <button onClick={handleAdd}>{title}</button>
    </form>
  );
};

export default FormInput;
