import { AppBar, Avatar, Box, Button, Toolbar, Tooltip, Typography } from '@mui/material';
import { Container } from '@mui/system';
import { observer } from 'mobx-react-lite';
import styled from 'styled-components';
import { LogOut } from '../../server/UserApi';
import { useStore } from '../../startup/getStores';
import { stringToColor } from '../../util/math/calcs';
import AuthForm from '../AuthForm';

const UserOptions = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: nowrap;
  gap: 1rem;
`;

const Navbar = () => {
  const userStore = useStore('userStore');

  const handleLogOut = async () => {
    const result = await LogOut();

    if (result && result.success) {
      window.location.reload();
    }
  };

  const { User } = userStore;

  return (
    <AppBar position='static'>
      <Container>
        <Toolbar variant='dense'>
          <Typography
            variant='h5'
            noWrap
            component='a'
            href='/'
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontWeight: 400,
              letterSpacing: '.2rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            TODO LIST
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex' } }}>
            <Typography
              variant='h6'
              noWrap
              component='a'
              href=''
              sx={{
                flexGrow: 1,
                textDecoration: 'none',
                color: 'inherit',
                marginLeft: 3,
              }}
            >
              Home
            </Typography>
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            {(!User.authenticated && <AuthForm />) ||
              (User.name && (
                <UserOptions>
                  <Tooltip title={`Logged in as ${User.name}`}>
                    <Avatar
                      sx={{ bgcolor: stringToColor(User.name.toLocaleUpperCase()) }}
                    >
                      {User.name[0].toLocaleUpperCase()}
                    </Avatar>
                  </Tooltip>
                  <Box bgcolor='white'>
                    <Button onClick={handleLogOut}>Log out</Button>
                  </Box>
                </UserOptions>
              ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default observer(Navbar);
