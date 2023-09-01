import LocationSelect from "./LocationSelect";
import Search from "./Search";

const SearchHeader = () => {
  return (
    <div className="flex flex-wrap my-6">
      <LocationSelect />
      <div className="absolute right-10">
        <Search />
      </div>
    </div>
  );
};
export default SearchHeader;
