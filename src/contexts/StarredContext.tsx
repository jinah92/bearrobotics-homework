import axios from "axios";
import { createContext, useCallback, useEffect, useState } from "react";

interface ContextProps {
  starredIds: Array<number>;
  addStarredIds: Function;
  removeStarredIds: Function;
}

const StarredContext = createContext<ContextProps>({
  starredIds: [],
  addStarredIds: (id: number) => {},
  removeStarredIds: (id: number) => {},
});

interface Props {
  children: JSX.Element | JSX.Element[];
}

const StarredProvider = ({ children }: Props): JSX.Element => {
  const [starredIds, setStarredIds] = useState<Array<any>>([]);

  useEffect(() => {
    getStarredIds();
  }, []);

  const getStarredIds = useCallback(async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:3000/starred_location_ids"
      );
      setStarredIds(data?.["location_ids"]);
    } catch (e) {
      console.log(e);
    }
  }, []);

  const updateStarredIds = useCallback(async () => {
    try {
      await axios.put("http://localhost:3000/starred_location_ids", starredIds);
    } catch (e) {
      console.log(e);
    }
  }, [starredIds]);

  const addStarredIds = useCallback((id: number): void => {
    setStarredIds((starredIds) => [...starredIds, id]);
  }, []);

  const removeStarredIds = useCallback((id: number): void => {
    setStarredIds((starredIds) => starredIds.filter((_id) => _id !== id));
  }, []);

  useEffect(() => {
    updateStarredIds();
  }, [starredIds]);

  return (
    <StarredContext.Provider
      value={{
        starredIds,
        addStarredIds,
        removeStarredIds,
      }}
    >
      {children}
    </StarredContext.Provider>
  );
};

export { StarredContext, StarredProvider };
