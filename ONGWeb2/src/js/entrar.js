

document.getElementById('login-form').addEventListener('submit', function (event) {
  event.preventDefault();

  const credentials = {
      email: document.getElementById('email').value,
      password: document.getElementById('senha').value
  } 
  login(credentials)
});


function login(credentials){
  const token = localStorage.getItem('token');
  axios.post('http://localhost:3000/api/login', credentials,{
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  })
  .then(response => {
    console.log('Response:', response.data);
    localStorage.setItem('token', response.data.token);
  })
  .catch(error => {
    console.error('Error:', error);
  });
}



