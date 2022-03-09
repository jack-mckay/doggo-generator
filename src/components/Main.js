import React from "react";
import {toJpeg} from 'html-to-image';

const Main = () => {
	const defaultDog = 'https://images.dog.ceo/breeds/finnish-lapphund/mochilamvan.jpg';
	const [meme, setMeme] = React.useState({
		topText: "Bark bark",
		bottomText: "Bark bark bark",
		imageURL: defaultDog
	})
	const ref = React.useRef(null)

	const getMemeImage = React.useCallback(() => {
		fetch("https://dog.ceo/api/breeds/image/random")
			.then(res => res.json())
			.then(data =>
				setMeme((prevMeme) => ({
					...prevMeme,
					imageURL: data.message
				}))
			)
	}, [])

	const handleChange = (event) => {
		const {name, value} = event.target
		setMeme(prevMeme => ({
			...prevMeme,
			[name]: value
		}))
	}

	const downloadImage = React.useCallback(() => {
		if (ref.current === null) {
			return
		}

		toJpeg(ref.current, {
			quality: 0.95,
			cacheBust: true
		})
			.then((dataUrl) => {
				const link = document.createElement('a')
				link.download = 'woof.jpeg'
				link.href = dataUrl
				link.click()
			})
			.catch((err) => {
				console.log(err)
			})
	}, [ref])

	return (
		<main className="container">
			<div className="form">
				<input
					type="text"
					placeholder="Top text"
					className="form-input"
					name="topText"
					value={meme.topText}
					onChange={handleChange}
				/>
				<input
					type="text"
					placeholder="Bottom text"
					className="form-input"
					name="bottomText"
					value={meme.bottomText}
					onChange={handleChange}
				/>
				<button className="form-button" onClick={getMemeImage}>
					Fetch image 🎾
				</button>
			</div>

			<div className="meme-container">
				<div ref={ref} style={{backgroundImage: `url(${meme.imageURL}`}} className="meme">
					<h2 className="meme-text top">{meme.topText}</h2>
					<h2 className="meme-text bottom">{meme.bottomText}</h2>
				</div>
				<button className="submit-button" onClick={downloadImage}>Save as image</button>
			</div>
		</main>
	)

}

export default Main;