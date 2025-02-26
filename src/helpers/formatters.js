// /src/helpers/formatters.js
const { format } = require('date-fns'); // Requires `npm install date-fns`

function formatDate(date, pattern = 'yyyy-MM-dd') {
    return format(new Date(date), pattern);
}

module.exports = {
    formatDate,
};