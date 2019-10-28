
const updateData = require('./functions/update_data');
const mapifyData = require('./functions/mapify_data');

async function main() {
    await updateData();
    await mapifyData();
}

main();