import { useEffect } from "react";

import useRefreshToken from "./useRefreshToken";
import { axiosPrivate } from "../api/axios";

const useAxiosPrivate = () => {
    const refresh = useRefreshToken();

    useEffect(() => {
        const accessToken = localStorage.getItem("access-token");
        const requestIntercept = axiosPrivate.interceptors.request.use(
            config => {
                if(!config.headers["Authorization"]) {
                    config.headers["Authorization"] = `Bearer ${accessToken}`;
                }
                return config;
            }, (error) => Promise.reject(error)
        );

        const responseIntercept = axiosPrivate.interceptors.response.use( // updating accessToken using refresh token, which is stored in backend
            response => response, 
            async(error) => {
                const prevRequest = error?.config;
                if(error?.response?.status === 403 && !prevRequest?.sent) {
                    prevRequest.sent = true;
                    const newAccessToken = await refresh();
                    prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
                    return axiosPrivate(prevRequest);
                }
                return Promise.reject(error);
            }
        );

        return () => {
            axiosPrivate.interceptors.request.eject(requestIntercept);
            axiosPrivate.interceptors.response.eject(responseIntercept);
        }
    }, [refresh]);

    return axiosPrivate;
};

export default useAxiosPrivate;