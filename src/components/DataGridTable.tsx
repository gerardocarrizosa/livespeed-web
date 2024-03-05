import {
  DataGrid,
  GridCallbackDetails,
  GridColDef,
  GridEventListener,
  GridPaginationModel,
  GridRowIdGetter,
} from '@mui/x-data-grid';

interface DataGridTableProps {
  rows: any[];
  columns: GridColDef[];
  page: number;
  pageSize: number;
  pageSizeOptions: number[];
  checkboxSelection?: boolean;
  rowSelection?: boolean;
  onClick: GridEventListener<'rowClick'> | undefined;
  getRowId?: GridRowIdGetter<any> | undefined;
  paginationModel?: GridPaginationModel;
  onPaginationModelChange?:
    | ((model: GridPaginationModel, details: GridCallbackDetails<any>) => void)
    | undefined;
}

export const DataGridTable = (props: DataGridTableProps) => {
  return (
    <div>
      <DataGrid
        getRowId={props.getRowId}
        sx={{ backgroundColor: 'white' }}
        onRowClick={props.onClick}
        rowSelection={props.rowSelection}
        rows={props.rows}
        columns={props.columns}
        initialState={{
          pagination: {
            paginationModel: { page: props.page - 1, pageSize: props.pageSize },
          },
        }}
        pageSizeOptions={props.pageSizeOptions}
        checkboxSelection={props.checkboxSelection}
        // paginationModel={props.paginationModel}
        onPaginationModelChange={props.onPaginationModelChange}
      />
    </div>
  );
};
