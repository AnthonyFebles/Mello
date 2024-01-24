import { useDispatch } from "react-redux";
import { deleteCommentThunk, updateCommentThunk } from "../../store/comments";
import RippleButton from "../RippleButton/RippleButton";

export default function UserComment({ comment }) {
  const dispatch = useDispatch()
  const deleteComment = (e) => {
    e.preventDefault()
    dispatch(deleteCommentThunk(comment.id))
  }

  const editComment = (e) => {
    e.preventDefault()
    const update = prompt('Edit your comment', comment.comment)

    const newComment = {
      id: comment.id,
      user_id: comment.user_id,
      card_id: comment.card_id,
      comment: update,
    }

    dispatch(updateCommentThunk(newComment))
  }

  return (
    <div className='comment_insert' key={comment.id}>
      <i className="fas fa-user-circle fa-2xl" style={{color: '#e6e6fa'}}/>
      <div className='comment_info'>
        <div className='name_date'>
          <h2>{comment.author.first_name} {comment.author.last_name}</h2>
          <span>{comment.updated_at}</span>
        </div>
        <p>{comment.comment}</p>
        <div className='edit-delete-btn'>
          <RippleButton onClick={editComment}>Edit</RippleButton>
          <span> · </span>
          <button onClick={deleteComment}>Delete</button>
        </div>
        <hr />
      </div>
    </div>
  );
}
