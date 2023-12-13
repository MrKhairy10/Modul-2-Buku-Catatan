//const ambilCatatan = function () {
//  return "Ini Buku Mubarakh Khairy...";
//};
//module.exports = ambilCatatan;

const log = console.log;
const fs = require("fs");
const chalk = require("chalk"); // Menambahkan chalk

const ambilCatatan = function () {
  return "Ini Catatan Randi Proska...";
};
const tambahCatatan = function (judul, isi) {
  const catatan = muatCatatan();
  const catatanGanda = catatan.filter(function (note) {
    return note.title === judul;
  });
  if (catatanGanda.length === 0) {
    catatan.push({
      judul: judul,
      isi: isi,
    });
    simpanCatatan(catatan);
    console.log("Catatan baru ditambahkan!");
  } else {
    console.log("Judul catatan telah dipakai");
  }
};

const hapusCatatan = function (judul) {
  const catatan = muatCatatan();
  const catatanUntukDisimpan = catatan.filter(function (note) {
    return note.judul !== judul;
  });
  if (catatan.length > catatanUntukDisimpan.length) {
    console.log(chalk.green.inverse("Catatan dihapus!"));
    simpanCatatan(catatanUntukDisimpan);
  } else {
    console.log(chalk.red.inverse("Catatan tidak ditemukan!"));
  }
};

const simpanCatatan = function (catatan) {
  const dataJSON = JSON.stringify(catatan);
  fs.writeFileSync("catatan.json", dataJSON);
};
const muatCatatan = function () {
  try {
    const dataBuffer = fs.readFileSync("catatan.json");
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (e) {
    return [];
  }
};

// Menambahkan fungsi untuk mendapatkan semua catatan
const daftarSemuaCatatan = function () {
  const semuaCatatan = ambilCatatan();
  return semuaCatatan;
};

// Menambahkan fungsi untuk membaca catatan berdasarkan judul
const bacaCatatan = function (judul) {
  const semuaCatatan = ambilCatatan();
  const catatanDibaca = semuaCatatan.find((note) => note.judul === judul);
  return catatanDibaca;
};

module.exports = {
  ambilCatatan: ambilCatatan,
  tambahCatatan: tambahCatatan,
  hapusCatatan: hapusCatatan, // Menambahkan fungsi hapusCatatan
  daftarSemuaCatatan: daftarSemuaCatatan,
  bacaCatatan: bacaCatatan,
};
