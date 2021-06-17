const moment = require('moment');
module.exports = (timestamp) => {
    const date = moment(timestamp).format('dddd [the] Do [of] MMMM');
    const time = moment(timestamp).format('LTS');

   return `${date} ${time}`
};

