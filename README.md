# 🎸 M-SEARCH: Musician Semantic Search Engine ->

Tugas Mandiri Case Study  
Mata Kuliah **Semantik Web (CPMK 4)**

---

## 👤 Identitas Mahasiswa

- **Nama:** La Ode Isra
- **NIM:** 230101030
- **Program Studi:** Teknik Informatika
- **Mata Kuliah:** Semantik Web
- **Dosen Pengampu:** Fadli H. Wattiheluw, S.Kom., M.Kom
- **Tahun:** 2026

---

## 📝 Deskripsi Proyek

**M-SEARCH (Musician Semantic Search Engine)** adalah aplikasi pencarian profil musisi dan band berbasis **Semantic Web** yang memanfaatkan **Linked Open Data** dari **DBpedia**.

Aplikasi ini tidak menggunakan database konvensional (SQL/NoSQL), melainkan mengambil data secara **real-time** melalui **SPARQL Endpoint** DBpedia. Dengan pendekatan ini, data musisi diperoleh langsung dari knowledge graph Wikipedia yang telah terstruktur dalam format RDF.

---
## 📄  1. Bagian Penting HTML
**🔎 Input dan Tombol Pencarian**
<input type="text" id="searchInput" />
<button id="search-btn">SEARCH</button>

Bagian ini digunakan sebagai tempat pengguna memasukkan nama musisi atau band.
Atribut id digunakan oleh JavaScript untuk membaca nilai input dan menjalankan fungsi pencarian ketika tombol diklik atau ketika pengguna menekan tombol Enter.
**⏳ Skeleton Loading**
<div id="skeleton" class="neo-card result-container"></div>


Elemen ini berfungsi sebagai indikator loading saat data sedang diambil dari DBpedia.
Skeleton ditampilkan sementara agar pengguna mengetahui bahwa sistem sedang memproses data.

**📊 Area Hasil**
<main id="resultArea" class="neo-card result-container">


Bagian ini menampilkan hasil pencarian seperti:

Nama musisi/band

Genre

Gambar

Deskripsi

Kota asal

Data pada bagian ini diisi secara dinamis menggunakan JavaScript (DOM Manipulation).


## 🎨 2. Bagian Penting CSS

**🧩 Kartu Utama (neo-card)**

.neo-card {
  background: var(--glass-bg);
  padding: 28px;
  border-radius: 18px;
}


Class ini digunakan untuk desain utama hasil pencarian, skeleton loading, dan error message agar tampilan konsisten dan modern.

**📐 Layout Grid Hasil**

.result-container {
  display: grid;
  grid-template-columns: 260px 1fr;
}


CSS Grid membagi tampilan menjadi dua bagian:

Area gambar (260px)

Area informasi (1fr / sisa ruang)

Layout ini membuat tampilan lebih rapi dan terstruktur.

**✨ Animasi Skeleton (Shimmer Effect)**

@keyframes shimmer {
  0% { background-position: -400px 0; }
  100% { background-position: 400px 0; }
}


Animasi ini memberikan efek loading bergerak pada skeleton sehingga pengguna mengetahui bahwa data sedang diproses.

---

## ⚙️ 3. Bagian Penting JavaScript
🚀 Event Listener Awal
window.addEventListener("DOMContentLoaded", () => {
  searchBtn.addEventListener("click", fetchData);
});


Kode ini memastikan bahwa JavaScript berjalan setelah halaman selesai dimuat, serta menghubungkan tombol SEARCH dengan fungsi fetchData().

## 🛡 Validasi dan Format Input
if (!inputRaw) return;

let formattedInput = inputRaw
  .split(" ")
  .map(word => word.charAt(0).toUpperCase() + word.slice(1))
  .join("_");


Bagian ini digunakan untuk:

Mencegah input kosong

Mengubah format nama agar sesuai dengan struktur resource DBpedia

Mengganti spasi menjadi underscore (_)

Contoh:
ariana grande → Ariana_Grande

## 🧠 Filter SPARQL (Semantic Web)
FILTER (?type IN (dbo:Band, dbo:MusicalArtist))


Filter ini memastikan bahwa data yang ditampilkan hanya bertipe:

dbo:Band

dbo:MusicalArtist

Sehingga sistem tidak menampilkan entitas lain seperti album atau lagu.

## 🌐 Pengambilan Data dari DBpedia
const response = await fetch(url);
const data = await response.json();


Kode ini mengambil data dari SPARQL Endpoint DBpedia menggunakan metode fetch() dan mengubah respons menjadi format JSON agar dapat diproses oleh JavaScript.

🖥 Menampilkan Hasil ke Halaman
document.getElementById("resName").innerText = item.label.value;


Bagian ini melakukan manipulasi DOM dengan mengisi elemen HTML berdasarkan ID yang telah disediakan sebelumnya.

---


## 🎯 Tujuan Proyek

1. Mengimplementasikan konsep Semantic Web dalam aplikasi web.
2. Menggunakan SPARQL untuk mengambil data RDF dari DBpedia.
3. Menampilkan data musisi/band secara dinamis tanpa backend server.
4. Menerapkan filtering ontologi `dbo:Band` dan `dbo:MusicalArtist`.

---

## 🚀 Fitur Utama

- Real-time SPARQL Query ke DBpedia
- Semantic Filtering menggunakan ontologi DBpedia
- Case-insensitive search
- Redirect handling (contoh: Queen)
- Skeleton loading sebagai feedback visual
- Error handling untuk data yang tidak ditemukan
- Implementasi penuh di sisi client (client-side)

---

## 🛠️ Teknologi & Sumber Data

- **Data Source:** DBpedia Knowledge Graph
- **Query Language:** SPARQL
- **Data Model:** RDF (Resource Description Framework)
- **Frontend:** HTML5, CSS3, Vanilla JavaScript

---

## 🧩 Arsitektur Sistem

Aplikasi menggunakan pendekatan **Client-Side Semantic Data Consumption**:

## 🔄 Alur Kerja Aplikasi

1. Pengguna memasukkan nama musisi/band.
2. Sistem memproses input agar sesuai dengan format pencarian.
3. Aplikasi mengirim query SPARQL ke DBpedia.
4. DBpedia mengembalikan data dalam format JSON.
5. Skeleton loading ditampilkan selama proses pengambilan data.
6. Data ditampilkan ke antarmuka pengguna.
7. Jika data tidak ditemukan, sistem menampilkan pesan error.

---

## 📖 Cara Menjalankan Aplikasi

1. Buka folder proyek menggunakan **Visual Studio Code**.
2. Install ekstensi **Live Server**.
3. Klik kanan pada file `index.html`.
4. Pilih **Open with Live Server**.
5. Aplikasi akan berjalan di browser.

---

## ⚠️ Catatan Teknis

- Aplikasi memerlukan koneksi internet aktif.
- Pada beberapa jaringan (misalnya WiFi kampus), akses ke SPARQL Endpoint dapat dibatasi.
- Disarankan menggunakan Live Server untuk hasil optimal.

---

## 🎓 Kesimpulan

M-SEARCH menunjukkan bahwa konsep **Semantic Web** dan **Linked Open Data** dapat diimplementasikan secara nyata dalam aplikasi web modern. Dengan menggunakan SPARQL dan DBpedia, aplikasi mampu mengambil data musisi secara real-time tanpa database lokal maupun backend server.

Proyek ini memenuhi capaian pembelajaran mata kuliah **Semantik Web (CPMK 4)**.

---
