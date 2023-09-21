const express = require('express');
const fs = require('fs');
const app = express();

const Mahasiswa = require('./models/mahasiswa');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

let mahasiswa = [
	{ id: 1, nama: 'andre' },
	{ id: 2, nama: 'steven' },
	{ id: 3, nama: 'kowek' },
];

const path = './data/text.txt';

// fs.readFile(path, 'utf-8', (err, data) => {
// 	if (err) {
// 		console.log('Failed to read file');
// 	} else {
// 		console.log(data);
// 	}
// });

// fs.writeFile(path, 'Aku suka pergi ke gunung', (err) => {
// 	console.log(err);
// });

// fs.appendFile(path, 'aku suka pergi ke hutan', (err) => {
// 	console.log(err);
// });

const steven = new Mahasiswa('steven belva', '2208561901', '4.0');
console.log(steven);

const checkUsername = (req, res, next) => {
	const { nama } = req.body;
	let isExist = false;
	mahasiswa.map((mhs) => {
		if (mhs.nama === nama) {
			isExist = true;
		}
	});

	if (isExist) {
		return res.status(400).json({ success: false, msg: 'username sudah dipakai' });
	} else {
		next();
	}
};

app.get('/mahasiswa', (req, res) => {
	res.status(200).json({ data: mahasiswa });
});

app.get('/mahasiswa/:id', (req, res) => {
	// id yang dicari
	const id = Number(req.params.id);
	// Looping
	mahasiswa.map((mhs) => {
		if (mhs.id == id) {
			res.status(200).json({ data: mhs });
		}
	});
});

app.post('/mahasiswa', checkUsername, (req, res) => {
	let len = mahasiswa.length;
	let lastId = mahasiswa[len - 1].id;
	let currId = lastId + 1;

	let nama = req.body.nama;
	let mahasiswaBaru = {
		id: currId,
		nama: nama,
	};

	mahasiswa.push(mahasiswaBaru);
	res.status(200).json({ data: mahasiswa });
});

app.listen(5000, () => {
	console.log('App is running on localhost 5000');
});
