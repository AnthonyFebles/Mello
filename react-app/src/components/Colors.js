// Where an array of themes urls can be stored

export const colors = [
	"https://imgur.com/XfzEQ4V.jpeg",
	"https://imgur.com/A4Y76t2.jpeg",
	"https://imgur.com/ek59kot.jpeg",
	"https://imgur.com/BdTGQmT.jpeg",
	"https://imgur.com/Gaf7yTG.jpeg",
	"https://imgur.com/LCD7Cke.jpeg",
];

// export const colors = [
// 	"https://imgur.com/XfzEQ4V.jpeg",
// 	"https://imgur.com/A4Y76t2.jpeg",
// 	"https://imgur.com/ek59kot.jpeg",
// 	"https://imgur.com/BdTGQmT.jpeg",
// 	"https://imgur.com/Gaf7yTG.jpeg",
// 	"https://imgur.com/LCD7Cke.jpeg",
// ];

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
