export  function selectBook(book) {
    console.log('Book has been seleted : '+book.title);
    return {
        type : 'BOOK_SELECTED',
        payload : book
    };
}

export  function createTeam(props) {
    console.dir(props);
}

export  function createMatch(props) {
    console.dir(props);
}
