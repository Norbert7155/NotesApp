import { renderHook, act , waitFor} from '@testing-library/react';
import useNotes from '../hook/useNotes';
import * as notesService from '@/services/notes';
import NoteType from '@/types/NoteType';

const sampleNote: NoteType = {
    _id: "0",
    title: "Test note",
    content: "This is a test note"
}

jest.mock('@/services/notes', () => ({
    getAllNotes: jest.fn(),
    createNote: jest.fn(),
    updateNote: jest.fn(),
    deleteNote: jest.fn(),
}));

describe("useNotes hook", () =>{
    beforeEach(() =>{
        jest.clearAllMocks();
    })
})

it('should fetch notes on mount', async () => {
    (notesService.getAllNotes as jest.Mock).mockResolvedValue([sampleNote]);

    const { result } = renderHook(() => useNotes());

    await waitFor(() => {
      expect(result.current.notes).toHaveLength(1);
    });

    expect(result.current.notes).toEqual([sampleNote]);
  });

  it('should add a new note', async () => {
    (notesService.getAllNotes as jest.Mock).mockResolvedValue([]);
    (notesService.createNote as jest.Mock).mockResolvedValue(sampleNote);

    const { result } = renderHook(() => useNotes());
    await waitFor(() => {
      expect(result.current.notes).toHaveLength(0);
    });

    await act(async () => {
      await result.current.addNote('Test note', 'This is a test note');
    });

    await waitFor(() => {
      expect(result.current.notes).toHaveLength(1);
    });
    expect(result.current.notes).toEqual([sampleNote]);
  });

  it('should update a note', async () => {
    (notesService.getAllNotes as jest.Mock).mockResolvedValue([sampleNote]);
    const updatedNote: NoteType = { ...sampleNote, title: 'Updated Title' };
    (notesService.updateNote as jest.Mock).mockResolvedValue(updatedNote);

    const { result } = renderHook(() => useNotes());
    await waitFor(() => {
      expect(result.current.notes).toHaveLength(1);
    });

    await act(async () => {
      await result.current.updateNote(updatedNote);
    });

    await waitFor(() => {
      expect(result.current.notes[0].title).toBe('Updated Title');
    });
  });

  it('should delete a note', async () => {
    (notesService.getAllNotes as jest.Mock).mockResolvedValue([sampleNote]);

    const { result } = renderHook(() => useNotes());
    await waitFor(() => {
      expect(result.current.notes).toHaveLength(1);
    });

    await act(async () => {
      await result.current.deleteNote('1');
    });

    await waitFor(() => {
      expect(result.current.notes).toHaveLength(0);
    });
  });
