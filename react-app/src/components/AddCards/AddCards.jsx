import { useEffect, useState } from 'react'
import OpenModalButton from '../OpenModalButton'
import CommentModal from '../CommentModal/CommentModal'
import './AddCards.css'

export default function AddCards({ card, list, id }) {
  const [cover, setCover] = useState(false)
  // useEffect(() => {
  //   console.log(card);
  // }, [card])

  return (
    <>
      { cover && <div className="card-cover" />}
      <div className="card_container" key={card.id}>
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
              setCover={setCover}
              cardInfo={card}
            />
          }
        />
      </div>
    </>
  )
}
