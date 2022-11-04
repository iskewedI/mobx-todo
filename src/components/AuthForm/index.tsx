import { useState, createRef } from 'react';
import { FormType } from '../../types/enums';
import './AuthForm.css';
import Form from './Form';

const AuthForm = () => {
  const [modalState, setModalState] = useState<ModalState>({
    open: false,
    currentFormType: FormType.LogIn,
  });

  const emailInputRef = createRef<HTMLDivElement>();

  const handleAuthenticateClick = () => {
    setModalState(state => ({ ...state, open: !state.open }));
  };

  const handleFormOptionChange = (newType: FormType) => {
    setModalState(state => ({ ...state, currentFormType: newType }));

    if (newType === FormType.LogIn) {
      emailInputRef.current?.focus();
    }
  };

  return (
    <>
      <button onClick={handleAuthenticateClick}>Authenticate</button>
      {modalState.open && (
        <div
          style={{ position: 'absolute', background: 'white', border: '1px solid black' }}
        >
          <div className='form-header'>
            <button onClick={() => handleFormOptionChange(FormType.LogIn)}>Log-In</button>
            <button onClick={() => handleFormOptionChange(FormType.Register)}>
              Register
            </button>
          </div>
          <Form type={modalState.currentFormType} emailInputRef={emailInputRef} />
        </div>
      )}
    </>
  );
};

export default AuthForm;
