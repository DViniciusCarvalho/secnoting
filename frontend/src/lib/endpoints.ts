const API_HOST = 'localhost';
const API_PORT = 9090;
const API_ENDPOINT = `http://${API_HOST}:${API_PORT}/`;


export const LOGON_USER_ENDPOINT = API_ENDPOINT + 'logon-user';

export const LOGIN_USER_ENDPOINT = API_ENDPOINT + 'login-user';

export const FETCH_USER_INITIAL_DATA_ENDPOINT = API_ENDPOINT + 'internal-page-validation';

export const ADD_ANNOTATION_ENDPOINT = API_ENDPOINT + 'add-annotation';

export const DELETE_ANNOTATION_PERMANENTLY_ENDPOINT = API_ENDPOINT + 'delete-annotation-permanently';

export const DELETE_TEMPORARY_ENDPOINT = API_ENDPOINT + 'delete-folder-annotation';
 
export const SAVE_ANNOTATION_CHANGES_ENDPOINT = API_ENDPOINT + 'save-annotation';