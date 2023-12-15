import { useEffect, useState } from "react";

import axios from "axios";

import Editor from "../Editor/Editor";

function CommentEditor() {
    const [comment, setComment] = useState("");

    const commentId = window.location.pathname.slice(16);

    useEffect(() => {
        const getComment = async () => {
            await axios.get(`http://localhost:3001/comment/${commentId}/`)
            .then(response => {
                setComment(response.data.text);
            })
            .catch(error => {
                console.log(error);
            })
        }

        getComment();
    }, []);

    const updateComment = async (handleFeedbackMessageUpdate) => {
        if(comment.length <= 0 || comment.length > 1000) {
            handleFeedbackMessageUpdate("commentError");
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

            await axios.put(
                `http://localhost:3001/comment/${commentId}/`,
                {comment: comment},
                {
                    headers: {
                        "Content-Type": "application/json; charset=UTF-8",
                        "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
                    },
                }
            )
            .then(response => {
                console.log(response);

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
    }

    return (
        <Editor 
            type="comment"
            multilineValue={comment}
            setMultilineValue={setComment}
            editFunction={updateComment}
            clearInputs={() => setComment("")}
        />
    )
}

export default CommentEditor;