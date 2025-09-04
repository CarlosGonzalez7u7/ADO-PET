document.addEventListener('DOMContentLoaded', () => {

    const API_CONFIG = {
        baseURL: 'http://adop-pet.com', // O tu host de XAMPP
        endpoints: {
            getPending: '/api/admin/get_pending_institutions.php',
            updateStatus: '/api/admin/update_institution_status.php'
        }
    };

    const requestsContainer = document.getElementById('requestsContainer');
    const loadingMessage = document.getElementById('loadingMessage');

    // --- FUNCIÓN PARA CREAR CADA TARJETA DE SOLICITUD ---
    function createRequestCard(institution) {
        const card = document.createElement('div');
        card.className = 'request-card';
        card.dataset.id = institution.idInstitucion; // Para poder eliminarla después

        // Construir la dirección completa
        const address = `${institution.Calle} ${institution.NumExterno}, ${institution.NumInterno ? 'Int. ' + institution.NumInterno + ',' : ''} Col. ${institution.Colonia}, ${institution.Ciudad}, ${institution.DireccionEstado}, C.P. ${institution.CP}`;
        
        // Si no hay logo, ponemos un placeholder
        const logoUrl = institution.Logo ? `${API_CONFIG.baseURL}/${institution.Logo}` : 'https://via.placeholder.com/100';

        card.innerHTML = `
            <div class="card-header">
                <h2>${institution.NombreInstitucion}</h2>
                <p>ID de Registro: ${institution.idInstitucion}</p>
            </div>
            <div class="card-body">
                <img src="${logoUrl}" alt="Logo de la institución" class="logo">
                <div class="card-section">
                    <h3>Información de Contacto</h3>
                    <p><strong>Responsable:</strong> ${institution.NombreResponsable} ${institution.ApellidosResponsable}</p>
                    <p><strong>Cargo:</strong> ${institution.CargoPosicion}</p>
                    <p><strong>Email:</strong> ${institution.CorreoInstitucional}</p>
                    <p><strong>Teléfono:</strong> ${institution.TelefonoResponsable}</p>
                </div>
                <div class="card-section">
                    <h3>Detalles de la Institución</h3>
                    <p><strong>Tipo:</strong> ${institution.TipoInstitucion}</p>
                    <p><strong>No. de Registro:</strong> ${institution.NumeroRegistro}</p>
                    <p><strong>Descripción:</strong> ${institution.Descripcion}</p>
                </div>
                <div class="card-section">
                    <h3>Dirección</h3>
                    <p>${address}</p>
                </div>
            </div>
            <div class="card-actions">
                <button class="action-btn reject-btn" data-id="${institution.idInstitucion}">Rechazar</button>
                <button class="action-btn accept-btn" data-id="${institution.idInstitucion}">Aceptar</button>
            </div>
        `;
        return card;
    }

    // --- FUNCIÓN PARA CARGAR LAS SOLICITUDES DESDE LA API ---
    async function loadPendingRequests() {
        try {
            const response = await fetch(`${API_CONFIG.baseURL}${API_CONFIG.endpoints.getPending}`);
            const institutions = await response.json();

            loadingMessage.style.display = 'none';
            requestsContainer.innerHTML = ''; // Limpiar contenedor

            if (institutions.length === 0) {
                requestsContainer.innerHTML = '<p id="noRequestsMessage">No hay solicitudes pendientes por ahora.</p>';
            } else {
                institutions.forEach(inst => {
                    const card = createRequestCard(inst);
                    requestsContainer.appendChild(card);
                });
            }
        } catch (error) {
            console.error('Error al cargar las solicitudes:', error);
            requestsContainer.innerHTML = '<p id="noRequestsMessage">Error al cargar las solicitudes. Intenta de nuevo más tarde.</p>';
        }
    }

    // --- FUNCIÓN PARA ACTUALIZAR EL ESTADO (ACEPTAR/RECHAZAR) ---
    async function updateStatus(id, newStatus) {
        try {
            const response = await fetch(`${API_CONFIG.baseURL}${API_CONFIG.endpoints.updateStatus}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ idInstitucion: id, newStatus: newStatus })
            });

            const result = await response.json();

            if (result.success) {
                // Eliminar la tarjeta de la vista
                const cardToRemove = document.querySelector(`.request-card[data-id="${id}"]`);
                if (cardToRemove) {
                    cardToRemove.remove();
                }
                // Comprobar si ya no quedan tarjetas
                if (requestsContainer.childElementCount === 0) {
                     requestsContainer.innerHTML = '<p id="noRequestsMessage">No hay solicitudes pendientes por ahora.</p>';
                }
            } else {
                alert('Error al actualizar el estado: ' + result.error);
            }
        } catch (error) {
            console.error('Error en la petición de actualización:', error);
            alert('Ocurrió un error de conexión.');
        }
    }

    // --- MANEJADOR DE CLICS PARA LOS BOTONES ---
    requestsContainer.addEventListener('click', (e) => {
        const target = e.target;
        if (target.classList.contains('action-btn')) {
            const id = target.dataset.id;
            const newStatus = target.classList.contains('accept-btn') ? 'autorizado' : 'rechazado';
            
            if (confirm(`¿Estás seguro de que quieres "${newStatus}" esta solicitud?`)) {
                updateStatus(id, newStatus);
            }
        }
    });

    // --- CARGA INICIAL ---
    loadPendingRequests();
});

function logout() {
    // 1. Limpia los datos del usuario del almacenamiento local
    localStorage.removeItem('userData');
    localStorage.removeItem('userType');

    // 2. Redirige a la página de login
    window.location.href = '/front-end/html/login.html';
}
