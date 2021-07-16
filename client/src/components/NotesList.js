import React from 'react';
import Note from './Note';

const NotesList = ({setSideBarOn, setAddNoteOn, mainContent, setEditing, notes, removeNote, updateNote, setMainContent}) => {
  // render JSX

  return (
    <div   className = " gap-2 p-1 d-flex justify-content-center flex-column align-items-center" >
      <h2 style={{color:'white', maxWidth:300 + 'px', minWidth:300 + 'px'}}>Groups</h2>

      {notes.map((note)=>(
          
              <Note 
              createdAt={note.createdAt}
              setMainContent={setMainContent}
              id={note._id}
              key={note._id}
              title={note.title}
              removeNote={removeNote}
              updateNote={updateNote}
              updatedAt={note.createdAt}
              activities={note.activities ? note.activities : null }
              setEditing={setEditing}
              mainContent={mainContent}
              setSideBarOn={setSideBarOn}
              />
      ))}
      {notes.length < 3 
      ? <button onClick={()=>setAddNoteOn(prevState => !prevState)}  type="button" class="addFirstGroupBtn ">Add Group</button>
      : null
      }
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