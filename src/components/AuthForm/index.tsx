import { useState } from 'react';
import { Form, Formik, FormikHelpers, Field } from 'formik';
import { useStore } from '../../stores';
import { FormOptions } from '../../types/enums';
import './AuthForm.css';

const AuthForm = () => {
  const [modalState, setModalState] = useState<ModalState>({
    open: false,
    currentOption: FormOptions.LogIn,
  });

  const userStore = useStore('userStore');

  const handleFormOptionChange = (newOption: FormOptions) => {
    setModalState(state => ({ ...state, currentOption: newOption }));
  };

  const handleAuthenticateClick = () => {
    setModalState(state => ({ ...state, open: !state.open }));
  };

  const handleSubmit = async (
    { name, email, password }: UserData,
    { setSubmitting }: FormikHelpers<UserData>
  ) => {
    setSubmitting(false);

    if (modalState.currentOption === FormOptions.LogIn) {
      if (!email || !password) return;

      userStore.logIn(email, password);
    } else {
      if (!name || !email || !password) return;

      const result = await userStore.register(name, email, password);

      if (result.success) {
        userStore.logIn(email, password);
      }

      setModalState(state => ({
        ...state,
        open: false,
      }));
    }
  };

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
          <Formik
            onSubmit={handleSubmit}
            initialValues={{ name: '', email: '', password: '' }}
          >
            <Form className='form'>
              {modalState.currentOption === FormOptions.Register && (
                <>
                  <label htmlFor='name'>User: </label>
                  <Field id='user' name='name' placeholder='User name' />
                </>
              )}

              <>
                <label htmlFor='email'>Email: </label>
                <Field id='email' name='email' placeholder='Email adress' type='email' />
              </>

              <>
                <label htmlFor='password'>Password: </label>
                <Field
                  id='password'
                  name='password'
                  placeholder='Password'
                  type='password'
                />
              </>

              <button type='submit'>
                {modalState.currentOption === FormOptions.LogIn ? 'Log-In' : 'Register'}
              </button>
            </Form>
          </Formik>
        </div>
      )}
    </>
  );
};

export default AuthForm;
