import React, { useEffect, useState } from 'react';
import { Editor, EditorState, RichUtils } from 'draft-js';
import 'draft-js/dist/Draft.css';
import './CommentModal.css';
import { useDispatch, useSelector } from 'react-redux';
import { createCommentThunk } from '../../store/comments';
import UserComment from '../UserComment/UserComment';


export default function CommentModal({ cardId }) {
  const dispatch = useDispatch();
  const [clicked, setClicked] = useState(false)
  const [clicked2, setClicked2] = useState(false)
  const comments = useSelector((state) => state.comments);
  const userId = useSelector((state) => state.session.user.id);

  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [editorState2, setEditorState2] = useState(() =>
    EditorState.createEmpty()
  );

  // const descriptionText = editorState.getCurrentContent()
  // const newDescription = descriptionText.getPlainText()
  //! const newDescription = editorState.getCurrentContent().getPlainText()

  const handleSubmit = (e) => {
    e.preventDefault()
    const newComment = editorState2.getCurrentContent().getPlainText()

    const comment = {
      card_id: cardId,
      user_id: userId,
      comment: newComment
    }

    dispatch(createCommentThunk(cardId, comment))
    setEditorState2(EditorState.createEmpty())
  }


  const onBoldClick = () => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, 'BOLD'));
  }
  const onBoldClick2 = () => {
    setEditorState2(RichUtils.toggleInlineStyle(editorState2, 'BOLD'));
  }
  const onItalicClick = () => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, 'ITALIC'));
  }
  const onItalicClick2 = () => {
    setEditorState2(RichUtils.toggleInlineStyle(editorState2, 'ITALIC'));
  }
  const onUnderlineClick = () => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, 'UNDERLINE'));
  }
  const onUnderlineClick2 = () => {
    setEditorState2(RichUtils.toggleInlineStyle(editorState2, 'UNDERLINE'));
  }
  const onRedClick = () => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, 'RED'));
  }
  const onRedClick2 = () => {
    setEditorState2(RichUtils.toggleInlineStyle(editorState2, 'RED'));
  }
  const onHighlightClick = () => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, 'HIGHLIGHT'));
  }
  const onHighlightClick2 = () => {
    setEditorState2(RichUtils.toggleInlineStyle(editorState2, 'HIGHLIGHT'));
  }


  return (
    <div className='commentModal'>
      <div className='cardTitle'>
        <i class="fa-solid fa-table fa-xl" style={{color: 'lightgray'}}></i>
        <div className="title-information">
            <h3>Card Name</h3>
            <p>In list: list name</p>
        </div>
      </div>
      <div className="description">
        <div className="row-container">
          <i class="fa-solid fa-align-left fa-xl" style={{color: 'lightgray'}}></i>
          <p>Description</p>
        </div>
      </div>
      <div className="editor-container-1">
        {clicked && (
          <>
            <div className="toolbar">
              <button onClick={onBoldClick}><i className="fa-solid fa-bold"></i></button>
              <button onClick={onItalicClick}><i className="fa-solid fa-italic"></i></button>
              <button onClick={onUnderlineClick}><i className="fa-solid fa-underline"></i></button>
              <button onClick={onRedClick}><i className="fas fa-palette" style={{color: 'red'}}></i></button>
              <button onClick={onHighlightClick}><i className="fa-solid fa-highlighter" style={{color: 'goldenrod'}}></i></button>
            </div>
            <hr />
          </>
        )}
        <div style={{ height: clicked ? '200px' : 'initial' }}>
          <Editor
            className="editor"
            onFocus={() => setClicked(true)}
            editorState={editorState}
            onChange={setEditorState}
            placeholder="Add a more detailed description..."
            customStyleMap={{
              BOLD: { fontWeight: 'bold' },
              ITALIC: { fontStyle: 'italic' },
              UNDERLINE: { textDecoration: 'underline' },
              RED: { color: 'red' },
              HIGHLIGHT: { backgroundColor: 'yellow' },
            }}
          />
        </div>
      </div>
      { clicked && (
        <div className="button-container">
          <button className='save'>Save</button>
          <button className='cancel' onClick={() => setClicked(false)}>Cancel</button>
        </div>
      )}
      <div id="activity">
        <div className="row-container">
          <div className='comment-icon'>
            <i class="fa-sharp fa-regular fa-comments fa-lg" style={{color: 'lightgray'}}></i>
            <p>Comments</p>
          </div>
          <button>Show Details</button>
        </div>
      </div>
      <div className="comment-container">
        <i className="fas fa-user-circle fa-2xl" />
        <div className="editor-container">
          {clicked2 && (
            <>
              <div className="toolbar">
                <button onClick={onBoldClick2}><i className="fa-solid fa-bold"></i></button>
                <button onClick={onItalicClick2}><i className="fa-solid fa-italic"></i></button>
                <button onClick={onUnderlineClick2}><i className="fa-solid fa-underline"></i></button>
                <button onClick={onRedClick2}><i className="fas fa-palette" style={{color: 'red'}}></i></button>
                <button onClick={onHighlightClick2}><i className="fa-solid fa-highlighter" style={{color: 'goldenrod'}}></i></button>
              </div>
              <hr />
            </>
          )}
          <div style={{ height: clicked2 ? '50px' : 'initial' }}>
            <Editor
              className="editor"
              onFocus={() => setClicked2(true)}
              editorState={editorState2}
              onChange={setEditorState2}
              placeholder="Write a comment..."
              customStyleMap={{
                BOLD: { fontWeight: 'bold' },
                ITALIC: { fontStyle: 'italic' },
                UNDERLINE: { textDecoration: 'underline' },
                RED: { color: 'red' },
                HIGHLIGHT: { backgroundColor: 'yellow' },
              }}
            />
          </div>
        </div>
      </div>
      { !clicked2 && (<><br /><br /><br /></>)}
      { clicked2 && (
        <>
          <button onClick={handleSubmit} className='save-2'>Save</button>
          <hr />
        </>
      )}
      {Object.values(comments).map((comment) => (
        <UserComment comment={comment} />
      ))}
    </div>
  );
}

    // function UserComment({ comment }) {
    //   return (<div className='comment_insert' key={comment.id}>
    //       <i className="fas fa-user-circle fa-2xl" />
    //       <div className='comment_info'>
    //         <div className='name_date'>
    //           <h2>{comment.author.first_name} {comment.author.last_name}</h2>
    //           <span>{comment.updated_at}</span>
    //         </div>
    //         <p>{comment.comment}</p>
    //         <div className='edit-delete-btn'>
    //           <button>Edit</button>
    //           <span> · </span>
    //           <button>Delete</button>
    //         </div>
    //         <hr />
    //       </div>
    //     </div>);
    // }
