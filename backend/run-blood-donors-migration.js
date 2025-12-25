// Run migration to create blood donors table
require('dotenv').config();
const migration = require('./migrations/002_add_blood_donors');

async function runMigration() {
    try {
        console.log('🚀 Starting blood donors table creation...\n');
        await migration.up();
        console.log('\n✅ Migration completed successfully!');
        process.exit(0);
    } catch (error) {
        console.error('\n❌ Migration failed:', error);
        process.exit(1);
    }
}

runMigration();
