import Box from "@mui/material/Box";
import {
  DataGrid,
  gridPageCountSelector,
  GridPagination,
  useGridApiContext,
  useGridSelector,
} from "@mui/x-data-grid";
import { TablePaginationProps } from "@mui/material";
import MuiPagination from "@mui/material/Pagination";
import { useContext } from "react";
import { LocationContext } from "../contexts/LocationContext";
import { columns } from "./columns/columns";

export default function Dashboard() {
  const { locations } = useContext(LocationContext);

  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={locations}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 6,
            },
          },
        }}
        slots={{
          pagination: CustomPagination,
        }}
        // pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
  );
}

function Pagination({
  page,
  onPageChange,
  className,
}: Pick<TablePaginationProps, "page" | "onPageChange" | "className">) {
  const apiRef = useGridApiContext();
  const pageCount = useGridSelector(apiRef, gridPageCountSelector);

  return (
    <MuiPagination
      color="primary"
      className={className}
      count={pageCount}
      page={page + 1}
      onChange={(event, newPage) => {
        onPageChange(event as any, newPage - 1);
      }}
    />
  );
}

function CustomPagination(props: any) {
  return <GridPagination ActionsComponent={Pagination} {...props} />;
}
