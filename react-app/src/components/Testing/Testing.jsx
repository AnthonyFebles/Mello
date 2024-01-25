import { colors } from '../Colors'


export default function Testing({ulClassName, ulRef, handleSubmit, name, e, setName, color, setColor, color_option, index, errors}) {
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
                  <img onClick={(e) => e.target.value} src={color_option} alt="Theme" className='theme-image'/>
                </div>
              </div>
            )
          })}
        </div>
      </div>
      <div className='input-container'>
        <label htmlFor="boardName">Board title*</label>
        <input type="text" name='boardName' value={name} onChange={e => setName(e.target.value)} required />
      </div>

      <label>
        Select Your Theme
        <select value={color} onChange={e => setColor(e.target.value)}>
                        {
      /* Map through an array of themes and make an option for each one  */
    }
          {colors.map((color_option, index) => {
      return <option key={color_option} value={color_option} label={`Theme ${index + 1}`}>
                Theme
              </option>;
    })}
        </select>
                    {
    /* work around the getting images on the select field. Will show an updated
    image thanks to the useEffect whenever a new "Color" is selected from the
    select onChange func */
  }
        <ul className="board__images__ul">
          <li className="board__images__li">
            <div>
              <img src={color} height="100px" width="180px" alt="Theme" />
            </div>
          </li>
        </ul>
      </label>
      {errors && <p>{errors.errors}</p>}
      <button className="Submit" type="submit">
        Create New Board
      </button>
    </form>
  </div>);
}
