function login(){
  const credentials = {
    email: document.getElementById('email').value,
    password: document.getElementById('senha').value
  } 

  const regex = /[\/\\'"]/;

  if(regex.test(credentials.email) || regex.test(credentials.password)) 
    return fireErrorMessage(`Caracteres como "\\" , "/" ou aspas não são permitidos!`)

  document.getElementById('fields-section').style.display = 'none'
  document.getElementById('load-spinner').style.display = 'inline-block'

  const token = localStorage.getItem('token');
  axios.post('http://152.67.41.48:3000/api/login', credentials,{
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  })
  .then(response => {
    console.log('Response:', response.data);
    localStorage.setItem('token', response.data.token);
    window.location.href = "/ONGWeb2/src/ui/";
  })
  .catch(error => {
    document.getElementById('fields-section').style.display = 'block'
    document.getElementById('load-spinner').style.display = 'none'
    fireErrorMessage('Login ou senha inválidos!')
  });
}

function fireErrorMessage(text) {
  Swal.fire({
    backdrop: false,
    position: "top-end",
    icon: "error",
    title: "",
    text,
    showConfirmButton: false,
    timer: 2000,
    toast: true,
  });
}



