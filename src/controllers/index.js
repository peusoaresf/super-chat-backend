const fs = require('fs')
const path = require('path')

const currentFolder = __dirname.split(path.sep).slice(-1)[0]

const isDirectory = fullPath => fs.statSync(fullPath).isDirectory()
const getDirectories = fullPath =>
  fs.readdirSync(fullPath).map(name => path.join(fullPath, name)).filter(isDirectory)

const isFile = fullPath => fs.statSync(fullPath).isFile()
const getFiles = fullPath =>
  fs.readdirSync(fullPath).map(name => path.join(fullPath, name)).filter(isFile)

const getFilesRecursively = (fullPath) => {
  let dirs = getDirectories(fullPath)
  let files = dirs
    .map(dir => getFilesRecursively(dir)) // go through each directory
    .reduce((a, b) => a.concat(b), [])     // map returns a 2d array (array of file arrays) so flatten
  return files.concat(getFiles(fullPath))
};

module.exports = (server) => {
  const files = getFilesRecursively(__dirname)

  files
    .filter(file => {
      return (file.indexOf('.') !== 0)
        && (!file.startsWith('_'))
        && (file !== __filename)
        && (file.slice(-3) === '.js')
    })
    .forEach(file => {
      var router = require(file)

      var endpoint = '/' + file.substring(file.indexOf(currentFolder) + (currentFolder.length + 1), file.length).split(path.sep).join('/').replace('.js', '')

      server.use(endpoint, router)
    })
}