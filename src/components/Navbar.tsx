import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import React, { useContext } from 'react';
import { rocallaLogo } from '../const/globalConsts';
import { AuthContext } from '../contexts/auth/AuthContext';
import { useNavigate } from 'react-router-dom';

const pages = [
  // { title: 'Leaderboard', path: 'leaderboard' },
  { title: 'Recibidores', path: 'receivers' },
  { title: 'Eventos', path: 'events' },
  { title: 'Pistas', path: 'tracks' },
];

function Navbar() {
  const navigate = useNavigate();
  const { loading, user, logout } = useContext(AuthContext);

  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box flexGrow={1} display={{ xs: 'none', md: 'flex' }}>
            <Box component="img" src={rocallaLogo} width={150} />
          </Box>
          <Box display={{ xs: 'flex', md: 'none' }}>
            <IconButton onClick={handleOpenNavMenu}>
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'flex', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page.title} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page.title}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Box flexGrow={1} display={{ xs: 'flex', md: 'none' }}>
            <Box component="img" src={rocallaLogo} width={150} />
          </Box>
          <Box
            flexGrow={1}
            display={{ xs: 'none', md: 'flex' }}
            justifyContent="flex-end"
            px={1}
          >
            {pages.map((page) => (
              <Button
                key={page.title}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: '#1E1E1E', display: 'block' }}
              >
                {page.title}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Mi perfil">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar>
                  {loading
                    ? '...'
                    : user?.displayName
                    ? user.displayName.slice(0, 2).toUpperCase()
                    : user?.email.slice(0, 2).toUpperCase()}
                </Avatar>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem key={'my-account'} onClick={() => navigate('/account')}>
                <Typography textAlign="center">Mi perfil</Typography>
              </MenuItem>
              <MenuItem
                key={'sign-out'}
                onClick={() => {
                  logout();
                  navigate('/');
                }}
              >
                <Typography textAlign="center">Cerrar sesión</Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;
