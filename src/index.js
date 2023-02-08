// initializing pointers to DOM elements
const nav = document.querySelector('#duck-nav')
const name = document.querySelector('#duck-display-name')
const image = document.querySelector('#duck-display-image')
const likes = document.querySelector('#duck-display-likes')
const form = document.querySelector('#new-duck-form')

// initializing state
let currentDuck = {}

// adding event listeners
likes.addEventListener('click', (e) => addLikes(e))
form.addEventListener('submit', (e) => submitDuck(e))

// initial fetch to get all ducks
fetch('http://localhost:3000/ducks')
	.then((res) => res.json())
	.then((ducks) =>
		ducks.forEach((duck) => {
			const img = document.createElement('img')
			img.src = duck.img_url
			img.addEventListener('click', () => renderDuck(duck))
			console.log(img)
			nav.appendChild(img)
		})
	)

// render targeted duck upon click from nav
const renderDuck = (duck) => {
	currentDuck = duck
	console.log(currentDuck)
	name.textContent = duck.name
	image.src = duck.img_url
	likes.textContent = `${duck.likes} Likes`
}

// add likes to duck object
//fetch a patch request to update the database
//update DOM
const addLikes = (e) => {
	currentDuck.likes++
	console.log(currentDuck.likes)
	fetch(`http://localhost:3000/ducks/${currentDuck.id}`, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ likes: currentDuck.likes })
	})
		.then((res) => res.json())
		.then((duck) => {
			likes.textContent = `${duck.likes} Likes`
		})
}

// create new duck object
//fetch a post request to update the database
//update DOM
const submitDuck = (e) => {
	e.preventDefault()
	const name = e.target['duck-name-input'].value
	const img_url = e.target['duck-image-input'].value
	const img = document.createElement('img')
	img.src = img_url
	img.addEventListener('click', () => renderDuck({ name, img_url, likes: 0 }))
	nav.appendChild(img)
	fetch('http://localhost:3000/ducks', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ name, img_url, likes: 0 })
	})
		.then((res) => res.json())
		.then((duck) => renderDuck(duck))
}
