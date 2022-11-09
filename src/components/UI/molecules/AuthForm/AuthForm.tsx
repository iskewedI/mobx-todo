import { Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import { FormikHelpers, useFormik } from 'formik';
import * as yup from 'yup';
import { FormType } from '../../../../types/enums';
import { useStore } from '../../../../startup/getStores';
import './AuthForm.css';

const validationSchema = yup.object({
  name: yup
    .string()
    .min(4, 'User name should be of minimum 4 characters length')
    .required('User name is required')
    .default('Enter your user name'),
  email: yup
    .string()
    .email('Enter a valid email')
    .required('Email is required')
    .default('Enter your email'),
  password: yup
    .string()
    .min(4, 'Password should be of minimum 8 characters length')
    .required('Password is required')
    .default('Enter your password'),
});

const AuthForm = ({ type, emailInputRef }: AuthFormProps) => {
  const handleSubmit = async (
    { name, email, password }: UserData,
    { setSubmitting }: FormikHelpers<UserData>
  ) => {
    setSubmitting(false);

    if (type === FormType.LogIn) {
      if (!email || !password) return;

      userStore.logIn(email, password);
    } else {
      if (!name || !email || !password) return;

      const result = await userStore.register(name, email, password);

      if (result.success) {
        userStore.logIn(email, password);
      }
    }
  };
  const userStore = useStore('userStore');

  const formik = useFormik({
    initialValues: { name: '', email: '', password: '' },
    onSubmit: handleSubmit,
    validationSchema,
  });

  const { values } = formik;

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className='form__inputs'>
        {type === FormType.Register && (
          <TextField
            onChange={formik.handleChange}
            fullWidth
            id='name'
            name='name'
            label='User name'
            value={values.name}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
            autoFocus={type === FormType.Register}
          />
        )}
        <TextField
          onChange={formik.handleChange}
          fullWidth
          id='email'
          type='email'
          name='email'
          label='Email'
          value={values.email}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
          autoFocus={type === FormType.LogIn}
          inputRef={emailInputRef}
        />

        <TextField
          onChange={formik.handleChange}
          fullWidth
          id='password'
          type='password'
          name='password'
          label='Password'
          value={values.password}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />
      </div>

      <Button variant='contained' color='success' size='large' type='submit'>
        {type === FormType.LogIn ? 'Log-In' : 'Register'}
      </Button>
    </form>
  );
};

export default AuthForm;
