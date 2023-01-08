var captchaSubmitted = false;
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

        var phoneNumber = document.getElementById("phoneNumber").value;
        if(phoneNumber){
          document.getElementById("areaCodeWarning").classList.remove("d-none");
        } else {
          document.getElementById("areaCodeWarning").classList.add("d-none");
        }

        $(".contact-alert").remove();
        if(!captchaSubmitted){
          let captchaAlert = $('<div class="alert alert-danger alert-dismissible fade show contact-alert" role="alert">'
          + '    <div>'
          + '       You must complete the Captcha checkbox.'
          + '     </div>'
          + '     <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>'
          + '</div>');
          $(form).prepend(captchaAlert);
        }
        event.preventDefault();
        event.stopPropagation();
        if (captchaSubmitted && form.checkValidity()) {
          var formData = new FormData(form);
          var xhr = new XMLHttpRequest();
          xhr.open("POST", "https://usebasin.com/f/cd6582328a20", true);
          xhr.send(formData);

          let errorAlert = $('<div class="alert alert-danger alert-dismissible fade show contact-alert" role="alert">'
          + '    <div>'
          + '       Sorry, something went wrong and your message was not sent. Please email Donald Byrne directly: <a class="text-white" href="mailto:dbyrne@primus.ca">dbyrne@primus.ca</a>'
          + '     </div>'
          + '     <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>'
          + '</div>');
          let successAlert = $('<div class="alert alert-success alert-dismissible fade show contact-alert" role="alert">'
          + '   <div>'
          + 'Your message was submitted.'
          + '    </div>'
          + '    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>'
          + '</div>');

          xhr.onload = function (e) {
            var response = JSON.parse(xhr.response);
            if (xhr.status === 200) {
              if (response.success) {
                $(form).prepend(successAlert);
              } else {
                $(form).prepend(errorAlert);
              }
            } else {
              $(form).prepend(errorAlert);
            }
            if(grecaptcha){
              grecaptcha.reset();
              captchaSubmitted = false;
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

function captchaCallback(){
  if(grecaptcha){
    captchaSubmitted = true;
  }
}