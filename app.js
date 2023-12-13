const fs = require("fs");

//fs.writeFileSync('catatan.txt', 'Nama Saya Mubarakh Khairy')
//fs.appendFileSync('catatan.txt', ' Saya tinggal di Padang')

//const catatan = require("./catatan.js");
//const pesan = catatan();
//console.log(pesan);

//const validator = require("validator");
//const ambilCatatan = require("./catatan.js");
//const pesan = ambilCatatan();
//console.log(pesan);
//console.log(validator.isURL("https://proska.com"));

//const ambilCatatan = require('./catatan.js')
//const command = process.argv[2]
//console.log(process.argv)
// if (command === 'tambah') {
// console.log('Tambah Catatan')
// } else if (command === 'hapus') {
// console.log('Hapus Catatan')
// }

const yargs = require("yargs");
const catatan = require("./catatan.js");
// Kustomisasi versi yargs
yargs.version("10.1.0");
// Membuat perintah (command) 'tambah'
//yargs.command({
//  command: "tambah",
//  describe: "tambah sebuah catatan baru",
//  handler: function () {
//    console.log("Sebuah catatan baru ditambahkan!");
//  },
//});

yargs.command({
  command: "tambah",
  describe: "tambah sebuah catatan baru",
  builder: {
    judul: {
      describe: "Judul catatan",
      demandOption: true,
      type: "string",
    },
    isi: {
      describe: "Isi catatan",
      demandOption: true,
      type: "string",
    },
  },
  handler: function (argv) {
    //    console.log("Judul: " + argv.judul);
    //    console.log("Isi: " + argv.isi);
    catatan.tambahCatatan(argv.judul, argv.isi);
  },
});

// Perintah hapus
yargs.command({
  command: "hapus",
  describe: "hapus catatan",
  handler: function () {
    console.log("Catatan berhasil dihapus");
  },
  handler: function (argv) {
    //  console.log("Judul: " + argv.judul);
    catatan.hapusCatatan(argv.judul);
  },
});

// Instruksi no.4 letakan disini
// Perintah list
yargs.command({
  command: "list",
  describe: "menampilkan daftar semua catatan",
  handler: function () {
    console.log("Daftar semua catatan:");
    // Implementasikan logika untuk menampilkan daftar catatan di sini
    const semuaCatatan = catatan.ambilCatatan();
    semuaCatatan.forEach((note, index) => {
      console.log(`${index + 1}. Judul: ${note.judul}`);
      console.log(`   Isi: ${note.isi}`);
    });
  },
});

// Perintah read
yargs.command({
  command: "read",
  describe: "membaca sebuah catatan",
  builder: {
    judul: {
      describe: "Judul catatan yang ingin dibaca",
      demandOption: true,
      type: "string",
    },
  },
  handler: function (argv) {
    console.log("Membaca catatan dengan judul: " + argv.judul);
    // Implementasikan logika untuk membaca catatan berdasarkan judul di sini
    const semuaCatatan = catatan.ambilCatatan();
    const catatanDibaca = semuaCatatan.find(
      (note) => note.judul === argv.judul
    );
    if (catatanDibaca) {
      console.log(`Judul: ${catatanDibaca.judul}`);
      console.log(`Isi: ${catatanDibaca.isi}`);
    } else {
      console.log(chalk.red.inverse("Catatan tidak ditemukan!"));
    }
  },
});

// letakan bagian ini pada baris terakhir
//console.log(yargs.argv);

yargs.parse();
