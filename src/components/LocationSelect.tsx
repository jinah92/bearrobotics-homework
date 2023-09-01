import OutlinedInput from "@mui/material/OutlinedInput";
import Select from "@mui/material/Select";
import { useContext, useMemo } from "react";
import { LocationContext } from "../contexts/LocationContext";
import LocationItem from "./LocationItem";

const LocationSelect = () => {
  const { groups, target } = useContext(LocationContext);

  const groupNames = useMemo(
    () =>
      Object.keys(groups).map((group) => `${group} (${groups[group].length})`),
    [groups]
  );

  return (
    <Select
      className="w-60 text-left"
      displayEmpty
      value={target}
      input={<OutlinedInput />}
      inputProps={{ "aria-label": "Without label" }}
      renderValue={(value) => value}
    >
      {["All Locations", "starred", ...groupNames].map((name) => (
        <LocationItem key={name} name={name} />
      ))}
    </Select>
  );
};
export default LocationSelect;
