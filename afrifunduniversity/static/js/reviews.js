// fetch the data from the server

function LoadReview() {
  $.ajax({
    url: "/api/reviews/",
    success: function (data) {},
    error: function (xhr, status, error) {
      console.error(xhr.responseText);
    }
  });
}