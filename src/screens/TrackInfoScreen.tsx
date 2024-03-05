import { useEffect, useState } from 'react';
import {
  TrackResponse,
  TracksEndpoints,
} from '../utils/backendClient/tracks.endpoints';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  CircularProgress,
  Divider,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import CircleIcon from '@mui/icons-material/Circle';
import { getDateFromIsoDate } from '../utils/helpers/helperFuncitons';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const TrackInfoScreen = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const tracksEndpoints = new TracksEndpoints();
  const [track, setTrack] = useState<TrackResponse | null>(null);

  useEffect(() => {
    function getTrack() {
      tracksEndpoints.getTrackById(pathname.split('/')[4]).then((response) => {
        console.log('@@@@@', response);
        if (!response) return;

        setTrack(response.data);
      });
    }

    return () => getTrack();
  }, []);

  if (!track) return <CircularProgress />;

  return (
    <Stack spacing={1}>
      <Stack direction="row" alignItems="center">
        <IconButton onClick={() => navigate(-1)}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h5">Track Information</Typography>
      </Stack>
      <Stack bgcolor="white" borderRadius={2}>
        <Stack p={2}>
          <Typography variant="h6">Track ID</Typography>
          <Typography>{track._id}</Typography>
        </Stack>
        <Divider />
        <Stack p={2} direction="row">
          <Stack flex={1}>
            <Typography variant="h6">Name</Typography>
            <Typography>{track.name}</Typography>
          </Stack>
          <Stack flex={1}>
            <Typography variant="h6">Difficulty</Typography>
            <Typography>
              <TrackDifficulty difficulty={track.difficulty} />
            </Typography>
          </Stack>
        </Stack>
        <Stack p={2} direction="row">
          <Stack flex={1}>
            <Typography variant="h6">Registration date</Typography>
            <Typography>{getDateFromIsoDate(track.createdAt)}</Typography>
          </Stack>
          <Stack flex={1}>
            <Typography variant="h6">Park</Typography>
            <Typography>{track.parkId.name}</Typography>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export const TrackDifficulty = (props: { difficulty: string }) => {
  if (props.difficulty === 'White')
    return (
      <Stack direction="row">
        <CircleIcon sx={{ color: 'white' }} /> {props.difficulty}
      </Stack>
    );
  if (props.difficulty === 'Green')
    return (
      <Stack direction="row">
        <CircleIcon sx={{ color: 'green' }} /> {props.difficulty}
      </Stack>
    );
  if (props.difficulty === 'Blue')
    return (
      <Stack direction="row">
        <CircleIcon sx={{ color: 'blue' }} /> {props.difficulty}
      </Stack>
    );
  if (props.difficulty === 'Black')
    return (
      <Stack direction="row">
        <CircleIcon sx={{ color: 'black' }} /> {props.difficulty}
      </Stack>
    );
  if (props.difficulty === 'DoubleBlack')
    return (
      <Stack direction="row">
        <CircleIcon sx={{ color: 'black' }} />
        <CircleIcon sx={{ color: 'black' }} /> {props.difficulty}
      </Stack>
    );
  if (props.difficulty === 'Proline')
    return (
      <Stack direction="row">
        <CircleIcon sx={{ color: 'orange' }} />
        <CircleIcon sx={{ color: 'orange' }} /> {props.difficulty}
      </Stack>
    );
  return (
    <Stack direction="row">
      <CircleIcon sx={{ color: 'red' }} /> Difficulty not supported
    </Stack>
  );
};

export default TrackInfoScreen;
