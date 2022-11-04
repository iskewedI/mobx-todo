import { Button, Modal, Tooltip } from '@mui/material';
import { Box } from '@mui/system';
import { useState, createRef } from 'react';
import { FormType } from '../../types/enums';
import './AuthForm.css';
import Form from './Form';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'white',
  border: '2px solid #000',
  boxShadow: '0 0 6px 0px #5481e9',
  p: 4,
};

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

  const { currentFormType, open } = modalState;
  const { LogIn, Register } = FormType;

  return (
    <>
      <Box bgcolor='white'>
        <Tooltip title='Log In and Register'>
          <Button variant='text' onClick={handleAuthenticateClick}>
            Authenticate
          </Button>
        </Tooltip>
      </Box>

      <Modal open={open} onClose={handleAuthenticateClick}>
        <Box sx={style}>
          <div className='form-header'>
            <Button
              variant={`${currentFormType === LogIn ? 'contained' : 'outlined'}`}
              color='primary'
              size='medium'
              onClick={() => handleFormOptionChange(LogIn)}
            >
              Log-In
            </Button>
            <Button
              variant={`${currentFormType === Register ? 'contained' : 'outlined'}`}
              color='secondary'
              size='medium'
              onClick={() => handleFormOptionChange(Register)}
            >
              Register
            </Button>
          </div>
          <Form type={currentFormType} emailInputRef={emailInputRef} />
        </Box>
      </Modal>
    </>
  );
};

export default AuthForm;
