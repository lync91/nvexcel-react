import { createContext } from "react";
  
export const AppContext = createContext({
    isOpen: true,
    selectedKey: '/home',
    dismissPanel: (key: any) => {}
})