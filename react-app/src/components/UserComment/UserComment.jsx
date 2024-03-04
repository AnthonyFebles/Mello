import { useDispatch, useSelector } from 'react-redux'
import { deleteCommentThunk, updateCommentThunk } from '../../store/comments'
import { useState } from 'react'
import './UserComment.css'

export default function UserComment({ comment }) {
  const user = useSelector((state) => state.session.user)
  const [isEditing, setIsEditing] = useState(false)
  const [editedComment, setEditedComment] = useState(comment.comment)
  const dispatch = useDispatch()

  const handleEdit = (e) => {
    e.preventDefault()
    setIsEditing(true)
  }

  const handleSave = (e) => {
    e.preventDefault()

    const newComment = {
      id: comment.id,
      user_id: comment.user_id,
      card_id: comment.card_id,
      comment: editedComment,
    }

    if (newComment.comment.length > 100) {
      alert('Comment must be less than 100 characters')
      return
    } else {
      dispatch(updateCommentThunk(newComment))
      setIsEditing(false)
    }
  }

  const deleteComment = (e) => {
    e.preventDefault()
    dispatch(deleteCommentThunk(comment.id))
  }

  return (
    <div className="comment_insert" key={comment.id}>
      <i className="fas fa-user-circle fa-2xl" style={{ color: '#e6e6fa' }} />
      <div className="comment_info">
        {isEditing ? (
          <form className='comment-form' onSubmit={handleSave}>
            <input
              type="text"
							className='comment-edit-input'
              value={editedComment}
              onChange={(e) => setEditedComment(e.target.value)}
							autoFocus
            />
          </form>
        ) : (
          <p>{comment.comment}</p>
        )}
        {comment.user_id === user.id && (
          <div className="edit-delete-btn">
            <button onClick={handleEdit}>Edit</button>
            <span> · </span>
            <button onClick={deleteComment}>Delete</button>
						{isEditing ? (
							<>
								<span> · </span>
								<button onClick={handleSave}>Save</button>
							</>
						) : null}
          </div>
        )}
        <hr />
      </div>
    </div>
  )
}
