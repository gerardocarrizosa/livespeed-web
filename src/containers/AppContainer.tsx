import { useContext, useEffect, useState } from 'react';
import {
  AppBar,
  Avatar,
  Box,
  Button,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Toolbar,
  Tooltip,
} from '@mui/material';
import { Outlet, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/auth/AuthContext';
import { liveSpeedLogo } from '../const/assetsConsts';
import EventIcon from '@mui/icons-material/Event';
import SensorsIcon from '@mui/icons-material/Sensors';
import TerrainIcon from '@mui/icons-material/Terrain';
import HomeIcon from '@mui/icons-material/Home';
import StyleIcon from '@mui/icons-material/Style';
import MenuIcon from '@mui/icons-material/Menu';
import { drawerWidth } from '../const/globalConsts';

const AppContainer = () => {
  const navigate = useNavigate();
  const { loading, user, logout } = useContext(AuthContext);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const [currentPath, setCurrentPath] = useState('');

  useEffect(() => {
    setCurrentPath(window.location.pathname);
  }, [navigate]);

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const drawerList = [
    {
      text: 'Overview',
      path: 'home',
      icon: <HomeIcon />,
    },
    {
      text: 'Events',
      path: 'events',
      icon: <EventIcon />,
    },
    {
      text: 'Receivers',
      path: 'receivers',
      icon: <SensorsIcon />,
    },
    {
      text: 'Tags',
      path: 'tags',
      icon: <StyleIcon />,
    },
    {
      text: 'Parks & Tracks',
      path: 'parks',
      icon: <TerrainIcon />,
    },
  ];

  const drawer = (
    <Stack bgcolor="#3B4978" flex={1}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'center' }}>
        <Box component="img" src={liveSpeedLogo} width={150} />
      </Toolbar>
      <Divider />
      <List sx={{ p: 1 }}>
        {drawerList.map((element) => (
          <ListItem key={element.text} disablePadding sx={{ mb: 0.5 }}>
            <ListItemButton
              onClick={() => navigate(element.path)}
              sx={{ borderRadius: 4, color: '#BBBBBB' }}
              selected={currentPath == `/${element.path}`}
            >
              <ListItemIcon sx={{ color: '#BBBBBB' }}>
                {element.icon}
              </ListItemIcon>
              <ListItemText primary={element.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Box flex={1} />
      <Divider />
      <Button
        onClick={async () => {
          logout().then(() => {
            navigate('/');
          });
        }}
      >
        Cerrar sesión
      </Button>
    </Stack>
  );

  return (
    <Box bgcolor="#EEEEEE" sx={{ display: 'flex', height: '100vh' }}>
      <CssBaseline />
      <AppBar
        color="transparent"
        position="fixed"
        sx={{
          boxShadow: 0,
          width: { md: `calc(100% - ${drawerWidth}px)` },
          ml: { md: `${drawerWidth}px` },
        }}
      >
        <Toolbar sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Tooltip title="Mi perfil">
            <IconButton sx={{ p: 0 }} onClick={() => navigate('account')}>
              <Avatar>
                {loading
                  ? '...'
                  : user?.firstName
                  ? user.firstName.slice(0, 2).toUpperCase()
                  : user?.email.slice(0, 2).toUpperCase()}
              </Avatar>
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{
          width: { md: drawerWidth },
          flexShrink: { md: 0 },
        }}
        aria-label="mailbox folders"
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', md: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
};

export default AppContainer;
