import NoteType from "@/types/NoteType";
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';


//Fetch all Notes
export async function getAllNotes(): Promise<NoteType[]> {
    const res = await fetch(`${BASE_URL}/api/notes`);
    if(!res.ok){
        throw new Error('Błąd przy pobieraniu notatek');
    }
    return res.json();
}


//Delete notes
export async function deleteNote(noteId:string): Promise<void> {
    const res = await fetch(`${BASE_URL}/api/notes/${noteId}`,{
        method: "DELETE"
    });
    if(!res.ok){
        const errorText = await res.text();
        console.error("Backend error on DELETE:", errorText);
        throw new Error(`Error deleting note: ${errorText}`);
    }
}

//add new notes
export async function createNote(title: string, content: string): Promise<NoteType> {
    const res = await fetch(`${BASE_URL}/api/notes`,{
        method: 'Post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({title, content})
    });
    if (!res.ok) {
        throw new Error('Błąd przy tworzeniu notatki');
      }
    return res.json();
}

//updateNote note
export async function updateNote(note: NoteType): Promise<NoteType> {
    const res = await fetch(`${BASE_URL}/api/notes/${note._id}`,{
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            title: note.title,
            content: note.content
          })
    });
    if(!res.ok){
        const errorText = await res.text();
        throw new Error(`Błąd przy aktualizacji notatki: ${errorText}`);
    }
    return res.json();
}