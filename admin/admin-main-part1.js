// Complete Admin Panel - Main Application with ALL Sections
class AdminApp {
    constructor() {
        this.init();
    }

    init() {
        if (!auth.isAuthenticated()) {
            this.showLoginScreen();
        } else {
            this.showAdminPanel();
        }
        this.setupEventListeners();
    }

    showLoginScreen() {
        document.getElementById('loginScreen').classList.remove('hidden');
        document.getElementById('adminPanel').classList.add('hidden');
    }

    showAdminPanel() {
        document.getElementById('loginScreen').classList.add('hidden');
        document.getElementById('adminPanel').classList.remove('hidden');
        const user = auth.getCurrentUser();
        document.getElementById('adminUsername').textContent = user.name;
        this.loadSection('dashboard');
    }

    setupEventListeners() {
        document.getElementById('loginForm')?.addEventListener('submit', async (e) => {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            try {
                auth.login(username, password);
                this.showAdminPanel();
            } catch (error) {
                const errorDiv = document.getElementById('loginError');
                errorDiv.textContent = error.message;
                errorDiv.classList.remove('hidden');
            }
        });

        document.getElementById('logoutBtn')?.addEventListener('click', () => auth.logout());
        document.getElementById('sidebarToggle')?.addEventListener('click', () => {
            document.getElementById('sidebar').classList.toggle('hidden');
        });

        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const section = e.currentTarget.dataset.section;
                this.loadSection(section);
                document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('bg-gray-700'));
                e.currentTarget.classList.add('bg-gray-700');
                if (window.innerWidth < 1024) {
                    document.getElementById('sidebar').classList.add('hidden');
                }
            });
        });

        document.addEventListener('click', () => auth.extendSession());
    }

    async loadSection(section) {
        ui.showLoading();
        try {
            switch (section) {
                case 'dashboard': await this.loadDashboard(); break;
                case 'hero': await this.loadHeroImages(); break;
                case 'stats': await this.loadStatistics(); break;
                case 'advisors': await this.loadAdvisors(); break;
                case 'committee': await this.loadCommittee(); break;
                case 'gallery': await this.loadGallery(); break;
                case 'activities': await this.loadActivities(); break;
                case 'sponsors': await this.loadSponsors(); break;
                case 'blood-donors': await this.loadBloodDonors(); break;
                case 'founding-members': await this.loadFoundingMembers(); break;
                default: document.getElementById('contentArea').innerHTML = '<p>Section not found</p>';
            }
        } catch (error) {
            console.error('Error loading section:', error);
            ui.showToast('Error loading data: ' + error.message, 'error');
        } finally {
            ui.hideLoading();
        }
    }

    async loadDashboard() {
        const contentArea = document.getElementById('contentArea');
        contentArea.innerHTML = ui.renderDashboard();
        try {
            const [advisors, gallery, donors, founding] = await Promise.all([
                api.getAdvisors(),
                api.getGalleryCategories(),
                api.getBloodDonors(),
                api.getFoundingMembers()
            ]);
            document.getElementById('totalAdvisors').textContent = advisors.data?.length || 0;
            document.getElementById('totalGallery').textContent = gallery.data?.length || 0;
            document.getElementById('totalDonors').textContent = donors.data?.length || 0;
            document.getElementById('totalSchools').textContent = founding.data?.length || 0;
        } catch (error) {
            console.error('Error loading dashboard stats:', error);
        }
    }

    // HERO IMAGES SECTION
    async loadHeroImages() {
        const response = await api.getHeroImages();
        const data = response.data || [];
        const content = `
            <div class="mb-6 flex justify-between items-center">
                <h2 class="text-3xl font-bold text-gray-800">Hero Images</h2>
                <button onclick="window.adminApp.showHeroForm()" 
                    class="bg-emerald-500 text-white px-6 py-3 rounded-lg hover:bg-emerald-600 transition-colors">
                    <i class="fas fa-plus mr-2"></i>Add New
                </button>
            </div>
            <div class="bg-white rounded-xl shadow-lg p-6">
                ${ui.createTable(
            [
                { key: 'id', label: 'ID' },
                { key: 'image_url', label: 'Image', render: (val) => `<img src="${val}" class="w-20 h-12 object-cover rounded">` },
                { key: 'alt_text', label: 'Alt Text' },
                { key: 'display_order', label: 'Order' },
                {
                    key: 'is_active', label: 'Status', render: (val) => val ?
                        '<span class="px-2 py-1 bg-green-100 text-green-800 rounded">Active</span>' :
                        '<span class="px-2 py-1 bg-gray-100 text-gray-800 rounded">Inactive</span>'
                }
            ],
            data,
            (row) => `
                        <button onclick="window.adminApp.showHeroForm(${row.id})" class="text-blue-600 hover:text-blue-800 mr-3">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button onclick="window.adminApp.deleteHeroImage(${row.id})" class="text-red-600 hover:text-red-800">
                            <i class="fas fa-trash"></i>
                        </button>
                    `
        )}
            </div>
        `;
        document.getElementById('contentArea').innerHTML = content;
        ui.currentData = data;
    }

    showHeroForm(id = null) {
        const item = id ? ui.currentData.find(i => i.id === id) : null;
        const formContent = `
            <form id="heroForm" class="space-y-4">
                ${ui.createFormField('Image', 'image', 'file', item?.image_url || '')}
                ${ui.createFormField('Alt Text', 'alt_text', 'text', item?.alt_text || '')}
                ${ui.createFormField('Display Order', 'display_order', 'number', item?.display_order || 0)}
                ${ui.createFormField('Active', 'is_active', 'checkbox', item?.is_active !== false)}
                <div class="flex justify-end space-x-4 pt-4">
                    <button type="button" onclick="window.ui.closeModal()" class="px-6 py-2 bg-gray-300 rounded-lg hover:bg-gray-400">Cancel</button>
                    <button type="submit" class="px-6 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600">${id ? 'Update' : 'Create'}</button>
                </div>
            </form>
        `;
        ui.createModal(id ? 'Edit Hero Image' : 'Add Hero Image', formContent);
        document.getElementById('heroForm').addEventListener('submit', async (e) => {
            e.preventDefault();
            ui.showLoading();
            try {
                const formData = new FormData(e.target);
                const file = formData.get('image');
                let imageUrl = item?.image_url || '';
                let cloudinaryId = item?.cloudinary_id || '';
                if (file && file.size > 0) {
                    const upload = await api.uploadToCloudinary(file);
                    imageUrl = upload.url;
                    cloudinaryId = upload.public_id;
                }
                const data = {
                    image_url: imageUrl,
                    cloudinary_id: cloudinaryId,
                    alt_text: formData.get('alt_text'),
                    display_order: parseInt(formData.get('display_order')),
                    is_active: formData.get('is_active') === 'on'
                };
                if (id) {
                    await api.updateHeroImage(id, data);
                    ui.showToast('Hero image updated successfully');
                } else {
                    await api.createHeroImage(data);
                    ui.showToast('Hero image created successfully');
                }
                ui.closeModal();
                this.loadHeroImages();
            } catch (error) {
                ui.showToast('Error: ' + error.message, 'error');
            } finally {
                ui.hideLoading();
            }
        });
    }

    async deleteHeroImage(id) {
        if (await ui.confirm('Are you sure you want to delete this hero image?')) {
            ui.showLoading();
            try {
                await api.deleteHeroImage(id);
                ui.showToast('Hero image deleted successfully');
                this.loadHeroImages();
            } catch (error) {
                ui.showToast('Error: ' + error.message, 'error');
            } finally {
                ui.hideLoading();
            }
        }
    }

    // STATISTICS SECTION
    async loadStatistics() {
        const response = await api.getStatistics();
        const data = response.data || [];
        const content = `
            <div class="mb-6 flex justify-between items-center">
                <h2 class="text-3xl font-bold text-gray-800">Statistics</h2>
                <button onclick="window.adminApp.showStatForm()" class="bg-emerald-500 text-white px-6 py-3 rounded-lg hover:bg-emerald-600 transition-colors">
                    <i class="fas fa-plus mr-2"></i>Add New
                </button>
            </div>
            <div class="bg-white rounded-xl shadow-lg p-6">
                ${ui.createTable(
            [
                { key: 'id', label: 'ID' },
                { key: 'title', label: 'Title' },
                { key: 'value', label: 'Value' },
                { key: 'color', label: 'Color' },
                { key: 'display_order', label: 'Order' }
            ],
            data,
            (row) => `
                        <button onclick="window.adminApp.showStatForm(${row.id})" class="text-blue-600 hover:text-blue-800 mr-3"><i class="fas fa-edit"></i></button>
                        <button onclick="window.adminApp.deleteStatistic(${row.id})" class="text-red-600 hover:text-red-800"><i class="fas fa-trash"></i></button>
                    `
        )}
            </div>
        `;
        document.getElementById('contentArea').innerHTML = content;
        ui.currentData = data;
    }

    showStatForm(id = null) {
        const item = id ? ui.currentData.find(i => i.id === id) : null;
        const formContent = `
            <form id="statForm" class="space-y-4">
                ${ui.createFormField('Title', 'title', 'text', item?.title || '')}
                ${ui.createFormField('Value', 'value', 'text', item?.value || '')}
                ${ui.createFormField('Color', 'color', 'select', item?.color || 'emerald', {
            choices: CONFIG.COLORS.map(c => ({ value: c, label: c }))
        })}
                ${ui.createFormField('Display Order', 'display_order', 'number', item?.display_order || 0)}
                <div class="flex justify-end space-x-4 pt-4">
                    <button type="button" onclick="window.ui.closeModal()" class="px-6 py-2 bg-gray-300 rounded-lg hover:bg-gray-400">Cancel</button>
                    <button type="submit" class="px-6 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600">${id ? 'Update' : 'Create'}</button>
                </div>
            </form>
        `;
        ui.createModal(id ? 'Edit Statistic' : 'Add Statistic', formContent);
        document.getElementById('statForm').addEventListener('submit', async (e) => {
            e.preventDefault();
            ui.showLoading();
            try {
                const formData = new FormData(e.target);
                const data = {
                    title: formData.get('title'),
                    value: formData.get('value'),
                    color: formData.get('color'),
                    display_order: parseInt(formData.get('display_order'))
                };
                if (id) {
                    await api.updateStatistic(id, data);
                    ui.showToast('Statistic updated successfully');
                } else {
                    await api.createStatistic(data);
                    ui.showToast('Statistic created successfully');
                }
                ui.closeModal();
                this.loadStatistics();
            } catch (error) {
                ui.showToast('Error: ' + error.message, 'error');
            } finally {
                ui.hideLoading();
            }
        });
    }

    async deleteStatistic(id) {
        if (await ui.confirm('Are you sure you want to delete this statistic?')) {
            ui.showLoading();
            try {
                await api.deleteStatistic(id);
                ui.showToast('Statistic deleted successfully');
                this.loadStatistics();
            } catch (error) {
                ui.showToast('Error: ' + error.message, 'error');
            } finally {
                ui.hideLoading();
            }
        }
    }

    // Continue in next file due to length...
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.adminApp = new AdminApp();
});
