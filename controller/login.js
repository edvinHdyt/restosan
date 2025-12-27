const STORAGE_KEY_USER_LOGIN = 'restosan-user-login';
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
  let res = await fetch("https://dummyjson.com/c/a5a2-2f98-424a-b7f1");
  let dataUsers = await res.json();
  dataUsers = dataUsers["users"].filter((data) => {
    return (
      (data["email"].includes(emailInput)) &&
      (data["password"].includes(passInput))
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
    profile_pict: dataUsers[0].profile_pict
  };
  console.log(JSON.stringify(obj));

  localStorage.setItem(STORAGE_KEY_USER_LOGIN, JSON.stringify(obj));
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