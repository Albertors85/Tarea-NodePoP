const i18n = require('i18n');
const path = require('node:path');

i18n.configure({
    locales:['en','es'],
    directory: path.join(__dirname, '..', 'locales'),//linus y window
    defaultLocale: 'en',
    autoReload: true,
    syncFiles: true,
    cookie: 'nodePoP-locale',
})

//init-db.js
module.exports =i18n;