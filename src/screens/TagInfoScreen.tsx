import React, { useEffect, useState } from 'react';
import {
  TagsEndpoints,
  tagResponse,
} from '../utils/backendClient/tags.endpoints';
import {
  Box,
  Button,
  CircularProgress,
  Stack,
  Typography,
} from '@mui/material';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';

const TagInfoScreen = () => {
  const navigate = useNavigate();
  const [tagInfo, setTagInfo] = useState<tagResponse | null>(null);
  const tagsEndpoints = new TagsEndpoints();
  const location = useLocation();

  useEffect(() => {
    const getTagInfo = () => {
      tagsEndpoints
        .getTagById(location.pathname.split('tags/')[1])
        .then((response) => {
          if (!response) return;
          setTagInfo(response.data);
        });
    };
    return () => getTagInfo();
  }, []);

  if (!tagInfo)
    return (
      <Stack justifyContent="center" alignItems="center">
        <CircularProgress />
      </Stack>
    );

  return (
    <Stack spacing={2}>
      <Box>
        <Typography variant="h6">Tag {tagInfo._id}</Typography>
      </Box>
      <Stack bgcolor="white" p={2} borderRadius={2}>
        <Stack direction="row" spacing={1}>
          <Typography fontWeight={500}>Identifier</Typography>
          <Typography>{tagInfo ? tagInfo.identifier : ''}</Typography>
        </Stack>
        <Box>{tagInfo ? tagInfo.tagTypeId.name : ''}</Box>
        <Box>{tagInfo ? tagInfo.createdAt : ''}</Box>
      </Stack>
      <Box>
        <Button variant="contained" onClick={() => navigate(-1)}>
          Go back
        </Button>
      </Box>
    </Stack>
  );
};

export default TagInfoScreen;
