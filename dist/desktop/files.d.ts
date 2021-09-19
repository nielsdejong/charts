export declare function saveFile(filePath: string, contents: string): null;
interface ProjectFile {
    name: string;
    extension: string;
    downloadToken: string;
}
export declare function getProjectFiles(): Promise<ProjectFile[]>;
export declare function getFileContents(file: string, token: string): Promise<string | void>;
export declare function getFileContentsAsJson(file: string, token: string): Promise<any>;
export {};
