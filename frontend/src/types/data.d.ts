
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

    interface DeleteTemporaryData {
        id: number;
        title: string;
        content: string;
        token: string;
    }

    interface DeletePermanentlyData {
        id: number;
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
    
    interface AnnotationSections {
        [key: string]: Annotation[];
        folders: Annotation[];
        completeds: Annotation[];
        deleteds: Annotation[];
    }

    interface StatusPopUpMessages {
        readonly[key: string]: string;
    }

}