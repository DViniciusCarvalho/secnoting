import { Data } from "./data";

export namespace Props {

    interface HeaderProps {
        name: string;
        email: string;
        changeTheme: () => void;
        theme: string;
        changedScreen: (event: MouseEvent) => void;
    }
    
    interface UserProps {
        theme: string;
        name: string;
        email: string;
    }

    interface MenuProps {
        changedTheme: () => void;
        changedScreen: (event: MouseEvent) => void;
        theme: string;
    }
    
    interface FolderButtonProps {
        changedScreen: (event: MouseEvent) => void;
        theme: string;
    }
    
    interface CompletedButtonProps {
        changedScreen: (event: MouseEvent) => void;
        theme: string;
    }
    
    interface ThemeButtonProps {
        changedTheme: () => void;
        theme: string;
    }
    
    interface DeletedButtonProps {
        changedScreen: (event: MouseEvent) => void;
        theme: string;
    }
    
    interface LogOutButtonProps {
        theme: string;
    }

    interface MainProps {
        theme: string;
        folderVisible: string;
        completedVisible: string;
        deletedVisible: string;
        tables: Data.Tables;
    } 

    interface DeletedProps {
        table: Data.Row[];
    }
    
    interface CompletedProps {
        table: Data.Row[];
    }
    
    interface FolderProps {
        theme: string;
        table: Data.Row[];
    }

    interface AnnotationProps {
        title: string;
        content: string;
        id: string;
        timestamp: number;
        alterDOMAction: any;
    }


    interface ContextProps {
        resortAnnotationsByTimestampInDOM: () => void;
        moveFromFoldersToDeletedInDOM: () => void;
        deleteAnnotationPermanentlyInDOM: () => void;
        reArrangeAnnotationsSignal: number;
    }

    interface ButtonProps {
        message: string;
        page?: string;
        handleSubmitButtonClick: (event: React.MouseEvent<HTMLInputElement, MouseEvent>) => void;
    }

    interface PopUpProps {
        content: string;
        visibilityClass: string;
        status: string;
    }

}