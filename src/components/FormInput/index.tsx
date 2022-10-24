import { useEffect, useRef, useState } from 'react';
import useDebounce from '../../hooks/useDebounce';
import './FormInput.css';

interface Props {
  title: string;
  debounce?: boolean;
  debounceMs?: number;
  onSubmit?: (value: string) => void;
  onChange?: (value: string | undefined) => void;
}

const FormInput = ({
  title,
  debounce = false,
  debounceMs = 300,
  onSubmit,
  onChange,
}: Props) => {
  const [inputValue, setInputValue] = useState('');

  const inputRef = useRef<HTMLInputElement>(null);
  const debouncedValue = useDebounce(inputValue, debounceMs);

  const handleAdd = (
    event: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLElement>
  ) => {
    event.preventDefault();

    if (!onSubmit || typeof onSubmit !== 'function') return;

    const inputValue = inputRef.current?.value;
    if (!inputValue) return;

    inputRef.current.focus();

    setInputValue('');

    onSubmit(inputValue);
  };

  const handleChange = (evt: React.FormEvent<HTMLInputElement>) => {
    setInputValue(evt.currentTarget.value);

    if (!onChange || typeof onChange !== 'function') return;

    if (!debounce) onChange(inputValue);
  };

  useEffect(() => {
    const callOnChange = () => {
      if (!onChange || typeof onChange !== 'function') return;

      onChange(debouncedValue);
    };

    callOnChange();
  }, [debouncedValue]);
  return (
    <form className='form-input' onSubmit={handleAdd}>
      <input ref={inputRef} onChange={handleChange} value={inputValue} />
      <button onClick={handleAdd}>{title}</button>
    </form>
  );
};

export default FormInput;
