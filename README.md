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
