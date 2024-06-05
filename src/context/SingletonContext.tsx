/* eslint-disable react-refresh/only-export-components */
import { LaundryService, Image } from "@/lib/types";
import axios from "axios";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

interface SingletonContextType {
    laundryService: LaundryService[];
    setLaundryService: (service: LaundryService[]) => void;

    bannerList: Image[];
    setBannerList: (banner: Image[]) => void;
}

const SingletonContext = createContext<SingletonContextType | undefined>(undefined);

const useSingleton = (): SingletonContextType => {
    const context = useContext(SingletonContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

interface SingleProviderProps {
    children: ReactNode;
}
const SingletonProvider: React.FC<SingleProviderProps> = ({ children }) => {
    const [laundryService, setLaundryService] = useState<LaundryService[]>(
        JSON.parse(localStorage.getItem('laundryService') || '[]')
    );
    const [bannerList, setBannerList] = useState<Image[]>(
        JSON.parse(localStorage.getItem('bannerList') || '[]')
    );

    useEffect(() => {
        axios.request({
            method: 'get',
            maxBodyLength: Infinity,
            url: `${import.meta.env.VITE_API_URL}/laundry-services`,
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json',
            },
        }).then((response) => {
            setLaundryService(response.data)
            localStorage.setItem('laundryService', JSON.stringify(response.data))
        }).catch((error) => {
            console.log(error);
        });

        axios.request({
            method: 'get',
            maxBodyLength: Infinity,
            url: `${import.meta.env.VITE_API_URL}/images`,
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json',
            },
        }).then((response) => {
            setBannerList(response.data)
            localStorage.setItem('bannerList', JSON.stringify(response.data))
        }).catch((error) => {
            console.log(error);
        });
    }, []);
    return (
        <SingletonContext.Provider value={{ laundryService, setLaundryService, bannerList, setBannerList }}>
            {children}
        </SingletonContext.Provider>
    );
}

export { SingletonProvider, useSingleton };