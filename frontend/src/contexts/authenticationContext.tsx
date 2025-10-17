import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

interface User{
    id:number;
    first_name:string;
    last_name:string;
    email:string;
}

interface AuthContextType{
    user: User| null;
    token: string | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
    setToken: React.Dispatch<React.SetStateAction<string | null>>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthContextProvider = ({children}: {children:ReactNode}) => {
    const [user, setUser] = useState<User| null>(null);
    const [token,setToken]= useState<string|null>(localStorage.getItem("token"));

    useEffect(()=>{
        if(token) localStorage.setItem("token", token);
        else localStorage.removeItem("token");
    }, [token]);


    const logout = () =>{
        setUser(null);
        setToken(null);
    localStorage.removeItem("token"); 
    };


    return (
        <AuthContext.Provider value = {{user, setUser, token, setToken, logout}}>
            {children}
        </AuthContext.Provider>    
    );
};

export const useAuthContext = () => {
    const context = useContext(AuthContext);
    if(!context) throw new Error ("useAuthContext must be used within AuthContextProvider");
    return context;
};

