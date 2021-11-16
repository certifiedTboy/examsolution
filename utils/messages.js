const moment = require('moment');

const formatMessage = (username, text) => {
  return {
    username,
    text,
    time: moment().format('h:mm a')
  };
}

const formatLikes = (username, text) => {
  return {
    username,
    text
  }
}

module.exports = {
  formatMessage,
  formatLikes
};
