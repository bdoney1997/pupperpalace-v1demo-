const loginForm = document.querySelector('#login-form');


if (loginForm) {
  loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const username = document.querySelector('#username-field').value;
    const password = document.querySelector('#password-field').value;
    ipcRenderer.send('login', username, password);
  });
}





