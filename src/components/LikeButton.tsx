import { IconButton } from "@mui/material";
import { useCallback, useContext, useMemo } from "react";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { StarredContext } from "../contexts/StarredContext";

const LikeButton = ({ id }: { id: number | never }) => {
  const { starredIds, addStarredIds, removeStarredIds } =
    useContext(StarredContext);

  const isClicked = useMemo(() => {
    return starredIds.findIndex((_id) => _id === id) !== -1;
  }, [id, starredIds]);

  const clickHandler = useCallback(async () => {
    if (!id) return;
    if (isClicked) {
      removeStarredIds(id);
    } else {
      addStarredIds(id);
    }
  }, [id, isClicked, removeStarredIds]);

  return (
    <IconButton aria-label="star" onClick={clickHandler}>
      {isClicked ? (
        <StarIcon sx={{ color: "#F7B500" }} />
      ) : (
        <StarBorderIcon sx={{ color: "#F7B500" }} />
      )}
    </IconButton>
  );
};
export default LikeButton;
