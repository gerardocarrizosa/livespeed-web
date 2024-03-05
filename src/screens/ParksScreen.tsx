import { Box, Button, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { DataGridTable } from '../components/DataGridTable';
import {
  ParksEndpoints,
  ParksResponse,
} from '../utils/backendClient/parks.endpoint';
import { GridColDef, GridPaginationModel } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';

const ParksScreen = () => {
  const navigate = useNavigate();
  const parksEndpoints = new ParksEndpoints();
  const [rows, setRows] = useState<ParksResponse[]>([]);
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    pageSize: 25,
    page: 0,
  });

  useEffect(() => {
    const getParks = () => {
      parksEndpoints
        .getParks(paginationModel.page, paginationModel.pageSize)
        .then((response) => {
          if (!response) return;

          const parks = response.data.items;

          const rowParks: ParksResponse[] = parks.map((p) => {
            return {
              _id: p._id,
              name: p.name,
              createdAt: p.createdAt,
              updatedAt: p.updatedAt,
            };
          });

          setRows(rowParks);
        });
    };

    return () => getParks();
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
        <Typography variant="h5">Parks</Typography>
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
          navigate(`${e.id.toString()}/tracks`);
        }}
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
      />
    </Box>
  );
};

export default ParksScreen;
