const {nanoid} = require('nanoid');
const notes = require('./notes'); // importing notes array (there is notes data from client)

const addNoteHandler = (request, h) => {
    const {title, tags, body} = request.payload;

    const id = nanoid(16); // nanoid is a package to generate id by specifying string numbers (this case 16 letters)
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt; // why the updated date is the same as created? because this is for adding new note so basically the date is the same.

    const newNote = {
        title, tags, body, id, createdAt, updatedAt,
    };
    notes.push(newNote); // pushing the array to notes by using push()

    // this code is to know that newNote already fitted in the notes array.
    const isSuccess = notes.filter((note) => note.id === id).length > 0;

    // if the filter isSuccess returns true then this is the code
    if (isSuccess) {
        const response = h.response({
            status: 'success',
            message: 'Catatan berhasil ditambahkan',
            data: {
                noteId: id,
            },
        });
        response.code(201);
        return response;
    }
    // else if false then this one
    const response = h.response({
        status: 'fail',
        message: 'Catatan gagal ditambahkan',
    });
    response.code(500);
    return response;
};

const getAllNotesHandler = () => ({
    // no need (request, h) because it is not used. this is only to get all notes and to be displayed in the website.
    status: 'success',
    data: {
        notes,
    },
});

const getNoteByIdHandler = (request, h) => {
    // mengembalikan objek catatan secara spesifik berdasarkan id yang digunakan oleh path parameter.
    const {id} = request.params;

    // Setelah mendapatkan nilai id, dapatkan objek note dengan id tersebut dari objek array notes. Manfaatkan method array filter() untuk mendapatkan objeknya.
    const note = notes.filter((n) => n.id === id)[0];

    // kembalikan fungsi handler dengan data beserta objek note di dalamnya. Namun, sebelum itu, pastikan dulu objek note tidak bernilai undefined. Bila undefined, kembalikan dengan respons gagal.
    if (note !== undefined) {
        return {
            status: 'success',
            data: {
                note,
            },
        };
    }
    const response = h.response({
        status: 'fail',
        message: 'Catatan tidak ditemukan',
    });
    response.code(404);
    return response;
};

const editNoteByIdHandler = (request, h) => {
    // Catatan yang diubah akan diterapkan sesuai dengan id yang digunakan pada route parameter. Jadi, kita perlu mendapatkan nilai id-nya terlebih dahulu.
    const {id} = request.params;
    // Setelah itu, kita dapatkan data notes terbaru yang dikirimkan oleh client melalui body request.
    const {title, tags, body} = request.payload;
    // Selain itu, tentu kita perlu perbarui juga nilai dari properti updatedAt. Jadi, dapatkan nilai terbaru dengan menggunakan new Date().toISOString().
    const updatedAt = new Date().toISOString();

    // using array indexing to find id
    // Pertama, dapatkan dulu index array pada objek catatan sesuai id yang ditentukan. Untuk melakukannya, gunakanlah method array findIndex().
    const index = notes.findIndex((note) => note.id === id);
    // Bila note dengan id yang dicari ditemukan, index akan bernilai array index dari objek catatan yang dicari. Namun, bila tidak ditemukan, index akan bernilai -1. Jadi, kita bisa menentukan gagal atau tidaknya permintaan dari nilai index menggunakan if else.
    if (index !== -1) {
        notes[index] = {
            ...notes[index],
            title,
            tags,
            body,
            updatedAt,
        };
        const response = h.response({
            status: 'success',
            message: 'Catatan berhasil diperbarui',
        });
        response.code(200);
        return response;
    }
    const response = h.response({
        status: 'fail',
        message: 'Gagal memperbarui catatan. Id tidak ditemukan',
    });
    response.code(404);
    return response;
};

const deleteNoteByIdHandler = (request, h) => {
    // Sama seperti mengubah catatan, kita akan memanfaatkan index untuk menghapus catatan.
    // Pertama, kita dapatkan dulu nilai id yang dikirim melalui path parameter.
    const {id} = request.params;
    // Selanjutnya, dapatkan index dari objek catatan sesuai dengan id yang didapat.
    const index = notes.findIndex((note) => note.id === id);
    // Lakukan pengecekan terhadap nilai index, pastikan nilainya tidak -1 bila hendak menghapus catatan. Nah, untuk menghapus data pada array berdasarkan index, gunakan method array splice().
    if (index !== -1) {
        notes.splice(index, 1);
        const response = h.response({
            status: 'success',
            message: 'Catatan berhasil dihapus',
        });
        response.code(200);
        return response;
    }
    // Bila index bernilai -1, kembalikan handler dengan respons gagal.
    const response = h.response({
        status: 'fail',
        message: 'Catatan gagal dihapus. Id tidak ditemukan',
    });
    response.code(404);
    return response;
};

module.exports = {addNoteHandler, getAllNotesHandler, getNoteByIdHandler, editNoteByIdHandler, deleteNoteByIdHandler};
