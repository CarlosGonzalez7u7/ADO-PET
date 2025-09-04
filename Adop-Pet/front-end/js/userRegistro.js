document.addEventListener('DOMContentLoaded', () => {

    // --- 1. CONFIGURACIÓN DE API ---
    const API_CONFIG = {
        baseURL: 'http://adop-pet.com', // O tu host de XAMPP
        endpoints: {
            registerUser: '/api/auth/register-user.php'
        }
    };

    // --- 2. CLASE PRINCIPAL DEL FORMULARIO ---
    class RegistrationForm {
        constructor() {
            this.form = document.getElementById('registrationForm');
            this.photoInput = document.getElementById('photo');
            this.photoPreview = document.getElementById('photoPreview');
            this.submitButton = document.getElementById('submitButton');
            this.loadingSpinner = document.getElementById('loadingSpinner');
            this.buttonText = document.getElementById('buttonText');
            this.successMessage = document.getElementById('successMessage');
            
            this.init();
        }

        init() {
            if (!this.form) {
                console.error("El formulario de registro no fue encontrado.");
                return;
            }
            this.form.addEventListener('submit', this.handleSubmit.bind(this));
            this.photoInput.addEventListener('change', this.handlePhotoPreview.bind(this));
        }

        handlePhotoPreview(event) {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    // Muestra la imagen seleccionada
                    this.photoPreview.innerHTML = `<img src="${e.target.result}" alt="Vista previa de la foto de perfil">`;
                };
                reader.readAsDataURL(file);
            }
        }

        validateForm() {
            const password = this.form.password.value;
            const confirmPassword = this.form.confirmPassword.value;

            if (password !== confirmPassword) {
                alert('Las contraseñas no coinciden.');
                return false;
            }
            return this.form.checkValidity(); // Usa la validación nativa de HTML5
        }

        async handleSubmit(event) {
            event.preventDefault();

            if (!this.validateForm()) {
                alert('Por favor, completa todos los campos obligatorios y asegúrate de que las contraseñas coincidan.');
                return;
            }

            this.setLoading(true);

            // FormData es ideal para enviar formularios con archivos
            const formData = new FormData(this.form);

            try {
                const url = `${API_CONFIG.baseURL}${API_CONFIG.endpoints.registerUser}`;
                const response = await fetch(url, {
                    method: 'POST',
                    body: formData // No se necesita 'Content-Type', el navegador lo pone solo
                });

                const result = await response.json();

                if (!response.ok) {
                    throw new Error(result.error || 'Ocurrió un error en el registro.');
                }

                this.showSuccess();

            } catch (error) {
                console.error('Registration error:', error);
                alert('Error en el registro: ' + error.message);
            } finally {
                this.setLoading(false);
            }
        }

        setLoading(isLoading) {
            if (isLoading) {
                this.submitButton.disabled = true;
                this.loadingSpinner.style.display = 'inline-block';
                this.buttonText.textContent = 'Registrando...';
            } else {
                this.submitButton.disabled = false;
                this.loadingSpinner.style.display = 'none';
                this.buttonText.textContent = 'Registrar';
            }
        }

        showSuccess() {
            this.form.style.display = 'none'; // Oculta el formulario
            this.successMessage.style.display = 'block'; // Muestra el mensaje de éxito
            
            // Opcional: redirigir al login después de unos segundos
            setTimeout(() => {
                window.location.href = 'login.html'; 
            }, 3000); // 3 segundos
        }
    }

    // Inicializar el formulario cuando el DOM esté listo
    new RegistrationForm();
});