// Main Admin Application
class AdminApp {
    constructor() {
        this.init();
    }

    async init() {
        // Check authentication
        const isAuth = await auth.isAuthenticated();
        if (!isAuth) {
            this.showLoginScreen();
        } else {
            this.showAdminPanel();
        }

        // Setup event listeners
        this.setupEventListeners();
    }

    showLoginScreen() {
        document.getElementById('loginScreen').classList.remove('hidden');
        document.getElementById('adminPanel').classList.add('hidden');
    }

    showAdminPanel() {
        document.getElementById('loginScreen').classList.add('hidden');
        document.getElementById('adminPanel').classList.remove('hidden');

        // Set username
        const user = auth.getCurrentUser();
        document.getElementById('adminUsername').textContent = user.name;

        // Load dashboard
        this.loadSection('dashboard');
    }

    setupEventListeners() {
        // Login form
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

        // Logout button
        document.getElementById('logoutBtn')?.addEventListener('click', () => {
            auth.logout();
        });

        // Sidebar toggle for mobile
        const sidebarToggle = document.getElementById('sidebarToggle');
        const sidebar = document.getElementById('sidebar');
        const sidebarOverlay = document.getElementById('sidebarOverlay');

        sidebarToggle?.addEventListener('click', () => {
            sidebar.classList.toggle('active');
            sidebarOverlay.classList.toggle('active');
        });

        // Close sidebar when clicking overlay
        sidebarOverlay?.addEventListener('click', () => {
            sidebar.classList.remove('active');
            sidebarOverlay.classList.remove('active');
        });

        // Navigation links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const section = e.currentTarget.dataset.section;
                this.loadSection(section);

                // Update active state
                document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('bg-gray-700'));
                e.currentTarget.classList.add('bg-gray-700');

                // Hide sidebar on mobile
                if (window.innerWidth < 1024) {
                    sidebar.classList.remove('active');
                    sidebarOverlay.classList.remove('active');
                }
            });
        });

        // Extend session on activity
        document.addEventListener('click', () => {
            auth.extendSession();
        });
    }

    async loadSection(section) {
        ui.showLoading();
        const contentArea = document.getElementById('contentArea');

        try {
            switch (section) {
                case 'dashboard':
                    await this.loadDashboard();
                    break;
                case 'hero':
                    await this.loadHeroImages();
                    break;
                case 'stats':
                    await this.loadStatistics();
                    break;
                case 'advisors':
                    await this.loadAdvisors();
                    break;
                case 'committee':
                    await this.loadCommittee();
                    break;
                case 'gallery':
                    await this.loadGallery();
                    break;
                case 'activities':
                    await this.loadActivities();
                    break;
                case 'sponsors':
                    await this.loadSponsors();
                    break;
                case 'founding-members':
                    await this.loadFoundingMembers();
                    break;
                case 'blood-donors':
                    await this.loadBloodDonors();
                    break;
                case 'schools':
                    await this.loadSchools();
                    break;
                case 'madrasas':
                    await this.loadMadrasas();
                    break;
                case 'markets':
                    await this.loadMarkets();
                    break;
                default:
                    contentArea.innerHTML = '<p>Section not found</p>';
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

        // Load stats
        try {
            const [advisors, gallery, donors, schools] = await Promise.all([
                api.getAdvisors(),
                api.getGalleryCategories(),
                api.getBloodDonors(),
                api.getSchools()
            ]);

            document.getElementById('totalAdvisors').textContent = advisors.data?.length || 0;
            document.getElementById('totalGallery').textContent = gallery.data?.length || 0;
            document.getElementById('totalDonors').textContent = donors.data?.length || 0;
            document.getElementById('totalSchools').textContent = schools.data?.length || 0;
        } catch (error) {
            console.error('Error loading dashboard stats:', error);
        }
    }

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
                {
                    key: 'image_url',
                    label: 'Image',
                    render: (val) => `<img src="${val}" class="w-20 h-12 object-cover rounded">`
                },
                { key: 'alt_text', label: 'Alt Text' },
                { key: 'display_order', label: 'Order' },
                {
                    key: 'is_active',
                    label: 'Status',
                    render: (val) => val ?
                        '<span class="px-2 py-1 bg-green-100 text-green-800 rounded">Active</span>' :
                        '<span class="px-2 py-1 bg-gray-100 text-gray-800 rounded">Inactive</span>'
                }
            ],
            data,
            (row) => `
                        <button onclick="window.adminApp.showHeroForm(${row.id})" 
                            class="text-blue-600 hover:text-blue-800 mr-3">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button onclick="window.adminApp.deleteHeroImage(${row.id})" 
                            class="text-red-600 hover:text-red-800">
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
                    <button type="button" onclick="window.ui.closeModal()" 
                        class="px-6 py-2 bg-gray-300 rounded-lg hover:bg-gray-400">
                        Cancel
                    </button>
                    <button type="submit" 
                        class="px-6 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600">
                        ${id ? 'Update' : 'Create'}
                    </button>
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

                // Upload new image if selected
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

    async loadAdvisors() {
        const response = await api.getAdvisors();
        const data = response.data || [];

        const content = `
            <div class="mb-6 flex justify-between items-center">
                <h2 class="text-3xl font-bold text-gray-800">Advisors</h2>
                <button onclick="window.adminApp.showAdvisorForm()" 
                    class="bg-emerald-500 text-white px-6 py-3 rounded-lg hover:bg-emerald-600 transition-colors">
                    <i class="fas fa-plus mr-2"></i>Add New
                </button>
            </div>

            <div class="bg-white rounded-xl shadow-lg p-6">
                ${ui.createTable(
            [
                { key: 'id', label: 'ID' },
                {
                    key: 'image_url',
                    label: 'Photo',
                    render: (val) => val ? `<img src="${val}" class="w-12 h-12 object-cover rounded-full">` : '-'
                },
                { key: 'name', label: 'Name' },
                { key: 'role', label: 'Role' },
                { key: 'position', label: 'Position' },
                { key: 'institution', label: 'Institution' },
                {
                    key: 'is_chief',
                    label: 'Chief',
                    render: (val) => val ? '<i class="fas fa-check text-green-500"></i>' : '-'
                }
            ],
            data,
            (row) => `
                        <button onclick="window.adminApp.showAdvisorForm(${row.id})" 
                            class="text-blue-600 hover:text-blue-800 mr-3">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button onclick="window.adminApp.deleteAdvisor(${row.id})" 
                            class="text-red-600 hover:text-red-800">
                            <i class="fas fa-trash"></i>
                        </button>
                    `
        )}
            </div>
        `;

        document.getElementById('contentArea').innerHTML = content;
        ui.currentData = data;
    }

    showAdvisorForm(id = null) {
        const item = id ? ui.currentData.find(i => i.id === id) : null;

        const formContent = `
            <form id="advisorForm" class="space-y-4">
                ${ui.createFormField('Photo', 'image', 'file', item?.image_url || '', { required: false })}
                ${ui.createFormField('Name (Bengali)', 'name', 'text', item?.name || '')}
                ${ui.createFormField('Name (English)', 'name_en', 'text', item?.name_en || '', { required: false })}
                ${ui.createFormField('Role', 'role', 'text', item?.role || '')}
                ${ui.createFormField('Position', 'position', 'text', item?.position || '')}
                ${ui.createFormField('Institution', 'institution', 'text', item?.institution || '')}
                ${ui.createFormField('Chief Advisor', 'is_chief', 'checkbox', item?.is_chief || false)}
                ${ui.createFormField('Display Order', 'display_order', 'number', item?.display_order || 0)}
                ${ui.createFormField('Active', 'is_active', 'checkbox', item?.is_active !== false)}
                
                <div class="flex justify-end space-x-4 pt-4">
                    <button type="button" onclick="window.ui.closeModal()" 
                        class="px-6 py-2 bg-gray-300 rounded-lg hover:bg-gray-400">
                        Cancel
                    </button>
                    <button type="submit" 
                        class="px-6 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600">
                        ${id ? 'Update' : 'Create'}
                    </button>
                </div>
            </form>
        `;

        ui.createModal(id ? 'Edit Advisor' : 'Add Advisor', formContent);

        document.getElementById('advisorForm').addEventListener('submit', async (e) => {
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
                    name: formData.get('name'),
                    name_en: formData.get('name_en'),
                    role: formData.get('role'),
                    position: formData.get('position'),
                    institution: formData.get('institution'),
                    image_url: imageUrl,
                    cloudinary_id: cloudinaryId,
                    is_chief: formData.get('is_chief') === 'on',
                    display_order: parseInt(formData.get('display_order')),
                    is_active: formData.get('is_active') === 'on'
                };

                if (id) {
                    await api.updateAdvisor(id, data);
                    ui.showToast('Advisor updated successfully');
                } else {
                    await api.createAdvisor(data);
                    ui.showToast('Advisor created successfully');
                }

                ui.closeModal();
                this.loadAdvisors();
            } catch (error) {
                ui.showToast('Error: ' + error.message, 'error');
            } finally {
                ui.hideLoading();
            }
        });
    }

    async deleteAdvisor(id) {
        if (await ui.confirm('Are you sure you want to delete this advisor?')) {
            ui.showLoading();
            try {
                await api.deleteAdvisor(id);
                ui.showToast('Advisor deleted successfully');
                this.loadAdvisors();
            } catch (error) {
                ui.showToast('Error: ' + error.message, 'error');
            } finally {
                ui.hideLoading();
            }
        }
    }

    // Similar methods for other sections...
    async loadStatistics() {
        const response = await api.getStatistics();
        const data = response.data || [];

        const content = `
            <div class="mb-6 flex justify-between items-center">
                <h2 class="text-3xl font-bold text-gray-800">Statistics</h2>
                <button onclick="window.adminApp.showStatForm()" 
                    class="bg-emerald-500 text-white px-6 py-3 rounded-lg hover:bg-emerald-600 transition-colors">
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
                        <button onclick="window.adminApp.showStatForm(${row.id})" 
                            class="text-blue-600 hover:text-blue-800 mr-3">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button onclick="window.adminApp.deleteStatistic(${row.id})" 
                            class="text-red-600 hover:text-red-800">
                            <i class="fas fa-trash"></i>
                        </button>
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
                    <button type="button" onclick="window.ui.closeModal()" 
                        class="px-6 py-2 bg-gray-300 rounded-lg hover:bg-gray-400">
                        Cancel
                    </button>
                    <button type="submit" 
                        class="px-6 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600">
                        ${id ? 'Update' : 'Create'}
                    </button>
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

    // COMMITTEE MEMBERS SECTION - COMPLETE IMPLEMENTATION
    async loadCommittee() {
        const response = await api.getCommitteeMembers();
        const data = response.data || [];

        const content = `
            <div class="mb-6 flex justify-between items-center">
                <div>
                    <h2 class="text-3xl font-bold text-gray-800">Committee Members</h2>
                    <p class="text-gray-600 mt-1">Manage committee members by year</p>
                </div>
                <button onclick="window.adminApp.showCommitteeForm()" 
                    class="bg-emerald-500 text-white px-6 py-3 rounded-lg hover:bg-emerald-600 transition-colors shadow-lg">
                    <i class="fas fa-plus mr-2"></i>Add New Member
                </button>
            </div>

            <div class="bg-white rounded-xl shadow-lg p-6">
                ${ui.createTable(
            [
                { key: 'id', label: 'ID' },
                {
                    key: 'image_url',
                    label: 'Photo',
                    render: (val) => val ? `<img src="${val}" class="w-12 h-12 object-cover rounded-full border-2 border-emerald-500">` : '-'
                },
                { key: 'name', label: 'Name' },
                { key: 'role', label: 'Role' },
                { key: 'position', label: 'Position' },
                { key: 'year', label: 'Year' },
                {
                    key: 'is_active',
                    label: 'Status',
                    render: (val) => val ?
                        '<span class="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold">Active</span>' :
                        '<span class="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-xs font-semibold">Inactive</span>'
                }
            ],
            data,
            (row) => `
                        <button onclick="window.adminApp.showCommitteeForm(${row.id})" 
                            class="text-blue-600 hover:text-blue-800 mr-3 transition-colors">
                            <i class="fas fa-edit text-lg"></i>
                        </button>
                        <button onclick="window.adminApp.deleteCommitteeMember(${row.id})" 
                            class="text-red-600 hover:text-red-800 transition-colors">
                            <i class="fas fa-trash text-lg"></i>
                        </button>
                    `
        )}
            </div>
        `;

        document.getElementById('contentArea').innerHTML = content;
        ui.currentData = data;
    }

    showCommitteeForm(id = null) {
        const item = id ? ui.currentData.find(i => i.id === id) : null;

        const formContent = `
            <form id="committeeForm" class="space-y-4">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div class="md:col-span-2">
                        ${ui.createFormField('Photo', 'image', 'file', item?.image_url || '', { required: false })}
                    </div>
                    <div>
                        ${ui.createFormField('Name (Bengali)', 'name', 'text', item?.name || '')}
                    </div>
                    <div>
                        ${ui.createFormField('Name (English)', 'name_en', 'text', item?.name_en || '', { required: false })}
                    </div>
                    <div>
                        ${ui.createFormField('Role', 'role', 'text', item?.role || '', { placeholder: 'সদস্য' })}
                    </div>
                    <div>
                        ${ui.createFormField('Position', 'position', 'text', item?.position || '', { placeholder: 'সভাপতি, সাধারণ সম্পাদক' })}
                    </div>
                    <div>
                        ${ui.createFormField('Institution', 'institution', 'text', item?.institution || '', { required: false })}
                    </div>
                    <div>
                        ${ui.createFormField('Year', 'year', 'select', item?.year || 2025, {
            choices: CONFIG.YEARS.map(y => ({ value: y, label: y }))
        })}
                    </div>
                    <div>
                        ${ui.createFormField('Display Order', 'display_order', 'number', item?.display_order || 0)}
                    </div>
                    <div class="flex items-center">
                        ${ui.createFormField('Active', 'is_active', 'checkbox', item?.is_active !== false)}
                    </div>
                </div>
                
                <div class="flex justify-end space-x-4 pt-6 border-t">
                    <button type="button" onclick="window.ui.closeModal()" 
                        class="px-6 py-3 bg-gray-300 rounded-lg hover:bg-gray-400 transition-colors font-semibold">
                        <i class="fas fa-times mr-2"></i>Cancel
                    </button>
                    <button type="submit" 
                        class="px-6 py-3 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors font-semibold shadow-lg">
                        <i class="fas fa-${id ? 'save' : 'plus'} mr-2"></i>${id ? 'Update' : 'Create'}
                    </button>
                </div>
            </form>
        `;

        ui.createModal(id ? 'Edit Committee Member' : 'Add Committee Member', formContent);

        document.getElementById('committeeForm').addEventListener('submit', async (e) => {
            e.preventDefault();
            ui.showLoading();

            try {
                const formData = new FormData(e.target);
                const file = formData.get('image');

                let imageUrl = item?.image_url || '';
                let cloudinaryId = item?.cloudinary_id || '';

                if (file && file.size > 0) {
                    ui.showToast('Uploading image to Cloudinary...', 'info');
                    const upload = await api.uploadToCloudinary(file);
                    imageUrl = upload.url;
                    cloudinaryId = upload.public_id;
                }

                const data = {
                    name: formData.get('name'),
                    name_en: formData.get('name_en') || null,
                    role: formData.get('role'),
                    position: formData.get('position'),
                    institution: formData.get('institution') || null,
                    year: parseInt(formData.get('year')),
                    image_url: imageUrl,
                    cloudinary_id: cloudinaryId,
                    display_order: parseInt(formData.get('display_order')) || 0,
                    is_active: formData.get('is_active') === 'on'
                };

                if (id) {
                    await api.updateCommitteeMember(id, data);
                    ui.showToast('Committee member updated successfully! ✓', 'success');
                } else {
                    await api.createCommitteeMember(data);
                    ui.showToast('Committee member created successfully! ✓', 'success');
                }

                ui.closeModal();
                this.loadCommittee();
            } catch (error) {
                console.error('Error saving committee member:', error);
                ui.showToast('Error: ' + error.message, 'error');
            } finally {
                ui.hideLoading();
            }
        });
    }

    async deleteCommitteeMember(id) {
        if (await ui.confirm('Are you sure you want to delete this committee member?')) {
            ui.showLoading();
            try {
                await api.deleteCommitteeMember(id);
                ui.showToast('Committee member deleted successfully! ✓', 'success');
                this.loadCommittee();
            } catch (error) {
                ui.showToast('Error: ' + error.message, 'error');
            } finally {
                ui.hideLoading();
            }
        }
    }

    // GALLERY SECTION - COMPLETE IMPLEMENTATION
    async loadGallery() {
        const response = await api.getGalleryCategories();
        const data = response.data || [];

        const content = `
            <div class="mb-6 flex justify-between items-center">
                <div>
                    <h2 class="text-3xl font-bold text-gray-800">Gallery</h2>
                    <p class="text-gray-600 mt-1">Manage gallery categories and images</p>
                </div>
                <button onclick="window.adminApp.showGalleryCategoryForm()" 
                    class="bg-emerald-500 text-white px-6 py-3 rounded-lg hover:bg-emerald-600 transition-colors shadow-lg">
                    <i class="fas fa-plus mr-2"></i>Add New Category
                </button>
            </div>

            <div class="bg-white rounded-xl shadow-lg p-6">
                ${ui.createTable(
            [
                { key: 'id', label: 'ID' },
                { key: 'name', label: 'Name' },
                { key: 'slug', label: 'Slug' },
                { key: 'year', label: 'Year' },
                { key: 'display_order', label: 'Order' }
            ],
            data,
            (row) => `
                        <button onclick="window.adminApp.viewGalleryImages(${row.id}, '${row.slug}')" 
                            class="text-green-600 hover:text-green-800 mr-3" title="View Images">
                            <i class="fas fa-images text-lg"></i>
                        </button>
                        <button onclick="window.adminApp.showGalleryCategoryForm(${row.id})" 
                            class="text-blue-600 hover:text-blue-800 mr-3">
                            <i class="fas fa-edit text-lg"></i>
                        </button>
                    `
        )}
            </div>
        `;

        document.getElementById('contentArea').innerHTML = content;
        ui.currentData = data;
    }

    showGalleryCategoryForm(id = null) {
        const item = id ? ui.currentData.find(i => i.id === id) : null;

        const formContent = `
            <form id="galleryCategoryForm" class="space-y-4">
                ${ui.createFormField('Name (Bengali)', 'name', 'text', item?.name || '')}
                ${ui.createFormField('Name (English)', 'name_en', 'text', item?.name_en || '', { required: false })}
                ${ui.createFormField('Description', 'description', 'textarea', item?.description || '', { required: false })}
                ${ui.createFormField('Slug', 'slug', 'text', item?.slug || '', { placeholder: 'event-2025' })}
                ${ui.createFormField('Year', 'year', 'select', item?.year || 2025, {
            choices: CONFIG.YEARS.map(y => ({ value: y, label: y }))
        })}
                ${ui.createFormField('Display Order', 'display_order', 'number', item?.display_order || 0)}
                ${ui.createFormField('Active', 'is_active', 'checkbox', item?.is_active !== false)}
                
                <div class="flex justify-end space-x-4 pt-6 border-t">
                    <button type="button" onclick="window.ui.closeModal()" 
                        class="px-6 py-3 bg-gray-300 rounded-lg hover:bg-gray-400">Cancel</button>
                    <button type="submit" 
                        class="px-6 py-3 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600">
                        ${id ? 'Update' : 'Create'}
                    </button>
                </div>
            </form>
        `;

        ui.createModal(id ? 'Edit Gallery Category' : 'Add Gallery Category', formContent);

        document.getElementById('galleryCategoryForm').addEventListener('submit', async (e) => {
            e.preventDefault();
            ui.showLoading();

            try {
                const formData = new FormData(e.target);
                const data = {
                    name: formData.get('name'),
                    name_en: formData.get('name_en') || null,
                    description: formData.get('description') || null,
                    slug: formData.get('slug'),
                    year: parseInt(formData.get('year')),
                    display_order: parseInt(formData.get('display_order')) || 0,
                    is_active: formData.get('is_active') === 'on'
                };

                if (id) {
                    await api.updateGalleryCategory(id, data);
                    ui.showToast('Gallery category updated successfully! ✓', 'success');
                } else {
                    await api.createGalleryCategory(data);
                    ui.showToast('Gallery category created successfully! ✓', 'success');
                }

                ui.closeModal();
                this.loadGallery();
            } catch (error) {
                ui.showToast('Error: ' + error.message, 'error');
            } finally {
                ui.hideLoading();
            }
        });
    }

    async viewGalleryImages(categoryId, slug) {
        ui.showToast('Loading gallery images...', 'info');
        const response = await api.getGalleryCategory(slug);
        const category = response.data;
        const images = category.images || [];

        const content = `
            <div class="mb-6">
                <button onclick="window.adminApp.loadGallery()" class="text-emerald-600 hover:text-emerald-800 mb-4">
                    <i class="fas fa-arrow-left mr-2"></i>Back to Categories
                </button>
                <div class="flex justify-between items-center">
                    <div>
                        <h2 class="text-3xl font-bold text-gray-800">${category.name}</h2>
                        <p class="text-gray-600 mt-1">Manage images in this category</p>
                    </div>
                    <button onclick="window.adminApp.showGalleryImageForm(${categoryId}, '${slug}')" 
                        class="bg-emerald-500 text-white px-6 py-3 rounded-lg hover:bg-emerald-600 transition-colors shadow-lg">
                        <i class="fas fa-plus mr-2"></i>Add Image
                    </button>
                </div>
            </div>

            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                ${images.map(img => `
                    <div class="relative group">
                        <img src="${img.image_url}" alt="${img.alt_text || ''}" class="w-full h-48 object-cover rounded-lg">
                        <div class="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button onclick="window.adminApp.deleteGalleryImage(${img.id}, ${categoryId}, '${slug}')" 
                                class="bg-red-500 text-white p-2 rounded-full hover:bg-red-600">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </div>
                `).join('')}
            </div>

            ${images.length === 0 ? '<p class="text-center text-gray-500 mt-8">No images yet. Add your first image!</p>' : ''}
        `;

        document.getElementById('contentArea').innerHTML = content;
    }

    showGalleryImageForm(categoryId, slug) {
        const formContent = `
            <form id="galleryImageForm" class="space-y-4">
                ${ui.createFormField('Image', 'image', 'file', '')}
                ${ui.createFormField('Alt Text', 'alt_text', 'text', '', { required: false })}
                ${ui.createFormField('Display Order', 'display_order', 'number', 0)}
                
                <div class="flex justify-end space-x-4 pt-6 border-t">
                    <button type="button" onclick="window.ui.closeModal()" 
                        class="px-6 py-3 bg-gray-300 rounded-lg hover:bg-gray-400">Cancel</button>
                    <button type="submit" 
                        class="px-6 py-3 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600">Upload</button>
                </div>
            </form>
        `;

        ui.createModal('Add Gallery Image', formContent);

        document.getElementById('galleryImageForm').addEventListener('submit', async (e) => {
            e.preventDefault();
            ui.showLoading();

            try {
                const formData = new FormData(e.target);
                const file = formData.get('image');

                if (!file || file.size === 0) {
                    throw new Error('Please select an image');
                }

                ui.showToast('Uploading image to Cloudinary...', 'info');
                const upload = await api.uploadToCloudinary(file);

                const data = {
                    category_id: categoryId,
                    image_url: upload.url,
                    cloudinary_id: upload.public_id,
                    alt_text: formData.get('alt_text') || null,
                    display_order: parseInt(formData.get('display_order')) || 0
                };

                await api.createGalleryImage(data);
                ui.showToast('Image uploaded successfully! ✓', 'success');
                ui.closeModal();
                this.viewGalleryImages(categoryId, slug);
            } catch (error) {
                ui.showToast('Error: ' + error.message, 'error');
            } finally {
                ui.hideLoading();
            }
        });
    }

    async deleteGalleryImage(imageId, categoryId, slug) {
        if (await ui.confirm('Are you sure you want to delete this image?')) {
            ui.showLoading();
            try {
                await api.deleteGalleryImage(imageId);
                ui.showToast('Image deleted successfully! ✓', 'success');
                this.viewGalleryImages(categoryId, slug);
            } catch (error) {
                ui.showToast('Error: ' + error.message, 'error');
            } finally {
                ui.hideLoading();
            }
        }
    }

    // ACTIVITIES SECTION - COMPLETE IMPLEMENTATION
    async loadActivities() {
        const response = await api.getActivities();
        const data = response.data || [];

        const content = `
            <div class="mb-6 flex justify-between items-center">
                <div>
                    <h2 class="text-3xl font-bold text-gray-800">Activities</h2>
                    <p class="text-gray-600 mt-1">Manage organization activities</p>
                </div>
                <button onclick="window.adminApp.showActivityForm()" 
                    class="bg-emerald-500 text-white px-6 py-3 rounded-lg hover:bg-emerald-600 transition-colors shadow-lg">
                    <i class="fas fa-plus mr-2"></i>Add New Activity
                </button>
            </div>

            <div class="bg-white rounded-xl shadow-lg p-6">
                ${ui.createTable(
            [
                { key: 'id', label: 'ID' },
                { key: 'title', label: 'Title' },
                { key: 'description', label: 'Description' },
                { key: 'icon', label: 'Icon', render: (val) => `<i class="fas fa-${val} text-2xl text-emerald-500"></i>` },
                { key: 'color', label: 'Color' },
                { key: 'display_order', label: 'Order' }
            ],
            data,
            (row) => `
                        <button onclick="window.adminApp.showActivityForm(${row.id})" 
                            class="text-blue-600 hover:text-blue-800 mr-3">
                            <i class="fas fa-edit text-lg"></i>
                        </button>
                        <button onclick="window.adminApp.deleteActivity(${row.id})" 
                            class="text-red-600 hover:text-red-800">
                            <i class="fas fa-trash text-lg"></i>
                        </button>
                    `
        )}
            </div>
        `;

        document.getElementById('contentArea').innerHTML = content;
        ui.currentData = data;
    }

    showActivityForm(id = null) {
        const item = id ? ui.currentData.find(i => i.id === id) : null;

        const formContent = `
            <form id="activityForm" class="space-y-4">
                ${ui.createFormField('Title (Bengali)', 'title', 'text', item?.title || '')}
                ${ui.createFormField('Title (English)', 'title_en', 'text', item?.title_en || '', { required: false })}
                ${ui.createFormField('Description', 'description', 'textarea', item?.description || '', { required: false })}
                ${ui.createFormField('Icon (Font Awesome)', 'icon', 'text', item?.icon || 'heart', { placeholder: 'heart, users, book, etc.' })}
                ${ui.createFormField('Color', 'color', 'select', item?.color || 'emerald', {
            choices: CONFIG.COLORS.map(c => ({ value: c, label: c }))
        })}
                ${ui.createFormField('Display Order', 'display_order', 'number', item?.display_order || 0)}
                ${ui.createFormField('Active', 'is_active', 'checkbox', item?.is_active !== false)}
                
                <div class="flex justify-end space-x-4 pt-6 border-t">
                    <button type="button" onclick="window.ui.closeModal()" 
                        class="px-6 py-3 bg-gray-300 rounded-lg hover:bg-gray-400">Cancel</button>
                    <button type="submit" 
                        class="px-6 py-3 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600">
                        ${id ? 'Update' : 'Create'}
                    </button>
                </div>
            </form>
        `;

        ui.createModal(id ? 'Edit Activity' : 'Add Activity', formContent);

        document.getElementById('activityForm').addEventListener('submit', async (e) => {
            e.preventDefault();
            ui.showLoading();

            try {
                const formData = new FormData(e.target);
                const data = {
                    title: formData.get('title'),
                    title_en: formData.get('title_en') || null,
                    description: formData.get('description') || null,
                    icon: formData.get('icon'),
                    color: formData.get('color'),
                    display_order: parseInt(formData.get('display_order')) || 0,
                    is_active: formData.get('is_active') === 'on'
                };

                if (id) {
                    await api.updateActivity(id, data);
                    ui.showToast('Activity updated successfully! ✓', 'success');
                } else {
                    await api.createActivity(data);
                    ui.showToast('Activity created successfully! ✓', 'success');
                }

                ui.closeModal();
                this.loadActivities();
            } catch (error) {
                ui.showToast('Error: ' + error.message, 'error');
            } finally {
                ui.hideLoading();
            }
        });
    }

    async deleteActivity(id) {
        if (await ui.confirm('Are you sure you want to delete this activity?')) {
            ui.showLoading();
            try {
                await api.deleteActivity(id);
                ui.showToast('Activity deleted successfully! ✓', 'success');
                this.loadActivities();
            } catch (error) {
                ui.showToast('Error: ' + error.message, 'error');
            } finally {
                ui.hideLoading();
            }
        }
    }

    // SPONSORS SECTION - COMPLETE IMPLEMENTATION
    async loadSponsors() {
        const response = await api.getSponsors();
        const data = response.data || [];

        const content = `
            <div class="mb-6 flex justify-between items-center">
                <div>
                    <h2 class="text-3xl font-bold text-gray-800">Sponsors</h2>
                    <p class="text-gray-600 mt-1">Manage organization sponsors</p>
                </div>
                <button onclick="window.adminApp.showSponsorForm()" 
                    class="bg-emerald-500 text-white px-6 py-3 rounded-lg hover:bg-emerald-600 transition-colors shadow-lg">
                    <i class="fas fa-plus mr-2"></i>Add New Sponsor
                </button>
            </div>

            <div class="bg-white rounded-xl shadow-lg p-6">
                ${ui.createTable(
            [
                { key: 'id', label: 'ID' },
                {
                    key: 'logo_url',
                    label: 'Logo',
                    render: (val) => val ? `<img src="${val}" class="w-20 h-12 object-contain">` : '-'
                },
                { key: 'name', label: 'Name' },
                { key: 'website_url', label: 'Website' },
                { key: 'display_order', label: 'Order' }
            ],
            data,
            (row) => `
                        <button onclick="window.adminApp.showSponsorForm(${row.id})" 
                            class="text-blue-600 hover:text-blue-800 mr-3">
                            <i class="fas fa-edit text-lg"></i>
                        </button>
                        <button onclick="window.adminApp.deleteSponsor(${row.id})" 
                            class="text-red-600 hover:text-red-800">
                            <i class="fas fa-trash text-lg"></i>
                        </button>
                    `
        )}
            </div>
        `;

        document.getElementById('contentArea').innerHTML = content;
        ui.currentData = data;
    }

    showSponsorForm(id = null) {
        const item = id ? ui.currentData.find(i => i.id === id) : null;

        const formContent = `
            <form id="sponsorForm" class="space-y-4">
                ${ui.createFormField('Logo', 'logo', 'file', item?.logo_url || '', { required: false })}
                ${ui.createFormField('Name', 'name', 'text', item?.name || '')}
                ${ui.createFormField('Website URL', 'website_url', 'url', item?.website_url || '', { required: false, placeholder: 'https://example.com' })}
                ${ui.createFormField('Display Order', 'display_order', 'number', item?.display_order || 0)}
                ${ui.createFormField('Active', 'is_active', 'checkbox', item?.is_active !== false)}
                
                <div class="flex justify-end space-x-4 pt-6 border-t">
                    <button type="button" onclick="window.ui.closeModal()" 
                        class="px-6 py-3 bg-gray-300 rounded-lg hover:bg-gray-400">Cancel</button>
                    <button type="submit" 
                        class="px-6 py-3 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600">
                        ${id ? 'Update' : 'Create'}
                    </button>
                </div>
            </form>
        `;

        ui.createModal(id ? 'Edit Sponsor' : 'Add Sponsor', formContent);

        document.getElementById('sponsorForm').addEventListener('submit', async (e) => {
            e.preventDefault();
            ui.showLoading();

            try {
                const formData = new FormData(e.target);
                const file = formData.get('logo');

                let logoUrl = item?.logo_url || '';
                let cloudinaryId = item?.cloudinary_id || '';

                if (file && file.size > 0) {
                    ui.showToast('Uploading logo to Cloudinary...', 'info');
                    const upload = await api.uploadToCloudinary(file);
                    logoUrl = upload.url;
                    cloudinaryId = upload.public_id;
                }

                const data = {
                    name: formData.get('name'),
                    logo_url: logoUrl,
                    cloudinary_id: cloudinaryId,
                    website_url: formData.get('website_url') || null,
                    display_order: parseInt(formData.get('display_order')) || 0,
                    is_active: formData.get('is_active') === 'on'
                };

                if (id) {
                    await api.updateSponsor(id, data);
                    ui.showToast('Sponsor updated successfully! ✓', 'success');
                } else {
                    await api.createSponsor(data);
                    ui.showToast('Sponsor created successfully! ✓', 'success');
                }

                ui.closeModal();
                this.loadSponsors();
            } catch (error) {
                ui.showToast('Error: ' + error.message, 'error');
            } finally {
                ui.hideLoading();
            }
        });
    }

    async deleteSponsor(id) {
        if (await ui.confirm('Are you sure you want to delete this sponsor?')) {
            ui.showLoading();
            try {
                await api.deleteSponsor(id);
                ui.showToast('Sponsor deleted successfully! ✓', 'success');
                this.loadSponsors();
            } catch (error) {
                ui.showToast('Error: ' + error.message, 'error');
            } finally {
                ui.hideLoading();
            }
        }
    }

    // BLOOD DONORS SECTION - COMPLETE IMPLEMENTATION
    async loadBloodDonors() {
        const response = await api.getBloodDonors();
        const data = response.data || [];

        const content = `
            <div class="mb-6 flex justify-between items-center">
                <div>
                    <h2 class="text-3xl font-bold text-gray-800">Blood Donors</h2>
                    <p class="text-gray-600 mt-1">Manage blood donor database</p>
                </div>
                <button onclick="window.adminApp.showBloodDonorForm()" 
                    class="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition-colors shadow-lg">
                    <i class="fas fa-plus mr-2"></i>Add New Donor
                </button>
            </div>

            <!-- Filters -->
            <div class="bg-white rounded-xl shadow-lg p-4 mb-6">
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Blood Group</label>
                        <select id="filterBloodGroup" onchange="window.adminApp.filterBloodDonors()" 
                            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500">
                            <option value="">All Groups</option>
                            <option value="A+">A+</option>
                            <option value="A-">A-</option>
                            <option value="B+">B+</option>
                            <option value="B-">B-</option>
                            <option value="O+">O+</option>
                            <option value="O-">O-</option>
                            <option value="AB+">AB+</option>
                            <option value="AB-">AB-</option>
                        </select>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">District</label>
                        <input type="text" id="filterDistrict" onkeyup="window.adminApp.filterBloodDonors()" 
                            placeholder="Search district..."
                            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500">
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Upazila</label>
                        <input type="text" id="filterUpazila" onkeyup="window.adminApp.filterBloodDonors()" 
                            placeholder="Search upazila..."
                            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500">
                    </div>
                </div>
            </div>

            <div class="bg-white rounded-xl shadow-lg p-6">
                <div id="donorsTableContainer">
                    ${this.createBloodDonorsTable(data)}
                </div>
            </div>
        `;

        document.getElementById('contentArea').innerHTML = content;
        ui.currentData = data;
    }

    createBloodDonorsTable(data) {
        return ui.createTable(
            [
                { key: 'id', label: 'ID' },
                { key: 'name', label: 'Name' },
                {
                    key: 'blood_group',
                    label: 'Blood Group',
                    render: (val) => `<span class="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-bold">${val}</span>`
                },
                { key: 'district', label: 'District' },
                { key: 'upazila', label: 'Upazila' },
                { key: 'phone', label: 'Phone' },
                { key: 'last_donation', label: 'Last Donation' },
                {
                    key: 'is_available',
                    label: 'Available',
                    render: (val) => val ?
                        '<span class="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold">Yes</span>' :
                        '<span class="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-xs font-semibold">No</span>'
                }
            ],
            data,
            (row) => `
                <button onclick="window.adminApp.showBloodDonorForm(${row.id})" 
                    class="text-blue-600 hover:text-blue-800 mr-3 transition-colors">
                    <i class="fas fa-edit text-lg"></i>
                </button>
                <button onclick="window.adminApp.deleteBloodDonor(${row.id})" 
                    class="text-red-600 hover:text-red-800 transition-colors">
                    <i class="fas fa-trash text-lg"></i>
                </button>
            `
        );
    }

    filterBloodDonors() {
        const bloodGroup = document.getElementById('filterBloodGroup').value.toLowerCase();
        const district = document.getElementById('filterDistrict').value.toLowerCase();
        const upazila = document.getElementById('filterUpazila').value.toLowerCase();

        const filtered = ui.currentData.filter(donor => {
            const matchBloodGroup = !bloodGroup || donor.blood_group.toLowerCase() === bloodGroup;
            const matchDistrict = !district || donor.district.toLowerCase().includes(district);
            const matchUpazila = !upazila || donor.upazila.toLowerCase().includes(upazila);
            return matchBloodGroup && matchDistrict && matchUpazila;
        });

        document.getElementById('donorsTableContainer').innerHTML = this.createBloodDonorsTable(filtered);
    }

    showBloodDonorForm(id = null) {
        const item = id ? ui.currentData.find(i => i.id === id) : null;

        const formContent = `
            <form id="bloodDonorForm" class="space-y-4">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        ${ui.createFormField('Name', 'name', 'text', item?.name || '')}
                    </div>
                    <div>
                        ${ui.createFormField('Blood Group', 'blood_group', 'select', item?.blood_group || 'A+', {
            choices: [
                { value: 'A+', label: 'A+' },
                { value: 'A-', label: 'A-' },
                { value: 'B+', label: 'B+' },
                { value: 'B-', label: 'B-' },
                { value: 'O+', label: 'O+' },
                { value: 'O-', label: 'O-' },
                { value: 'AB+', label: 'AB+' },
                { value: 'AB-', label: 'AB-' }
            ]
        })}
                    </div>
                    <div>
                        ${ui.createFormField('District', 'district', 'text', item?.district || '')}
                    </div>
                    <div>
                        ${ui.createFormField('Upazila', 'upazila', 'text', item?.upazila || '')}
                    </div>
                    <div>
                        ${ui.createFormField('Phone', 'phone', 'tel', item?.phone || '', { placeholder: '01XXXXXXXXX' })}
                    </div>
                    <div>
                        ${ui.createFormField('Last Donation', 'last_donation', 'text', item?.last_donation || 'নতুন দাতা', { required: false, placeholder: 'DD/MM/YYYY or নতুন দাতা' })}
                    </div>
                    <div>
                        ${ui.createFormField('Contact Methods', 'contact_methods', 'text', item?.contact_methods || '', { required: false, placeholder: 'Whatsapp, Imo, Call' })}
                    </div>
                    <div>
                        ${ui.createFormField('Facebook URL', 'facebook_url', 'url', item?.facebook_url || '', { required: false, placeholder: 'https://facebook.com/...' })}
                    </div>
                    <div class="flex items-center">
                        ${ui.createFormField('Available to Donate', 'is_available', 'checkbox', item?.is_available !== false)}
                    </div>
                </div>
                
                <div class="flex justify-end space-x-4 pt-6 border-t">
                    <button type="button" onclick="window.ui.closeModal()" 
                        class="px-6 py-3 bg-gray-300 rounded-lg hover:bg-gray-400 transition-colors font-semibold">
                        <i class="fas fa-times mr-2"></i>Cancel
                    </button>
                    <button type="submit" 
                        class="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-semibold shadow-lg">
                        <i class="fas fa-${id ? 'save' : 'plus'} mr-2"></i>${id ? 'Update' : 'Create'}
                    </button>
                </div>
            </form>
        `;

        ui.createModal(id ? 'Edit Blood Donor' : 'Add Blood Donor', formContent);

        document.getElementById('bloodDonorForm').addEventListener('submit', async (e) => {
            e.preventDefault();
            ui.showLoading();

            try {
                const formData = new FormData(e.target);
                const data = {
                    name: formData.get('name'),
                    blood_group: formData.get('blood_group'),
                    district: formData.get('district'),
                    upazila: formData.get('upazila'),
                    phone: formData.get('phone'),
                    last_donation: formData.get('last_donation') || 'নতুন দাতা',
                    contact_methods: formData.get('contact_methods') || null,
                    facebook_url: formData.get('facebook_url') || null,
                    is_available: formData.get('is_available') === 'on'
                };

                if (id) {
                    await api.updateBloodDonor(id, data);
                    ui.showToast('Blood donor updated successfully! ✓', 'success');
                } else {
                    await api.createBloodDonor(data);
                    ui.showToast('Blood donor created successfully! ✓', 'success');
                }

                ui.closeModal();
                this.loadBloodDonors();
            } catch (error) {
                console.error('Error saving blood donor:', error);
                ui.showToast('Error: ' + error.message, 'error');
            } finally {
                ui.hideLoading();
            }
        });
    }

    async deleteBloodDonor(id) {
        if (await ui.confirm('Are you sure you want to delete this blood donor?')) {
            ui.showLoading();
            try {
                await api.deleteBloodDonor(id);
                ui.showToast('Blood donor deleted successfully! ✓', 'success');
                this.loadBloodDonors();
            } catch (error) {
                ui.showToast('Error: ' + error.message, 'error');
            } finally {
                ui.hideLoading();
            }
        }
    }

    async loadSchools() {
        document.getElementById('contentArea').innerHTML = '<p class="text-gray-600">Schools management</p>';
    }

    async loadMadrasas() {
        document.getElementById('contentArea').innerHTML = '<p class="text-gray-600">Madrasas management</p>';
    }

    async loadMarkets() {
        document.getElementById('contentArea').innerHTML = '<p class="text-gray-600">Markets management</p>';
    }

    // FOUNDING MEMBERS SECTION - COMPLETE IMPLEMENTATION
    async loadFoundingMembers() {
        const response = await api.getFoundingMembers();
        const data = response.data || [];

        const content = `
            <div class="mb-6 flex justify-between items-center">
                <div>
                    <h2 class="text-3xl font-bold text-gray-800">Founding Members</h2>
                    <p class="text-gray-600 mt-1">Manage founding members of the organization</p>
                </div>
                <button onclick="window.adminApp.showFoundingMemberForm()" 
                    class="bg-emerald-500 text-white px-6 py-3 rounded-lg hover:bg-emerald-600 transition-colors shadow-lg">
                    <i class="fas fa-plus mr-2"></i>Add New Member
                </button>
            </div>

            <div class="bg-white rounded-xl shadow-lg p-6">
                ${ui.createTable(
            [
                { key: 'id', label: 'ID' },
                {
                    key: 'image_url',
                    label: 'Photo',
                    render: (val) => val ? `<img src="${val}" class="w-12 h-12 object-cover rounded-full border-2 border-emerald-500">` : '<div class="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center"><i class="fas fa-user text-gray-400"></i></div>'
                },
                { key: 'name', label: 'Name (Bengali)' },
                { key: 'name_en', label: 'Name (English)' },
                { key: 'role', label: 'Role' },
                { key: 'position', label: 'Position' },
                { key: 'institution', label: 'Institution' },
                {
                    key: 'is_active',
                    label: 'Status',
                    render: (val) => val ?
                        '<span class="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold">Active</span>' :
                        '<span class="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-xs font-semibold">Inactive</span>'
                }
            ],
            data,
            (row) => `
                        <button onclick="window.adminApp.showFoundingMemberForm(${row.id})" 
                            class="text-blue-600 hover:text-blue-800 mr-3 transition-colors" title="Edit">
                            <i class="fas fa-edit text-lg"></i>
                        </button>
                        <button onclick="window.adminApp.deleteFoundingMember(${row.id})" 
                            class="text-red-600 hover:text-red-800 transition-colors" title="Delete">
                            <i class="fas fa-trash text-lg"></i>
                        </button>
                    `
        )}
            </div>

            ${data.length === 0 ? `
                <div class="mt-8 text-center py-12 bg-gray-50 rounded-xl">
                    <i class="fas fa-star text-6xl text-gray-300 mb-4"></i>
                    <h3 class="text-xl font-semibold text-gray-700 mb-2">No Founding Members Yet</h3>
                    <p class="text-gray-500 mb-4">Start by adding your first founding member</p>
                    <button onclick="window.adminApp.showFoundingMemberForm()" 
                        class="bg-emerald-500 text-white px-6 py-3 rounded-lg hover:bg-emerald-600 transition-colors">
                        <i class="fas fa-plus mr-2"></i>Add First Member
                    </button>
                </div>
            ` : ''}
        `;

        document.getElementById('contentArea').innerHTML = content;
        ui.currentData = data;
    }

    showFoundingMemberForm(id = null) {
        const item = id ? ui.currentData.find(i => i.id === id) : null;

        const formContent = `
            <form id="foundingMemberForm" class="space-y-4">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div class="md:col-span-2">
                        ${ui.createFormField('Photo', 'image', 'file', item?.image_url || '', { required: false })}
                        ${item?.image_url ? `
                            <div class="mt-2 p-3 bg-blue-50 rounded-lg">
                                <p class="text-sm text-blue-800"><i class="fas fa-info-circle mr-2"></i>Leave empty to keep current photo</p>
                            </div>
                        ` : ''}
                    </div>
                    
                    <div>
                        ${ui.createFormField('Name (Bengali)', 'name', 'text', item?.name || '', { placeholder: 'প্রতিষ্ঠাতা সদস্যের নাম' })}
                    </div>
                    
                    <div>
                        ${ui.createFormField('Name (English)', 'name_en', 'text', item?.name_en || '', { required: false, placeholder: 'Founding Member Name' })}
                    </div>
                    
                    <div>
                        ${ui.createFormField('Role', 'role', 'text', item?.role || '', { placeholder: 'প্রতিষ্ঠাতা সদস্য' })}
                    </div>
                    
                    <div>
                        ${ui.createFormField('Position', 'position', 'text', item?.position || '', { placeholder: 'সভাপতি, সাধারণ সম্পাদক, etc.' })}
                    </div>
                    
                    <div class="md:col-span-2">
                        ${ui.createFormField('Institution', 'institution', 'text', item?.institution || '', { placeholder: 'স্বপ্নের ফরিদগঞ্জ' })}
                    </div>
                    
                    <div class="md:col-span-2">
                        ${ui.createFormField('Biography/Description', 'bio', 'textarea', item?.bio || '', { required: false, placeholder: 'Brief description about the founding member...' })}
                    </div>
                    
                    <div>
                        ${ui.createFormField('Display Order', 'display_order', 'number', item?.display_order || 0, { placeholder: '0' })}
                    </div>
                    
                    <div class="flex items-center">
                        ${ui.createFormField('Active', 'is_active', 'checkbox', item?.is_active !== false)}
                    </div>
                </div>
                
                <div class="flex justify-end space-x-4 pt-6 border-t">
                    <button type="button" onclick="window.ui.closeModal()" 
                        class="px-6 py-3 bg-gray-300 rounded-lg hover:bg-gray-400 transition-colors font-semibold">
                        <i class="fas fa-times mr-2"></i>Cancel
                    </button>
                    <button type="submit" 
                        class="px-6 py-3 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors font-semibold shadow-lg">
                        <i class="fas fa-${id ? 'save' : 'plus'} mr-2"></i>${id ? 'Update Member' : 'Create Member'}
                    </button>
                </div>
            </form>
        `;

        ui.createModal(id ? 'Edit Founding Member' : 'Add Founding Member', formContent);

        document.getElementById('foundingMemberForm').addEventListener('submit', async (e) => {
            e.preventDefault();
            ui.showLoading();

            try {
                const formData = new FormData(e.target);
                const file = formData.get('image');

                let imageUrl = item?.image_url || '';
                let cloudinaryId = item?.cloudinary_id || '';

                // Upload new image if selected
                if (file && file.size > 0) {
                    ui.showToast('Uploading image to Cloudinary...', 'info');
                    const upload = await api.uploadToCloudinary(file);
                    imageUrl = upload.url;
                    cloudinaryId = upload.public_id;
                }

                const data = {
                    name: formData.get('name'),
                    name_en: formData.get('name_en') || null,
                    role: formData.get('role'),
                    position: formData.get('position'),
                    institution: formData.get('institution'),
                    image_url: imageUrl,
                    cloudinary_id: cloudinaryId,
                    bio: formData.get('bio') || null,
                    display_order: parseInt(formData.get('display_order')) || 0,
                    is_active: formData.get('is_active') === 'on'
                };

                if (id) {
                    await api.updateFoundingMember(id, data);
                    ui.showToast('Founding member updated successfully! ✓', 'success');
                } else {
                    await api.createFoundingMember(data);
                    ui.showToast('Founding member created successfully! ✓', 'success');
                }

                ui.closeModal();
                this.loadFoundingMembers();
            } catch (error) {
                console.error('Error saving founding member:', error);
                ui.showToast('Error: ' + error.message, 'error');
            } finally {
                ui.hideLoading();
            }
        });
    }

    async deleteFoundingMember(id) {
        const member = ui.currentData.find(m => m.id === id);
        const memberName = member ? member.name : 'this member';

        if (await ui.confirm(`Are you sure you want to delete ${memberName}? This action cannot be undone.`)) {
            ui.showLoading();
            try {
                await api.deleteFoundingMember(id);
                ui.showToast('Founding member deleted successfully! ✓', 'success');
                this.loadFoundingMembers();
            } catch (error) {
                console.error('Error deleting founding member:', error);
                ui.showToast('Error: ' + error.message, 'error');
            } finally {
                ui.hideLoading();
            }
        }
    }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.adminApp = new AdminApp();
});
