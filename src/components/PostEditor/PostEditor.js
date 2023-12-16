import { useEffect, useState } from "react";

import axios from "axios";

import Editor from "../Editor/Editor";

function PostEditor() {
    const [title, setTitle] = useState("");
    const [topic, setTopic] = useState("");
    const [text, setText] = useState("");

    const topicOptions = [
        "Biomedical engineering", 
        "Chemical engineering",
        "Electricity",
        "Environmental Engineering",
        "Software Engineering",
        "Advanced Materials",
        "Agricultural Engineering",
        "Artificial intelligence",
        "Computer architecture",
        "Computer Engineering",
        "Design",
        "Development Of Autonomous Driving Systems",
        "Electromechanical Engineering",
        "Materials Engineering",
        "Sustainable Energy And Machinery",
    ];

    const postId = window.location.pathname.slice(13);

    useEffect(() => {
        const getPost = async () => {
            await axios.get(`http://localhost:3001/post/${postId}/`)
            .then(response => {
                setTitle(response.data.title);
                setTopic(response.data.topic);
                setText(response.data.text);
            })
            .catch(error => {
                console.log(error);
            })
        }

        getPost();
    }, []);

    const updatePost = async (handleFeedbackMessageUpdate) => {
        if(title.length === 0 || title.length > 55) {
            handleFeedbackMessageUpdate("titleError");
            return;
        } else if(topic.length === 0) {
            handleFeedbackMessageUpdate("topicError");
            return;
        } else if(text.length === 0 || text.length > 1500) {
            handleFeedbackMessageUpdate("textError");
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
                `http://localhost:3001/post/${postId}/`,
                {title: title, topic: topic, text: text},
                {
                    headers: {
                        "Content-Type": "application/json; charset=UTF-8",
                        "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
                    },
                }
            )
            .then(response => {
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

    const clearInputs = () => {
        setTitle("");
        setTopic("");
        setText("");
    }


    return (
        <Editor 
            type="post"
            value={title}
            setValue={setTitle}
            choosableValue={topic}
            setChoosableValue={setTopic}
            multilineValue={text}
            setMultilineValue={setText}
            choosableValueOptions={topicOptions}
            editFunction={updatePost}
            clearInputs={clearInputs}
        />
    )
}

export default PostEditor;