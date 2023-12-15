import { useEffect, useState } from "react";

import axios from "axios";

import Editor from "../Editor/Editor";

function ProfileEditor(props) {
    const [newBio, setNewBio] = useState("Existing user bio is most probably being fetched right now...");
    const userId = window.location.pathname.slice(16);

    useEffect(() => {
        const getUser = async () => {
            await axios.get("http://localhost:3001/refresh/", {
                    withCredentials: true,
                    credentials: "include",
                })
            .then(async (response) => {
                localStorage.removeItem("accessToken");
                localStorage.setItem("accessToken", response.data.accessToken);

                await axios.get("http://localhost:3001/user/", {
                    headers: {
                        "Content-Type": "application/json; charset=UTF-8",
                        "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
                    },
                })
                .then(response => {
                    setNewBio(response.data.bio);
                })
                .catch(error => {
                    console.log(error);
                });
            })
            .catch(error => {
                console.log(error);
            });
        };

        getUser();
    }, []);

    const updateBio = async (handleFeedbackMessageUpdate) => {
        if(newBio.length <= 0 || newBio.length > 100) {
            handleFeedbackMessageUpdate("bioError");
            return;
        }

        await axios.get("http://localhost:3001/refresh/", 
            {
                withCredentials: true,
                credentials: "include",
            }
        )
        .then(async (response) => {
            localStorage.removeItem("accessToken");
            localStorage.setItem("accessToken", response.data.accessToken);

            await axios.post(
                `http://localhost:3001/user/${userId}/update/bio/`,
                {bio: newBio},
                {
                    headers: {
                        "Content-Type": "application/json; charset=UTF-8",
                        "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
                    },
                }
            )
            .then(response => {
                console.log(response.data.response);

                handleFeedbackMessageUpdate("updateSuccess");
            })
            .catch(error => {
                console.log(error);

                handleFeedbackMessageUpdate("axiosError", error.response?.data?.error || error.message);
            });
        })
        .catch(error => {
            console.log(error);
            
            handleFeedbackMessageUpdate("axiosError", error.response?.data?.error || error.message);
        });
    };

    return (
        <Editor 
            type="bio"
            multilineValue={newBio}
            setMultilineValue={setNewBio}
            editFunction={updateBio}
            clearInputs={() => setNewBio("")}
        />
    )
}

export default ProfileEditor;