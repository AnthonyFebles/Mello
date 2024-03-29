import { useState } from "react";
import Modal from "react-modal";
import ReactPlayer from "react-player";
import "./SpotifyPlayer.css";

function SpotifyPlayer() {
	const [modalIsVisible, setModalIsVisible] = useState(false);
	const [playing, setPlaying] = useState(false);
	const [source, setSource] = useState(
		"https://soundcloud.com/anthony-febles-232032259/lord-of-the-rings-but-it-s-lofi-beats"
	);
	const [playButton, setPlayButton] = useState(
		"fa-regular fa-circle-play fa-xl"
	);
	const [volume, setVolume] = useState(0.5);

	function handleClick() {
		setModalIsVisible(true);
	}

	function handlePlay() {
		if (playing) {
			setPlaying(false);
			setPlayButton("fa-regular fa-circle-play fa-xl");
		} else {
			setPlaying(true);
			setPlayButton("fa-regular fa-circle-pause fa-xl");
		}
	}

	return (
		<>
			{/* <Modal
				className="spotify-modal"
				isOpen={true}
				onRequestClose={() => setModalIsVisible(false)}
				contentLabel="Spotify Player"
				style={{
					overlay: {
						display: modalIsVisible ? "block" : "none",
						backgroundColor: "#00436a96",
					},
				}}
			>
				<iframe
					width="230px"
					height="200px"
					src="https://www.youtube-nocookie.com/embed/fnVlN327sn0?si=lHe1YkNFnLdkUlzN&amp;start=3"
					title="YouTube video player"
					frameborder="0"
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
					allowfullscreen
				></iframe>
				<button onClick={() => setModalIsVisible(false)}>Close</button>
			</Modal> */}
			<Modal
				className="spotify-modal"
				isOpen={true}
				onRequestClose={() => setModalIsVisible(false)}
				contentLabel="Spotify Player"
				style={{
					overlay: {
						display: modalIsVisible ? "block" : "none",
						backgroundColor: "#00436a96",
						width: "100%",
					},
				}}
			>
				<>
					<p className="media_controls_link-p">Enter A Link For Audio</p>
					<span className="supported-audio-sites">
						<i
							class="fa fa-youtube-play"
							style={{ fontSize: "30px", color: "white" }}
						></i>
						<i
							class="fa-brands fa-facebook"
							style={{ fontSize: "30px", color: "white" }}
						></i>
						<i
							class="fa-brands fa-soundcloud"
							style={{ fontSize: "30px", color: "white" }}
						></i>
						<i
							class="fa-brands fa-twitch"
							style={{ fontSize: "30px", color: "white" }}
						></i>
						<i
							class="fa-brands fa-dailymotion"
							style={{ fontSize: "30px", color: "white" }}
						></i>
						<i
							class="fa-brands fa-vimeo"
							style={{ fontSize: "30px", color: "white" }}
						></i>
					</span>
					<input
						className="audio-input"
						value={source}
						onChange={(e) => setSource(e.target.value)}
					></input>
					<div className="volume-container">
						<label
							style={{
								color: "whitesmoke",
								fontSize: "20px",
							}}
						>
							Volume{" "}
							<input
								className="range-input"
								type="range"
								onChange={(e) => setVolume(e.target.value / 100)}
							></input>
						</label>
					</div>
				</>
			</Modal>
			<ReactPlayer
				url={source}
				playing={playing}
				width={"0px"}
				height={"0px"}
				volume={volume}
			/>
			<i
				onClick={handleClick}
				class="fa-solid fa-gear fa-xl"
				style={{ color: "#e6e6fa71" }}
			></i>
			<i
				onClick={handlePlay}
				class={playButton}
				style={{ color: "#e6e6fa71" }}
			></i>
		</>
	);
}

export default SpotifyPlayer;
