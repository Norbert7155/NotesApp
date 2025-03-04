import { Router, Request, Response } from 'express';
import { Note } from '../models/NoteModel';

const router = Router();

//POST add new note
router.post("/", async (req: Request, res: Response) => {
    try {
        const { title, content } = req.body;
        const newNote = await Note.create({ title, content });
        res.status(201).json(newNote);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error while adding note" });
    }
  });

//GET fetch all notes

router.get('/', async (req: Request, res: Response) => {
    try{
        const notes = await Note.find({});
        res.status(200).json(notes)
    } catch(error){
        res.status(500).json({message: "Error while fetching notes"})
    }
})


//DELETE note

router.delete('/:id', async (req: Request, res: Response) => {
    try{
        const noteId = req.params.id;
        const deleteNote = await Note.findByIdAndDelete(noteId);

        if (!deleteNote) {
            res.status(404).json({ message: 'Note not found' });
        }
        res.status(200).json({ message: 'The note has been deleted' })
        
    }catch(error){
        res.status(500).json({ message: 'Server error while deleting note' });
    }
})

//Update note
router.put('/:id', async(req: Request, res: Response) => {
    try{
        const {title , content} = req.body;
        const updateNote = await Note.findByIdAndUpdate(
            req.params.id,
            {title, content},
            {new: true} 
        );
        if(!updateNote) {
            res.status(404).json({ message: 'Note not found' });
        }
        res.status(200).json(updateNote);

    }catch(error){
        console.error("Error while editing note", error);
        res.status(500).json({ message: 'Server error while updating note'});
    }
})



export default router;