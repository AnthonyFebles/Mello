import { useState } from 'react';
import { colors } from '../Colors'


export default function Testing({ulClassName, ulRef, handleSubmit, name, e, setName, color, setColor, color_option, index, errors}) {
  const [clicked, setClicked] = useState(null)

  function handleClick(color) {
    setColor(color)
    setClicked(color)
  }

  return (<div className={`new__board__container ${ulClassName}`}>
    <div className={ulClassName} ref={ulRef}></div>
    <form className="new__board__form" onSubmit={handleSubmit} ref={ulRef}>
      <h3>Create Board</h3>
      {/* <div className='image-container'>
        <img src="https://trello.com/assets/14cda5dc635d1f13bc48.svg" alt="pic of boards" />
      </div> */}
      <div className="background-container-parent">
        <p>Theme</p>
        <div className="background-container">
          {colors.map((color_option, index) => {
            return (
              <div key={color_option} className="board__images__li">
                <div>
                  <img onClick={() => handleClick(color_option)} src={color_option} alt="Theme" className={`theme-image ${clicked === color_option ? 'clicked' : ''}`}/>
                </div>
              </div>
            )
          })}
        </div>
      </div>
      <div className='input-container'>
        <label htmlFor="boardName">Board title*</label>
        <input type="text" name='boardName' value={name} onChange={(e => setName(e.target.value))} required />
      </div>
      <button className="Submit" type="submit">
        Create
      </button>
    </form>
  </div>);
}
