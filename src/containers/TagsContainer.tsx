import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';

const TagsContainer = () => {
  return (
    <Box>
      <Outlet />
    </Box>
  );
};

export default TagsContainer;
