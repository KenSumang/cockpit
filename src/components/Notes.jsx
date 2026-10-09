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
        setTitle('');
        setContent('');
    }

    async function handleDelete(id) {
        const previous = notes;
        setNotes(prev => prev.filter(n => n.id !== id));

        const { error } = await supabase.from('notes').delete().eq('id', id);
        if (error) {
            setNotes(previous);
            setError(error.message);
        }
    }

    return(
        <div className="shadow-layered-out-lg rounded-2xl bg-black-light p-6">
            <h2 className="text-white text-[22px] tracking-wide font-bold">Notes</h2>

            <form onSubmit={handleSubmit}>
                <h2 className="text-white text-[16px] tracking-wide font-bold">Add Note</h2>

                <label htmlFor="note-title">Note Title</label>
                <input
                    id="note-title"
                    type="text"
                    placeholder="Enter note title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <label htmlFor="note-content">Note Content</label>
                <input
                    id="note-content"
                    type="richtext"
                    placeholder="Enter note"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
                
                <button
                    className="hover:cursor-pointer inline-block px-4 py-3 shadow-layered-out-md rounded-xl my-auto"
                    type="submit"
                    disabled={saving}
                >
                    {saving ? 'Saving...' : 'Add Note'}
                </button>
            </form>

            {error && <p role="alert">{error}</p>}

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
    );
}

export default Notes;

