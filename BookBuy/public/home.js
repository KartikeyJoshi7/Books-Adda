$(function () {

    let bookList = $('#book-list')
    let username = $('#user-name')
    


    fetchBooks(function (books) {
        bookList.empty()
        $.get('/api/home', function (data) {
            username.text("Welcome "+ data)
        })

        for (book of books) {
            bookList.append(createBookCard(book))
        }
    })
 
})