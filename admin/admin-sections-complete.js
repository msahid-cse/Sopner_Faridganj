// Complete implementations for remaining admin sections

// Add these methods to the AdminApp class in admin-main.js

// COMMITTEE MEMBERS SECTION
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

// ACTIVITIES SECTION
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

// SPONSORS SECTION
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
            { key: 'display_order', label: 'Order' },
            {
                key: 'is_active',
                label: 'Status',
                render: (val) => val ?
                    '<span class="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs">Active</span>' :
                    '<span class="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-xs">Inactive</span>'
            }
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

// GALLERY SECTION
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
            { key: 'display_order', label: 'Order' },
            {
                key: 'is_active',
                label: 'Status',
                render: (val) => val ?
                    '<span class="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs">Active</span>' :
                    '<span class="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-xs">Inactive</span>'
            }
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
                    <button onclick="window.adminApp.deleteGalleryCategory(${row.id})" 
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
                <button onclick="window.adminApp.showGalleryImageForm(${categoryId})" 
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

showGalleryImageForm(categoryId) {
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

            // Reload gallery view
            const category = ui.currentData.find(c => c.id === categoryId);
            if (category) {
                this.viewGalleryImages(categoryId, category.slug);
            }
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

async deleteGalleryCategory(id) {
    if (await ui.confirm('Are you sure you want to delete this category? All images in this category will also be deleted.')) {
        ui.showLoading();
        try {
            await api.deleteGalleryCategory(id);
            ui.showToast('Gallery category deleted successfully! ✓', 'success');
            this.loadGallery();
        } catch (error) {
            ui.showToast('Error: ' + error.message, 'error');
        } finally {
            ui.hideLoading();
        }
    }
}
