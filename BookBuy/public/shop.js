let itemname;
let itemAname;
function addProduct (bname, baname, price,condition, done) {
    $.post('/api/upload', {
        book_name: bname,
        author_name: baname,
        price: price,
        condition: condition,
    }, function (data) {
        done(data)
    })
}


function fetchBooks (done) {
    $.get('/api/upload', function (data) {
        done(data)
    })
}

function clickedItem(bname, baname){
  itemname = bname;
  itemAname = baname;
  console.log(itemAname);
  //window.location.href = "/item.html"
}

function viewItem(done){
  console.log(itemAname);
   $.post('/api/upload/item',{
     book_name: itemname,
     author_name: itemAname
   },function (data){
      done(data)
      // console.log(data.bookName)
      // window.location.href = "/item.html"
   })
}

function createBookCard (book) {
    return $(`
    <div class="col s4 m4">
      <div class="card">
        <div class="card-image" onclick = "clickedItem('${book.bookName}','${book.authorName}')">
          <img src="https://media.gettyimages.com/photos/stack-of-books-picture-id507311349">
          <span class="card-title" style = "font-size: 25px;">${book.bookName}</span>
        </div>
        <div class="card-content">
          <div class = "row">
            <div class = "col s6 ">
               <span>${book.authorName}</span>
            </div>
            <div class = "col s6 ">
               <span style = "font-weight:bold; margin-left: 50px;" >Rs. ${book.price}</span>
            </div>
          </div>
        </div>
        <div class="card-action">
          <a href="#">This is a link</a>
        </div>
      </div>
    </div>`
        )
}