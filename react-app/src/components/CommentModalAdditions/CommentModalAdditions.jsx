import './CommentModalAdditions.css'
import { deleteCardThunk } from '../../store/cards'
import { useDispatch } from 'react-redux'
import { useModal } from '../../context/Modal'

export default function CommentModalAdditions({cardId}) {

  const card = cardId

  const dispatch = useDispatch

   const { closeModal } = useModal();

  const handleDelete = async (e) => {
     e.preventDefault()
      
      dispatch(deleteCardThunk(card))
      
  }



  return (
    null
  )
}
