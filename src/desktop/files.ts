
import { OperationCanceledException } from 'typescript';
import { client, neo4jDesktopGraphAppId, relateProjectId, relateApiToken, relateUrl } from './client';

const GET_PROJECT_FILES = null;


const ADD_PROJECT_FILE = null;

const DELETE_PROJECT_FILE = null;

export function saveFile(filePath: string, contents: string) {
    return null;
}

interface ProjectFile {
    name: string;
    extension: string;
    downloadToken: string;
}

export function getProjectFiles(): Promise<ProjectFile[]> {
    if ( !relateApiToken ) {
        console.log('no api token')
        return Promise.resolve([])
    }

    throw OperationCanceledException;
}

export function getFileContents(file: string, token: string): Promise<string | void> {
    console.log(`${relateUrl}/files/${token}/${file}`)
    return fetch(`${relateUrl}/files/${token}/${file}`, {
        headers: {
            'X-API-Token': relateApiToken,
            'X-Client-Id': neo4jDesktopGraphAppId,
        } as Record<string, string>
    })
        .then(r => r.text())
        .catch(r => console.log('Error getting file contents', r))
}

export function getFileContentsAsJson(file: string, token: string) {
    return getFileContents(file, token)
        .then(r => JSON.parse(r as string))
}