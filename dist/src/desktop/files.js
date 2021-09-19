"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var typescript_1 = require("typescript");
var client_1 = require("./client");
var GET_PROJECT_FILES = null;
var ADD_PROJECT_FILE = null;
var DELETE_PROJECT_FILE = null;
function saveFile(filePath, contents) {
    return null;
}
exports.saveFile = saveFile;
function getProjectFiles() {
    if (!client_1.relateApiToken) {
        console.log('no api token');
        return Promise.resolve([]);
    }
    throw typescript_1.OperationCanceledException;
}
exports.getProjectFiles = getProjectFiles;
function getFileContents(file, token) {
    console.log(client_1.relateUrl + "/files/" + token + "/" + file);
    return fetch(client_1.relateUrl + "/files/" + token + "/" + file, {
        headers: {
            'X-API-Token': client_1.relateApiToken,
            'X-Client-Id': client_1.neo4jDesktopGraphAppId,
        }
    })
        .then(function (r) { return r.text(); })
        .catch(function (r) { return console.log('Error getting file contents', r); });
}
exports.getFileContents = getFileContents;
function getFileContentsAsJson(file, token) {
    return getFileContents(file, token)
        .then(function (r) { return JSON.parse(r); });
}
exports.getFileContentsAsJson = getFileContentsAsJson;
