const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');

// إظهار شاشة التسجيل
registerBtn.addEventListener('click', () => {
    container.classList.add("active");
});

// إظهار شاشة تسجيل الدخول
loginBtn.addEventListener('click', () => {
    container.classList.remove("active");
});

