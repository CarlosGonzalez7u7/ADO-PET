
const API_CONFIG = {
    baseURL: 'http://adop-pet.com', // Así debe quedar
    endpoints: {
        registerInstitution: '/api/auth/register-institution.php'
    }
};

class APIService {
    // El método `request` ahora maneja `FormData` correctamente.
    static async request(endpoint, options = {}, bodyType = 'json') {
        const url = `${API_CONFIG.baseURL}${endpoint}`;
        
        const config = {
            method: options.method || 'GET',
            body: options.body,
        };

        if (bodyType === 'json') {
            config.headers = { 'Content-Type': 'application/json' };
            config.body = JSON.stringify(options.body);
        }

        try {
            const response = await fetch(url, config);
            const responseText = await response.text();
            
            let result;
            try {
                result = JSON.parse(responseText);
            } catch (e) {
                console.error("La respuesta del servidor no es un JSON válido:", responseText);
                throw new Error("Error en el servidor. Revisa la consola del navegador para más detalles.");
            }

            if (!response.ok) {
                throw new Error(result.error || 'Ocurrió un error en la solicitud.');
            }
            return result;
        } catch (error) {
            console.error('API Error:', error);
            throw error;
        }
    }

    // Método específico para registrar la institución con FormData
    static async registerInstitution(formData) {
        return this.request(
            API_CONFIG.endpoints.registerInstitution, {
                method: 'POST',
                body: formData
            },
            'formData' 
        );
    }
}

// =================================================================
// 3. CLASE: CRONÓMETRO DE CUENTA ATRÁS
// =================================================================
class CountdownTimer {
    constructor(endDate, onTick, onEnd) {
        this.endDate = endDate;
        this.onTick = onTick;
        this.onEnd = onEnd;
        this.interval = null;
    }

    start() {
        this.stop(); // Detiene cualquier cronómetro anterior
        this.update(); // Actualiza inmediatamente al iniciar
        this.interval = setInterval(() => this.update(), 1000);
    }

    stop() {
        clearInterval(this.interval);
    }

    update() {
        const now = new Date().getTime();
        const distance = this.endDate.getTime() - now;

        if (distance < 0) {
            this.stop();
            this.onEnd();
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        this.onTick({ days, hours, minutes, seconds });
    }
}

class FormValidator {
    static validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    static validatePhone(phone) {
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        return phoneRegex.test(phone.replace(/\s/g, ''));
    }

    static validatePostalCode(postalCode) {
        const postalRegex = /^\d{5}$/;
        return postalRegex.test(postalCode);
    }

    static validateRequired(value) {
        return value && value.trim().length > 0;
    }
}

// =================================================================
// 4. CLASE PRINCIPAL DEL FORMULARIO DE REGISTRO
// =================================================================
class InstitutionRegistrationForm {
    constructor() {
        this.form = document.getElementById('registrationForm');
        this.photoInput = document.getElementById('photoInput');
        this.photoPreview = document.getElementById('photoPreview');
        this.submitButton = document.getElementById('submitButton');
        this.loadingSpinner = document.getElementById('loadingSpinner');
        this.buttonText = document.getElementById('buttonText');
        this.successMessage = document.getElementById('successMessage');
        this.registrationSection = document.getElementById('registrationSection');

        this.selectedLogo = null;
        this.init();
    }

    init() {
        if (!this.form) {
            console.error("El formulario con ID 'registrationForm' no fue encontrado.");
            return;
        }
        this.setupEventListeners();
    }

    setupEventListeners() {
        this.form.addEventListener('submit', this.handleSubmit.bind(this));
        this.photoInput.addEventListener('change', this.handleLogoSelection.bind(this));
    }

    handleLogoSelection(e) {
        const file = e.target.files[0];
        if (!file) return;

        // Validaciones del archivo
        if (!file.type.startsWith('image/')) {
            alert('Por favor selecciona un archivo de imagen válido.');
            return;
        }
        if (file.size > 5 * 1024 * 1024) { // 5MB
            alert('La imagen debe ser menor a 5MB.');
            return;
        }

        this.selectedLogo = file;

        // Previsualización de la imagen
        const reader = new FileReader();
        reader.onload = (event) => {
            this.photoPreview.innerHTML = `<img src="${event.target.result}" alt="Logo Preview">`;
        };
        reader.readAsDataURL(file);
    }

    validateForm() {
        // Implementa tu lógica de validación aquí si es necesario.
        // Por simplicidad, podemos confiar en la validación del HTML5 con el atributo 'required'.
        return this.form.checkValidity();
    }

    async handleSubmit(e) {
        e.preventDefault();
        if (!this.validateForm()) {
            alert('Por favor, completa todos los campos obligatorios marcados con *');
            return;
        }

        this.setLoading(true);

        try {
            // FormData recopila todos los campos del formulario automáticamente
            const formData = new FormData(this.form);
            
            // APIService se encarga de la llamada
            const result = await APIService.registerInstitution(formData);
            
            console.log("Registro exitoso:", result.message);

            localStorage.setItem('institutionRegistration', JSON.stringify({
                registrationDate: new Date().toISOString(),
                status: 'pending'
            }));

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
            this.buttonText.textContent = 'Registrar Institución';
        }
    }

    showSuccess() {
        this.registrationSection.style.display = 'none';
        this.successMessage.style.display = 'block';
    }
}

// =================================================================
// INICIALIZACIÓN
// =================================================================
document.addEventListener('DOMContentLoaded', () => {
    new InstitutionRegistrationForm();
});