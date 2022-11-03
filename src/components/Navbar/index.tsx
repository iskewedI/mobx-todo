import { AppBar, Toolbar, Typography } from '@mui/material';
import styled from 'styled-components';
import AuthForm from '../AuthForm';

const Auth = styled.div`
    position: relative,
    width: 100%,
    marginLeft: 0,
`;

const Navbar = () => {
  return (
    <AppBar position='static'>
      <Toolbar variant='dense'>
        <Typography
          variant='h6'
          noWrap
          component='a'
          href='/'
          sx={{
            mr: 2,
            display: { xs: 'none', md: 'flex' },
            fontFamily: 'monospace',
            fontWeight: 700,
            letterSpacing: '.3rem',
            color: 'inherit',
            textDecoration: 'none',
          }}
        >
          TODO
        </Typography>
        <Typography
          variant='h6'
          noWrap
          component='div'
          sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
        >
          Home
        </Typography>
        <Auth>
          <AuthForm />
        </Auth>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
