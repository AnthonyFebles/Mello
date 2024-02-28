import { useState } from 'react'
import OpenModalButton from '../OpenModalButton'
import CommentModal from '../CommentModal/CommentModal'
import './AddCards.css'

export default function AddCards({ card, list, id }) {
  console.log('CARD', card);

  return (
    <>
      { card.cover && <div className="card-cover" style={{ backgroundColor: `${card.cover}`}} />}
      <div className={`card_container ${card.cover ? 'cover' : ''}`} key={card.id}>
        <OpenModalButton
          buttonText={
            <>
              {card.name}
              <div className="new-card-icons">
                <i className="fa-regular fa-message"></i>
                <span>{card.comments.length}</span>
              </div>
            </>
          }
          modalComponent={
            <CommentModal
              cardName={card.name}
              listName={list.name}
              listId={list.id}
              boardId={id}
              cardId={card.id}
              cardDesc={card.description}
              cardComments={card.comments}
              cards={card}
            />
          }
          style={card.cover ? {borderTopLeftRadius: 0, borderTopRightRadius: 0} : {} }
        />
      </div>
    </>
  )
}
