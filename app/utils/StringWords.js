
module.exports = function (name) {
  return name.split(' ').map(string => string[0].toUpperCase() + string.substring(1).toLowerCase()).join(' ')
}
