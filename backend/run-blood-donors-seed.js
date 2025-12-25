// Run migration to seed blood donors
require('dotenv').config();
const migration = require('./migrations/006_seed_blood_donors');

async function runMigration() {
    try {
        console.log('🚀 Starting blood donors seeding...\n');
        await migration.up();
        console.log('\n✅ Migration completed successfully!');
        process.exit(0);
    } catch (error) {
        console.error('\n❌ Migration failed:', error);
        process.exit(1);
    }
}

runMigration();
