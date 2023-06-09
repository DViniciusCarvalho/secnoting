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
        tables: Data.Tables;
    }
    
    interface CompletedProps {
        tables: Data.Tables;
    }
    
    interface FolderProps {
        theme: string;
        tables: Data.Tables;
    }

    interface AnnotationProps {
        title: string;
        content: string;
        id: string;
        timestamp: number;
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