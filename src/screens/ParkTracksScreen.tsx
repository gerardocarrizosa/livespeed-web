import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  TrackResponse,
  TracksEndpoints,
} from '../utils/backendClient/tracks.endpoints';
import { GridColDef, GridPaginationModel } from '@mui/x-data-grid';
import { Box, Stack, Typography, Button, IconButton } from '@mui/material';
import { DataGridTable } from '../components/DataGridTable';
import AddIcon from '@mui/icons-material/Add';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const ParkTracksScreen = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const tracksEndpoints = new TracksEndpoints();
  const [rows, setRows] = useState<TrackResponse[]>([]);
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    pageSize: 25,
    page: 0,
  });

  useEffect(() => {
    const getTracks = () => {
      tracksEndpoints
        .getTracksByPark(
          paginationModel.page,
          paginationModel.pageSize,
          pathname.split('/')[2]
        )
        .then((response) => {
          if (!response) return;

          const tracks = response.data.items;

          const rowTracks: TrackResponse[] = tracks.map((t) => {
            return {
              _id: t._id,
              name: t.name,
              difficulty: t.difficulty,
              parkId: t.parkId,
              createdAt: t.createdAt,
              updatedAt: t.updatedAt,
            };
          });

          setRows(rowTracks);
        });
    };

    return () => getTracks();
  }, []);

  const columns: GridColDef[] = [
    { field: '_id', headerName: 'Id', flex: 1 },
    { field: 'name', headerName: 'Name', flex: 2 },
    { field: 'createdAt', headerName: 'Creation date', flex: 2 },
  ];

  return (
    <Box>
      <Stack
        direction="row"
        mb={1}
        justifyContent="space-between"
        alignItems="center"
      >
        <Stack direction="row" alignItems="center">
          <IconButton onClick={() => navigate(-1)}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h5">Tracks</Typography>
        </Stack>
        <Button startIcon={<AddIcon />} variant="contained">
          Add
        </Button>
      </Stack>
      <DataGridTable
        getRowId={(p) => p._id}
        columns={columns}
        rows={rows}
        page={paginationModel.page}
        pageSize={paginationModel.pageSize}
        pageSizeOptions={[5, 10, 20]}
        onClick={(e) => {
          navigate(e.id.toString());
        }}
        onPaginationModelChange={setPaginationModel}
      />
    </Box>
  );
};

export default ParkTracksScreen;
