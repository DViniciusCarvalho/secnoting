// Logon interface
export interface LogonResponse {
    user_exists: boolean;
    valid_input: boolean;
}

// Login interface
export interface LoginResponse {
    validated: boolean;
    token: string;
}

// Header interface
export interface HeaderProps {
    name: string;
    email: string;
    changeTheme: () => void;
    theme: string;
    changedScreen: (event: MouseEvent) => void;
}

// User informations area interfaces
export interface UserProps {
    theme: string;
    name: string;
    email: string;
}

export interface UserInfo {
    name: string;
    email: string;
}

// Menu and its buttons interfaces
export interface MenuProps {
    changedTheme: () => void;
    changedScreen: (event: MouseEvent) => void;
    theme: string;
}

export interface FolderButtonProps {
    changedScreen: (event: MouseEvent) => void;
    theme: string;
}

export interface CompletedButtonProps {
    changedScreen: (event: MouseEvent) => void;
    theme: string;
}

export interface ThemeButtonProps {
    changedTheme: () => void;
    theme: string;
}

export interface DeletedButtonProps {
    changedScreen: (event: MouseEvent) => void;
    theme: string;
}

export interface LogOutButtonProps {
    theme: string;
}

// Main area interface
export interface MainProps {
    theme: string;
    folderVisible: string;
    completedVisible: string;
    deletedVisible: string;
    tables: Tables;
} 

// Main area components visibility
export interface VisibilityState {
    folder: string;
    completed: string;
    deleted: string;
}

// Main area components interfaces
export interface DeletedProps {
    table: Row[];
}

export interface CompletedProps {
    table: Row[];
}

export interface FolderProps {
    theme: string;
    table: Row[];
}

// Response to get internal page interface
export interface InternalPageResponse {
    authenticity: boolean;
    tables: Tables;
    user_info: UserInfo;
}

// Annotation interfaces
export interface AnnotationProps {
    title: string;
    content: string;
    id: string;
    timestamp: number;
}

// Response objects
export interface AnnotationResponse {
    title: string;
    content: string;
    id: number;
    timestamp: number;
}

export interface SendToDeleteReponse {
    authorized: boolean;
    done: boolean;
}

export interface SaveAnnotationReponse {
    authorized: boolean;
    done: boolean;
}

// Data object format to send to back-end
export interface SendToDeletedData {
    id: string;
    title: string;
    content: string;
    timestamp: number;
    token: string;
}

export interface DeletePermanentlyData {
    id: string;
    token: string;
}

export interface SaveAnnotationData {
    tableName: string;
    title: string; 
    content: string; 
    id: number; 
    timestamp: number;
    token: string;
}

// Request object parameters
export interface LogonRequestParameters {
    method: "POST";
    header: {[key: string]: string};
    body: string;
}

export interface LoginRequestParameters {
    method: "POST";
    header: {[key: string]: string};
    body: string;
}

export interface FetchAllDataRequestParameters {
    method: "POST";
    header: {[key: string]: string};
    body: string;
}

export interface SendToDeleteRequestParameters {
    method: "DELETE";
    header: {[key: string]: string};
    body: string;
}

export interface DeletePermanentlyRequestParameters {
    method: "DELETE";
    header: {[key: string]: string};
    body: string;
}

export interface SaveAnnotationRequestParameters {
    method: "PUT";
    header: {[key: string]: string};
    body: string;
}

export interface CreateAnnotationRequestParameters {
    method: "POST";
    header: {[key: string]: string};
    body: string;
}

// Tables response interfaces
export interface Row {
    id: number;
    title: string;
    content: string;
    timestamp: number;
}

export interface Tables {
    folders: Row[];
    completeds: Row[];
    deleteds: Row[];
}

// Pop-up interface
export interface PopUpProps {
    content: string;
    visibilityClass: string;
    status: string;
}

// Context props
export interface ContextProps {
    reRenderPage: () => void;
}

// Common components 
export interface ButtonProperties {
    message: string;
    page?: string;
    handleSubmitButtonClick: (event: React.MouseEvent<HTMLInputElement, MouseEvent>) => void;
}