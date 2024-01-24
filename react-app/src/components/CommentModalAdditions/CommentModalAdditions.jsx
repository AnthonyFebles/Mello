import './CommentModalAdditions.css'

export default function CommentModalAdditions() {
  return (
    <div className='additions'>
      <p>Add to card</p>
      <div className='additions-container'>
        <div onClick={() => alert('Feature coming soon')}>
          <i class="fa-regular fa-user" style={{color: '#2c2a31'}}></i>
          Members
        </div>
        <div onClick={() => alert('Feature coming soon')}>
          <i class="fa-solid fa-tag" style={{color: '#2c2a31'}}></i>
          Lables
        </div>
        <div onClick={() => alert('Feature coming soon')}>
          <i class="fa-solid fa-check" style={{color: '#2c2a31'}}></i>
          Checklists
        </div>
        <div onClick={() => alert('Feature coming soon')}>
          <i class="fa-solid fa-calendar" style={{color: '#2c2a31'}}></i>
          Dates
        </div>
        <div onClick={() => alert('Feature coming soon')}>
          <i class="fa-solid fa-paperclip" style={{color: '#2c2a31'}}></i>
          Attachments
        </div>
        <div onClick={() => alert('Feature coming soon')}>
          <i class="fa-solid fa-image" style={{color: '#2c2a31'}}></i>
          Cover
        </div>
        <div onClick={() => alert('Feature coming soon')}>
          <i class="fa-solid fa-columns" style={{color: '#2c2a31'}}></i>
          Custom Fields
        </div>
      </div>
      <p>Actions</p>
      <div className='additions-container-2'>
        <div onClick={() => alert('Feature coming soon')}>
          <i class="fa-solid fa-arrow-right" style={{color: '#2c2a31'}}></i>
          Move
        </div>
        <div onClick={() => alert('Feature coming soon')}>
          <i class="fa-solid fa-copy" style={{color: '#2c2a31'}}></i>
          Copy
        </div>
        <div onClick={() => alert('Feature coming soon')}>
          <i class="fa-solid fa-columns" style={{color: '#2c2a31'}}></i>
          Make Template
        </div>
        <div onClick={() => alert('Feature coming soon')}>
          <i class="fa-solid fa-archive" style={{color: '#2c2a31'}}></i>
          Archive
        </div>
        <div onClick={() => alert('Feature coming soon')}>
          <i class="fa-solid fa-share" style={{color: '#2c2a31'}}></i>
          Share
        </div>
      </div>
    </div>
  )
}
