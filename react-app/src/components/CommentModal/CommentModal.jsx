import React from 'react';
import { Editor, EditorState, RichUtils } from 'draft-js';
import 'draft-js/dist/Draft.css';
import './CommentModal.css';

export default function CommentModal({ cardId }) {
  const [editorState, setEditorState] = React.useState(() =>
    EditorState.createEmpty()
  );

  const onBoldClick = () => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, 'BOLD'));
  }
  const onItalicClick = () => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, 'ITALIC'));
  }
  const onUnderlineClick = () => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, 'UNDERLINE'));
  }
  const onRedClick = () => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, 'RED'));
  }
  const onHighlightClick = () => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, 'HIGHLIGHT'));
  }

  return (
    <div className='commentModal'>
      <div id="activity">
        <div className="row-container">
          <p><i className="fa-solid fa-bars"></i>  Activity</p>
          <button>Show Details</button>
        </div>
      </div>
      <div className="editor-container">
        <div className="toolbar">
          <button onClick={onBoldClick}><i className="fa-solid fa-bold"></i></button>
          <button onClick={onItalicClick}><i className="fa-solid fa-italic"></i></button>
          <button onClick={onUnderlineClick}><i className="fa-solid fa-underline"></i></button>
          <button onClick={onRedClick}><i className="fas fa-palette" style={{color: 'red'}}></i></button>
          <button onClick={onHighlightClick}><i className="fa-solid fa-highlighter" style={{color: 'goldenrod'}}></i></button>
        </div>
        <hr />

        <Editor
          className="editor"
          editorState={editorState}
          onChange={setEditorState}
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
      <p>{cardId}</p>
    </div>
  );
}
// import React from 'react';
// import { Editor, EditorState } from 'draft-js';
// import 'draft-js/dist/Draft.css';
// import './CommentModal.css';

// export default function CommentModal({ cardId }) {
//   const [editorState, setEditorState] = React.useState(() =>
//     EditorState.createEmpty()
//   );

//   return (
//     <div className='commentModal'>
//       <div id="activity">
//         <div className="row-container">
//           <p><i class="fa-solid fa-bars"></i>  Activity</p>
//           <button>Show Details</button>
//         </div>
//       </div>
//       <div>
//         <Editor editorState={editorState} onChange={setEditorState} placeholder="Write a comment..." />
//       </div>
//       {/* <div onClick={() => document.getElementById('myInput').focus()}>
//         <Editor editorState={editorState} onChange={setEditorState} id="myInput" />
//       </div> */}
//       <p>{cardId}</p>
//     </div>
//   );
// }

// import './CommentModal.css';

// export default function CommentModal({ cardId }) {
//   return (
//     <div className='commentModal'>
//       <div id="activity">
//         <div className="row-container">
//           <p><i class="fa-solid fa-bars"></i>  Activity</p>
//           <button>Show Details</button>
//         </div>
//       </div>
//       <input type="text" placeholder="Write a comment..."/>
//       <p>{cardId}</p>
//     </div>
//   );
// }
