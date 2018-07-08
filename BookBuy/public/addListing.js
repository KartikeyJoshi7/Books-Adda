$(function () {
    let book_name = $('#book_name')
    let author_name = $('#author_name')
    let image ="" 
    let price = $('#price')
    let condition = $('#condition')
    
    let username = $('#user-name')
        $.get('/api/home', function (data) {
            username.text("Welcome "+ data)
        })

    $('#btnProductAdd').click(function () {
        
        addProduct(
            book_name.val(),
            author_name.val(),
            price.val(),
            condition.val(),
            function (addedProduct) {
                window.alert("Added " + addedProduct.bookName + " to Database")
                $(location).attr('href', '/home.html')
            }
        )


    })

})