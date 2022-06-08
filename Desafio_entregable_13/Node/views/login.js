let choice = true;
    const loginForm = document.getElementById('loginForm')
    const registerForm = document.getElementById('registerForm')
    const toggleBtn = document.getElementById('toggleBtn')
    loginForm.style.display = 'block'
    registerForm.style.display = 'none'
    toggleBtn.addEventListener('click', toggleBox)
   
   
    function toggleBox(){
        if(choice){
            loginForm.style.display = 'none'
            registerForm.style.display = 'block'
            toggleBtn.textContent = 'Loguearse'
            choice = false
        }else{
            loginForm.style.display = 'block'
            registerForm.style.display = 'none'
            toggleBtn.textContent = 'Registrase'
            choice = true
        }
    }