const tripTypeInputs = document.querySelectorAll('input[name="tripType"]');
const returnDateFields = document.querySelectorAll(".return-date");
const flightFields = document.getElementById("flightFields");
const addFlightBtnContainer = document.getElementById("addFlightBtn");
const addFlight = document.getElementById("addFlight");

let multiCityDisabled = false;
let firstAddClicked = false;

function handleTripTypeChange(value) {
  if (value === "return") {
    returnDateFields.forEach((f) => f.classList.remove("d-none"));
    addFlightBtnContainer.classList.add("d-none");
    $(".return-date").removeClass("disabled");
    clearExtraFlights();
    resetAddFlightFlags();
  } else if (value === "oneway") {
    returnDateFields.forEach((f) => f.classList.add("d-none"));
    addFlightBtnContainer.classList.add("d-none");
    $(".return-date").addClass("disabled");
    $(".return-date").removeClass("d-none");
    clearExtraFlights();
    resetAddFlightFlags();
  } else if (value === "multicity") {
    returnDateFields.forEach((f) => f.classList.add("d-none"));
    addFlightBtnContainer.classList.remove("d-none");
    $(".return-date").addClass("disabled");
    $(".return-date").removeClass("d-none");
    resetAddFlightFlags();
    clearExtraFlights();
    appendFlightRow(); // First row (no remove button)

    // Disable the multiCity radio
    const multiCityRadio = document.getElementById("multiCity");
    if (multiCityRadio) {
      multiCityRadio.disabled = true;
      multiCityDisabled = true;
    }

    firstAddClicked = true;
  }
}

// On page load, check which trip type is selected
document.addEventListener("DOMContentLoaded", () => {
  const checkedInput = Array.from(tripTypeInputs).find(
    (input) => input.checked
  );
  if (checkedInput) {
    handleTripTypeChange(checkedInput.value);
  }
});

// On user changes (clicks or keyboard change), handle accordingly
tripTypeInputs.forEach((input) => {
  input.addEventListener("change", function () {
    if (this.checked) {
      handleTripTypeChange(this.value);
    }
  });
});

function resetAddFlightFlags() {
  firstAddClicked = false;
  multiCityDisabled = false;
  enableMultiCityRadio();
}

function clearExtraFlights() {
  const allRows = flightFields.querySelectorAll(".flight-row");
  allRows.forEach((row, index) => {
    if (index > 0) row.remove();
  });
}

function enableMultiCityRadio() {
  const multiCityRadio = document.getElementById("multiCity");
  if (multiCityRadio) {
    multiCityRadio.disabled = false;
  }
}

addFlight.addEventListener("click", function () {
  if (!firstAddClicked) {
    const multiCityRadio = document.getElementById("multiCity");
    if (multiCityRadio) {
      multiCityRadio.disabled = true;
      multiCityDisabled = true;
    }
    firstAddClicked = true;
  }
  appendFlightRow(true); // subsequent rows with remove
});

function appendFlightRow(showRemove = false) {
  const row = document.createElement("div");
  row.classList.add("row", "g-2", "align-items-end", "mt-3", "flight-row");

  row.innerHTML = `
    <div class="col-md-10 pading-right-adjust">
      <div class="row filght-row-border">
        <div class="col-md-4 m-0 pe-0">
          <div class="form-floating">
            <input type="text" class="form-control style-input fromInput" placeholder="From">
            <label>From</label>
          </div>
        </div>
        <div class="col-1 text-start mb-0 ps-3 mt-2">
          <span class="flight-icon ms-1"><img src="./assets/images/shapes/swipe.svg" width="20" height="20" alt="Swipe Icon"></span>
        </div>
        <div class="col-md-3 m-0 ps-3">
          <div class="form-floating">
            <input type="text" class="form-control style-input toInput" placeholder="To">
            <label>To</label>
          </div>
        </div>
        <div class="col-md-4 ps-5">
          <div class="row">
            <div class="col-md-12 position-relative ps-5">
              <div class="vertical-hr"></div>
              <div class="form-floating">
                <input type="text" class="form-control style-input date-icon-set departure" placeholder="Departure Date">
                <label><span class="right-border">Departure</span></label>
              </div>
            </div>
          </div>
        </div>
      </div>       
    </div>
    ${
      showRemove
        ? `
    <div class="col-md-2">
      <button type="button" class="remove-flight fs-4 btn btn-outline-danger ms-2 p-2 rounded-pill" title="Remove Flight">&times;</button>
    </div>`
        : ""
    }
  `;

  // Attach remove functionality if button exists
  if (showRemove) {
    row.querySelector(".remove-flight").addEventListener("click", () => {
      row.remove();
      const flightRows = flightFields.querySelectorAll(".flight-row");
      if (flightRows.length <= 1) {
        enableMultiCityRadio();
        firstAddClicked = false;
      }
    });
  }

  // Append the new row
  flightFields.appendChild(row);

  // Autofill "From" with previous "To"
  const allRows = flightFields.querySelectorAll(".flight-row");
  if (allRows.length > 1) {
    const prevRow = allRows[allRows.length - 2];
    const prevToInput = prevRow.querySelector(".toInput");
    const newFromInput = row.querySelector(".fromInput");
    if (prevToInput && newFromInput) {
      newFromInput.value = prevToInput.value;
    }
  }

  // Re-initialize datepickers
  initDatePickers();
  // Select all swap arrows on the page
  const swapIcons = document.querySelectorAll(".flight-icon");

  swapIcons.forEach((icon) => {
    icon.addEventListener("click", () => {
      // Find the closest common parent container for this form group (adjust if needed)
      const container = icon.closest(
        ".row, .form-group, .form-floating"
      ).parentElement;

      if (!container) return;

      // Query fromInput and toInput inside this container
      const fromInput = container.querySelector(".fromInput");
      const toInput = container.querySelector(".toInput");

      if (fromInput && toInput) {
        // Swap their values
        const temp = fromInput.value;
        fromInput.value = toInput.value;
        toInput.value = temp;
      }
    });
  });
}

function initDatePickers() {
  $(".departure").each(function (index) {
    $(this).datepicker("destroy");

    let minDate = new Date();

    if (index > 0) {
      const prevVal = $(".departure")
        .eq(index - 1)
        .val();
      if (prevVal) {
        const prevDate = new Date(prevVal);
        prevDate.setDate(prevDate.getDate() + 1);
        minDate = prevDate;
      }
    }

    $(this)
      .datepicker({
        minDate: minDate,
        dateFormat: "mm/dd/yy",
      })
      .on("changeDate", function (e) {
        const $row = $(this).closest(".flight-row");
        const $return = $row.find(".return");

        if ($return.length) {
          const departureDate = e.date;
          const minReturnDate = new Date(departureDate);
          minReturnDate.setDate(minReturnDate.getDate() + 1);

          $return.datepicker("setStartDate", minReturnDate);
          const returnDate = $return.datepicker("getDate");
          if (returnDate && returnDate < minReturnDate) {
            $return.val("");
          }
        }
      });
  });

  // Initialize return fields if they exist
  $(".return").datepicker("destroy").datepicker({
    autoclose: true,
    todayHighlight: true,
    startDate: new Date(),
  });
}

$(document).ready(function () {
  initDatePickers();
});

// Select all swap arrows on the page
const swapIcons = document.querySelectorAll(".flight-icon");

swapIcons.forEach((icon) => {
  icon.addEventListener("click", () => {
    // Find the closest common parent container for this form group (adjust if needed)
    const container = icon.closest(
      ".row, .form-group, .form-floating"
    ).parentElement;

    if (!container) return;

    // Query fromInput and toInput inside this container
    const fromInput = container.querySelector(".fromInput");
    const toInput = container.querySelector(".toInput");

    if (fromInput && toInput) {
      // Swap their values
      const temp = fromInput.value;
      fromInput.value = toInput.value;
      toInput.value = temp;
    }
  });
});

////////////////////////////////////////////////Select class dropdown
const dropdownItems = document.querySelectorAll(".class-menu .class-item");
const dropdownButton = document.getElementById("selectClass");

dropdownItems.forEach((item) => {
  item.addEventListener("click", function (e) {
    e.preventDefault();

    dropdownButton.textContent = this.textContent;

    dropdownItems.forEach((el) => el.classList.remove("active"));

    this.classList.add("active");
  });
});

///////////////////////////////////////////// Initial passenger counts
const counts = {
  adult: 1,
  child: 0,
  infant: 0,
};

function changeCount(type, delta) {
  const newCount = counts[type] + delta;

  // Prevent negative values
  if (newCount < 0) return;

  const currentTotal = counts.adult + counts.child + counts.infant;
  const newTotal = currentTotal + delta;

  // Enforce max total of 9
  if (delta > 0 && newTotal > 9) return;

  // Simulate the new state to check if all would become 0
  const tempCounts = { ...counts, [type]: newCount };
  const tempTotal = tempCounts.adult + tempCounts.child + tempCounts.infant;

  // Prevent all counts from being zero at the same time
  if (tempTotal < 1) return;

  // Apply the change
  counts[type] = newCount;

  // Update UI
  document.getElementById(`${type}-count`).textContent = counts[type];
  updatePassengerButton();
}

// Update the passenger button text dynamically
function updatePassengerButton() {
  const total = counts.adult + counts.child + counts.infant;
  const label = total === 1 ? "Passenger" : "Passengers";
  const formattedCount = total.toString().padStart(2, "0");
  document.getElementById(
    "passenger-button"
  ).textContent = `${formattedCount} ${label}`;
}

document.addEventListener("click", function (event) {
  const dropdown = document.getElementById("dropdown");
  if (!dropdown.contains(event.target)) {
    dropdown.classList.remove("open");
  }
});

document.addEventListener("DOMContentLoaded", function () {
  updatePassengerButton();
});

function toggleDropdown() {
  document.getElementById("dropdown").classList.toggle("open");
}

////////////////////////////////////Departure and return date validation

$(function () {
  // Initialize Departure Datepicker
  $(".departure").datepicker({
    dateFormat: "mm/dd/yy",
    minDate: 0,
    onSelect: function () {
      const departureDate = $(this).datepicker("getDate");
      const minReturnDate = new Date(departureDate.getTime() + 86400000);

      $(".return").datepicker("option", "minDate", minReturnDate);

      $(".return").val("");

      $(".return").datepicker("refresh");

      $(".return-date").removeClass("d-none");
    },
  });

  // Initialize Return Datepicker (even if hidden initially)
  $(".return").datepicker({
    dateFormat: "mm/dd/yy",
    minDate: 0,
  });
});
