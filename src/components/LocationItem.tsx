import ListItemIcon from "@mui/material/ListItemIcon";
import MenuItem from "@mui/material/MenuItem";
import { useCallback, useContext } from "react";
import { LocationContext } from "../contexts/LocationContext";
import CheckIcon from "@mui/icons-material/Check";
import { StarredContext } from "../contexts/StarredContext";

const LocationItem = ({ name }: { name: string }) => {
  const { updateFilter, target, targetHandler } = useContext(LocationContext);
  const { starredIds } = useContext(StarredContext);

  const filterHandler = useCallback<React.MouseEventHandler<HTMLElement>>(
    (data) => {
      const _data = data?.currentTarget?.textContent;
      targetHandler(_data);
      if (_data === "All Locations") {
        updateFilter({});
        return;
      }

      const value = _data?.split("(")?.[0].trim();

      let location_name: string | undefined;
      let is_starred: boolean | undefined;

      if (value === "starred") {
        is_starred = true;
      } else {
        location_name = value;
      }
      updateFilter({
        location_name,
        is_starred,
      });
    },
    []
  );

  return (
    <MenuItem key={name} value={name} onClick={filterHandler}>
      {name === "starred" ? `${name} (${starredIds.length})` : `${name}`}
      {target === name && (
        <ListItemIcon className="absolute right-0">
          <CheckIcon fontSize="small" />
        </ListItemIcon>
      )}
    </MenuItem>
  );
};
export default LocationItem;
