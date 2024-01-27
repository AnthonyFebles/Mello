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

  // let cards = useSelector((state) => {
  //   return state.cards.Cards
  // })

  const payload = {
    listId,
    name,
    description,
  }

  const handleSubmit = async (e) => {
    setErrors({})
    e.preventDefault()
    setClickedAdd(false)

    try {
      await dispatch(addCardThunk(list, board, payload))
    } catch (data) {
      setErrors(data)
      alert(data.errors)
    } finally {
      dispatch(readLists(board))
      closeModal()
    }
  }

  useEffect(() => {
    dispatch(readLists(board)).then(() => setIsLoading(false))
  }, [dispatch, board])

  return (
    <>
    <div className="add-a-card">
      <div className="card-cover">
        <div className="card-info">
          <div onClick={() => setClickedAdd(true)} className="add">
            {!clickedAdd && (
              <>
                <div className="add-card-button">
                  <i class="fa-solid fa-plus fa-lg"></i>
                  <p>Add a card</p>
                </div>
              </>
            )}
            {clickedAdd && (
              <form className="card-form" onSubmit={handleSubmit}>
                <div className="new-card-add-info">
                  <input
                    className="new-card-name"
                    name="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter a title for this card..."
                    required
                  />
                  <input
                    className="new-card-description"
                    id="description"
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Add a more detailed description..."
                    required
                  />
                </div>
                <div className="card-form-button">
                  {errors && <p>{errors.errors}</p>}
                  <button className="new-card-btn" type="submit">Add Card</button>
                  <i className="fa-solid fa-xmark fl-lg" onClick={(e) => {
                    e.stopPropagation()
                    setClickedAdd(false)
                  } }></i>
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
