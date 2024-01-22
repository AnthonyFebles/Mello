import { useDispatch, useSelector } from "react-redux";
import { getCommentsByCardThunk } from "../../store/comments";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import OpenModalButton from "../OpenModalButton";
import CommentModal from "../CommentModal/CommentModal"

export default function Comments() {
  const dispach = useDispatch();
  const { cardId } = useParams();

  useEffect(() => {
    dispach(getCommentsByCardThunk(cardId));
  }, [dispach, cardId])

  return (
    <div className="comments">
      <h2>Comments!</h2>
      <OpenModalButton
        buttonText={"Add Comment"}
        modalComponent={<CommentModal cardId={cardId} />}
      />
    </div>
  );
}
