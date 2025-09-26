(function ($) {
  "use strict";

  if ($(".tour-sidebar__sorter-toggler").length) {
    $(".tour-sidebar__sorter-toggler").on("click", function () {
      $(this).toggleClass("toggled");
      $(this)
        .parent()
        .parent()
        .find(".tour-sidebar__sorter-content")
        .slideToggle();
    });
  }

  if ($(".range-slider-price").length) {
    var priceRange = document.getElementById("range-slider-price");

    noUiSlider.create(priceRange, {
      start: [76, 150],
      limit: 200,
      behaviour: "drag",
      connect: true,
      range: {
        min: 10,
        max: 200,
      },
    });

    var limitFieldMin = document.getElementById("min-value-rangeslider");
    var limitFieldMax = document.getElementById("max-value-rangeslider");

    priceRange.noUiSlider.on("update", function (values, handle) {
      (handle ? $(limitFieldMax) : $(limitFieldMin)).text(values[handle]);
    });
  }

  if ($(".listing-details__contact-info-phone").length) {
    $(".listing-details__contact-info-phone").on("click", function (e) {
      e.preventDefault();
      var textElement = $(this).find(".text h5");
      var mainText = textElement.data("number");
      var toggleText = textElement.data("toggle-number");
      if (textElement.text() == mainText) {
        textElement.text(toggleText);
      } else {
        textElement.text(mainText);
      }
    });
  }

  if ($(".listing-top__map-show-hide").length) {
    $(".listing-top__map-show-hide").on("click", function () {
      $(this).toggleClass("hidden");
      var textElement = $(this).find(".listing-top__map-show-hide-text span");
      if (textElement.text() == textElement.data("text")) {
        textElement.text(textElement.data("toggle-text"));
      } else {
        textElement.text(textElement.data("text"));
      }
      $(".listing__map").toggleClass("hidden");
      $(".listing__content").toggleClass("hidden");
    });
  }

  if ($("#datepicker2").length) {
    $("#datepicker2").datepicker();
  }
  if ($("#dob").length) {
    $("#dob").datepicker();
  }
  if ($("#expiryDate").length) {
    $("#expiryDate").datepicker();
  }

  if ($("#departure-insurance").length) {
    $("#departure-insurance").datepicker();
  }
  if ($("#return-insurance").length) {
    $("#return-insurance").datepicker();
  }
  if ($("#departure").length) {
    $("#departure").datepicker();
  }
  if ($("#return").length) {
    $("#return").datepicker();
  }
  if ($("#dob-insurance").length) {
    $("#dob-insurance").datepicker();
  }
  if ($("#date").length) {
    $("#date").datepicker();
  }
  if ($("#datepicker-inline").length) {
    $("#datepicker-inline").datepicker();
  }

  $('input[name="time"]').ptTimeSelect();

  if ($(".banner-bg-slide").length) {
    $(".banner-bg-slide").each(function () {
      var Self = $(this);
      var bgSlideOptions = Self.data("options");
      var bannerTwoSlides = Self.vegas(bgSlideOptions);
    });
  }

  //Pricing Tabs
  if ($(".pricing-tabs").length) {
    $(".pricing-tabs .tab-btns .tab-btn").on("click", function (e) {
      e.preventDefault();
      var target = $($(this).attr("data-tab"));

      if ($(target).hasClass("actve-tab")) {
        return false;
      } else {
        $(".pricing-tabs .tab-btns .tab-btn").removeClass("active-btn");
        $(this).addClass("active-btn");
        $(".pricing-tabs .pr-content .pr-tab").removeClass("active-tab");
        $(target).addClass("active-tab");
      }
    });
  }

  // Type Effect
  if ($(".typed-effect").length) {
    $(".typed-effect").each(function () {
      var typedStrings = $(this).data("strings");
      var typedTag = $(this).attr("id");
      var typed = new Typed("#" + typedTag, {
        typeSpeed: 100,
        backSpeed: 100,
        fadeOut: true,
        loop: true,
        strings: typedStrings.split(","),
      });
    });
  }

  // Popular Causes Progress Bar
  if ($(".count-bar").length) {
    $(".count-bar").appear(
      function () {
        var el = $(this);
        var percent = el.data("percent");
        $(el).css("width", percent).addClass("counted");
      },
      {
        accY: -50,
      }
    );
  }

  //Progress Bar / Levels
  if ($(".progress-levels .progress-box .bar-fill").length) {
    $(".progress-box .bar-fill").each(
      function () {
        $(".progress-box .bar-fill").appear(function () {
          var progressWidth = $(this).attr("data-percent");
          $(this).css("width", progressWidth + "%");
        });
      },
      {
        accY: 0,
      }
    );
  }

  //Fact Counter + Text Count
  if ($(".count-box").length) {
    $(".count-box").appear(
      function () {
        var $t = $(this),
          n = $t.find(".count-text").attr("data-stop"),
          r = parseInt($t.find(".count-text").attr("data-speed"), 10);

        if (!$t.hasClass("counted")) {
          $t.addClass("counted");
          $({
            countNum: $t.find(".count-text").text(),
          }).animate(
            {
              countNum: n,
            },
            {
              duration: r,
              easing: "linear",
              step: function () {
                $t.find(".count-text").text(Math.floor(this.countNum));
              },
              complete: function () {
                $t.find(".count-text").text(this.countNum);
              },
            }
          );
        }
      },
      {
        accY: 0,
      }
    );
  }

  // Accrodion
  if ($(".accrodion-grp").length) {
    var accrodionGrp = $(".accrodion-grp");
    accrodionGrp.each(function () {
      var accrodionName = $(this).data("grp-name");
      var Self = $(this);
      var accordion = Self.find(".accrodion");
      Self.addClass(accrodionName);
      Self.find(".accrodion .accrodion-content").hide();
      Self.find(".accrodion.active").find(".accrodion-content").show();
      accordion.each(function () {
        $(this)
          .find(".accrodion-title")
          .on("click", function () {
            if ($(this).parent().hasClass("active") === false) {
              $(".accrodion-grp." + accrodionName)
                .find(".accrodion")
                .removeClass("active");
              $(".accrodion-grp." + accrodionName)
                .find(".accrodion")
                .find(".accrodion-content")
                .slideUp();
              $(this).parent().addClass("active");
              $(this).parent().find(".accrodion-content").slideDown();
            }
          });
      });
    });
  }

  // Popular Tour Carousel
  if ($(".popular-tours__carousel").length) {
    $(".popular-tours__carousel").owlCarousel({
      loop: true,
      margin: 30,
      nav: false,
      smartSpeed: 500,
      autoHeight: false,
      autoplay: true,
      dots: true,
      autoplayTimeout: 10000,
      navText: [
        '<span class="icon-left-arrow"></span>',
        '<span class="icon-right-arrow"></span>',
      ],
      responsive: {
        0: {
          items: 1,
        },
        600: {
          items: 1,
        },
        800: {
          items: 2,
        },
        1024: {
          items: 2,
        },
        1200: {
          items: 4,
        },
      },
    });
  }

  // Testimonial One Carousel
  if ($(".testimonial-one__carousel").length) {
    $(".testimonial-one__carousel").owlCarousel({
      loop: true,
      margin: 30,
      nav: false,
      smartSpeed: 500,
      autoHeight: false,
      autoplay: true,
      dots: true,
      autoplayTimeout: 10000,
      navText: [
        '<span class="icon-left-arrow"></span>',
        '<span class="icon-right-arrow"></span>',
      ],
      responsive: {
        0: {
          items: 1,
        },
        600: {
          items: 1,
        },
        800: {
          items: 2,
        },
        1024: {
          items: 2,
        },
        1200: {
          items: 3,
        },
      },
    });
  }

  // News Two Carousel
  if ($(".news-two__carousel").length) {
    $(".news-two__carousel").owlCarousel({
      loop: true,
      margin: 30,
      nav: true,
      smartSpeed: 500,
      autoHeight: false,
      autoplay: true,
      dots: false,
      autoplayTimeout: 10000,
      navText: [
        '<span class="icon-right-arrow left"></span>',
        '<span class="icon-right-arrow"></span>',
      ],
      responsive: {
        0: {
          items: 1,
        },
        600: {
          items: 1,
        },
        800: {
          items: 2,
        },
        1024: {
          items: 2,
        },
        1200: {
          items: 2,
        },
      },
    });
  }

  if ($(".scroll-to-target").length) {
    $(".scroll-to-target").on("click", function () {
      var target = $(this).attr("data-target");
      // animate
      $("html, body").animate(
        {
          scrollTop: $(target).offset().top,
        },
        1000
      );

      return false;
    });
  }

  if ($(".contact-form-validated").length) {
    $(".contact-form-validated").validate({
      // initialize the plugin
      rules: {
        name: {
          required: true,
        },
        email: {
          required: true,
          email: true,
        },
        message: {
          required: true,
        },
        subject: {
          required: true,
        },
      },
      submitHandler: function (form) {
        // sending value with ajax request
        $.post(
          $(form).attr("action"),
          $(form).serialize(),
          function (response) {
            $(form).parent().find(".result").append(response);
            $(form).find('input[type="text"]').val("");
            $(form).find('input[type="email"]').val("");
            $(form).find("textarea").val("");
          }
        );
        return false;
      },
    });
  }

  // mailchimp form
  if ($(".mc-form").length) {
    $(".mc-form").each(function () {
      var Self = $(this);
      var mcURL = Self.data("url");
      var mcResp = Self.parent().find(".mc-form__response");

      Self.ajaxChimp({
        url: mcURL,
        callback: function (resp) {
          // appending response
          mcResp.append(function () {
            return '<p class="mc-message">' + resp.msg + "</p>";
          });
          // making things based on response
          if (resp.result === "success") {
            // Do stuff
            Self.removeClass("errored").addClass("successed");
            mcResp.removeClass("errored").addClass("successed");
            Self.find("input").val("");

            mcResp.find("p").fadeOut(10000);
          }
          if (resp.result === "error") {
            Self.removeClass("successed").addClass("errored");
            mcResp.removeClass("successed").addClass("errored");
            Self.find("input").val("");

            mcResp.find("p").fadeOut(10000);
          }
        },
      });
    });
  }

  if ($(".video-popup").length) {
    $(".video-popup").magnificPopup({
      type: "iframe",
      mainClass: "mfp-fade",
      removalDelay: 160,
      preloader: true,

      fixedContentPos: false,
    });
  }

  if ($(".img-popup").length) {
    var groups = {};
    $(".img-popup").each(function () {
      var id = parseInt($(this).attr("data-group"), 10);

      if (!groups[id]) {
        groups[id] = [];
      }

      groups[id].push(this);
    });

    $.each(groups, function () {
      $(this).magnificPopup({
        type: "image",
        closeOnContentClick: true,
        closeBtnInside: false,
        gallery: {
          enabled: true,
        },
      });
    });
  }

  function dynamicCurrentMenuClass(selector) {
    // Get current file name from URL (last segment after '/')
    let FileName = window.location.href.split("/").reverse()[0];

    // Loop through all li elements inside selector
    selector.find("li").each(function () {
      let anchor = $(this).find("a");
      // If href matches file name, add 'current' class to li
      if ($(anchor).attr("href") == FileName) {
        $(this).addClass("current");
      }
    });

    // For li children that have descendant with 'current', add 'current' class as well
    selector.children("li").each(function () {
      if ($(this).find(".current").length) {
        $(this).addClass("current");
      }
    });

    // If no file name in URL (homepage), add 'current' class to first li
    if ("" == FileName) {
      selector.find("li").eq(0).addClass("current");
    }
  }

  if ($(".main-menu__list").length) {
    // dynamic current class
    let mainNavUL = $(".main-menu__list");
    dynamicCurrentMenuClass(mainNavUL);
  }

  if ($(".main-menu__list").length && $(".mobile-nav__container").length) {
    let navContent = document.querySelector(".main-menu__list").outerHTML;
    let mobileNavContainer = document.querySelector(".mobile-nav__container");
    mobileNavContainer.innerHTML = navContent;
  }
  if ($(".sticky-header__content").length) {
    let navContent = document.querySelector(".main-menu").innerHTML;
    let mobileNavContainer = document.querySelector(".sticky-header__content");
    mobileNavContainer.innerHTML = navContent;
  }

  if ($(".mobile-nav__container .main-menu__list").length) {
    let dropdownAnchor = $(
      ".mobile-nav__container .main-menu__list .dropdown > a"
    );

    dropdownAnchor.each(function () {
      let self = $(this); // 'self' = the anchor <a>

      // Append button to the anchor
      let toggleBtn = document.createElement("BUTTON");
      toggleBtn.setAttribute("aria-label", "dropdown toggler");
      toggleBtn.innerHTML = "<i class='fa fa-angle-down'></i>";
      self.append(toggleBtn);

      // Bind click to both <a> and appended <button>
      self.add(self.find("button")).on("click", function (e) {
        e.preventDefault();

        let self = $(this); // clicked element (either <a> or <button>)
        let dropdownItem = self.closest("li.dropdown");
        let submenu = dropdownItem.children("ul");

        self.toggleClass("expanded");
        dropdownItem.toggleClass("expanded");

        if (submenu.length) {
          submenu.slideToggle();
        }

        // Toggle arrow icon direction on button only
        dropdownItem.find("button i").toggleClass("fa-angle-down fa-angle-up");
      });
    });
  }

  if ($(".mobile-nav__toggler").length) {
    $(".mobile-nav__toggler").on("click", function (e) {
      e.preventDefault();
      $(".mobile-nav__wrapper").toggleClass("expanded");
      $("body").toggleClass("locked");
    });
  }

  if ($(".search-toggler").length) {
    $(".search-toggler").on("click", function (e) {
      e.preventDefault();
      $(".search-popup").toggleClass("active");
      $(".mobile-nav__wrapper").removeClass("expanded");
      $("body").toggleClass("locked");
    });
  }

  if ($(".odometer").length) {
    var odo = $(".odometer");
    odo.each(function () {
      $(this).appear(function () {
        var countNumber = $(this).attr("data-count");
        $(this).html(countNumber);
      });
    });
  }

  if ($(".dynamic-year").length) {
    let date = new Date();
    $(".dynamic-year").html(date.getFullYear());
  }

  if ($(".wow").length) {
    var wow = new WOW({
      boxClass: "wow", // animated element css class (default is wow)
      animateClass: "animated", // animation css class (default is animated)
      mobile: true, // trigger animations on mobile devices (default is true)
      live: true, // act on asynchronously loaded content (default is true)
    });
    wow.init();
  }

  if ($("#donate-amount__predefined").length) {
    let donateInput = $("#donate-amount");
    $("#donate-amount__predefined")
      .find("li")
      .on("click", function (e) {
        e.preventDefault();
        let amount = $(this).find("a").text();
        donateInput.val(amount);
        $("#donate-amount__predefined").find("li").removeClass("active");
        $(this).addClass("active");
      });
  }

  if ($(".thm-accordion").length) {
    let accordionWrapper = $(".thm-accordion");
    accordionWrapper.each(function () {
      let $this = $(this);
      let accordionID = $this.attr("id");
      let accordionTitle = $this.find(".thm-accordion__title");
      $this.addClass(accordionID);
      // default hide
      let mainAccordionContent = $this.find(".thm-accordion__content").hide();
      $this.find(".active-item .thm-accordion__content").show();
      // on title click
      accordionTitle.on("click", function (e) {
        e.preventDefault();
        let $this = $(this);
        let accordionItem = $(this).parent();
        if (false === accordionItem.hasClass("active-item")) {
          $("#" + accordionID)
            .find(".thm-accordion__item")
            .removeClass("active-item");
          accordionItem.addClass("active-item");
          mainAccordionContent.slideUp();
          accordionItem.find(".thm-accordion__content").slideDown();
        }
      });
    });
  }

  $(".add").on("click", function () {
    if ($(this).prev().val() < 999) {
      $(this)
        .prev()
        .val(+$(this).prev().val() + 1);
    }
  });
  $(".sub").on("click", function () {
    if ($(this).next().val() > 1) {
      if ($(this).next().val() > 1)
        $(this)
          .next()
          .val(+$(this).next().val() - 1);
    }
  });

  if ($(".tabs-box").length) {
    $(".tabs-box .tab-buttons .tab-btn").on("click", function (e) {
      e.preventDefault();
      var target = $($(this).attr("data-tab"));

      if ($(target).is(":visible")) {
        return false;
      } else {
        target
          .parents(".tabs-box")
          .find(".tab-buttons")
          .find(".tab-btn")
          .removeClass("active-btn");
        $(this).addClass("active-btn");
        target
          .parents(".tabs-box")
          .find(".tabs-content")
          .find(".tab")
          .fadeOut(0);
        target
          .parents(".tabs-box")
          .find(".tabs-content")
          .find(".tab")
          .removeClass("active-tab");
        $(target).fadeIn(300);
        $(target).addClass("active-tab");
      }
    });
  }

  function thmSwiperInit() {
    // swiper slider
    const swiperElm = document.querySelectorAll(".thm-swiper__slider");
    swiperElm.forEach(function (swiperelm) {
      const swiperOptions = JSON.parse(swiperelm.dataset.swiperOptions);
      let thmSwiperSlider = new Swiper(swiperelm, swiperOptions);
    });
  }

  function thmTinyInit() {
    // tiny slider
    const tinyElm = document.querySelectorAll(".thm-tiny__slider");
    tinyElm.forEach(function (tinyElm) {
      const tinyOptions = JSON.parse(tinyElm.dataset.tinyOptions);
      let thmTinySlider = tns(tinyOptions);
    });
  }

  function thmTestimonialsThumbCarousel() {
    if ($("#testimonials-one__thumb").length) {
      let testimonialsThumb = new Swiper("#testimonials-one__thumb", {
        slidesPerView: 3,
        spaceBetween: 0,
        speed: 1400,
        watchSlidesVisibility: true,
        watchSlidesProgress: true,
        autoplay: {
          delay: 5000,
        },
      });

      let testimonialsCarousel = new Swiper("#testimonials-one__carousel", {
        observer: true,
        observeParents: true,
        speed: 1400,
        mousewheel: true,
        slidesPerView: 1,
        autoplay: {
          delay: 5000,
        },
        thumbs: {
          swiper: testimonialsThumb,
        },
      });
    }
  }

  // ===Project===
  function projectMasonaryLayout() {
    if ($(".masonary-layout").length) {
      $(".masonary-layout").isotope({
        layoutMode: "masonry",
      });
    }
    if ($(".post-filter").length) {
      $(".post-filter li")
        .children(".filter-text")
        .on("click", function () {
          var Self = $(this);
          var selector = Self.parent().attr("data-filter");
          $(".post-filter li").removeClass("active");
          Self.parent().addClass("active");
          $(".filter-layout").isotope({
            filter: selector,
            animationOptions: {
              duration: 500,
              easing: "linear",
              queue: false,
            },
          });
          return false;
        });
    }

    if ($(".post-filter.has-dynamic-filters-counter").length) {
      // var allItem = $('.single-filter-item').length;
      var activeFilterItem = $(".post-filter.has-dynamic-filters-counter").find(
        "li"
      );
      activeFilterItem.each(function () {
        var filterElement = $(this).data("filter");
        var count = $(".filter-layout").find(filterElement).length;
        $(this)
          .children(".filter-text")
          .append('<span class="count">' + count + "</span>");
      });
    }
  }

  // window load event

  $(window).on("load", function () {
    if ($(".preloader").length) {
      $(".preloader").fadeOut();
    }
    thmSwiperInit();
    thmTinyInit();
    thmTestimonialsThumbCarousel();
    projectMasonaryLayout();

    if ($(".circle-progress").length) {
      $(".circle-progress").appear(function () {
        let circleProgress = $(".circle-progress");
        circleProgress.each(function () {
          let progress = $(this);
          let progressOptions = progress.data("options");
          progress.circleProgress(progressOptions);
        });
      });
    }
    if ($(".post-filter").length) {
      var postFilterList = $(".post-filter li");
      // for first init
      $(".filter-layout").isotope({
        filter: ".filter-item",
        animationOptions: {
          duration: 500,
          easing: "linear",
          queue: false,
        },
      });
      // on click filter links
      postFilterList.on("click", function () {
        var Self = $(this);
        var selector = Self.attr("data-filter");
        postFilterList.removeClass("active");
        Self.addClass("active");

        $(".filter-layout").isotope({
          filter: selector,
          animationOptions: {
            duration: 500,
            easing: "linear",
            queue: false,
          },
        });
        return false;
      });
    }

    if ($(".post-filter.has-dynamic-filter-counter").length) {
      // var allItem = $('.single-filter-item').length;

      var activeFilterItem = $(".post-filter.has-dynamic-filter-counter").find(
        "li"
      );

      activeFilterItem.each(function () {
        var filterElement = $(this).data("filter");
        var count = $(".filter-layout").find(filterElement).length;
        $(this).append("<sup>[" + count + "]</sup>");
      });
    }

    //Testimonials Two
    if ($(".listing-details__gallery .bxslider").length) {
      $(".listing-details__gallery .bxslider").bxSlider({
        nextSelector: ".listing-details__gallery #slider-next",
        prevSelector: ".listing-details__gallery #slider-prev",
        nextText: '<i class="icon-right-arrow1"></i>',
        prevText: '<i class="icon-right-arrow1 icon-prev"></i>',
        mode: "horizontal",
        auto: "true",
        speed: "1000",
        pagerCustom:
          ".listing-details__gallery .slider-pager .listing-details__thumb-box",
      });
    }
  });

  // window scroll event

  $(window).on("scroll", function () {
    if ($(".stricked-menu").length) {
      var headerScrollPos = 130;
      var stricky = $(".stricked-menu");
      if ($(window).scrollTop() > headerScrollPos) {
        stricky.addClass("stricky-fixed");
      } else if ($(this).scrollTop() <= headerScrollPos) {
        stricky.removeClass("stricky-fixed");
      }
    }
    if ($(".scroll-to-top").length) {
      var strickyScrollPos = 100;
      if ($(window).scrollTop() > strickyScrollPos) {
        $(".scroll-to-top").fadeIn(500);
      } else if ($(this).scrollTop() <= strickyScrollPos) {
        $(".scroll-to-top").fadeOut(500);
      }
    }
  });

  if ($(".before-after-twentytwenty").length) {
    $(".before-after-twentytwenty").each(function () {
      var Self = $(this);
      var objName = Self.attr("id");
      $("#" + objName).twentytwenty();

      // hack for bs tab
      $(document).on("shown.bs.tab", 'a[data-toggle="tab"]', function (e) {
        var paneTarget = $(e.target).attr("data-target");
        var $thePane = $(".tab-pane" + paneTarget);
        var twentyTwentyContainer = "#" + objName;
        var twentyTwentyHeight = $thePane.find(twentyTwentyContainer).height();
        if (0 === twentyTwentyHeight) {
          $thePane.find(twentyTwentyContainer).trigger("resize");
        }
      });
    });
  }
})(jQuery);
document.addEventListener("DOMContentLoaded", function () {
  const toggleBtn = document.getElementById("toggleSeoBtn");
  const seoContent = document.getElementById("seoContent");

  if (toggleBtn && seoContent) {
    // Function to check if content overflows
    function checkContentHeight() {
      const isOverflowing = seoContent.scrollHeight > seoContent.clientHeight;
      if (!isOverflowing) {
        toggleBtn.style.display = "none"; // Hide button if no overflow
      }
    }

    checkContentHeight();

    toggleBtn.addEventListener("click", function () {
      seoContent.classList.toggle("expanded");
      toggleBtn.classList.toggle("expanded");

      if (seoContent.classList.contains("expanded")) {
        toggleBtn.innerHTML = 'See Less <span class="arrow">&#9660;</span>';
      } else {
        toggleBtn.innerHTML = 'See More <span class="arrow">&#9660;</span>';
      }
    });
  }
});
$(document).ready(function () {
  $(".select2").select2({
    theme: "bootstrap-5",
    width: "100%",
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const individualBtn = document.getElementById("individual");
  const familyBtn = document.getElementById("family");
  const familyNote = document.getElementById("family-note");
  const familyFields = document.getElementById("family-fields");

  function toggleButtons() {
    document
      .querySelectorAll(".btn-toggle")
      .forEach((btn) => btn.classList.remove("active"));

    if (individualBtn && individualBtn.checked) {
      document.querySelector("label[for='individual']").classList.add("active");
      if (familyNote) familyNote.classList.add("d-none");
      if (familyFields) familyFields.classList.add("d-none");
    } else if (familyBtn) {
      document.querySelector("label[for='family']").classList.add("active");
      if (familyNote) familyNote.classList.remove("d-none");
      if (familyFields) familyFields.classList.remove("d-none");
    }
  }

  if (individualBtn) individualBtn.addEventListener("change", toggleButtons);
  if (familyBtn) familyBtn.addEventListener("change", toggleButtons);

  // Initial setup
  toggleButtons();
});

document.addEventListener("DOMContentLoaded", function () {
  const cityButtons = document.querySelectorAll("[data-city]");
  const starButtons = document.querySelectorAll("[data-star]");
  const cards = document.querySelectorAll(".package-card");

  // Create "No package found" element
  const noPackageMsg = document.createElement("div");
  noPackageMsg.textContent = "No package found";
  noPackageMsg.className = "text-center fw-bold text-danger mt-4";
  noPackageMsg.style.display = "none";
  // document.querySelector(".umrah-section .container").appendChild(noPackageMsg);

  let selectedCity = "all";
  let selectedStar = "all";

  function filterCards() {
    let anyVisible = false;

    cards.forEach((card) => {
      const city = card.getAttribute("data-city");
      const star = card.getAttribute("data-star");

      const cityMatch = selectedCity === "all" || selectedCity === city;
      const starMatch = selectedStar === "all" || selectedStar === star;

      if (cityMatch && starMatch) {
        card.style.display = "block";
        anyVisible = true;
      } else {
        card.style.display = "none";
      }
    });

    // Show/hide "No package found"
    noPackageMsg.style.display = anyVisible ? "none" : "block";
  }

  cityButtons.forEach((btn) => {
    btn.addEventListener("click", function () {
      cityButtons.forEach((b) => b.classList.remove("active"));
      this.classList.add("active");
      selectedCity = this.getAttribute("data-city");
      filterCards();
    });
  });

  starButtons.forEach((btn) => {
    btn.addEventListener("click", function () {
      starButtons.forEach((b) => b.classList.remove("active"));
      this.classList.add("active");
      selectedStar = this.getAttribute("data-star");
      filterCards();
    });
  });

  // Initial filter
  filterCards();
});

document.addEventListener("DOMContentLoaded", function () {
  const steps = Array.from(document.querySelectorAll(".step"));
  const stepContents = Array.from(document.querySelectorAll(".step-content"));
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const lines = Array.from(document.querySelectorAll(".line"));

  // derive total steps from the markup (safer than hardcoding)
  const totalSteps = Math.max(
    ...stepContents.map((c) => Number(c.dataset.step || 0)),
    1
  );

  let currentStep = 1;

  function showStep(step) {
    // Show/hide step content
    stepContents.forEach((content) => {
      content.classList.toggle("active", Number(content.dataset.step) === step);
    });

    // Update step indicators
    steps.forEach((s) => {
      const sNum = Number(s.dataset.step);
      s.classList.remove("active", "completed");
      if (sNum < step) s.classList.add("completed");
      if (sNum === step) s.classList.add("active");
    });

    // Update connector lines (there should be steps.length - 1 lines)
    lines.forEach((line, index) => {
      line.style.backgroundColor = index < step - 1 ? "#14532d" : "#e5e7eb";
    });

    if (nextBtn) {
  if (step === totalSteps) {
    nextBtn.textContent = "Finish";
  } else if (step === totalSteps - 1) {
    nextBtn.textContent = "Submit →";
  } else {
    nextBtn.textContent = "Continue →";
  }
}

    // Prev button disable/opacity
    prevBtn.disabled = step === 1;
    prevBtn.style.opacity = step === 1 ? "0" : "1";
  }

  // INITIALIZE UI ON PAGE LOAD
  showStep(currentStep);

  // Next button
  nextBtn.addEventListener("click", () => {
    if (currentStep < totalSteps) {
      currentStep++;
      showStep(currentStep);
      return;
    }

    // ✅ If final step reached → redirect to another page
    window.location.href = "umrah-own-package.html";
  });

  // Prev button
  prevBtn.addEventListener("click", () => {
    if (currentStep > 1) {
      currentStep--;
      showStep(currentStep);
    }
  });

  // Optional: allow clicking the step indicators to jump
  steps.forEach((s) => {
    s.addEventListener("click", () => {
      const target = Number(s.dataset.step);
      if (!Number.isNaN(target)) {
        currentStep = target;
        showStep(currentStep);
      }
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const counters = {
    adult: document.getElementById("adult"),
    child: document.getElementById("child"),
    infant: document.getElementById("infant"),
  };

  function totalPassengers() {
    return Object.values(counters).reduce(
      (sum, input) => sum + parseInt(input.value),
      0
    );
  }

  document.querySelectorAll(".increment").forEach((btn) => {
    btn.addEventListener("click", () => {
      const type = btn.dataset.type;
      counters[type].value = parseInt(counters[type].value) + 1;
    });
  });

  document.querySelectorAll(".decrement").forEach((btn) => {
    btn.addEventListener("click", () => {
      const type = btn.dataset.type;
      const currentValue = parseInt(counters[type].value);

      if (currentValue === 0) return;

      // allow decrement only if total > 1
      if (totalPassengers() > 1) {
        counters[type].value = currentValue - 1;
      }
    });
  });
});

document
  .querySelectorAll('.visa-option-box input[type="radio"]')
  .forEach((radio) => {
    radio.addEventListener("change", function () {
      document
        .querySelectorAll(".visa-option-box")
        .forEach((el) => el.classList.remove("selected"));
      this.closest(".visa-option-box").classList.add("selected");
    });
  });

const tabButtons = document.querySelectorAll(".custom-tab-button");

tabButtons.forEach((button) => {
  button.addEventListener("shown.bs.tab", () => {
    tabButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");
  });
});

// Handle toggling visibility of route tables and button text
const toggleButtons = document.querySelectorAll(".toggle-button");

toggleButtons.forEach((button) => {
  button.addEventListener("click", function () {
    const targetId = this.getAttribute("data-target");
    const targetTable = document.querySelector(targetId);

    if (targetTable.style.display === "none") {
      targetTable.style.display = "block";
      this.textContent = "Hide Routes";
    } else {
      targetTable.style.display = "none";
      this.textContent = "View Routes";
    }
  });
});

// Handle select/deselect all checkboxes for each route table
const selectAllCoaster = document.getElementById("selectAllCoaster");

if (selectAllCoaster) {
  selectAllCoaster.addEventListener("change", function () {
    const checkboxes = document.querySelectorAll(
      '#routeTableCoaster input[type="checkbox"]'
    );
    checkboxes.forEach((checkbox) => {
      checkbox.checked = this.checked;
    });
  });
}


// Find the element in DOM
const selectAllGMC = document.getElementById("selectAllGMC");

// Only add event if the element exists
if (selectAllGMC) {
  selectAllGMC.addEventListener("change", function () {
    const checkboxes = document.querySelectorAll(
      '#routeTableGMC input[type="checkbox"]'
    );
    checkboxes.forEach((checkbox) => {
      checkbox.checked = this.checked;
    });
  });
}




document.addEventListener("DOMContentLoaded", function () {
  const toggleBtn = document.getElementById("toggleSeoBtn");
  const seoContent2 = document.getElementById("seoContent2");

  if (toggleBtn && seoContent2) {
    toggleBtn.addEventListener("click", function () {
      if (seoContent2.style.display === "none") {
        seoContent2.style.display = "block";
        toggleBtn.innerHTML = 'See Less <span class="arrow">&#9650;</span>';
      } else {
        seoContent2.style.display = "none";
        toggleBtn.innerHTML = 'See More <span class="arrow">&#9660;</span>';
      }
    });
  }
});



 document.addEventListener("DOMContentLoaded", function () {
    const requestType = document.getElementById("requestType");
    const passengerSection = document.querySelector(".passenger-selector").closest(".col-md-12");

    // hide by default
    passengerSection.style.display = "none";

    requestType.addEventListener("change", function () {
      if (this.value === "") {
        // Default option selected -> hide
        passengerSection.style.display = "none";
      } else {
        // Any other option -> show
        passengerSection.style.display = "block";
      }
    });
  });