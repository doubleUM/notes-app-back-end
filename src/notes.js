const notes = [];

module.exports = notes;

// Kriteria pertama adalah web server harus bisa menyimpan catatan yang ditambahkan dari aplikasi client. ‘/notes’ dan method ‘POST’
// kriteria kedua, yakni menampilkan seluruh atau secara spesifik catatan yang disimpan pada server. Sepertinya kriteria ini akan lebih mudah dari kriteria sebelumnya. ‘/notes’ dan method dengan nilai ‘GET’ & ‘/notes/{id}’ dan method ‘GET’
// Kriteria ketiga adalah web server harus bisa mengubah catatan yang disimpan, baik perubahan pada title, tags, maupun body. Ketika melakukan perubahan, client akan mengirimkan permintaan ke route ‘/notes/{id}’ dengan method ‘PUT’ dan membawa objek catatan terbaru pada body request. Yuk langsung saja kita eksekusi.
//  Saatnya kita menyelesaikan kriteria terakhir, yakni menghapus catatan.
