$(document).ready(function () {

  function searchVideo(q, maxResults) {
    var data = {
      maxResults : maxResults,
      key : " ",
      part : "snippet",
      q : q,
      type : "video"
    }

    $.getJSON("https://www.googleapis.com/youtube/v3/search", data, function (res) {
      $("#video-list .video").remove();
      $(res.items).each(function () {
        console.log(this);
        var thumbnail = this.snippet.thumbnails.high.url;
        var title = this.snippet.title;
        var description = this.snippet.description;
        var id = this.id.videoId;
        var video = $('<div class="video row" data-video-id="' + id + '"> <div class="thumbnail col-lg-5 col-md-5 col-sm-5 col-12"> <img src="' + thumbnail + '" alt="Thumbail"> </div><div class="video-info col-lg-7 col-md-7 col-sm-7 col-12"> <h3>' + title + '</h3> <div class="description"> <p>' + description + '</p></div></div></div>');
        $("#video-list").append(video);
      });
    });
  }

  $("#desplegar").on("click", function () {
    $("#description").toggle();
  });

  $("#Buscador").on("submit", function (e) {
    e.preventDefault();
    var q = $("#q").val();
    if (q == "") {
      alert("¡Escribe algo para buscar!");
    }
    else {
      searchVideo(q, 5);
      $("#q").val("");
    }
  });

  $(document).on("click", ".video", function () {
    var urlBase = "https://www.youtube.com/embed/";
    var videoId = $(this).attr("data-video-id");
    var video = urlBase + videoId;
    $("iframe").attr("src", video);
  });

});
