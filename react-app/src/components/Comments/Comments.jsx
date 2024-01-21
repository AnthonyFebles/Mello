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

  const comments = useSelector((state) => state.comments);
  Object.values(comments).map((comment) => {
    console.log('HI', comment);
    return 'hi'
  } );

  return (
    <div className="comments">
      <h2>Comments!</h2>
      <OpenModalButton
        buttonText={"Add Comment"}
        modalComponent={<CommentModal cardId={cardId} />}
      />
      <p>{cardId}</p>
      {Object.values(comments).map((comment) => (
        <div key={comment.id}>
          <h2>{comment.author.first_name} {comment.author.last_name} {comment.updated_at}</h2>
          <h3>{comment.comment}</h3>
        </div>
      ) )}
    </div>
  );
}
