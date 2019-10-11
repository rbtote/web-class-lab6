//    AIzaSyCHDPL3c68LrsF-i1wQIzmMEkxQORH4e0M

//    GET https://www.googleapis.com/youtube/v3/search

//    https://www.youtube.com/watch?v=kJQP7kiw5Fk

var st = "";
var previousPageT = "";
var nextPageT = "";

$("#btn_submit").on( "click", function( event ) {
    $('#results').html("");
    event.preventDefault();
    st = $('#searchInput').val()
    request(st, "")
});

$('#btn_next').click(function (event) {
  if(nextPageT) {
      $('#results').html("");
      request(st, nextPageT);
  }
});

$('#btn_prev').click(function (event) {
    if(previousPageT) {
      $('#results').html("");
        request(st, previousPageT);
    }
});

function request(term, token){
  $.ajax({
         cache: false,
         data: $.extend({
             key: 'AIzaSyDSXazEd-ikPjJs-MCHn5VbahYznc6jK9g',
             q: term,
             part: 'snippet',
             order: 'viewCount',
             pageToken: token
         }, {
             maxResults: 10,            
         }),
         dataType: 'json',
         type: 'GET',
         timeout: 5000,
         url: 'https://www.googleapis.com/youtube/v3/search',
         success: function(respuesta) {
          console.log(respuesta);
          nextPageT = respuesta.nextPageToken;
          previousPageT = respuesta.prevPageToken;
          for(var i=0; i<10; i++){
            var item = respuesta.items[i];
            var title = item.snippet.title;
            var desc = item.snippet.description;
            var url = "https://www.youtube.com/watch?v="+item.id.videoId;
            var thumbnl = item.snippet.thumbnails.default.url;        
            var imgTh = document.createElement('img');
            imgTh.setAttribute("src",thumbnl);            
            var li = document.createElement("li");
            var divLi = document.createElement("div");
            divLi.className ="divLi";
            divLi.setAttribute("onclick", "window.open('"+url+"', '_blank');");
            var pTitle = document.createElement("p");
            pTitle.className ="pTitle";
            var pDesc = document.createElement("p");
            pDesc.className ="pDesc";
            pTitle.textContent = title;
            pDesc.textContent = desc;
            divLi.appendChild(imgTh);
            divLi.appendChild(pTitle);
            divLi.appendChild(pDesc);
            li.appendChild(divLi);
            $("#results").append(li)
          }          
        },
        error: function(err) {
          console.log(err);
        }
     })
}