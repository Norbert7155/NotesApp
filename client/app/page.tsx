'use client'; 
import React, { useRef } from 'react';
import NoteCard from "../components/NoteCard"
import Form from '../components/Form';
import useNotes from '../hook/useNotes';
import NoteType from '@/types/NoteType';


export default function Home() {
  const { notes , addNote, deleteNote, updateNote} = useNotes()

  const handleAdd = async ( title: string, content: string) => {
    await addNote(title, content);
    closeDialog();
  }

  const handleDelete = (noteId: string) => {
    deleteNote(noteId);
  };

  const handleUpdate = (updated: NoteType) => {
    updateNote(updated); 
  };

  // Open/close Dialog
  const dialogRef = useRef<HTMLDialogElement>(null);
  const openDialog = () => dialogRef.current?.showModal();
  const closeDialog = () => dialogRef.current?.close();


  return(
    <div className='p-30 h-full'>
      <h1 className='text-center text-4xl mb-30'>Notes</h1>
      <div className='flex flex-wrap justify-center gap-10'>
        {
          notes.map((note) => (
            <NoteCard note={note} key={note._id} onDelete={handleDelete}  onUpdate={handleUpdate}/>
          )) 
        }
      </div>

      <button 
        onClick={openDialog} 
        className="bg-blue-300 px-4 py-2 rounded-md fixed bottom-12 right-12 font-semibold hover:bg-blue-400" 
      > 
        Add new note
      </button>
        
      <dialog
        className="w-[90vw] h-[90vh] p-16 rounded-lg bg-white shadow-xl m-auto relative"
        ref={dialogRef}
      >
        <h2 className="text-2xl mb-4">Add new note</h2>
        <Form onAdd={handleAdd}/>
        <button 
          onClick={closeDialog}
          className="px-4 py-2 bg-gray-500 hover:bg-gray-600 absolute bottom-16 right-16 text-white rounded"
          >
            Close
          </button>
      </dialog>
       
    </div>
  )
}
