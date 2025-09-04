
        // API Configuration
        const API_CONFIG = {
            baseURL: 'https://your-api-domain.com', // Replace with your actual API URL
            endpoints: {
                selectProfile: '/api/user/profile',
                getUserData: '/api/user/me',
                updateProfile: '/api/user/update-profile'
            }
        };

        // Profile Selection Manager
        class ProfileSelectionManager {
            constructor() {
                this.selectedProfile = null;
                this.userToken = localStorage.getItem('authToken');
                this.init();
            }

            init() {
                this.bindEvents();
                this.checkAuthStatus();
            }

            bindEvents() {
                // Profile card selection
                document.querySelectorAll('.profile-card').forEach(card => {
                    card.addEventListener('click', (e) => {
                        this.selectProfile(e.currentTarget);
                    });
                });

                // Continue button
                document.getElementById('continueBtn').addEventListener('click', () => {
                    this.handleContinue();
                });

                // Keyboard navigation
                document.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter' && this.selectedProfile) {
                        this.handleContinue();
                    }
                });
            }

            checkAuthStatus() {
                if (!this.userToken) {
                    // Redirect to login if no token
                    window.location.href = 'login.html';
                    return;
                }

                // Validate token with backend
                this.validateToken();
            }

            async validateToken() {
                try {
                    const response = await fetch(`${API_CONFIG.baseURL}${API_CONFIG.endpoints.getUserData}`, {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${this.userToken}`,
                            'Content-Type': 'application/json'
                        }
                    });

                    if (!response.ok) {
                        throw new Error('Token inválido');
                    }

                    const userData = await response.json();
                    
                    // If user already has a profile selected, redirect to dashboard
                    if (userData.profileType) {
                        this.redirectToDashboard(userData.profileType);
                    }

                } catch (error) {
                    console.error('Error validating token:', error);
                    localStorage.removeItem('authToken');
                    window.location.href = 'login.html';
                }
            }

            selectProfile(cardElement) {
                // Remove previous selection
                document.querySelectorAll('.profile-card').forEach(card => {
                    card.classList.remove('selected');
                });

                // Add selection to clicked card
                cardElement.classList.add('selected');
                this.selectedProfile = cardElement.dataset.profile;

                // Enable continue button
                const continueBtn = document.getElementById('continueBtn');
                continueBtn.classList.add('active');

                // Add haptic feedback for mobile
                if (navigator.vibrate) {
                    navigator.vibrate(50);
                }

                // Analytics tracking
                this.trackProfileSelection(this.selectedProfile);
            }

            async handleContinue() {
                if (!this.selectedProfile) {
                    this.showError('Por favor selecciona un tipo de perfil');
                    return;
                }

                this.showLoading(true);

                try {
                    const response = await fetch(`${API_CONFIG.baseURL}${API_CONFIG.endpoints.selectProfile}`, {
                        method: 'POST',
                        headers: {
                            'Authorization': `Bearer ${this.userToken}`,
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            profileType: this.selectedProfile,
                            timestamp: new Date().toISOString()
                        })
                    });

                    if (!response.ok) {
                        const errorData = await response.json();
                        throw new Error(errorData.message || 'Error al seleccionar perfil');
                    }

                    const result = await response.json();
                    
                    // Store profile type locally
                    localStorage.setItem('userProfile', this.selectedProfile);
                    
                    // Success animation
                    this.showSuccessAnimation();
                    
                    // Redirect after animation
                    setTimeout(() => {
                        this.redirectToDashboard(this.selectedProfile);
                    }, 1500);

                } catch (error) {
                    console.error('Error selecting profile:', error);
                    this.showError(error.message || 'Error al seleccionar perfil. Intenta nuevamente.');
                } finally {
                    this.showLoading(false);
                }
            }

            redirectToDashboard(profileType) {
                const dashboardUrls = {
                    user: 'user-dashboard.html',
                    institution: 'institution-dashboard.html'
                };

                window.location.href = dashboardUrls[profileType] || 'dashboard.html';
            }

            showLoading(show) {
                const loadingOverlay = document.getElementById('loadingOverlay');
                loadingOverlay.style.display = show ? 'block' : 'none';
            }

            showError(message) {
                const errorElement = document.getElementById('errorMessage');
                errorElement.textContent = message;
                errorElement.style.display = 'block';

                // Hide error after 5 seconds
                setTimeout(() => {
                    errorElement.style.display = 'none';
                }, 5000);
            }

            showSuccessAnimation() {
                const selectedCard = document.querySelector('.profile-card.selected');
                if (selectedCard) {
                    selectedCard.style.transform = 'scale(1.1)';
                    selectedCard.style.boxShadow = '0 25px 50px rgba(40, 167, 69, 0.4)';
                }
            }

            trackProfileSelection(profileType) {
                // Analytics tracking - replace with your analytics service
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'profile_selected', {
                        'profile_type': profileType,
                        'timestamp': new Date().toISOString()
                    });
                }

                console.log(`Profile selected: ${profileType}`);
            }
        }

        // API Service Class
        class APIService {
            static async request(endpoint, options = {}) {
                const url = `${API_CONFIG.baseURL}${endpoint}`;
                const token = localStorage.getItem('authToken');

                const defaultOptions = {
                    headers: {
                        'Content-Type': 'application/json',
                        ...(token && { 'Authorization': `Bearer ${token}` })
                    }
                };

                const finalOptions = {
                    ...defaultOptions,
                    ...options,
                    headers: {
                        ...defaultOptions.headers,
                        ...options.headers
                    }
                };

                try {
                    const response = await fetch(url, finalOptions);
                    
                    if (!response.ok) {
                        const errorData = await response.json().catch(() => ({}));
                        throw new Error(errorData.message || `HTTP ${response.status}`);
                    }

                    return await response.json();
                } catch (error) {
                    console.error('API Request failed:', error);
                    throw error;
                }
            }

            static async selectProfile(profileData) {
                return this.request(API_CONFIG.endpoints.selectProfile, {
                    method: 'POST',
                    body: JSON.stringify(profileData)
                });
            }

            static async getUserData() {
                return this.request(API_CONFIG.endpoints.getUserData);
            }

            static async updateProfile(profileData) {
                return this.request(API_CONFIG.endpoints.updateProfile, {
                    method: 'PUT',
                    body: JSON.stringify(profileData)
                });
            }
        }

        // Initialize the application
        document.addEventListener('DOMContentLoaded', () => {
            new ProfileSelectionManager();
        });

        // Service Worker registration for PWA capabilities
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
                navigator.serviceWorker.register('/sw.js')
                    .then(registration => {
                        console.log('SW registered: ', registration);
                    })
                    .catch(registrationError => {
                        console.log('SW registration failed: ', registrationError);
                    });
            });
        }