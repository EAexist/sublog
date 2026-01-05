import {createContext, Dispatch, PropsWithChildren, SetStateAction, useContext, useState} from "react";

export interface UIContextType {
    showEmail: boolean;
    setShowEmail: Dispatch<SetStateAction<boolean>>;
}

export const UIContext = createContext<UIContextType>({
    showEmail: false, setShowEmail: () => {
    }
})

export const UIProvider = ({children}: PropsWithChildren) => {
    const [showEmail, setShowEmail] = useState(false)
    return <UIContext.Provider value={{showEmail, setShowEmail}}>{children}</UIContext.Provider>
}
export const useUI: () => UIContextType = () => {
    const context = useContext(UIContext);
    if (context === undefined) {
        throw new Error('useUI must be used within a UIProvider');
    }
    return context;
};