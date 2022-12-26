(function () {
  "use strict";

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  var forms = document.querySelectorAll(".needs-validation");

  // Loop over them and prevent submission
  Array.prototype.slice.call(forms).forEach(function (form) {
    form.addEventListener(
        "reset",
        function (event) {
            form.classList.remove("was-validated");
        },
        false
      );
    form.addEventListener(
      "submit",
      function (event) {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        } else {
          $("#submit-success").addClass("d-none");
          $("#submit-error").addClass("d-none");
          event.preventDefault();
          event.stopPropagation();
          var formData = new FormData(form);
          var xhr = new XMLHttpRequest();
          xhr.open("POST", "https://usebasin.com/f/6ac25444f87c", true);
          xhr.send(formData);
          xhr.onload = function (e) {
            var response = JSON.parse(xhr.response);
            if (xhr.status === 200) {
              if (response.success) {
                $("#submit-success").removeClass("d-none");
              } else {
                $("#submit-error").removeClass("d-none");
              }
            } else {
              $("#submit-error").removeClass("d-none");
            }
            form.reset();
          };
        }
        form.classList.add("was-validated");
      },
      false
    );
  });
})();
