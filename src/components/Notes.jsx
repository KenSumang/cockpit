import { useState, useEffect } from 'react';
import { supabase } from '../utils/supabase';
import { UserAuth } from '../context/AuthContext';

function Notes() {
    const { session } = UserAuth();
    const userId = session?.user?.id;

    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState(null);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [noteOpen, setNoteOpen] = useState(false);
    const [noteItemOpen, setNoteItemOpen] = useState(false);

    const handleSetNoteOpen = () => {
        setNoteOpen((prev) => !prev);
    };

    const handleSetNoteItemOpen = () => {
        noteItemOpen((prev) => !prev);
    };

    useEffect(() => {
        if (!userId) return;
        let cancelled = false;

        (async () => {
            const { data, error } = await supabase
                .from('notes')
                .select('*')
                .eq('user_id', userId)
                .order('created_at', { ascending: false });

            if (cancelled) return;
            if (error) setError(error.message);
            else setNotes(data);
            setLoading(false);
        })();

        return () => { cancelled = true; };
    }, [userId]);
    
    async function handleSubmit(e) {
        e.preventDefault();
        if (!title.trim() && !content.trim()) return;

        setSaving(true);
        setError(null);

        const { data, error } = await supabase
            .from('notes')
            .insert({ title: title.trim(), description: content.trim(), user_id: userId })
            .select()
            .single();

        setSaving(false);

        if (error) {
            setError(error.message);
            return;
        }

        setNotes(prev => [data, ...prev]);
        handleSetNoteOpen();
        setTitle('');
        setContent('');
    };

    async function handleDelete(id) {
        const previous = notes;
        setNotes(prev => prev.filter(n => n.id !== id));

        const { error } = await supabase.from('notes').delete().eq('id', id);
        if (error) {
            setNotes(previous);
            setError(error.message);
        }
    };

    return(
        <>
            <div
                onClick={handleSetNoteOpen}
                aria-hidden="true"
                className={`fixed inset-0 z-50 bg-black/50 transition-opacity duration-300
                ${noteOpen ? "opacity-100" : "pointer-events-none opacity-0"}`}
            />
            <div className="shadow-layered-out-lg rounded-2xl bg-black-light p-6">
                <h2 className="text-white text-[22px] tracking-wide font-bold">Notes</h2>

                <button
                    className="hover:cursor-pointer inline-block w-fit px-7 py-3 shadow-layered-out-md rounded-xl my-auto"
                    onClick={() => handleSetNoteOpen()}
                >
                    Add Note
                </button>
                
                <form
                    onSubmit={handleSubmit}
                    className={`flex flex-col gap-4 z-60 pt-4 bg-black-light shadow-layered-highlight rounded-xl p-4 w-3/4 max-w-200 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${
                        noteOpen ? "absolute" : "hidden"
                }`}>
                    <button
                        className="hover:cursor-pointer inline-block px-7 py-3 shadow-layered-out-md rounded-xl w-fit ml-auto"
                        onClick={() => handleSetNoteOpen()}
                    >
                        Cancel
                    </button>

                    <h2 className="text-white text-[16px] tracking-wide font-bold">Add Note</h2>

                    <div className="title flex flex-col gap-2">
                        <label htmlFor="note-title">Title</label>
                        <input
                            id="note-title"
                            type="text"
                            className="p-3 shadow-layered-in-md rounded-xl my-auto"
                            placeholder="Enter note title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>

                    <div className="content flex flex-col gap-2">
                        <label htmlFor="note-content">Content</label>
                        <textarea
                            id="note-content"
                            type="richtext"
                            className="p-3 shadow-layered-in-md rounded-xl my-auto"
                            placeholder="Enter note"
                            rows="5"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                        />
                    </div>
                    
                    <button
                        className="hover:cursor-pointer inline-block px-7 py-3 shadow-layered-out-md rounded-xl w-fit m-auto"
                        type="submit"
                        disabled={saving}
                    >
                        {saving ? 'Saving...' : 'Add Note'}
                    </button>
                </form>

                {error && <p role="alert">{error}</p>}

                <div
                    onClick={handleSetNoteItemOpen}
                    aria-hidden="true"
                    className={`fixed inset-0 z-50 bg-black/50 transition-opacity duration-300
                    ${noteItemOpen ? "opacity-100" : "pointer-events-none opacity-0"}`}
                />

                <div
                    className={`flex flex-col gap-4 z-60 pt-4 bg-black-light shadow-layered-highlight rounded-xl p-4 w-3/4 max-w-200 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${
                        noteItemOpen ? "absolute" : "hidden"
                }`}>

                </div>

                <div className="notes flex flex-col gap-5 mt-6">
                    {loading ? (
                        <p>Loading Notes...</p>
                    ) : notes.length === 0 ?(
                        <p>No notes found.</p>
                    ) : (
                        notes.map(note => (
                        <div
                            key={note.id}
                            className="rounded-2xl flex gap-4 justify-between h-20 items-center bg-black-light shadow-layered-out-lg p-4"
                            // onClick=
                        >
                            <h2 className="">{note.title}</h2>
                            <p>{note.description}</p>
                            <button
                                className="hover:cursor-pointer inline-block px-4 py-3 shadow-layered-out-md rounded-xl my-auto"
                                onClick={() => handleDelete(note.id)}
                            >
                                Delete
                            </button>
                        </div>
                        ))
                    )}
                </div>
            </div>
        </>
    );
}

export default Notes;

