import { useState } from 'react';
import Modal from 'react-modal';
import './SpotifyPlayer.css';

function SpotifyPlayer() {
  const [modalIsVisible, setModalIsVisible] = useState(false);

  function handleClick() {
    setModalIsVisible(true);
  }

  return (
    <>
      <Modal
        className='spotify-modal'
        isOpen={true}
        onRequestClose={() => setModalIsVisible(false)}
        contentLabel="Spotify Player"
        style={{
          overlay: {
            display: modalIsVisible ? 'block' : 'none',
            backgroundColor: '#00436a96'
          },
        }}
      >
        <iframe width="230px" height="200px" src="https://www.youtube.com/embed/fnVlN327sn0?si=HLhN8Ot_hQBH7-Sf" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
        <button onClick={() => setModalIsVisible(false)}>Close</button>
      </Modal>
      <i onClick={handleClick} class="fa-regular fa-circle-play fa-lg" style={{color: '#e6e6fa71'}}></i>
    </>
  );
}

export default SpotifyPlayer;
