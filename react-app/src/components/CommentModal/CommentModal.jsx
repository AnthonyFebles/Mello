import React, { useState, useEffect } from 'react'
import { Editor, EditorState, RichUtils } from 'draft-js'
import 'draft-js/dist/Draft.css'
import './CommentModal.css'
import { useDispatch, useSelector } from 'react-redux'
import {
  createCommentThunk,
  getCommentsByCardThunk,
} from '../../store/comments'
import UserComment from '../UserComment/UserComment'
import {
  deleteCardThunk,
  getCardsThunk,
  updateCardThunk,
} from '../../store/cards'
import { useModal } from '../../context/Modal'
import CommentModalAdditions from '../CommentModalAdditions/CommentModalAdditions'
import SpotifyPlayer from '../SpotifyPlayer/SpotifyPlayer'
import { readLists } from '../../store/lists'

export default function CommentModal({
  boardId,
  cardId,
  listName,
  cardName,
  cardDesc,
  cardComments,
}) {
  const card = cardId
  const id = boardId

  const { closeModal } = useModal()

  const dispatch = useDispatch()
  const lists = useSelector((state) => state.lists)
  const [name, setName] = useState(cardName)
  const [description, setDescription] = useState(cardDesc)
  const [clicked, setClicked] = useState(false)
  const [clicked2, setClicked2] = useState(false)
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  )
  const [editorState2, setEditorState2] = useState(() =>
    EditorState.createEmpty()
  )

  const comments = useSelector((state) => state.comments) || cardComments
  const userId = useSelector((state) => state.session.user.id)

  const payload = {
    name,
    description,
  }

  const handleDelete = async (e) => {
    e.preventDefault()
    try {
      await dispatch(deleteCardThunk(card)).then(() => closeModal())
      await dispatch(readLists(id))
    } catch (error) {
      alert(error)
    } finally {
    }
  }

  const handleNameChange = (e) => {
    e.preventDefault()
    setName(e.target.value)
  }

  const handleNameUpdate = async (e) => {
    e.preventDefault()
    try {
      await dispatch(updateCardThunk(cardId, payload))
      await dispatch(readLists(id))
    } catch (error) {
      alert(error)
    }
  }

  const handleDescriptionUpdate = async (e) => {
    e.preventDefault()

    if (editorState.getCurrentContent().getPlainText().length > 255) {
      alert('Description must be less than 255 characters')
      return
    }
    try {
      setDescription(editorState.getCurrentContent().getPlainText('\u0001'))
      await dispatch(updateCardThunk(cardId, payload))
      await dispatch(readLists(id))
      setClicked(false)
    } catch (error) {
      console.log(error)
      alert(error)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const newComment = editorState2.getCurrentContent().getPlainText()

    if (newComment.length > 100) {
      alert('Comment must be less than 100 characters')
      return
    }

    const comment = {
      card_id: cardId,
      user_id: userId,
      comment: newComment,
    }


    await dispatch(createCommentThunk(cardId, comment))
    setEditorState2(EditorState.createEmpty())
    await dispatch(readLists(id))
  }

  function showDetails() {}

  const onBoldClick = () => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, 'BOLD'))
  }
  const onBoldClick2 = () => {
    setEditorState2(RichUtils.toggleInlineStyle(editorState2, 'BOLD'))
  }
  const onItalicClick = () => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, 'ITALIC'))
  }
  const onItalicClick2 = () => {
    setEditorState2(RichUtils.toggleInlineStyle(editorState2, 'ITALIC'))
  }
  const onUnderlineClick = () => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, 'UNDERLINE'))
  }
  const onUnderlineClick2 = () => {
    setEditorState2(RichUtils.toggleInlineStyle(editorState2, 'UNDERLINE'))
  }
  const onRedClick = () => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, 'RED'))
  }
  const onRedClick2 = () => {
    setEditorState2(RichUtils.toggleInlineStyle(editorState2, 'RED'))
  }
  const onHighlightClick = () => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, 'HIGHLIGHT'))
  }
  const onHighlightClick2 = () => {
    setEditorState2(RichUtils.toggleInlineStyle(editorState2, 'HIGHLIGHT'))
  }

  useEffect(() => {
    dispatch(readLists(parseInt(id)))
    dispatch(getCommentsByCardThunk(cardId))
  }, [dispatch])

  return (
    <div className="commentModal">
      <div className="commentModal-body">
        <div className="cardTitle">
          <i class="fa-solid fa-table fa-xl" style={{ color: '#e6e6fa' }}></i>
          <div className="title-information">
            <i class="fa-regular fa-pen-to-square"></i>
            <input
              type="text"
              value={name}
              onChange={(e) => handleNameChange(e)}
              onBlur={handleNameUpdate}
              className="title-input"
            />
            <p>In list: {listName}</p>
          </div>
        </div>
        <div className="description">
          <div className="row-container">
            <i
              class="fa-solid fa-align-left fa-xl"
              style={{ color: '#e6e6fa' }}
            ></i>
            <p>Description</p>
          </div>
        </div>
        <div className="editor-container-1">
          {clicked && (
            <>
              <div className="toolbar">
                <button onClick={onBoldClick}>
                  <i className="fa-solid fa-bold"></i>
                </button>
                <button onClick={onItalicClick}>
                  <i className="fa-solid fa-italic"></i>
                </button>
                <button onClick={onUnderlineClick}>
                  <i className="fa-solid fa-underline"></i>
                </button>
                <button onClick={onRedClick}>
                  <i className="fas fa-palette" style={{ color: 'red' }}></i>
                </button>
                <button onClick={onHighlightClick}>
                  <i
                    className="fa-solid fa-highlighter"
                    style={{ color: 'goldenrod' }}
                  ></i>
                </button>
              </div>
              <hr />
            </>
          )}
          <div style={{ height: clicked ? '200px' : '50px' }}>
            <Editor
              className="editor"
              onFocus={() => setClicked(true)}
              editorState={editorState}
              onChange={setEditorState}
              onBlur={handleDescriptionUpdate}
              placeholder={description}
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
        {clicked && (
          <div className="button-container">
            <button className="save" onClick={handleDescriptionUpdate}>
              Save
            </button>
            <button className="cancel" onClick={() => setClicked(false)}>
              Cancel
            </button>
          </div>
        )}
        <div id="activity">
          <div className="row-container">
            <div className="comment-icon">
              <i
                class="fa-sharp fa-regular fa-comments fa-lg"
                style={{ color: '#e6e6fa' }}
              ></i>
              <p>Comments</p>
            </div>
            <button onClick={showDetails}>Show Details</button>
          </div>
        </div>
        <div className="comment-container">
          <i
            className="fas fa-user-circle fa-2xl"
            style={{ color: '#e6e6fa' }}
          />
          <div className="editor-container">
            {clicked2 && (
              <>
                <div className="toolbar">
                  <button onClick={onBoldClick2}>
                    <i className="fa-solid fa-bold"></i>
                  </button>
                  <button onClick={onItalicClick2}>
                    <i className="fa-solid fa-italic"></i>
                  </button>
                  <button onClick={onUnderlineClick2}>
                    <i className="fa-solid fa-underline"></i>
                  </button>
                  <button onClick={onRedClick2}>
                    <i className="fas fa-palette" style={{ color: 'red' }}></i>
                  </button>
                  <button onClick={onHighlightClick2}>
                    <i
                      className="fa-solid fa-highlighter"
                      style={{ color: 'goldenrod' }}
                    ></i>
                  </button>
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
        {!clicked2 && (
          <>
            <br />
            <br />
            <br />
          </>
        )}
        {clicked2 && (
          <>
            <button onClick={handleSubmit} className="save-2">
              Save
            </button>
            <hr />
          </>
        )}
        {Object.values(comments)
          .reverse()
          .map((comment) => (
            <UserComment key={comment.id} comment={comment} />
          ))}
      </div>
      <div className="additions">
        <p>Add to card</p>
        <div className="additions-container">
          <div onClick={() => alert('Feature coming soon')}>
            <i class="fa-regular fa-user" style={{ color: '#2c2a31' }}></i>
            Members
          </div>
          <div onClick={() => alert('Feature coming soon')}>
            <i class="fa-solid fa-tag" style={{ color: '#2c2a31' }}></i>
            Labels
          </div>
          <div onClick={() => alert('Feature coming soon')}>
            <i class="fa-solid fa-check" style={{ color: '#2c2a31' }}></i>
            Checklists
          </div>
          <div onClick={() => alert('Feature coming soon')}>
            <i class="fa-solid fa-calendar" style={{ color: '#2c2a31' }}></i>
            Dates
          </div>
          <div onClick={() => alert('Feature coming soon')}>
            <i class="fa-solid fa-paperclip" style={{ color: '#2c2a31' }}></i>
            Attachments
          </div>
          <div onClick={() => alert('Feature coming soon')}>
            <i class="fa-solid fa-image" style={{ color: '#2c2a31' }}></i>
            Cover
          </div>
          <div onClick={() => alert('Feature coming soon')}>
            <i class="fa-solid fa-columns" style={{ color: '#2c2a31' }}></i>
            Custom Fields
          </div>
        </div>
        <p>Actions</p>
        <div className="additions-container-2">
          <div onClick={() => alert('Feature coming soon')}>
            <i class="fa-solid fa-arrow-right" style={{ color: '#2c2a31' }}></i>
            Move
          </div>
          <div onClick={() => alert('Feature coming soon')}>
            <i class="fa-solid fa-copy" style={{ color: '#2c2a31' }}></i>
            Copy
          </div>
          <div onClick={() => alert('Feature coming soon')}>
            <i class="fa-solid fa-columns" style={{ color: '#2c2a31' }}></i>
            Make Template
          </div>
          <div onClick={handleDelete}>
            <i class="fa-solid fa-archive" style={{ color: '#2c2a31' }}></i>
            Delete
          </div>
          <div onClick={() => alert('Feature coming soon')}>
            <i class="fa-solid fa-share" style={{ color: '#2c2a31' }}></i>
            Share
          </div>
        </div>
      </div>
    </div>
  )
}
