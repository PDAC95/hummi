import { createContext } from "react";

export type FreshFlowContextType = {
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  isMobileOpen: boolean;
  setIsMobileOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isSearch: boolean;
  setIsSearch: React.Dispatch<React.SetStateAction<boolean>>;
  isSideBar: boolean;
  setSideBar: React.Dispatch<React.SetStateAction<boolean>>;
  toggleMobileMenu: () => void;
  scrollToSection: (id: string) => void;
  activeSection: string;
  setActiveSection: React.Dispatch<React.SetStateAction<string>>;
};
const FreshFlowContext = createContext<FreshFlowContextType | null>(null);

export default FreshFlowContext;