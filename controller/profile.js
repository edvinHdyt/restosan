let STORAGE_KEY_USER_LOGIN = 'restosan-user-login';
let userLogin = localStorage.getItem(STORAGE_KEY_USER_LOGIN);
userLogin = userLogin == undefined ? userLogin : JSON.parse(userLogin);

let newProfileImg;

if (userLogin == undefined){
  window.location.href = "index.html";
}

document.addEventListener('click', function(){
  let strId = event.target.dataset["id"];

  switch (strId) {
    case "changePassword":
      showAlertEmailKonfirmasi();
      break;
    case "changeProfile":
      chageProfile();
      break;
    case "closeAlertEmail":
      closeAlertEmailModal();
      break;
    case "closeAlertChangePass":
      closeAlertChangePass();
      break;
    case "confirmEmail":
      confirmEmail();
      break;
    case "closeAlert":
      closeAlertModal();
      break;
    case"closeAlertChangeProfile":
      closeAlertConfChange();
      break;
    case "confirmChangePassword":
      saveChnagePassword();
      break;
    case "ProceAlertChangeProfile":
      saveChnageProfile();
      break;
    case "saveChange":
      showAlertConfChange();
      break;
    default:
      break;
  }
});


function saveChnagePassword(){
  const pass = document.getElementById("changePassword").value;
  const confPass = document.getElementById("changeConfPass").value;

  if (pass == "" && confPass == ""){
    showAlertModals("Password dan confirm password harus diis!");
    return;
  }

  if (pass != confPass){
    showAlertModals("Password dan confirm password harus sama!");
    return;
  }


  userLogin.password = MD5(unescape(encodeURIComponent(pass)));
  localStorage.setItem(STORAGE_KEY_USER_LOGIN, JSON.stringify(userLogin));
  closeAlertChangePass();
  showAlertModals("Password berhasil diubah!");
}

function saveChnageProfile(){
    const name = document.getElementById("username").value;
    const email = document.getElementById("email").value;

    if(name == "" && email ==""){
      showAlertModals("Username dan Email harus diis!");
      return;
    }

    userLogin.nama = name;
    userLogin.email = email;
    if(newProfileImg != undefined){
      userLogin.profile_pict = newProfileImg;
    }

    localStorage.setItem(STORAGE_KEY_USER_LOGIN, JSON.stringify(userLogin));
    closeAlertConfChange();
    showAlertModals("Profile berhasil diubah!");
}

function confirmEmail(){
  const confEmailInput = document.getElementById("confEmail").value;

  if (confEmailInput == ""){
    showAlertModals("Email harus diisi!");
    return;
  }

  if (confEmailInput != userLogin.email){
    showAlertModals("Email anda tidak sesuai!");
    return
  }

  closeAlertEmailModal();
  showAlertChangePassForm();

}

function chageProfile(){
  const inputFile = document.getElementById("profilePictInput");
  const defaultProfile = document.getElementById("profileDefault");
  const profilePict = document.getElementById("profilePict");
  const defaultPictNav = document.getElementById("defaultPictShow");
  const changePictNav = document.getElementById("changePictShow");
  const showImgProfileNav = document.getElementById("showProfileNav");
  const resDefaultPictNav = document.getElementById("responsiveDefaultPictShow");
  const resChangePictNav = document.getElementById("responsiveChangePictShow");
  const resShowImgProfileNav = document.getElementById("responsiveShowProfileNav");

  inputFile.click();

  inputFile.addEventListener('change', function(){
    const file = inputFile.files;

    if(file.length > 0){
      const reader = new FileReader();

      reader.addEventListener("load", () => {
        defaultProfile.classList.add("hidden");
        profilePict.classList.remove("hidden");
        defaultPictNav.classList.add("hidden");
        showImgProfileNav.src = reader.result;
        changePictNav.classList.remove("hidden");
        
        resDefaultPictNav.classList.add("hidden");
        resShowImgProfileNav.src = reader.result;
        resChangePictNav.classList.remove("hidden")

        profilePict.src = reader.result;

        newProfileImg = reader.result;
      })

      
      reader.readAsDataURL(file[0]);
      
    }
  })
}

function showAlertEmailKonfirmasi(){
    let emailModal = document.getElementById("emailModal");

    emailModal.classList.remove('hidden');
    setTimeout(() => {
        emailModal.classList.remove('opacity-0');
    }, 10);
}


function showAlertChangePassForm(){
    let changePassModal = document.getElementById("changePassModal");

    changePassModal.classList.remove('hidden');
    setTimeout(() => {
        changePassModal.classList.remove('opacity-0');
    }, 10);
}

function showAlertConfChange(){
    let confChange = document.getElementById("confirmChange");

    confChange.classList.remove('hidden');
    setTimeout(() => {
        confChange.classList.remove('opacity-0');
    }, 10);
}


function showAlertModals(msg){
  const modalAlert = document.getElementById("alertModal");
  const descAlertModal = document.getElementById("descAlertModal");
  descAlertModal.innerText = msg;
  modalAlert.classList.remove('hidden');
  setTimeout(() => {
      modalAlert.classList.remove('opacity-0');
  }, 10);
}
function closeAlertModal() {
  const modalAlert = document.getElementById("alertModal");
    modalAlert.classList.add('opacity-0');
    setTimeout(() => {
        modalAlert.classList.add('hidden');
    }, 300);
}

function closeAlertEmailModal() {
  const emailModal = document.getElementById("emailModal");
    emailModal.classList.add('opacity-0');
    setTimeout(() => {
        emailModal.classList.add('hidden');
    }, 300);
}


function closeAlertChangePass() {
  const changePassModal = document.getElementById("changePassModal");
    changePassModal.classList.add('opacity-0');
    setTimeout(() => {
        changePassModal.classList.add('hidden');
    }, 300);
}

function closeAlertConfChange() {
  const confirmChange = document.getElementById("confirmChange");
    confirmChange.classList.add('opacity-0');
    setTimeout(() => {
        confirmChange.classList.add('hidden');
    }, 300);
}





const intializeProfile = () => {
    const usernameInput = document.getElementById("username");
    const emailInput = document.getElementById("email");
    const profilePict = document.getElementById("profilePict");
    const profilePictDefault = document.getElementById("profileDefault");

    if(userLogin.profile_pict != undefined){
      profilePictDefault.classList.add("hidden");
      profilePict.src = userLogin.profile_pict;
      profilePict.classList.remove("hidden");
    }

    usernameInput.value = userLogin.nama;
    emailInput.value = userLogin.email;
}

intializeProfile();