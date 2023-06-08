
export namespace Data {

    interface UserInfo {
        name: string;
        email: string;
    }

    interface VisibilityState {
        folder: string;
        completed: string;
        deleted: string;
    }

    interface SendToDeletedData {
        id: string;
        title: string;
        content: string;
        timestamp: number;
        token: string;
    }

    interface DeletePermanentlyData {
        id: string;
        token: string;
    }

    interface SaveAnnotationData {
        tableName: string;
        title: string; 
        content: string; 
        id: number; 
        timestamp: number;
        token: string;
    }

    interface Annotation {
        id: number;
        title: string;
        content: string;
        timestamp: number;
    }

    type Row = Annotation;
    
    interface Tables {
        folders: Row[];
        completeds: Row[];
        deleteds: Row[];
    }

}