import './CommentModalAdditions.css'

export default function CommentModalAdditions() {
  return (
    <div className='additions'>
      <p>Add to card</p>
      <div className='additions-container'>
        <div onClick={() => alert('Feature coming soon')}>
          <i class="fa-regular fa-user" style={{color: 'lightgray'}}></i>
          Members
        </div>
        <div onClick={() => alert('Feature coming soon')}>
          <i class="fa-solid fa-tag" style={{color: 'lightgray'}}></i>
          Lables
        </div>
        <div onClick={() => alert('Feature coming soon')}>
          <i class="fa-solid fa-check" style={{color: 'lightgray'}}></i>
          Checklists
        </div>
        <div onClick={() => alert('Feature coming soon')}>
          <i class="fa-solid fa-calendar" style={{color: 'lightgray'}}></i>
          Dates
        </div>
        <div onClick={() => alert('Feature coming soon')}>
          <i class="fa-solid fa-paperclip" style={{color: 'lightgray'}}></i>
          Attachments
        </div>
        <div onClick={() => alert('Feature coming soon')}>
          <i class="fa-solid fa-image" style={{color: 'lightgray'}}></i>
          Cover
        </div>
        <div onClick={() => alert('Feature coming soon')}>
          <i class="fa-solid fa-columns" style={{color: 'lightgray'}}></i>
          Custom Fields
        </div>
      </div>
      <p>Actions</p>
      <div className='additions-container-2'>
        <div onClick={() => alert('Feature coming soon')}>
          <i class="fa-solid fa-arrow-right" style={{color: 'lightgray'}}></i>
          Move
        </div>
        <div onClick={() => alert('Feature coming soon')}>
          <i class="fa-solid fa-copy" style={{color: 'lightgray'}}></i>
          Copy
        </div>
        <div onClick={() => alert('Feature coming soon')}>
          <i class="fa-solid fa-columns" style={{color: 'lightgray'}}></i>
          Make Template
        </div>
        <div onClick={() => alert('Feature coming soon')}>
          <i class="fa-solid fa-archive" style={{color: 'lightgray'}}></i>
          Archive
        </div>
        <div onClick={() => alert('Feature coming soon')}>
          <i class="fa-solid fa-share" style={{color: 'lightgray'}}></i>
          Share
        </div>
      </div>
    </div>
  )
}
