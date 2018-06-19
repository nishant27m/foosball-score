export  function selectBook(book) {
    console.log('Book has been seleted : '+book.title);
    return {
        type : 'BOOK_SELECTED',
        payload : book
    };
}