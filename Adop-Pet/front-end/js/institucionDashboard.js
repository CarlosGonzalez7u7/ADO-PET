// API Configuration
const API_CONFIG = {
    baseURL: 'https://your-api-domain.com/api',
    endpoints: {
        pets: '/pets',
        petDetail: '/pets/:id',
        institutions: '/institutions',
        scheduleVisit: '/visits/schedule'
    }
};

// Sample data for demonstration
const samplePets = [
    {
        id: 1,
        name: "Luna",
        breed: "Labrador Mix",
        age: "2 años",
        type: "dog",
        institution: "Refugio Esperanza",
        image: "https://www.dailypaws.com/thmb/cOdm1_qfSSb8Te5SwQcOvdaiuyQ=/528x700/filters:no_upscale():max_bytes(150000):strip_icc():focal(832x936:834x938)/dane-bod-lab-face-black_scoutsadventures-daf19ab8c5404ae0a4f4e5d81e579d37.jpg",
        story: "Luna fue rescatada de la calle cuando era cachorra. Es muy cariñosa y le encanta jugar con niños. Busca una familia que le dé mucho amor y ejercicio diario.",
        gender: "Hembra",
        size: "Mediano",
        weight: "25 kg",
        vaccinations: [
            { name: "Rabia", date: "2024-01-15", status: "Vigente" },
            { name: "Parvovirus", date: "2024-01-15", status: "Vigente" },
            { name: "Moquillo", date: "2024-01-15", status: "Vigente" },
            { name: "Hepatitis", date: "2024-01-15", status: "Vigente" }
        ],
        institutionDetails: {
            name: "Refugio Esperanza Morelia",
            address: "Av. Madero 123, Centro, Morelia, Michoacán",
            phone: "+52 443 123 4567",
            email: "contacto@refugioesperanza.com",
            coordinates: { lat: 19.7026, lng: -101.1949 }
        }
    },
    {
        id: 2,
        name: "Max",
        breed: "Pastor Alemán",
        age: "3 años",
        type: "dog",
        institution: "Casa Animal",
        image: "https://www.hola.com/horizon/landscape/a71e34a2a6e2-cosassobrepastoraleman-t.jpg",
        story: "Max es un perro muy inteligente y leal. Fue entrenado como perro de servicio pero necesita una familia que entienda sus necesidades especiales.",
        gender: "Macho",
        size: "Grande",
        weight: "35 kg",
        vaccinations: [
            { name: "Rabia", date: "2024-02-10", status: "Vigente" },
            { name: "Parvovirus", date: "2024-02-10", status: "Vigente" },
            { name: "Moquillo", date: "2024-02-10", status: "Vigente" }
        ],
        institutionDetails: {
            name: "Casa Animal Morelia",
            address: "Calle Hidalgo 456, Col. Centro, Morelia, Michoacán",
            phone: "+52 443 987 6543",
            email: "info@casaanimal.org",
            coordinates: { lat: 19.7060, lng: -101.1890 }
        }
    },
    {
        id: 3,
        name: "Mimi",
        breed: "Siamés",
        age: "1 año",
        type: "cat",
        institution: "Gatitos Felices",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3f--3Af75MuQ9nCeFhqsAzw6GKmvhtFCs1g&s",
        story: "Mimi es una gatita muy juguetona y cariñosa. Le encanta estar cerca de las personas y es perfecta para familias con niños.",
        gender: "Hembra",
        size: "Pequeño",
        weight: "4 kg",
        vaccinations: [
            { name: "Triple Felina", date: "2024-01-20", status: "Vigente" },
            { name: "Rabia", date: "2024-01-20", status: "Vigente" },
            { name: "Leucemia", date: "2024-01-20", status: "Vigente" }
        ],
        institutionDetails: {
            name: "Gatitos Felices Morelia",
            address: "Av. Revolución 789, Col. Félix Ireta, Morelia, Michoacán",
            phone: "+52 443 456 7890",
            email: "adopciones@gatitosfelices.com",
            coordinates: { lat: 19.6868, lng: -101.1815 }
        }
    },
    {
        id: 4,
        name: "Rocky",
        breed: "Bulldog Francés",
        age: "4 años",
        type: "dog",
        institution: "Refugio Esperanza",
        image: "https://www.tiendanimal.es/articulos/wp-content/uploads/2024/02/bulldog-frances-cuidados-esperanza-vida.jpg",
        story: "Rocky es un perro muy tranquilo y perfecto para apartamentos. Le gusta dormir y recibir caricias. Ideal para personas mayores o familias tranquilas.",
        gender: "Macho",
        size: "Pequeño",
        weight: "12 kg",
        vaccinations: [
            { name: "Rabia", date: "2024-03-01", status: "Vigente" },
            { name: "Parvovirus", date: "2024-03-01", status: "Vigente" }
        ],
        institutionDetails: {
            name: "Refugio Esperanza Morelia",
            address: "Av. Madero 123, Centro, Morelia, Michoacán",
            phone: "+52 443 123 4567",
            email: "contacto@refugioesperanza.com",
            coordinates: { lat: 19.7026, lng: -101.1949 }
        }
    },
    {
        id: 5,
        name: "Bella",
        breed: "Golden Retriever",
        age: "5 años",
        type: "dog",
        institution: "Casa Animal",
        image: "https://waggys.pet/cdn/shop/articles/golden_retriever_1999x.webp?v=1742820128",
        story: "Bella es una perra muy dulce y paciente. Ama a los niños y es perfecta para familias grandes. Necesita ejercicio diario y mucho amor.",
        gender: "Hembra",
        size: "Grande",
        weight: "30 kg",
        vaccinations: [
            { name: "Rabia", date: "2024-02-15", status: "Vigente" },
            { name: "Parvovirus", date: "2024-02-15", status: "Vigente" },
            { name: "Moquillo", date: "2024-02-15", status: "Vigente" }
        ],
        institutionDetails: {
            name: "Casa Animal Morelia",
            address: "Calle Hidalgo 456, Col. Centro, Morelia, Michoacán",
            phone: "+52 443 987 6543",
            email: "info@casaanimal.org",
            coordinates: { lat: 19.7060, lng: -101.1890 }
        }
    },
    {
        id: 6,
        name: "Whiskers",
        breed: "Persa",
        age: "3 años",
        type: "cat",
        institution: "Gatitos Felices",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQydXgjyVlcUz6aYndH3BLk2CswGCxdNqfsXw&s",
        story: "Whiskers es un gato muy elegante y tranquilo. Le gusta estar en lugares cómodos y recibir cepillado diario. Perfecto para hogares tranquilos.",
        gender: "Macho",
        size: "Mediano",
        weight: "5 kg",
        vaccinations: [
            { name: "Triple Felina", date: "2024-01-10", status: "Vigente" },
            { name: "Rabia", date: "2024-01-10", status: "Vigente" }
        ],
        institutionDetails: {
            name: "Gatitos Felices Morelia",
            address: "Av. Revolución 789, Col. Félix Ireta, Morelia, Michoacán",
            phone: "+52 443 456 7890",
            email: "adopciones@gatitosfelices.com",
            coordinates: { lat: 19.6868, lng: -101.1815 }
        }
    },
    {
        id: 7,
        name: "Coco",
        breed: "Conejo Holandés",
        age: "2 años",
        type: "rabbit",
        institution: "Pequeños Amigos",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmlNmhi-jHlwr5iQIeZ8-Q1bkxIIbS9KJXXQ&s",
        story: "Coco es un conejito muy activo y juguetón. Le encanta saltar y explorar. Necesita un espacio amplio y una dieta rica en vegetales frescos.",
        gender: "Macho",
        size: "Pequeño",
        weight: "2 kg",
        vaccinations: [
            { name: "Mixomatosis", date: "2024-01-25", status: "Vigente" },
            { name: "Enfermedad Hemorrágica", date: "2024-01-25", status: "Vigente" }
        ],
        institutionDetails: {
            name: "Pequeños Amigos Morelia",
            address: "Calle Morelos 321, Col. Vasco de Quiroga, Morelia, Michoacán",
            phone: "+52 443 234 5678",
            email: "cuidado@pequenosamigos.com",
            coordinates: { lat: 19.6947, lng: -101.2069 }
        }
    },
    {
        id: 8,
        name: "Toby",
        breed: "Beagle",
        age: "6 años",
        type: "dog",
        institution: "Refugio Esperanza",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/MiloSmet.JPG/1200px-MiloSmet.JPG",
        story: "Toby es un perro muy sociable y amigable. Le encanta estar con otros perros y personas. Es perfecto para familias activas que disfruten de caminatas.",
        gender: "Macho",
        size: "Mediano",
        weight: "18 kg",
        vaccinations: [
            { name: "Rabia", date: "2024-02-20", status: "Vigente" },
            { name: "Parvovirus", date: "2024-02-20", status: "Vigente" },
            { name: "Moquillo", date: "2024-02-20", status: "Vigente" }
        ],
        institutionDetails: {
            name: "Refugio Esperanza Morelia",
            address: "Av. Madero 123, Centro, Morelia, Michoacán",
            phone: "+52 443 123 4567",
            email: "contacto@refugioesperanza.com",
            coordinates: { lat: 19.7026, lng: -101.1949 }
        }
    }
];

// API Service Class
class PetAdoptionAPI {
    constructor() {
        this.baseURL = API_CONFIG.baseURL;
    }

    async fetchPets(filters = {}) {
        try {
            console.log('[v0] Fetching pets with filters:', filters);
            
            // Simulate API call with sample data
            await this.simulateDelay(1000);
            
            let filteredPets = [...samplePets];
            
            if (filters.type && filters.type !== 'all') {
                filteredPets = filteredPets.filter(pet => pet.type === filters.type);
            }
            
            if (filters.location && filters.location !== 'all') {
                // Filter by location logic would go here
                console.log('[v0] Filtering by location:', filters.location);
            }
            
            return {
                success: true,
                data: filteredPets,
                total: filteredPets.length
            };
        } catch (error) {
            console.error('[v0] Error fetching pets:', error);
            return {
                success: false,
                error: 'Error al cargar las mascotas'
            };
        }
    }

    async fetchPetDetail(petId) {
        try {
            console.log('[v0] Fetching pet detail for ID:', petId);
            
            await this.simulateDelay(500);
            
            const pet = samplePets.find(p => p.id === parseInt(petId));
            
            if (!pet) {
                throw new Error('Mascota no encontrada');
            }
            
            return {
                success: true,
                data: pet
            };
        } catch (error) {
            console.error('[v0] Error fetching pet detail:', error);
            return {
                success: false,
                error: 'Error al cargar los detalles de la mascota'
            };
        }
    }

    async scheduleVisit(petId, visitData) {
        try {
            console.log('[v0] Scheduling visit for pet:', petId, visitData);
            
            await this.simulateDelay(1000);
            
            // Simulate successful scheduling
            return {
                success: true,
                data: {
                    visitId: Math.random().toString(36).substr(2, 9),
                    scheduledDate: visitData.date,
                    message: 'Visita agendada exitosamente'
                }
            };
        } catch (error) {
            console.error('[v0] Error scheduling visit:', error);
            return {
                success: false,
                error: 'Error al agendar la visita'
            };
        }
    }

    async simulateDelay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// Dashboard Manager Class
class DashboardManager {
    constructor() {
        this.api = new PetAdoptionAPI();
        this.currentFilters = { type: 'all', location: 'all' };
        this.pets = [];
        this.init();
    }

    async init() {
        console.log('[v0] Initializing dashboard');
        this.setupEventListeners();
        await this.loadPets();
    }

    setupEventListeners() {
        // Filter event listeners
        const filterType = document.getElementById('filterType');
        const filterLocation = document.getElementById('filterLocation');
        const searchBtn = document.querySelector('.search-btn');

        if (filterType) {
            filterType.addEventListener('change', (e) => {
                this.currentFilters.type = e.target.value;
            });
        }

        if (filterLocation) {
            filterLocation.addEventListener('change', (e) => {
                this.currentFilters.location = e.target.value;
            });
        }

        if (searchBtn) {
            searchBtn.addEventListener('click', () => {
                this.loadPets();
            });
        }

        // Modal event listeners
        const modal = document.getElementById('petModal');
        const closeModal = document.getElementById('closeModal');

        if (closeModal) {
            closeModal.addEventListener('click', () => {
                this.closeModal();
            });
        }

        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.closeModal();
                }
            });
        }

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeModal();
            }
        });
    }

    async loadPets() {
        console.log('[v0] Loading pets with filters:', this.currentFilters);
        
        this.showLoading(true);
        
        try {
            const response = await this.api.fetchPets(this.currentFilters);
            
            if (response.success) {
                this.pets = response.data;
                this.renderPets();
            } else {
                this.showError(response.error);
            }
        } catch (error) {
            console.error('[v0] Error loading pets:', error);
            this.showError('Error al cargar las mascotas');
        } finally {
            this.showLoading(false);
        }
    }

    renderPets() {
        const petsGrid = document.getElementById('petsGrid');
        if (!petsGrid) return;

        console.log('[v0] Rendering', this.pets.length, 'pets');

        if (this.pets.length === 0) {
            petsGrid.innerHTML = `
                <div class="no-pets-message">
                    <i class="fas fa-paw"></i>
                    <h3>No se encontraron mascotas</h3>
                    <p>Intenta ajustar los filtros de búsqueda</p>
                </div>
            `;
            return;
        }

        petsGrid.innerHTML = this.pets.map(pet => `
            <div class="pet-card" data-pet-id="${pet.id}">
                <img src="${pet.image}" alt="${pet.name}" class="pet-image">
                <div class="pet-info">
                    <h3>${pet.name}</h3>
                    <p><i class="fas fa-dog"></i> ${pet.breed}</p>
                    <p><i class="fas fa-birthday-cake"></i> ${pet.age}</p>
                    <p><i class="fas fa-building"></i> ${pet.institution}</p>
                    <span class="institution-tag">${pet.institution}</span>
                </div>
            </div>
        `).join('');

        // Add click event listeners to pet cards
        petsGrid.querySelectorAll('.pet-card').forEach(card => {
            card.addEventListener('click', () => {
                const petId = card.dataset.petId;
                this.showPetDetail(petId);
            });
        });
    }

    async showPetDetail(petId) {
        console.log('[v0] Showing pet detail for ID:', petId);
        
        const modal = document.getElementById('petModal');
        const modalBody = document.getElementById('modalBody');
        
        if (!modal || !modalBody) return;

        // Show loading in modal
        modalBody.innerHTML = `
            <div class="modal-loading">
                <div class="spinner"></div>
                <p>Cargando información...</p>
            </div>
        `;
        
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';

        try {
            const response = await this.api.fetchPetDetail(petId);
            
            if (response.success) {
                this.renderPetDetail(response.data);
            } else {
                this.showModalError(response.error);
            }
        } catch (error) {
            console.error('[v0] Error loading pet detail:', error);
            this.showModalError('Error al cargar los detalles');
        }
    }

    renderPetDetail(pet) {
        const modalBody = document.getElementById('modalBody');
        if (!modalBody) return;

        console.log('[v0] Rendering pet detail for:', pet.name);

        const mapEmbedUrl = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3756.8!2d${pet.institutionDetails.coordinates.lng}!3d${pet.institutionDetails.coordinates.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTnCsDQyJzA5LjQiTiAxMDHCsDExJzQxLjYiVw!5e0!3m2!1ses!2smx!4v1620000000000!5m2!1ses!2smx`;

        modalBody.innerHTML = `
            <div class="pet-detail-header">
                <img src="${pet.image}" alt="${pet.name}" class="pet-detail-image">
                <div class="pet-basic-info">
                    <h2>${pet.name}</h2>
                    <div class="info-item">
                        <i class="fas fa-dog"></i>
                        <span><strong>Raza:</strong> ${pet.breed}</span>
                    </div>
                    <div class="info-item">
                        <i class="fas fa-birthday-cake"></i>
                        <span><strong>Edad:</strong> ${pet.age}</span>
                    </div>
                    <div class="info-item">
                        <i class="fas fa-venus-mars"></i>
                        <span><strong>Género:</strong> ${pet.gender}</span>
                    </div>
                    <div class="info-item">
                        <i class="fas fa-ruler-vertical"></i>
                        <span><strong>Tamaño:</strong> ${pet.size}</span>
                    </div>
                    <div class="info-item">
                        <i class="fas fa-weight"></i>
                        <span><strong>Peso:</strong> ${pet.weight}</span>
                    </div>
                </div>
            </div>

            <div class="pet-story">
                <h3><i class="fas fa-heart"></i> Historia de ${pet.name}</h3>
                <p>${pet.story}</p>
            </div>

            <div class="vaccination-card">
                <h3><i class="fas fa-syringe"></i> Cartilla de Vacunación</h3>
                <div class="vaccination-list">
                    ${pet.vaccinations.map(vaccine => `
                        <div class="vaccination-item">
                            <i class="fas fa-check-circle"></i>
                            <div>
                                <strong>${vaccine.name}</strong><br>
                                <small>${vaccine.date} - ${vaccine.status}</small>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>

            <div class="institution-info">
                <h3><i class="fas fa-building"></i> Información de la Institución</h3>
                <div class="institution-details">
                    <div class="detail-item">
                        <i class="fas fa-home"></i>
                        <span><strong>Nombre:</strong> ${pet.institutionDetails.name}</span>
                    </div>
                    <div class="detail-item">
                        <i class="fas fa-map-marker-alt"></i>
                        <span><strong>Dirección:</strong> ${pet.institutionDetails.address}</span>
                    </div>
                    <div class="detail-item">
                        <i class="fas fa-phone"></i>
                        <span><strong>Teléfono:</strong> ${pet.institutionDetails.phone}</span>
                    </div>
                    <div class="detail-item">
                        <i class="fas fa-envelope"></i>
                        <span><strong>Email:</strong> ${pet.institutionDetails.email}</span>
                    </div>
                </div>
            </div>

            <div class="map-container">
                <iframe src="${mapEmbedUrl}" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
            </div>

            <button class="schedule-visit-btn" onclick="dashboardManager.scheduleVisit(${pet.id})">
                <i class="fas fa-calendar-plus"></i>
                Agendar Visita
            </button>
        `;
    }

    async scheduleVisit(petId) {
        console.log('[v0] Scheduling visit for pet ID:', petId);
        
        const pet = this.pets.find(p => p.id === petId);
        if (!pet) return;

        // Simple date selection (in a real app, you'd use a proper date picker)
        const visitDate = prompt(`¿Cuándo te gustaría visitar a ${pet.name}? (formato: DD/MM/YYYY)`);
        
        if (!visitDate) return;

        const visitBtn = document.querySelector('.schedule-visit-btn');
        if (visitBtn) {
            visitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Agendando...';
            visitBtn.disabled = true;
        }

        try {
            const response = await this.api.scheduleVisit(petId, { date: visitDate });
            
            if (response.success) {
                alert(`¡Visita agendada exitosamente para el ${visitDate}!\n\nRecibirás un correo de confirmación con los detalles.`);
                this.closeModal();
            } else {
                alert(`Error: ${response.error}`);
            }
        } catch (error) {
            console.error('[v0] Error scheduling visit:', error);
            alert('Error al agendar la visita. Inténtalo de nuevo.');
        } finally {
            if (visitBtn) {
                visitBtn.innerHTML = '<i class="fas fa-calendar-plus"></i> Agendar Visita';
                visitBtn.disabled = false;
            }
        }
    }

    closeModal() {
        const modal = document.getElementById('petModal');
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    showLoading(show) {
        const spinner = document.getElementById('loadingSpinner');
        if (spinner) {
            if (show) {
                spinner.classList.remove('hidden');
            } else {
                spinner.classList.add('hidden');
            }
        }
    }

    showError(message) {
        console.error('[v0] Showing error:', message);
        alert(`Error: ${message}`);
    }

    showModalError(message) {
        const modalBody = document.getElementById('modalBody');
        if (modalBody) {
            modalBody.innerHTML = `
                <div class="error-message">
                    <i class="fas fa-exclamation-triangle"></i>
                    <h3>Error</h3>
                    <p>${message}</p>
                    <button onclick="dashboardManager.closeModal()" class="retry-btn">Cerrar</button>
                </div>
            `;
        }
    }
}

// Initialize dashboard when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('[v0] DOM loaded, initializing dashboard');
    window.dashboardManager = new DashboardManager();
});

// Add some additional CSS for error states and loading
const additionalStyles = `
    .no-pets-message {
        grid-column: 1 / -1;
        text-align: center;
        padding: 4rem 2rem;
        color: #666;
    }

    .no-pets-message i {
        font-size: 4rem;
        color: #4CAF50;
        margin-bottom: 1rem;
    }

    .modal-loading {
        text-align: center;
        padding: 4rem 2rem;
    }

    .modal-loading .spinner {
        margin: 0 auto 1rem;
    }

    .error-message {
        text-align: center;
        padding: 4rem 2rem;
        color: #666;
    }

    .error-message i {
        font-size: 4rem;
        color: #ff4444;
        margin-bottom: 1rem;
    }

    .retry-btn {
        background: #4CAF50;
        color: white;
        border: none;
        padding: 0.75rem 1.5rem;
        border-radius: 25px;
        cursor: pointer;
        margin-top: 1rem;
        transition: all 0.3s ease;
    }

    .retry-btn:hover {
        background: #45a049;
    }
`;

// --- FUNCIÓN PARA CERRAR SESIÓN ---

function logout() {
    // 1. Limpia los datos del usuario del almacenamiento local
    localStorage.removeItem('userData');
    localStorage.removeItem('userType');

    // 2. Redirige a la página de login
    window.location.href = '/front-end/html/login.html';
}

// Inject additional styles
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);
