const userLogin = localStorage.getItem(STORAGE_KEY_USER_LOGIN);

if(userLogin != undefined){
  window.location.href = "index.html";
}



document.addEventListener('click', () => {
  const strId = event.target.dataset["id"];

  switch (strId) {
    case "login":
      loginProses();
      break;
    case "register": 
      registerProsses();
      break;
    case "closeAlert":
      closeAlertModal();
      break;
    default:
      break;
  }
});


async function loginProses(){
  let emailInput = document.getElementById("email");
  let passInput = document.getElementById("password");
  emailInput = emailInput.value;
  passInput = passInput.value;

  if (emailInput == "" || passInput == ""){
      showAlertModals("Email dan password harus diisi!");
      return;
  }

  // get data users
  let dataUsers = JSON.parse(localStorage.getItem(STORAGE_KEY_USER));
  dataUsers = dataUsers.filter((data) => {
    return (
      (data["email"].includes(emailInput)) &&
      (data["password"].includes(MD5(unescape(encodeURIComponent(passInput)))))
    );
  });

  if(dataUsers.length == 0){
    showAlertModals("Email atau password salah, silahkan coba lagi!");
    return;
  }

  let obj = {
    id : dataUsers[0].id,
    email : dataUsers[0].email,
    nama : dataUsers[0].nama,
    profile_pict: dataUsers[0].profile_pict,
    password: dataUsers[0].password
  };

  localStorage.setItem(STORAGE_KEY_USER_LOGIN, JSON.stringify(obj));
  window.location.href = "index.html";
}


function registerProsses(){
  let usernameInput = document.getElementById("username").value;
  let emailInput = document.getElementById("email").value;
  let passInput = document.getElementById("password").value;
  let confPassInput = document.getElementById("confPass").value;


  if (emailInput == "" || passInput == "" || usernameInput == "" || confPassInput == ""){
      showAlertModals("Semua kolom harus diisi!");
      return;
  }

  if (passInput != confPassInput){
    showAlertModals("Kata sandi dan konfirmasi harus sama!");
    
    return;
  }


    let isIdused = [];
    let idUser = 0;
    let dataUsers = JSON.parse(localStorage.getItem(STORAGE_KEY_USER));

    let isEmailUsed =  dataUsers.filter(data => data["email"] == emailInput);

    if (isEmailUsed.length > 0){
      showAlertModals("Email sudah digunakan!");
    
      return;
    }

    do{
        idUser = Math.floor(9 + Math.random() * 100);
        isIdused = dataUsers.filter(data => data["id"] == idUser);
    }while(isIdused.length > 0);

  let obj = {
    id: idUser,
    email : emailInput,
    nama : usernameInput,
    password: MD5(unescape(encodeURIComponent(passInput)))
  }

  dataUsers.push(obj);

  localStorage.setItem(STORAGE_KEY_USER_LOGIN, JSON.stringify(obj));
  localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(dataUsers));
  window.location.href = "index.html";
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

