"use strict";

var app = {
  apiUrl: "https://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?"
};

app.displayPhotos = function (array) {
  var container = "<div class=\"images__container\"></div>";
  $("#images").append(container); // appends container *into* DOM element

  var imageWrapper = array.map(function (i) {
    var image = "<div class=\"image__wrapper\">\n\t\t\t\t        <img class=\"image\" src=\"".concat(i.media.m, "\" alt=\"\">\n                    </div>");
    return image;
  }).join("");
  $(".images__container").append(imageWrapper);
};

app.getPhotos = function (query) {
  $.getJSON(app.apiUrl, {
    apiKey: "379cfdca1307ffffd901dcad5c53aeac",
    tags: query,
    ids: ",78918407@N08, ,78621811@N06, ,91805169@N04, ,156824961@N07, ,63848257@N06, ,96403371@N04,",
    tagmode: "any",
    format: "json",
    safe_search: 1,
    content_type: 1
  }).then(function (data) {
    $(".images__container").remove();
    console.log(data.items);
    app.displayPhotos(data.items);
  });
};

app.eventListener = function () {
  $("#selection").on("change", function () {
    var choice = $(this).val();
    app.getPhotos(choice);
  });
};

app.init = function () {
  app.eventListener();
  app.getPhotos("architecture");
};

$(function () {
  app.init();
});