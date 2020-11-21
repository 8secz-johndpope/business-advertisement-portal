$(document).ready(() => {
  /// api get
  getAds = () => {
    $.ajax({
      method: "GET",
      url: "/api/advertisements"
    }).then(res => {
      console.log(res);
    });
  };
  // get the adds that are currently in the db
  getAds();

  getBusinesses = () => {
    $.ajax({
      method: "GET",
      url: "/api/businesses"
    }).then(res => {
      console.log(res);
    });
  };

  getBusinesses();

  // When the submit button is clicked, store all entered values in an object
  $(".submit-ad").on("click", event => {
    event.preventDefault;
    // check if email address is valid and that it is not left null
    if (
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        $(".businessEmail")
          .val()
          .trim()
      )
    ) {
      // Changes background colour of email input box back to white.
      // A user may input an incorrect email first, making the box turn red. It should turn white after a successful entry.
      $(".businessEmail").css("background-color", "white");
      const business = {
        bussName: $(".businessName")
          .val()
          .trim(),
        bussCategory: $(".businessCategory")
          .val()
          .trim(),
        bussEmail: $(".businessEmail")
          .val()
          .trim()
      };
      const advertisement = {
        prodName: $(".prodName")
          .val()
          .trim(),
        prodDesc: $(".prodDesc")
          .val()
          .trim(),
        originalPrice: $(".originalPrice")
          .val()
          .trim(),
        discount: $(".discount")
          .val()
          .trim(),
        prodImg: $(".prod-image").val(),
        bussEmail: $(".businessEmail")
          .val()
          .trim()
      };
      // Post the business object to /api/businesses then post the advertisement object to /api/advertisements
      // postBusiness(business);
      $.post("/api/businesses", business).then(() => {
        getBusinesses();
        postAd(advertisement);
        // Empty input after post has been made
        $(".businessName").val("");
        $(".businessCategory").val("");
        $(".businessEmail").val("");
        $(".prodName").val("");
        $(".prodDesc").val("");
        $(".originalPrice").val("");
        $(".discount").val("");
      });
    } else {
      // Changes background colour of email input box to red on entry of an incorrect email
      $(".businessEmail").css("background-color", "#ffcccb");
    }
  });

  // postBusiness = bus => {
  // };
  postAd = ad => {
    $.post("/api/advertisements", ad).then(getAds);
  };
});
(function() {
  "use strict";
  window.addEventListener(
    "load",
    () => {
      // Fetch all the forms we want to apply custom Bootstrap validation styles to
      const forms = document.getElementsByClassName("needs-validation");
      // Loop over them and prevent submission
      // eslint-disable-next-line no-unused-vars
      const validation = Array.prototype.filter.call(forms, form => {
        form.addEventListener(
          "submit",
          event => {
            if (form.checkValidity() === false) {
              event.preventDefault();
              event.stopPropagation();
            }
            form.classList.add("was-validated");
          },
          false
        );
      });
    },
    false
  );
})();
