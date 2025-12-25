// UI Module for Admin Panel
class AdminUI {
    constructor() {
        this.currentSection = 'dashboard';
        this.currentData = [];
    }

    // Show loading
    showLoading() {
        document.getElementById('loadingOverlay').classList.add('active');
    }

    // Hide loading
    hideLoading() {
        document.getElementById('loadingOverlay').classList.remove('active');
    }

    // Show toast notification
    showToast(message, type = 'success') {
        const colors = {
            success: 'bg-green-500',
            error: 'bg-red-500',
            info: 'bg-blue-500'
        };
        const toast = document.createElement('div');
        toast.className = `fixed top-4 right-4 px-6 py-4 rounded-lg shadow-lg z-50 ${colors[type] || colors.success} text-white`;
        toast.textContent = message;
        document.body.appendChild(toast);

        setTimeout(() => {
            toast.remove();
        }, 3000);
    }

    // Confirm dialog
    async confirm(message) {
        return new Promise((resolve) => {
            const modal = this.createModal('Confirm', `
                <p class="text-gray-700 mb-6">${message}</p>
                <div class="flex justify-end space-x-4">
                    <button onclick="window.ui.closeModal(); window.confirmResolve(false)" 
                        class="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400">
                        Cancel
                    </button>
                    <button onclick="window.ui.closeModal(); window.confirmResolve(true)" 
                        class="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
                        Confirm
                    </button>
                </div>
            `);
            window.confirmResolve = resolve;
        });
    }

    // Create modal
    createModal(title, content) {
        const modalHTML = `
            <div class="modal active fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                <div class="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                    <div class="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
                        <h2 class="text-2xl font-bold text-gray-800">${title}</h2>
                        <button onclick="window.ui.closeModal()" class="text-gray-500 hover:text-gray-700">
                            <i class="fas fa-times text-xl"></i>
                        </button>
                    </div>
                    <div class="p-6">
                        ${content}
                    </div>
                </div>
            </div>
        `;
        document.getElementById('modalContainer').innerHTML = modalHTML;
    }

    // Close modal
    closeModal() {
        document.getElementById('modalContainer').innerHTML = '';
    }

    // Create form field
    createFormField(label, name, type = 'text', value = '', options = {}) {
        const required = options.required !== false ? 'required' : '';
        const placeholder = options.placeholder || '';

        if (type === 'select') {
            return `
                <div class="mb-4">
                    <label class="block text-sm font-medium text-gray-700 mb-2">${label}</label>
                    <select name="${name}" ${required} class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500">
                        ${options.choices.map(choice => `
                            <option value="${choice.value}" ${choice.value === value ? 'selected' : ''}>
                                ${choice.label}
                            </option>
                        `).join('')}
                    </select>
                </div>
            `;
        } else if (type === 'textarea') {
            return `
                <div class="mb-4">
                    <label class="block text-sm font-medium text-gray-700 mb-2">${label}</label>
                    <textarea name="${name}" ${required} rows="4" placeholder="${placeholder}"
                        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500">${value}</textarea>
                </div>
            `;
        } else if (type === 'checkbox') {
            return `
                <div class="mb-4 flex items-center">
                    <input type="checkbox" name="${name}" ${value ? 'checked' : ''} 
                        class="w-4 h-4 text-emerald-500 border-gray-300 rounded focus:ring-emerald-500">
                    <label class="ml-2 text-sm font-medium text-gray-700">${label}</label>
                </div>
            `;
        } else if (type === 'file') {
            return `
                <div class="mb-4">
                    <label class="block text-sm font-medium text-gray-700 mb-2">${label}</label>
                    <input type="file" name="${name}" accept="image/*" ${required}
                        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500">
                    ${value ? `<img src="${value}" class="mt-2 w-32 h-32 object-cover rounded-lg">` : ''}
                </div>
            `;
        } else {
            return `
                <div class="mb-4">
                    <label class="block text-sm font-medium text-gray-700 mb-2">${label}</label>
                    <input type="${type}" name="${name}" value="${value}" ${required} placeholder="${placeholder}"
                        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500">
                </div>
            `;
        }
    }

    // Create data table
    createTable(columns, data, actions) {
        return `
            <div class="overflow-x-auto">
                <table class="min-w-full bg-white border border-gray-200 rounded-lg">
                    <thead class="bg-gray-50">
                        <tr>
                            ${columns.map(col => `
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    ${col.label}
                                </th>
                            `).join('')}
                            ${actions ? '<th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>' : ''}
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-200">
                        ${data.length === 0 ? `
                            <tr>
                                <td colspan="${columns.length + (actions ? 1 : 0)}" class="px-6 py-8 text-center text-gray-500">
                                    No data found
                                </td>
                            </tr>
                        ` : data.map((row, index) => `
                            <tr class="hover:bg-gray-50">
                                ${columns.map(col => `
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        ${col.render ? col.render(row[col.key], row, index) : row[col.key] || '-'}
                                    </td>
                                `).join('')}
                                ${actions ? `
                                    <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        ${actions(row, index)}
                                    </td>
                                ` : ''}
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        `;
    }

    // Dashboard view
    renderDashboard() {
        return `
            <div class="mb-8">
                <h2 class="text-3xl font-bold text-gray-800 mb-2">Dashboard</h2>
                <p class="text-gray-600">Welcome to স্বপ্নের ফরিদগঞ্জ Admin Panel</p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div class="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl shadow-lg p-6 text-white">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-emerald-100 text-sm">Total Advisors</p>
                            <p class="text-3xl font-bold mt-2" id="totalAdvisors">-</p>
                        </div>
                        <i class="fas fa-users text-4xl text-emerald-200"></i>
                    </div>
                </div>

                <div class="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg p-6 text-white">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-blue-100 text-sm">Gallery Images</p>
                            <p class="text-3xl font-bold mt-2" id="totalGallery">-</p>
                        </div>
                        <i class="fas fa-images text-4xl text-blue-200"></i>
                    </div>
                </div>

                <div class="bg-gradient-to-br from-red-500 to-red-600 rounded-xl shadow-lg p-6 text-white">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-red-100 text-sm">Blood Donors</p>
                            <p class="text-3xl font-bold mt-2" id="totalDonors">-</p>
                        </div>
                        <i class="fas fa-tint text-4xl text-red-200"></i>
                    </div>
                </div>

                <div class="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg p-6 text-white">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-purple-100 text-sm">Schools</p>
                            <p class="text-3xl font-bold mt-2" id="totalSchools">-</p>
                        </div>
                        <i class="fas fa-school text-4xl text-purple-200"></i>
                    </div>
                </div>
            </div>

            <div class="bg-white rounded-xl shadow-lg p-6">
                <h3 class="text-xl font-bold text-gray-800 mb-4">Quick Actions</h3>
                <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <button onclick="window.adminApp.loadSection('advisors')" 
                        class="p-4 bg-emerald-50 hover:bg-emerald-100 rounded-lg text-center transition-colors">
                        <i class="fas fa-users text-2xl text-emerald-500 mb-2"></i>
                        <p class="text-sm font-medium text-gray-700">Manage Advisors</p>
                    </button>
                    <button onclick="window.adminApp.loadSection('gallery')" 
                        class="p-4 bg-blue-50 hover:bg-blue-100 rounded-lg text-center transition-colors">
                        <i class="fas fa-images text-2xl text-blue-500 mb-2"></i>
                        <p class="text-sm font-medium text-gray-700">Manage Gallery</p>
                    </button>
                    <button onclick="window.adminApp.loadSection('blood-donors')" 
                        class="p-4 bg-red-50 hover:bg-red-100 rounded-lg text-center transition-colors">
                        <i class="fas fa-tint text-2xl text-red-500 mb-2"></i>
                        <p class="text-sm font-medium text-gray-700">Blood Donors</p>
                    </button>
                    <button onclick="window.adminApp.loadSection('hero')" 
                        class="p-4 bg-purple-50 hover:bg-purple-100 rounded-lg text-center transition-colors">
                        <i class="fas fa-image text-2xl text-purple-500 mb-2"></i>
                        <p class="text-sm font-medium text-gray-700">Hero Images</p>
                    </button>
                </div>
            </div>
        `;
    }
}

// Create global UI instance
window.ui = new AdminUI();
