'use client'
import React, { useState } from "react";

interface FormProps {
    onAdd: (title: string, content: string) => void;
}

const Form: React.FC<FormProps> = ({ onAdd }) =>{

    const [title, setTitle ] = useState('');
    const [content , setContent] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onAdd(title, content);
        setContent('');
        setTitle('');
    }

    return(
        <form onSubmit={handleSubmit}>
            <input 
                type="text" 
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Note Title"
                className="border p-2 w-96"
                required
            />

            <textarea 
                name="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Note content"
                className="border p-2 w-full h-96 my-4"
                required
            />
            <button 
                type="submit" 
                className="px-4 py-2 bg-blue-500 rounded hover:bg-blue-600 text-white">
                    Dodaj
            </button>

        </form>
    )
}

export default Form;