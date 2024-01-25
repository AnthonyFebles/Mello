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
        style={{ overlay: { display: modalIsVisible ? 'block' : 'none' } }}
      >
        <iframe title="song" src="https://open.spotify.com/embed/track/1kWkf0peH8Hj8saQY3KoPq?utm_source=generator&theme=0&autoplay=1" width="300" height="380" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"></iframe>
        <button onClick={() => setModalIsVisible(false)}>Close</button>
      </Modal>
      <i onClick={handleClick} class="fa-regular fa-circle-play fa-lg" style={{color: '#e6e6fa71'}}></i>
    </>
  );
}

export default SpotifyPlayer;
