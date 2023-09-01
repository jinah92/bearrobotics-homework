import axios from "axios";
import { createContext, useCallback, useEffect, useState } from "react";
import { Location } from "../mocks/db";

interface ContextProps {
  target: string;
  locations: Array<Location>;
  groups: Group;
  getLocation: Function;
  updateFilter: Function;
  targetHandler: Function;
}

interface QueryParams {
  location_name?: string;
  robot_id?: string;
  is_starred?: boolean;
}

interface Group {
  [key: string]: Array<Location>;
}

const LocationContext = createContext<ContextProps>({
  target: "",
  locations: [],
  groups: {},
  getLocation: (params: QueryParams) => {},
  updateFilter: (params: QueryParams) => {},
  targetHandler: (value?: string) => {},
});

interface Props {
  children: JSX.Element | JSX.Element[];
}

const LocationProvider = ({ children }: Props): JSX.Element => {
  const [target, setTarget] = useState<string>("All Locations");
  const [locations, setLocations] = useState<Array<Location>>([]);
  const [groups, setGroups] = useState<Group>({});
  const [filter, setFilter] = useState<QueryParams>({});

  const targetHandler = useCallback((data?: string) => {
    const value = data ?? "";
    if (value.includes("starred")) {
      setTarget(value.split("(")?.[0]?.trim());
    } else {
      setTarget(value);
    }
  }, []);

  const getInitLocation = useCallback(async () => {
    try {
      const _locations = await getLocation();
      setLocations(_locations);
      setGroups(makeGroupLocations(_locations));
    } catch (e) {
      console.log(e);
    }
  }, []);

  const getFilteredLocation = async () => {
    try {
      const _locations = await getLocation();
      setLocations(_locations);
    } catch (e) {
      console.log(e);
    }
  };

  const getLocation = useCallback(async () => {
    try {
      const { data } = await axios.get("http://localhost:3000/locations", {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        params: filter,
      });
      return data.locations;
    } catch (e) {
      throw new Error(e as string);
    }
  }, [filter]);

  const makeGroupLocations = useCallback((arr: Array<Location>) => {
    return arr.reduce(function (carry: Group, el: Location) {
      var group = el["name"];
      if (carry[group] === undefined) {
        carry[group] = [];
      }

      carry[group].push(el);
      return carry;
    }, {});
  }, []);

  const updateFilter = useCallback((option?: QueryParams) => {
    setFilter({ ...filter, ...option });
  }, []);

  useEffect(() => {
    getInitLocation();
  }, []);

  useEffect(() => {
    if (JSON.stringify(filter) !== "{}") {
      getFilteredLocation();
    } else {
      getInitLocation();
    }
  }, [filter]);

  return (
    <LocationContext.Provider
      value={{
        target,
        locations,
        groups,
        getLocation,
        updateFilter,
        targetHandler,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
};

export { LocationContext, LocationProvider };
