import Autocomplete from "@mui/material/Autocomplete";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";

const Search = () => {
  return (
    <Autocomplete
      id="free-solo-demo"
      freeSolo
      className="w-60"
      renderInput={(params) => (
        <TextField
          {...params}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          label="Search robots or location"
        />
      )}
      options={[]}
    />
  );
};
export default Search;
