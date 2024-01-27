// Where an array of themes urls can be stored

export const colors = [
	"https://th.bing.com/th/id/OIG.OoOd9Dks6SQIeJc3lV_8?w=1024&h=1024&rs=1&pid=ImgDetMain",
	"https://th.bing.com/th/id/OIG.Tm4j5l5hso8iB85_iqNf?w=1024&h=1024&rs=1&pid=ImgDetMain",
	"https://th.bing.com/th/id/OIG.OGoMI4XVVcASjUF2Hb3N?pid=ImgGn",
	"https://th.bing.com/th/id/OIG.rt3EmryUoYQKIjK86m_p?pid=ImgGn",
	"https://th.bing.com/th/id/OIG.idCzopGsrbq9HoGGWuLq?w=1024&h=1024&rs=1&pid=ImgDetMain",
	"https://th.bing.com/th/id/OIG.fEHxWkIYkumMxQZLmYc5?w=1024&h=1024&rs=1&pid=ImgDetMain",
];


// ? Colors for each link in array

/*
colors[0]:
#545391
#638FAD
#FBC5B8
#3685A4
#D7759E
#39436F


colors[1]:

#1B3990
#E68FD5
#BE5EAD
#BF6FCB
#443797
#AE84D8

colors[2]:
#3D3789
#BE5EAD
#F6BFD4
#E68FD5
#443797
#122768

colors[3]:
80A2B4
A56CA6
CE78AF
19487B
E397B8
13618C

colors[4]:
#6D5485
#4885A4
#4F547F
#CC89AB
#A99BB4
#F6BDB7


colors[5]:
#893F43
#832A2F
#A87368
#5A3435
#30242E
#B83C36



default:
	#4D3AC1
	#689AAB
	#FEA60F
	#161515
	rgba(188, 97, 128, 0.5)

*/

export function getRandomInt(max) {
	return Math.floor(Math.random() * max);
}

export const random = getRandomInt(colors.length);



