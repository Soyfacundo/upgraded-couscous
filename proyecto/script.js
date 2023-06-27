document.addEventListener("DOMContentLoaded", function() {
  var prevBtn = document.getElementById("prev");
  var nextBtn = document.getElementById("next");
  var calendarBody = document.getElementById("calendar-body");
  var monthYear = document.getElementById("month-year");

  var date = new Date();
  var month = date.getMonth();
  var year = date.getFullYear();

  showCalendar(month, year);

  prevBtn.addEventListener("click", function() {
    month--;
    if (month < 0) {
      month = 11;
      year--;
    }
    showCalendar(month, year);
  });

  nextBtn.addEventListener("click", function() {
    month++;
    if (month > 11) {
      month = 0;
      year++;
    }
    showCalendar(month, year);
  });

  monthYear.addEventListener("click", function() {
    if (monthYear.getElementsByTagName("select").length === 0) {
      var selectYear = document.createElement("select");
      selectYear.addEventListener("change", function() {
        year = parseInt(selectYear.value);
        showCalendar(month, year);
      });

      for (var i = 1990; i <= 2050; i++) {
        var option = document.createElement("option");
        option.value = i;
        option.text = i;
        selectYear.appendChild(option);
      }

      selectYear.value = year;

      monthYear.innerHTML = "";
      monthYear.appendChild(selectYear);
    }
  });

  function showCalendar(month, year) {
    var firstDay = new Date(year, month).getDay();
    var daysInMonth = new Date(year, month + 1, 0).getDate();
    var dateCounter = 1;

    calendarBody.innerHTML = "";
    monthYear.innerHTML = getMonthName(month) + " " + year;

    for (var i = 0; i < 6; i++) {
      var row = document.createElement("tr");

      for (var j = 0; j < 7; j++) {
        if (i === 0 && j < firstDay) {
          var cell = document.createElement("td");
          var cellText = document.createTextNode("");
          cell.appendChild(cellText);
          row.appendChild(cell);
        } else if (dateCounter > daysInMonth) {
          break;
        } else {
          var cell = document.createElement("td");
          var cellText = document.createTextNode(dateCounter);
          cell.appendChild(cellText);
          row.appendChild(cell);
          dateCounter++;
        }
      }

      calendarBody.appendChild(row);
    }
  }

  function getMonthName(month) {
    var monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    return monthNames[month];
  }
});
