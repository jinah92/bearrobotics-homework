import { GridColDef } from "@mui/x-data-grid";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Location } from "../../mocks/db";
import LikeButton from "../LikeButton";
import RefreshIcon from "@mui/icons-material/Refresh";
import Button from "@mui/material/Button";
import CircleIcon from "@mui/icons-material/Circle";
import { Link } from "@mui/material";

export const columns: GridColDef[] = [
  {
    field: "star",
    headerName: "",
    width: 80,
    renderHeader: () => {
      return <RefreshIcon />;
    },
    renderCell: ({ row }: { row: Location }) => {
      return <LikeButton id={row?.id} />;
    },
  },
  {
    field: "name",
    headerName: "Locations",
    width: 350,
    renderCell: ({ row }: { row: Location }) => {
      return (
        <Button
          className="w-full"
          sx={{ backgroundColor: row.robot.is_online ? "#0091FF" : "#E4E4E4" }}
          variant="contained"
          endIcon={<ArrowForwardIosIcon />}
        >
          <span className="w-full">{row.name}</span>
        </Button>
      );
    },
  },
  {
    field: "robot",
    headerName: "Robots",
    width: 250,
    renderCell: ({ row }: { row: Location }) => {
      const { id, is_online } = row.robot;
      return (
        <Button variant="text">
          {is_online ? (
            <>
              <CircleIcon sx={{ color: "#00D15E" }} />
              <span className="ml-2">{id}</span>
            </>
          ) : (
            <Link>Add</Link>
          )}
        </Button>
      );
    },
    editable: true,
  },
  {
    field: "id",
    headerName: "Location Types",
    width: 150,
    renderCell: ({ row }: { row: Location }) => {
      const { is_online } = row.robot;
      return <span>{is_online ? "Serving" : "Disinfection"}</span>;
    },
  },
];
