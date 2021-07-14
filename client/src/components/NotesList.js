import React from 'react';
import Note from './Note';

const NotesList = ({setActualText, setEditing, notes, removeNote, updateNote, setMainContent}) => {
  // render JSX
//{new Date().getDate() + "/" +  (new Date().getMonth() + 1)}
  return (
    <div   className = " gap-2 p-1 d-flex justify-content-center flex-column align-items-center" >
      <h2 style={{color:'white', maxWidth:300 + 'px', minWidth:300 + 'px'}}>Groups</h2>

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
              setEditing={setEditing}
              setActualText={setActualText}
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