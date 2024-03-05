import {
  Box,
  Button,
  Divider,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useContext, useEffect } from 'react';
import { AuthContext } from '../contexts/auth/AuthContext';
import { UsersEndpoints } from '../utils/backendClient/users.endpoints';

const AccountScreen = () => {
  const usersEndpoints = new UsersEndpoints();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    usersEndpoints.getAccountInfo(user?.id as string).then((response) => {
      console.log('response', response);
    });
  }, []);

  return (
    <Box>
      <Typography variant="h4" mb={2}>
        Account
      </Typography>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1}>
        <Stack
          bgcolor="white"
          justifyContent="center"
          alignItems="center"
          borderRadius={2}
          boxShadow={1}
          flex={1}
          p={2}
        >
          <Box
            sx={{ backgroundColor: 'lightgray' }}
            borderRadius={1}
            component="img"
            alt="Profile photo"
            src={
              user?.photoURL
                ? user.photoURL
                : 'https://avataaars.io/?avatarStyle=Circle&topType=ShortHairDreads01&accessoriesType=Prescription01&hairColor=Blonde&facialHairType=BeardMedium&facialHairColor=BrownDark&clotheType=ShirtCrewNeck&clotheColor=Gray01&eyeType=Dizzy&eyebrowType=UpDownNatural&mouthType=Serious&skinColor=Brown'
            }
            width="8rem"
          />
          <Typography variant="h6" textAlign="center">
            {user?.firstName} {user?.lastName}
          </Typography>
          <Typography variant="body1">{user?.email}</Typography>
          <Divider flexItem sx={{ mt: 2, mx: -2 }} />
          <Button>Change photo</Button>
        </Stack>
        <Stack bgcolor="white" borderRadius={2} boxShadow={1} flex={3} p={2}>
          <Box p="8px 8px 20px 8px">
            <Typography variant="h6">Profile</Typography>
            <Typography variant="body2">
              The information can be edited
            </Typography>
          </Box>
          <Stack spacing={4}>
            <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
              <TextField
                label="Name"
                fullWidth
                size="small"
                id="name"
                value={user?.firstName ? user.firstName : ''}
              />
              <TextField
                label="Last Name"
                fullWidth
                size="small"
                id="name"
                value={user?.lastName ? user.lastName : ''}
              />
            </Stack>
            <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
              <TextField
                label="Phone Number"
                fullWidth
                size="small"
                id="name"
                value={user?.phoneNumber ? user.phoneNumber : ''}
              />
              <TextField
                label="Email"
                fullWidth
                size="small"
                id="name"
                value={user?.email ? user.email : ''}
              />
            </Stack>
          </Stack>
          <Divider sx={{ mt: 2, mb: 1, mx: -2 }} />
          <Button variant="contained" sx={{ alignSelf: 'flex-end' }}>
            Edit profile
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};

// Change profile photo
// Change name (displayName)
// Change email
// Change password
// Sign out
// More to come...

export default AccountScreen;
