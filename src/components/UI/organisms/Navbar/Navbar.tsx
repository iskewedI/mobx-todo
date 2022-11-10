import { AppBar, Avatar, Box, Button, Toolbar, Tooltip, Typography } from '@mui/material';
import { Container } from '@mui/system';
import { observer } from 'mobx-react-lite';
import styled from 'styled-components';
import { LogOut } from '../../../../server/UserApi';
import { useStore } from '../../../../startup/getStores';
import { stringToColor } from '../../../../util/math/calcs';
import UserPoints from '../../atoms/UserPoints/UserPoints';
import AuthForm from '../AuthModal/AuthModal';

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
              flexGrow: 1,
            }}
          >
            TODO LIST
          </Typography>
          <Box sx={{ flexGrow: 0 }}>
            {(!User.authenticated && <AuthForm />) ||
              (User.name && (
                <UserOptions>
                  <UserPoints />
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
