import { useEffect, useState } from 'react'
import OpenModalButton from '../OpenModalButton'
import CommentModal from '../CommentModal/CommentModal'
import './AddCards.css'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import { updateCardThunk } from '../../store/cards'

export default function AddCards({ list, boardId, cardId }) {
  const currentCard = useSelector(
    (state) => state.lists[list.id].cards[cardId],
    shallowEqual
  )

  const dispatch = useDispatch()
  const [coverColor, setCoverColor] = useState(currentCard?.cover || '')
  
  useEffect(() => {
    const updateCoverColor = async () => {
      if (coverColor !== currentCard?.cover) {
        await dispatch(
          updateCardThunk(boardId, currentCard?.listId, currentCard?.id, {
            cover: coverColor,
          })
        )
      }
    }

    updateCoverColor()
  }, [coverColor, dispatch])

  return (
    <>
      {coverColor && (
        <div
          className="card-cover"
          style={{ backgroundColor: `${coverColor}` }}
        />
      )}
      <div
        className={`card_container ${coverColor ? 'cover' : ''}`}
        key={currentCard?.id}
      >
        <OpenModalButton
          buttonText={
            <>
              {currentCard?.name}
              <div className="new-card-icons">
                <i className="fa-regular fa-message"></i>
                <span>{currentCard?.comments?.length}</span>
              </div>
            </>
          }
          modalComponent={
            <CommentModal
              cardName={currentCard?.name}
              listName={list.name}
              listId={list.id}
              boardId={boardId}
              cardId={currentCard?.id}
              cardDesc={currentCard?.description}
              cardComments={currentCard?.comments}
              cards={currentCard}
              setCoverColor={setCoverColor}
              coverColor={coverColor}
            />
          }
          style={
            currentCard?.cover
              ? { borderTopLeftRadius: 0, borderTopRightRadius: 0 }
              : {}
          }
        />
      </div>
    </>
  )
}
