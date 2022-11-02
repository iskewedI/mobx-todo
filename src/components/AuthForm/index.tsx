import { FormEvent, useState } from 'react';
import { useStore } from '../../stores';
import './AuthForm.css';

enum FormOptions {
  LogIn = 1,
  Register,
}

type ModalState = {
  open: Boolean;
  currentOption: FormOptions;
};

type UserData = {
  name?: string;
  email?: string;
  password?: string;
};

const AuthForm = () => {
  const [modalState, setModalState] = useState<ModalState>({
    open: false,
    currentOption: FormOptions.LogIn,
  });
  const [currentValues, setCurrentValues] = useState<UserData>({
    name: '',
    email: '',
    password: '',
  });

  const userStore = useStore('userStore');

  const handleFormOptionChange = (newOption: FormOptions) => {
    setModalState(state => ({ ...state, currentOption: newOption }));
  };

  const handleAuthenticateClick = () => {
    setModalState(state => ({ ...state, open: !state.open }));
  };

  const handleAuth = async () => {
    const { name, email, password } = currentValues;

    if (modalState.currentOption === FormOptions.LogIn) {
      if (!email || !password) return;

      userStore.logIn(email, password);
    } else {
      if (!name || !email || !password) return;

      await userStore.register(name, email, password);

      setCurrentValues(values => ({ ...values, name: '' }));

      setModalState(state => ({
        ...state,
        open: true,
        currentOption: FormOptions.LogIn,
      }));
    }
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    handleAuth();
  };

  const handleChange = (value: string, field: string) => {
    setCurrentValues(state => ({ ...state, [field]: value }));
  };

  const { name, email, password } = currentValues;

  return (
    <>
      <button onClick={handleAuthenticateClick}>Authenticate</button>
      {modalState.open && (
        <div>
          <div className='form-header'>
            <button onClick={() => handleFormOptionChange(FormOptions.LogIn)}>
              Log-In
            </button>
            <button onClick={() => handleFormOptionChange(FormOptions.Register)}>
              Register
            </button>
          </div>
          <form className='form' onSubmit={handleSubmit}>
            {modalState.currentOption === FormOptions.Register && (
              <>
                <label>User</label>
                <input
                  autoFocus={true}
                  placeholder='Write your user name...'
                  value={name}
                  onChange={evt => handleChange(evt.currentTarget.value, 'name')}
                />
              </>
            )}
            <>
              <label>Email</label>
              <input
                autoFocus={modalState.currentOption === FormOptions.LogIn}
                placeholder='Write your email...'
                value={email}
                onChange={evt => handleChange(evt.currentTarget.value, 'email')}
              />
            </>
            <>
              <label>Password</label>
              <input
                placeholder='Password here...'
                value={password}
                type='password'
                onChange={evt => handleChange(evt.currentTarget.value, 'password')}
              />
            </>
            <button onClick={handleAuth} type='submit'>
              {modalState.currentOption === FormOptions.LogIn ? 'Log-In' : 'Register'}{' '}
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default AuthForm;
