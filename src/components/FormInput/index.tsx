import { Button, TextField } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import useDebounce from '../../util/hooks/useDebounce';
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

  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLElement>
  ) => {
    event.preventDefault();

    if (!onSubmit || typeof onSubmit !== 'function') return;

    const inputRefValue = inputRef.current?.value;
    if (!inputRefValue) return;

    inputRef.current.focus();

    setInputValue('');

    onSubmit(inputRefValue);
  };

  const handleChange = (evt: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
    <form className='form-input' onSubmit={handleSubmit}>
      <TextField
        fullWidth
        inputRef={inputRef}
        onChange={handleChange}
        value={inputValue}
        label={title}
      />
      <Button variant='outlined' onClick={handleSubmit}>
        {title}
      </Button>
    </form>
  );
};

export default FormInput;
