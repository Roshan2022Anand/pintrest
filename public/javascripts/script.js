const dialog = document.getElementById('signup-dialog');
const loginPgBtn=document.getElementById('login-pg-btn');
const signupPgBtn = document.getElementById("signup-pg-btn");

signupPgBtn.addEventListener("click",(e)=>{
    e.preventDefault();
    dialog.show();
})
loginPgBtn.addEventListener("click",(e)=>{
    e.preventDefault();
    dialog.close();
})

// loginPgBtn
