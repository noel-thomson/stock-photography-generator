let defaultQuery = "architecture";

$(() => {
  $("#searchForm").on("submit", function(e) {
    let choice = $("#searchText").val();
    getPhotos(choice);
    e.preventDefault();
  });
});

$(() => {
  $(".examples").click(function() {
    let choice = $(this).html();
    getPhotos(choice);
  });
});

$.ajaxSetup({
  beforeSend: function(xhr) {
    xhr.setRequestHeader(
      "authorization",
      "563492ad6f91700001000001a105c9a834ff4589957585a65784a766"
    );
  }
});

const getPhotos = query => {
  $.getJSON("https://api.pexels.com/v1/search?", {
    query: query
  }).then(function(res) {
    console.log(res.photos);
    $(".images__container").remove(); // remove previous photo container
    displayPhotos(res.photos);
  });
};

const displayPhotos = array => {
  const container = `<div class="images__container"></div>`;
  $("#images").append(container); // appends container into DOM element
  const imageWrapper = array
    .map(i => {
      let image = `<div class="image__wrapper">
				        <img class="image" src="${i.src.large}" alt="">
                    </div>`;
      return image;
    })
    .join("");
  $(".images__container").append(imageWrapper);
};

getPhotos(defaultQuery);

// v1: flickr

// const app = {
//   apiUrl:
//     "https://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?"
// };

// app.eventListener = () => {
//   $("#selection").on("change", function() {
//     const choice = $(this).val();
//     app.getPhotos(choice);
//   });
// };

// app.init = () => {
//   app.eventListener();
//   app.getPhotos("architecture");
// };

// $(() => {
//   app.init();
// });

// flickr api
// app.getPhotos = query => {
//   $.getJSON(app.apiUrl, {
//     apiKey: "379cfdca1307ffffd901dcad5c53aeac",
//     tags: query,
//     ids:
//       ",78918407@N08, ,78621811@N06, ,91805169@N04, ,156824961@N07, ,63848257@N06, ,96403371@N04,",
//     tagmode: "any",
//     format: "json",
//     safe_search: 1,
//     content_type: 1
//   }).then(data => {
//     $(".images__container").remove();
//     console.log(data.items);
//     app.displayPhotos(data.items);
//   });
// };
