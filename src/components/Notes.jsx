import { useState, useEffect } from 'react';
import { supabase } from '../utils/supabase';

function Notes() {
    const [ notes, setNotes ] = useState([]);
    const [ loading, setLoading ] = useState(true);
    
    useEffect(() => {
        fetchNotes();
    }, [])

    async function fetchNotes() {
        const { data: { user } } = await supabase.auth.getUser()

        if(!user) {
            console.log("No user signed in")
            return
        }

        try {
            setLoading(true);
            let { data, error } = await supabase
                .from('notes')
                .select('*')
                .eq('user_id', user.id)
            
        if (error) throw error;
            setNotes(data || []);

        } catch (error) {
            console.error('Error fetching notes: ', error.message);
        } finally {
            setLoading(false);
        }
    }

    return(
        <div>
            <h1>Notes</h1>

            <div>
                <h2>Add note</h2>

                <label htmlFor="note-title">Note Title</label>
                <input
                    id="note-title"
                    type="text" 
                    />

                <label htmlFor="note-content">Note Content</label>
                <input
                    id="note-content"
                    type="richtext" 
                    />
            </div>

            {loading ? (
                <p>Loading Notes...</p>
            ) : notes.length === 0 ?(
                <p>No notes found.</p>
            ) : (
                notes.map(note => (
                <div key={note.id}>
                    <h2>{note.title}</h2>
                    <p>{note.description}</p>
                </div>
                ))
            )}
        </div>
    );
}

export default Notes;