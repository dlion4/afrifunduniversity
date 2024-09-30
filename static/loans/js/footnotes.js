function loadFootNote(filter = "StudentLoan") {
  $.ajax({
    url: "/api/footnotes/",
    type: "GET",
    success: function (response) {
      const RefinanceNotes = response.filter(item => item.category === filter).slice(0, 10);
      const sortedNotes = RefinanceNotes.sort((a, b) => a.id - b.id);
      const newContent = sortedNotes.map((note, index) => `
                <div class="footnote__item" style="display: none;">
                        <span class="footnote__id">${index + 1}</span>
                        <p class="p-xsmall">${note.content}</p>
                    </div>
                `).join(" ");

      $(".footnotes__content").html(newContent);

      $(".footnote__item").each(function (index) {
        $(this).delay(index * 200).fadeIn(600);
      });
    },

    error: function (xhr, status, error) {
      console.log("Error:", error);
      return false;
    }
  });
}

function LoanTerm() {
  $.ajax({
    url: "/static/loans/loan-term.json",
    type: "GET",
    dataType: "json",
    success: function (response) {
      var container = $('[data-range-slider-options="loan-term-range-slider"]');
      if (!container) {
        return false;
      }
      console.log(container);
      container.empty();
      response.slice(0, 5).forEach(function (item) {
        var term = item.duration;
        var description = item.message;
        var div = $("<div>").attr("data-range-slider-option", term + "|" + description);
        container.append(div);
      });
    },
    error: function (xhr, status, error) {
      console.log("Error fetching data:", xhr.responseText);
    }
  });
}