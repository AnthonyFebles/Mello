import { useDispatch, useSelector } from "react-redux"
import { useModal } from "../../context/Modal"
import { useEffect, useState } from "react"
import { addCardThunk } from "../../store/cards"
import { readLists } from "../../store/lists"

export default function Cards({ listId, boardId }) {
  const dispatch = useDispatch()
  const [clickedAdd, setClickedAdd] = useState(false)

  const list = listId.toString()
  const board = boardId.toString()

  const { closeModal } = useModal()

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(true)

  let cards = useSelector((state) => {
    return state.cards.Cards
  })

  const payload = {
    listId,
    name,
    description,
  }

  const handleSubmit = async (e) => {
    setErrors({})
    e.preventDefault()

    try {
      await dispatch(addCardThunk(list, board, payload))
    } catch (data) {
      setErrors(data)
      console.log(data, 'DATAAAAAAAAAAAAAAA')
      alert(data.errors)
    } finally {
      dispatch(readLists(board))
      closeModal()
    }
  }

  console.log(cards, 'state.cards ******************')
  console.log(board, list, 'board and list ******')

  useEffect(() => {
    dispatch(readLists(board)).then(() => setIsLoading(false))
  }, [dispatch, board])

  return (
    <>
    <div className="add-a-card">
      <div className="card-cover">
        <div className="card-info">
          <div onClick={() => setClickedAdd(!clickedAdd)} className="add">
            {!clickedAdd && (
              <>
                <div className="testing">
                  <i class="fa-solid fa-plus"></i>
                  <p>Add a card</p>
                </div>
              </>
            )}
            {clickedAdd && (
              <form onSubmit={handleSubmit}>
              <div className="new-card__body">
                <div className="new-card__form">
                  <div className="new-card__form-group">
                    <label className="new-card__form-label">Name</label>
                    <input
                      className="new-card__form-input"
                      type="text"
                      name="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    ></input>
                  </div>
                </div>
              </div>
              <div className="new-card__footer">
                <button className="new-card__btn" type="submit">
                  Add Card
                </button>
              </div>
            </form>
            )}
          </div>
        </div>
      </div>
    </div>
    </>
  )
}
