import { Box, Button, Stack, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useEffect, useState } from 'react';
import { TagsEndpoints } from '../utils/backendClient/tags.endpoints';
import { GridColDef, GridPaginationModel } from '@mui/x-data-grid';
import { DataGridTable } from '../components/DataGridTable';
import { useNavigate } from 'react-router-dom';

type TagsTableData = {
  id: string;
  identifier: string;
  tagTypeId: string;
  createdAt: string;
};

const TagsScreen = () => {
  const navigate = useNavigate();
  const [rows, setRows] = useState<TagsTableData[]>([]);
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    pageSize: 25,
    page: 0,
  });
  const tagsEndpoints = new TagsEndpoints();

  useEffect(() => {
    const getTags = () => {
      tagsEndpoints.getTags().then((response) => {
        if (!response) return;

        const tags = response.data.items;

        const rowTags: TagsTableData[] = tags.map((t) => {
          return {
            id: t._id,
            identifier: t.identifier,
            tagTypeId: t.tagTypeId.name,
            createdAt: t.createdAt,
          };
        });

        setRows(rowTags);
      });
    };

    return () => getTags();
  }, []);

  const columns: GridColDef[] = [
    { field: 'identifier', headerName: 'Identifier', flex: 1 },
    { field: 'tagTypeId', headerName: 'Type', flex: 1 },
    { field: 'createdAt', headerName: 'Registration date', flex: 1 },
  ];

  return (
    <Box>
      <Stack
        direction="row"
        mb={1}
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography variant="h5">Tags</Typography>
        <Button startIcon={<AddIcon />} variant="contained">
          Add
        </Button>
      </Stack>
      <DataGridTable
        columns={columns}
        rows={rows}
        page={paginationModel.page}
        pageSize={paginationModel.pageSize}
        pageSizeOptions={[5, 10, 20]}
        onClick={(e) => {
          navigate(e.id.toString());
        }}
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
      />
    </Box>
  );
};
export default TagsScreen;
