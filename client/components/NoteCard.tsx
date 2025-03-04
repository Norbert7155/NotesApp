"use client"
import React, { useRef, useState } from 'react';
import NoteType from '../types/NoteType';

interface NoteCardProps {
    note: NoteType;
    onDelete: (id: string) => void;
    onUpdate: (updatedNote: NoteType) => void;
}

function NoteCard({ note, onDelete , onUpdate}: NoteCardProps) {
    
    //open / close dialog
    const dialogRef = useRef<HTMLDialogElement>(null);
    const openDialog = () => dialogRef.current?.showModal();
    const closeDialog = () => { 
      dialogRef.current?.close();
      setEditing(false);
    }

    //Delete function
    const handleDelete = async () => {
      if (!note._id) return;
      try {
        onDelete(note._id);
        closeDialog();
      } catch (error) {
        console.error("Błąd podczas usuwania notatki", error);
      }
    };

    //updateNote function
    const [editing, setEditing] = useState(false);
    const [newTitle, setNewTitle] = useState(note.title);
    const [newContent, setNewContent] = useState(note.content);

    const handleUpdateSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (!note._id) return;
      const updatedNote: NoteType = {
        ...note,             
        title: newTitle,
        content: newContent
      };
      onUpdate(updatedNote);
      closeDialog();
    };
  

    return (
        <div className="bg-gray-200 w-96 h-96 p-4 rounded-lg flex flex-col justify-start items-center relative">
        
            <h1 className="text-2xl font-semibold mb-2">{note.title}</h1>
            <p className="break-words whitespace-normal overflow-hidden line-clamp-7">
                {note.content}
            </p>
            
            <button className="mt-2 bg-blue-300 px-4 py-2 rounded-md absolute bottom-6 font-semibold hover:bg-blue-400" onClick={openDialog}
            >
                View note
            </button>
        
        <div className='flex'>
        <dialog 
          ref={dialogRef} 
          className="w-[90vw] h-[90vh] p-16 rounded-lg bg-white shadow-xl m-auto relative"
        >
          {editing ? (
            
            <form onSubmit={handleUpdateSubmit} className="flex flex-col gap-4">
              <input
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="border p-2 w-96"
                required
              />
              <textarea
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
                className="border p-2 w-full h-96"
                required
              />
              <div className="flex gap-4">
                <button 
                  type="submit" 
                  className="px-4 py-2 bg-green-500 rounded hover:bg-green-600 text-white"
                >
                  Save Changes
                </button>
                <button 
                  type="button" 
                  onClick={() => setEditing(false)}
                  className="px-4 py-2 bg-gray-500 rounded hover:bg-gray-600 text-white"
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <div>
              <h1 className="text-3xl font-bold mb-4">{note.title}</h1>
              <p className="mb-6 whitespace-pre-wrap break-words">{note.content}</p>
              <div className="flex gap-4 text-white absolute bottom-16 right-16">
                <button
                  onClick={closeDialog}
                  className="px-4 py-2 bg-gray-600 rounded hover:bg-gray-800"
                >
                  Close
                </button>
                <button
                  onClick={handleDelete}
                  className="px-4 py-2 bg-red-400 rounded hover:bg-red-500"
                >
                  Delete
                </button>
                <button
                  onClick={() => setEditing(true)}
                  className="px-4 py-2 bg-blue-500 rounded hover:bg-blue-600"
                >
                  Edit
                </button>
              </div>
            </div>
          )}
        </dialog>
        </div>
        </div>
  );
}

export default React.memo(NoteCard);
