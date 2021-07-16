// imports
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactTooltip from 'react-tooltip';

//import Header from './Header';
import NotesList from './components/NotesList';
import NoteForm from './components/NoteForm';
//import Footer from './Footer';
import './App.css'
import MainNote from './components/MainNote';


const App = () => {

  const [editing, setEditing] = useState(true)


  // useStates for the NoteList and The MainContent
  const [notes, setNotes] = useState([]);
  const [mainContent, setMainContent] = useState(false) 

  // useStates for bars and btn´s
  const [sideBarOn, setSideBarOn] = useState([true])
  const [addNoteOn, setAddNoteOn] = useState([true])
  const [addActivity, setAddActivity] = useState(false)
  

  //



  // useEffect hook
  useEffect(() => {
    axios.get('/api/todolist')
      .then(res => {
        setNotes(res.data.toDoList);
      });
  }, [mainContent]);

  // CRUD functions
  // create
  const addNote = note => {
    axios.post('/api/todolist', note)
      .then(res => {
        const newNotes = [ res.data,...notes];
        setNotes(newNotes);
      });
  };

  // edit
  const updateNote = (id, title, text) => {
    const updatedNote = {
      title: title,
      text: text
    };
    axios.put('/api/todolist/' + id, updatedNote)
      .then(res => {
        const newNotes = notes.map(note =>
          note.id === id ? updatedNote : note
        );
        setNotes(newNotes);
      });
  };
    
/*
TODO:Edits activities in a To Do Note

*/
  /*
const updateActivities = (id, title, activities) => {
  const updatedNote = {
    title: title,
    activities: activities
  };
  axios.put('/api/todolist/' + id, updatedNote)
    .then(res => {
      const newNotes = notes.map(note =>
        note.id === id ? updatedNote : note
      );
      setNotes(newNotes);
    });
};
*/
  // remove
  const removeNote = (id) => {
      axios.delete('/api/todolist/' + id)
      .then(res => {
        const newNotes = notes.filter(note => note._id !== id);
        setNotes(newNotes);
        setMainContent(false);
    });
    
  };

  // Handle clock from open the note list bar
  const handleNoteListClick = ()=>{
    setSideBarOn(prevState =>(!prevState))
    if(!addNoteOn){
      handleAddNoteBtn()
    }

  }
  const handleAddNoteBtn = () =>{
    setAddNoteOn(prevState =>(!prevState))
    if(addActivity){
      setAddActivity(prevState =>(!prevState))
    }
    if(sideBarOn){
      handleNoteListClick()
    }
  }

  //Update group function
  const uploadGroup = (id, newTitle, newActivities) =>{
    let newGroup={
      title:newTitle,
      activities:newActivities
    }
    axios.put(`api/todolist/${id}`, newGroup)
      .then(res=>{
        setNotes(prevState => prevState.map(group => group._id === id ? newGroup : group))
        setMainContent([new Date(), newTitle, newActivities, id])

      })
  }
  return (
    <div>
      <main className="d-flex overflow-hidden flex-row">
          <div  className={sideBarOn ? "noteListContainerOff" : "noteListContainerOn" }>
                  <NotesList 
                  notes={notes} 
                  removeNote={removeNote} 
                  updateNote={updateNote} 
                  setMainContent={setMainContent} 
                  setEditing={setEditing}
                  mainContent={mainContent}
                  setAddNoteOn={setAddNoteOn} 
                  setSideBarOn={setSideBarOn}
                  />  
          </div>
          <div  
                className= {addNoteOn ? "noteFormContainerOff" : "noteFormContainerOn"}>
                  <NoteForm 
                  addActivity={addActivity}
                  setAddActivity={setAddActivity} 
                  addNote={addNote} 
                  setAddNoteOn={setAddNoteOn}
                  />
          </div>
          <div>
            <button onClick={handleAddNoteBtn} type="button" className="addNoteBtn mt-1" 
            style={addNoteOn ? {} : {color:"red"}}
            data-tip data-for={"a"}  >
            <i  className="fa fa-plus-square" style={addNoteOn ? {transition:'.9s'} : {transition:'.9s', transform:"rotate(45deg)"}}></i>
            </button>
            <ReactTooltip  id="a"  className="addActivityTooltip p-1" place="right" effect="solid">
              {addNoteOn ? 'Add Group' : 'Cancel'}
            </ReactTooltip>
            <button onClick={window.screen.width <= 640 ? null : handleNoteListClick} type="button" className="sideBarBtn "  style={{transition:"2s"}}>
            <i  onClick={window.screen.width <= 640 ? handleNoteListClick : null}
            className={sideBarOn ? "sideBarBtnOpen fa fa-chevron-right" : "fa fa-chevron-right sideBarIconClose"}></i>
            </button>
          </div>
          {
            !mainContent 
            ? 
            <h2 className={'anyGroup overflow-hidden w-100 mainNoteOn'}>Any Group Selected</h2> 
            :
            <MainNote 
            setEditing={setEditing} 
            editing={editing} 
            sideBarOn={sideBarOn}  
            mainContent={mainContent} 
            setMainContent={setMainContent} 
            uploadGroup={uploadGroup}
            />
          }
      </main>
    </div>
  );
};

export default App;