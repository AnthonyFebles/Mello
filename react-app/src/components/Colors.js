export const colors = [
	"https://th.bing.com/th/id/OIG.OoOd9Dks6SQIeJc3lV_8?w=1024&h=1024&rs=1&pid=ImgDetMain",
	"https://th.bing.com/th/id/OIG.Tm4j5l5hso8iB85_iqNf?w=1024&h=1024&rs=1&pid=ImgDetMain",
	"https://th.bing.com/th/id/OIG.OGoMI4XVVcASjUF2Hb3N?pid=ImgGn",
	"https://th.bing.com/th/id/OIG.rt3EmryUoYQKIjK86m_p?pid=ImgGn",
	"https://th.bing.com/th/id/OIG.idCzopGsrbq9HoGGWuLq?w=1024&h=1024&rs=1&pid=ImgDetMain",
	"https://th.bing.com/th/id/OIG.fEHxWkIYkumMxQZLmYc5?w=1024&h=1024&rs=1&pid=ImgDetMain",
];

export function getRandomInt(max) {
	return Math.floor(Math.random() * max);
}

export const random = getRandomInt(colors.length);

const randomColor = colors[random]

