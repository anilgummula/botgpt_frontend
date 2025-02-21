import React, { useState, useEffect, useRef } from 'react';
import Logo from './Logo';
import { AiOutlineEnter } from "react-icons/ai";

const backend_url=import.meta.env.VITE_URL;

const Chatbot = () => {
    const [messages, setMessages] = useState([]);
    const [inputText, setInputText] = useState('');
    const chatEndRef = useRef(null); //for auto scroll
    const [title,setTitle] = useState(true);

    const usefocus = useRef(null);

    useEffect(()=>{
        usefocus.current.focus()
    });

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSubmit = async (e) => {
        setTitle(false);
        e.preventDefault();
        if (inputText.trim() === '') return;

        setMessages(prev => [...prev, { text: inputText, sender: 'user' }]);

       
        await handleServer(inputText);

        
        setInputText('');
    };

    const handleServer = async (message) => {
        try {
            // const backend_url = 'http://localhost:3000/query'
            const response = await fetch(`${backend_url}/query`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ query: message }),
            });

            if (!response.ok) {
                throw new Error("Server error!");
            }

            const data = await response.json();

            setMessages(prev => [...prev, { text: data.response || "No response", sender: 'bot' }]);
        } catch (error) {
            console.error("Error fetching server response:", error);
        }
    };

    return (
        <div className='min-h-screen bg-slate-900 text-xl font-semibold flex flex-col'>

            {/* Logo */}
            <Logo />
            {
                title? 
                <div className='flex justify-center align-center p-10 mx-auto mt-40 text-3xl text-white font-bold'>
                    <h1>How can I help u?</h1>
                </div>: " " 
            }

            {/* Chat area */}
            <div className='flex-grow overflow-y-auto p-10 space-y-4 pb-24'>
                {messages.map((msg, index) => (
                    <div key={index} className={`w-full flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <span className={`h-auto p-2 px-4 border-2 rounded-lg ${msg.sender === 'user' ? 'bg-blue-200' : 'bg-green-200'}`}>
                            {msg.text}
                        </span>
                    </div>
                ))}
                <div ref={chatEndRef} /> {/* auto scroll */}
            </div>

            {/* input area */}
            <form onSubmit={handleSubmit}>
                <div className='flex w-full fixed bottom-0 justify-center p-1'>
                    <div className='flex md:h-12 h-12 md:w-200 mx-10 md:mx-8 bg-slate-100 border-2 rounded-md p-2'>
                        <input
                            className='w-full bg-slate-100 p-2 outline-none'
                            type="text"
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            placeholder="Type a message..."

                            ref={usefocus}
                        />
                        <button type="submit" className='bg-slate-300'>
                            <AiOutlineEnter size={34} />
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Chatbot;
