document.getElementById("volume").addEventListener("change", function() {
    document.getElementById("changeThisVolume").innerHTML = 'Количество показываемых книг: ' + this.value;
  });

$(document).ready(function () {
    $("#srch").click(function () {
        var search = $("#books").val();

        if(search == ''){
            alert("Вы ничего не ввели. Введите что-нибудь.");
        }
        else{
            $("#Loading").css("display", "block");

            search = search.replace(/\s/g,'+');
            var url = '';
            var img = '';
            var title = '';
            var author = '';
            var price = '';
            var quantity = '&startIndex=0&maxResults=' + $("#volume").val();
            
            if($('input[name=Radios]:checked', '#mform').val() == "All"){
                price = '';
            }
            if($('input[name=Radios]:checked', '#mform').val() == "Price"){
                price = '&filter=paid-ebooks';
            }
            if($('input[name=Radios]:checked', '#mform').val() == "Free"){
                price = '&filter=free-ebooks';
            }


            $.get("https://www.googleapis.com/books/v1/volumes?q=" + search + price + quantity, function(response) {
                console.log(response);

                $("#result").empty();

                for(i=0; i<response.items.length;i++){
                    title = $('<br><hr><h5 class="text-center">' + response.items[i].volumeInfo.title + "</h5>");
                    if(typeof response.items[i].volumeInfo.authors != "undefined"){
                        author = $('<h5 class="text-center">' + response.items[i].volumeInfo.authors + "</h5>");
                    }
                    else{
                        author = $('<h5 class="text-center">' + "Авторы не найдены" + "</h5>");
                    }
                    img = $('<img class="centerize h"><br><a href=' + response.items[i].volumeInfo.infoLink + '><br><button class="btn btn-warning centerize">Перейти к книге</button></a><br>');
                    if(response.items[i].volumeInfo.hasOwnProperty('imageLinks')){
                        url = response.items[i].volumeInfo.imageLinks.thumbnail;
                        img.attr('src',url);
                    }
                    else{
                        img.attr('src', 'Otsutst.jpg');
                    }
                    title.appendTo("#result");
                    author.appendTo("#result");
                    img.appendTo("#result");
                }

                $("#result").append('<br>');

                $("#Loading").css("display", "none");
            });
        }
    })
});