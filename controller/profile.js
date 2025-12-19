import Swal from '../node_modules/sweetalert2/src/sweetalert2.js';

document.addEventListener('click', function(){
  let strId = event.target.dataset["id"];
  switch (strId) {
    case "changePassword":
      showAlertChangePassword();
      break;
  
    default:
      break;
  }
});


function showAlertChangePassword(){
  let confirmEmailInput;
  let htmlnya = '<div class="flex flex-col items-start justify-start"'+
  '<label for="confirmEmail">Email</label>' + 
  '<input type="email" class="w-full bg-gray-300 rounded-lg outline-gray-500 py-2 px-3 mt-2" placeholder="email" id="confirmEmail"/>'+
  '</div>';


  Swal.fire({
    title: "Confirmation Email!",
    html: htmlnya,
    showCancelButton: true,
    confirmButtonColor: "oklch(76.9% 0.188 70.08)",
    cancelButtonColor: "red",
    cancelButtonText: "Cancel",
    confirmButtonText: "Submit",
    reverseButtons: true,
    preConfirm: () => {
      confirmEmailInput = document.getElementById("confirmEmail");
      if (confirmEmailInput.value == ""){
        Swal.showValidationMessage("Confirm email harus diisi!");
      }
    }
  }).then(() => {
    if (confirmEmailInput.value != ""){
      showAlertChangePassForm();
    }
    confirmEmailInput.value = "";
  });
}


function showAlertChangePassForm(){
  let htmlnya = '<div class="flex flex-col">'+
    '<div class="flex flex-col items-start justify-start mb-2"'+
    '<label for="password">Password</label>' + 
    '<input type="password" class="w-full bg-gray-300 rounded-lg outline-gray-500 py-2 px-3 mt-2" placeholder="Password" id="password"/>'+
    '</div>'+
    '<div class="flex flex-col items-start justify-start mb-2"'+
    '<label for="confirmPassword">Confirm Password</label>' + 
    '<input type="password" class="w-full bg-gray-300 rounded-lg outline-gray-500 py-2 px-3 mt-2" placeholder="Confirm Password" id="confirmPassword"/>'+
    '</div>'+
  '</div>';

  let pass;
  let confPass;

  Swal.fire({
    title: "Change Password",
    html:htmlnya,
    showCancelButton: true,
    confirmButtonColor: "oklch(76.9% 0.188 70.08)",
    cancelButtonColor: "red",
    cancelButtonText: "Cancel",
    confirmButtonText: "Save",
    reverseButtons: true,
    preConfirm: () => {
      pass = document.getElementById("password");
      confPass = document.getElementById("confirmPassword");

      if (pass.value == "" || confPass.value == ""){
        Swal.showValidationMessage("Password dan Confirm Password harus diisi!");
      } else {
        if (pass.value != confPass.value){
          Swal.showValidationMessage("Password dan confirm password harus sama!");
        }
      }
    }
  });
}
