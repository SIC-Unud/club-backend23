const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

let mahasiswa = [
  { id: 1, nama: 'andre' },
  { id: 2, nama: 'steven' },
  { id: 3, nama: 'kowek' },
];

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
