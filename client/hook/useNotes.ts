'use client';
import { useState, useEffect } from 'react';
import  NoteType from '@/types/NoteType';
import { getAllNotes, createNote, updateNote as updateNoteService, deleteNote as deleteNoteServices } from '@/services/notes';

const useNotes = () =>{
    const [notes, setNotes] = useState<NoteType[]>([]);

    //fetch new note
    const fetchNotes = async () =>{
        try {
            const data = await getAllNotes();
            setNotes(data);
          } catch (error) {
            console.error("Error downloading notes:", error);
          }
    };

    //Add new note
    const addNote = async (title: string, content: string) => {
        try {
          const newNote = await createNote(title, content);
          setNotes(prev => [newNote, ...prev]);
        } catch (error) {
          console.error("Error adding note:", error);
        }
      };

    //UpdateNote
    const updateNote = async (updatedNote: NoteType) => {
      if (!updatedNote._id) return; 
      try {
        const result = await updateNoteService(updatedNote);
        setNotes(prev =>
          prev.map(note => (note._id === result._id ? result : note))
        );
      } catch (error) {
        console.error("Error updating note:", error);
      }
    };

    //delete note
    const deleteNote = async (noteId: string) => {
        if (!noteId) return;
        try {
          await deleteNoteServices(noteId);
          setNotes(prev => prev.filter(note => note._id !== noteId));
        } catch (error) {
          console.error("Error deleting note:", error);
        }
      };


    //download notes on first mount
    useEffect(() => {
        fetchNotes();
    }, []);

    return {
        notes,
        fetchNotes, 
        addNote,
        updateNote,
        deleteNote
    };

}

export default useNotes;