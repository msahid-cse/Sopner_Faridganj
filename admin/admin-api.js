// Enhanced Admin API with Founding Members
class AdminAPI {
    constructor() {
        this.baseURL = CONFIG.API_URL;
    }

    async fetch(endpoint, options = {}) {
        try {
            const response = await fetch(`${this.baseURL}${endpoint}`, {
                headers: { 'Content-Type': 'application/json', ...options.headers },
                ...options
            });
            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.error || `HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error(`API Error (${endpoint}):`, error);
            throw error;
        }
    }

    // Hero Images
    async getHeroImages() { return this.fetch('/hero'); }
    async createHeroImage(data) { return this.fetch('/hero', { method: 'POST', body: JSON.stringify(data) }); }
    async updateHeroImage(id, data) { return this.fetch(`/hero/${id}`, { method: 'PUT', body: JSON.stringify(data) }); }
    async deleteHeroImage(id) { return this.fetch(`/hero/${id}`, { method: 'DELETE' }); }

    // Statistics
    async getStatistics() { return this.fetch('/stats'); }
    async createStatistic(data) { return this.fetch('/stats', { method: 'POST', body: JSON.stringify(data) }); }
    async updateStatistic(id, data) { return this.fetch(`/stats/${id}`, { method: 'PUT', body: JSON.stringify(data) }); }
    async deleteStatistic(id) { return this.fetch(`/stats/${id}`, { method: 'DELETE' }); }

    // Advisors
    async getAdvisors() { return this.fetch('/advisors'); }
    async createAdvisor(data) { return this.fetch('/advisors', { method: 'POST', body: JSON.stringify(data) }); }
    async updateAdvisor(id, data) { return this.fetch(`/advisors/${id}`, { method: 'PUT', body: JSON.stringify(data) }); }
    async deleteAdvisor(id) { return this.fetch(`/advisors/${id}`, { method: 'DELETE' }); }

    // Committee Members
    async getCommitteeMembers(year) { return this.fetch(`/committee${year ? `?year=${year}` : ''}`); }
    async createCommitteeMember(data) { return this.fetch('/committee', { method: 'POST', body: JSON.stringify(data) }); }
    async updateCommitteeMember(id, data) { return this.fetch(`/committee/${id}`, { method: 'PUT', body: JSON.stringify(data) }); }
    async deleteCommitteeMember(id) { return this.fetch(`/committee/${id}`, { method: 'DELETE' }); }

    // Gallery
    async getGalleryCategories(year) { return this.fetch(`/gallery/categories${year ? `?year=${year}` : ''}`); }
    async getGalleryCategory(slug) { return this.fetch(`/gallery/categories/${slug}`); }
    async createGalleryCategory(data) { return this.fetch('/gallery/categories', { method: 'POST', body: JSON.stringify(data) }); }
    async updateGalleryCategory(id, data) { return this.fetch(`/gallery/categories/${id}`, { method: 'PUT', body: JSON.stringify(data) }); }
    async createGalleryImage(data) { return this.fetch('/gallery/images', { method: 'POST', body: JSON.stringify(data) }); }
    async deleteGalleryImage(id) { return this.fetch(`/gallery/images/${id}`, { method: 'DELETE' }); }

    // Activities
    async getActivities() { return this.fetch('/activities'); }
    async createActivity(data) { return this.fetch('/activities', { method: 'POST', body: JSON.stringify(data) }); }
    async updateActivity(id, data) { return this.fetch(`/activities/${id}`, { method: 'PUT', body: JSON.stringify(data) }); }
    async deleteActivity(id) { return this.fetch(`/activities/${id}`, { method: 'DELETE' }); }

    // Sponsors
    async getSponsors() { return this.fetch('/sponsors'); }
    async createSponsor(data) { return this.fetch('/sponsors', { method: 'POST', body: JSON.stringify(data) }); }
    async updateSponsor(id, data) { return this.fetch(`/sponsors/${id}`, { method: 'PUT', body: JSON.stringify(data) }); }
    async deleteSponsor(id) { return this.fetch(`/sponsors/${id}`, { method: 'DELETE' }); }

    // Blood Donors
    async getBloodDonors(filters = {}) {
        const params = new URLSearchParams(filters);
        return this.fetch(`/blood-donors?${params}`);
    }
    async createBloodDonor(data) { return this.fetch('/blood-donors', { method: 'POST', body: JSON.stringify(data) }); }
    async updateBloodDonor(id, data) { return this.fetch(`/blood-donors/${id}`, { method: 'PUT', body: JSON.stringify(data) }); }
    async deleteBloodDonor(id) { return this.fetch(`/blood-donors/${id}`, { method: 'DELETE' }); }

    // Founding Members
    async getFoundingMembers() { return this.fetch('/founding-members'); }
    async createFoundingMember(data) { return this.fetch('/founding-members', { method: 'POST', body: JSON.stringify(data) }); }
    async updateFoundingMember(id, data) { return this.fetch(`/founding-members/${id}`, { method: 'PUT', body: JSON.stringify(data) }); }
    async deleteFoundingMember(id) { return this.fetch(`/founding-members/${id}`, { method: 'DELETE' }); }

    // Cloudinary Upload
    async uploadToCloudinary(file) {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', CONFIG.CLOUDINARY.UPLOAD_PRESET);
        formData.append('cloud_name', CONFIG.CLOUDINARY.CLOUD_NAME);
        try {
            const response = await fetch(
                `https://api.cloudinary.com/v1_1/${CONFIG.CLOUDINARY.CLOUD_NAME}/image/upload`,
                { method: 'POST', body: formData }
            );
            if (!response.ok) throw new Error('Upload failed');
            const data = await response.json();
            return { url: data.secure_url, public_id: data.public_id };
        } catch (error) {
            console.error('Cloudinary upload error:', error);
            throw error;
        }
    }
}

window.api = new AdminAPI();
