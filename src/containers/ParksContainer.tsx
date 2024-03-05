import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';

const ParksContainer = () => {
  return (
    <Box>
      <Outlet />
    </Box>
  );
};

export default ParksContainer;
