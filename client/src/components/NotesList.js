import React from 'react';
import Note from './Note';

const NotesList = ({ notes, removeNote, updateNote, setMainContent}) => {
  // render JSX
  return (
    <div   className = " gap-2 p-1 d-flex justify-content-center flex-column align-items-center" >
      <h2 style={{color:'white', maxWidth:300 + 'px', minWidth:300 + 'px'}}>{new Date().getDate() + "/" +  (new Date().getMonth() + 1)}</h2>

      {notes.map((note)=>(
          
              <Note 
              createdAt={note.createdAt}
              setMainContent={setMainContent}
              id={note._id}
              key={note._id}
              initialTitle={note.title}
              initialText={note.text}
              removeNote={removeNote}
              updateNote={updateNote}
              updatedAt={note.createdAt}
              activities={note.activities[0] ? note.activities : ""}
              />
      ))}

    </div>
  );
};
/*
         <div className='d-flex flex-column w-100 justify-content-center align-items-center'>
          <h2 style={{color:'grey'}}>13/06</h2> 
          <Note 
          setMain={setMain}
          id={note._id}
          key={note._id}
          initialTitle={note.title}
          initialText={note.text}
          removeNote={removeNote}
          updateNote={updateNote}
          updatedAt={note.createdAt}
          />
          </div>
*/ 
export default NotesList;