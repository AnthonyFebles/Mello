import React, { useState } from 'react';
import { Editor, EditorState, RichUtils } from 'draft-js';
import 'draft-js/dist/Draft.css';
import './CommentModal.css';
import { useSelector } from 'react-redux';


export default function CommentModal({ cardId }) {
  const comments = useSelector((state) => state.comments);

  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [editorState2, setEditorState2] = useState(() =>
    EditorState.createEmpty()
  );
  const [clicked, setClicked] = useState(false)
  const [clicked2, setClicked2] = useState(false)

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

  // function randomColor() {
  //   return '#' + Math.floor(Math.random() * 16777215).toString(16);
  // }

  return (
    <div className='commentModal'>
      <div className='cardTitle'>
        <img className='flashCard' src="/credit-card.png" alt="flash card" />
        <div>
          <h3>Card Name</h3>
          <p>In list: list name</p>
        </div>
      </div>
      <div className="description">
        <div className="row-container">
          <p><i class="fa-solid fa-align-left fa-lg" style={{color: 'white'}}></i>  Description</p>
        </div>
      </div>
      <div className="editor-container">
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
          <button>Save</button>
          <button onClick={() => setClicked(false)}>Cancel</button>
        </div>
      )}
      <div id="activity">
        <div className="row-container">
          <p><i class="fa-sharp fa-regular fa-comments fa-lg" style={{color: 'white'}}></i>  Comments</p>
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
      <div className="comment-block">
        <i className="fas fa-user-circle fa-2xl" />
        {Object.values(comments).map((comment) => (
          <div className='comment_info' key={comment.id}>
            <div className='name_date'>
              <h2>{comment.author.first_name} {comment.author.last_name}</h2>
              <span>{comment.updated_at}</span>
            </div>
            <p>{comment.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
