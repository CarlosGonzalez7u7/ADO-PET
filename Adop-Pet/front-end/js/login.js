document.addEventListener('DOMContentLoaded', () => {

    // --- 1. CONFIGURACIÓN DE API ---
    const API_CONFIG = {
        baseURL: 'http://adop-pet.com', // O tu host de XAMPP
        endpoints: {
            login: '/api/auth/login.php',
            register: '/ruta/a/tu/registro.html'
        }
    };

    // Rutas de redirección centralizadas (modifica si necesitas otros paths)
    const PATHS = {
        userHome: '/index.html',
        institucionDashboard: '/front-end/html/institucionDashboard.html',
        adminDashboard: '/front-end/html/admin_dashboard.html',
        default: '/'
    };

    // --- 2. SERVICIO DE API ---
    class APIService {
        static async login(credentials) {
            const url = `${API_CONFIG.baseURL}${API_CONFIG.endpoints.login}`;
            try {
                const response = await fetch(url, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(credentials)
                });
                const data = await response.json();
                if (!response.ok) {
                    // lanzar error con el mensaje recibido del servidor si lo hay
                    const msg = data && data.message ? data.message : (data.error || 'Error en la solicitud');
                    const err = new Error(msg);
                    err.payload = data;
                    err.status = response.status;
                    throw err;
                }
                return data;
            } catch (error) {
                console.error('API Error:', error);
                throw error;
            }
        }
    }

    // --- 3. MANEJO DE LA SESIÓN ---
    class AuthManager {
        static setUserData(userData, userType) {
            localStorage.setItem('userData', JSON.stringify(userData));
            localStorage.setItem('userType', String(userType));
        }
        static isAuthenticated() {
            return !!localStorage.getItem('userData');
        }
        static getUserData() {
            const userData = localStorage.getItem('userData');
            return userData ? JSON.parse(userData) : null;
        }
        static getUserType() {
            return localStorage.getItem('userType') || null;
        }
    }

    // --- 4. ELEMENTOS DEL DOM ---
    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const loginBtn = document.getElementById('loginBtn');
    const generalError = document.getElementById('generalError');

    // --- 5. LÓGICA PRINCIPAL ---
    async function handleLogin(e) {
        e.preventDefault();
        if (generalError) generalError.style.display = 'none';
        const email = emailInput.value.trim();
        const password = passwordInput.value;

        if (!email || !password) {
            if (generalError) {
                generalError.textContent = 'Por favor, ingresa correo y contraseña.';
                generalError.style.display = 'block';
            } else {
                alert('Por favor, ingresa correo y contraseña.');
            }
            return;
        }

        if (loginBtn) {
            loginBtn.disabled = true;
            loginBtn.textContent = 'Iniciando sesión...';
        }

        try {
            const response = await APIService.login({ email, password });

            if (response.success) {
                // guardamos datos tal como vienen del servidor
                AuthManager.setUserData(response.user, response.userType);

                // LÓGICA DE REDIRECCIÓN: SIEMPRE PREFERIR isAdmin (convertido a número)
                const user = response.user || {};
                const isAdminNum = Number(user.isAdmin);
                if (!Number.isNaN(isAdminNum)) {
                    // Si isAdmin está presente y es numérico, usar la tabla de redirección solicitada
                    if (isAdminNum === 2) {
                        window.location.href = PATHS.adminDashboard;
                        return;
                    } else if (isAdminNum === 1) {
                        window.location.href = PATHS.institucionDashboard;
                        return;
                    } else { // isAdmin === 0
                        window.location.href = PATHS.userHome;
                        return;
                    }
                }

                // Si no hay isAdmin, fallback por userType (string esperado: 'institucion' o 'usuario')
                if (response.userType === 'institucion') {
                    window.location.href = PATHS.institucionDashboard;
                } else if (response.userType === 'usuario') {
                    window.location.href = PATHS.userHome;
                } else {
                    window.location.href = PATHS.default;
                }
            } else {
                // en caso raro que success sea false
                throw new Error(response.message || 'Error en el login');
            }
        } catch (error) {
            console.error('Login error:', error);
            if (generalError) {
                generalError.textContent = error.message || 'Error al iniciar sesión.';
                generalError.style.display = 'block';
            } else {
                alert(error.message || 'Error al iniciar sesión.');
            }
        } finally {
            if (loginBtn) {
                loginBtn.disabled = false;
                loginBtn.textContent = 'Login';
            }
        }
    }

    if (loginForm) loginForm.addEventListener('submit', handleLogin);

    // --- VERIFICACIÓN DE SESIÓN EXISTENTE (AL CARGAR PÁGINA) ---
    (function checkExistingSession() {
        if (!AuthManager.isAuthenticated()) return;

        const userData = AuthManager.getUserData();
        const userType = AuthManager.getUserType(); // string

        // Si tenemos isAdmin en userData lo respetamos (conversión segura a número)
        if (userData && (userData.isAdmin !== undefined && userData.isAdmin !== null)) {
            const isAdminNum = Number(userData.isAdmin);
            if (!Number.isNaN(isAdminNum)) {
                if (isAdminNum === 2) {
                    window.location.href = PATHS.adminDashboard;
                    return;
                } else if (isAdminNum === 1) {
                    window.location.href = PATHS.institucionDashboard;
                    return;
                } else {
                    window.location.href = PATHS.userHome;
                    return;
                }
            }
        }

        // Si no hay isAdmin, usar userType como fallback
        if (userType === 'institucion') {
            window.location.href = PATHS.institucionDashboard;
        } else if (userType === 'usuario') {
            window.location.href = PATHS.userHome;
        } else {
            
            window.location.href = '/front-end/html/login.html';
        }
    })();

});
