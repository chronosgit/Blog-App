import axios from "../api/axios";

const useRefreshToken = () => {
    const refresh = async () => {
        const response = await axios.get("/refresh", {
            withCredentials: true
        });
        
        localStorage.removeItem("access-token");
        localStorage.setItem("access-token", response.data.accessToken);
        console.log("refreshed token!");
        return response.data.accessToken;
    };
    return refresh;
};

export default useRefreshToken;