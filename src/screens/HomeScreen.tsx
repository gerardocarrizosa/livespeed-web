import { useContext } from 'react';
import { AuthContext } from '../contexts/auth/AuthContext';
import { Box, Stack } from '@mui/material';

const HomeScreen = () => {
  const { user } = useContext(AuthContext);

  return (
    <Stack
      direction="row"
      bgcolor="gainsboro"
      justifyContent="space-between"
      flex={1}
    >
      <Box bgcolor="red" m={1} p={1} borderRadius={1}>
        ashgf
      </Box>
      <Box bgcolor="blueviolet" m={1} p={1} borderRadius={1}>
        awd
      </Box>
      <Box bgcolor="aqua" m={1} p={1} borderRadius={1}>
        grfed
      </Box>
      <Box bgcolor="hotpink" m={1} p={1} borderRadius={1}>
        grfe
      </Box>
    </Stack>
  );
};

export default HomeScreen;
