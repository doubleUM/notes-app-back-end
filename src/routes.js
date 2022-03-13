const {addNoteHandler, getAllNotesHandler, getNoteByIdHandler, editNoteByIdHandler, deleteNoteByIdHandler} = require('./handler');
const routes = [
    {
        // this one is to add new notes
        method: 'POST',
        path: '/notes',
        handler: addNoteHandler,
    },
    {
        // this one is to display notes added in the main menu
        method: 'GET',
        path: '/notes',
        handler: getAllNotesHandler,
    },
    {
        // this one is to display specific notes (when we click a note it will show up)
        method: 'GET',
        path: '/notes/{id}',
        handler: getNoteByIdHandler,
    },
    {
        // this one allows us to edit the notes
        method: 'PUT',
        path: '/notes/{id}',
        handler: editNoteByIdHandler,
    },
    {
        // this one to delete a note
        method: 'DELETE',
        path: '/notes/{id}',
        handler: deleteNoteByIdHandler,
    },
];

module.exports = routes;
