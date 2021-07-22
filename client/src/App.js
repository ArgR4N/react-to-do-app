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
//Profile Side
import ProfileSection from './components/ProfileSection';
import LogInForm from './components/LogInForm';



const App = () => {

  
  //Modal State
  const [show, setShow] = useState(false);

  //Editin State for the mainNote
  const [editing, setEditing] = useState(true)


  // useStates for the NoteList and The MainContent
  const [notes, setNotes] = useState([]);
  const [mainContent, setMainContent] = useState(false) 

  // useStates for bars and btn´s
  const [sideBarOn, setSideBarOn] = useState([true])
  const [addNoteOn, setAddNoteOn] = useState([true])
  const [addActivity, setAddActivity] = useState(false)
  

  //profile states
  const [profileSlideBarOn, setProfileSlideBarOn] = useState(false)
  const [logInState, setLogInState] = useState(true)
  const [errorState, setErrorState] = useState('')
  const [user, setUser] = useState(false)
  // useEffect hook
  useEffect(() => {
    axios.get('/api/user')
      .then(res =>{
        if (res.data.username) {
          setUser({id:res.data._id, username:res.data.username})
          setShow(false)
          axios.get(`/api/todolist/${res.data._id}`)
          .then(res => {
            setNotes(res.data.toDoList);
          });
        }else{
          setShow(true)
        }
      })
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

 //Update group function
 const uploadGroup = (id, newTitle, activities, newList) =>{
  let newGroup = {}
  if (!newList) {
    newGroup={
      title:newTitle,
      activities
    }
  }
  if(newList){
    newGroup={
      title:newTitle,
      activities:newList
    }
  }
  axios.put(`api/todolist/${id}`, newGroup)
    .then(res=>{
      setNotes(prevState => prevState.map(group => group._id === id ? newGroup : group))
      setMainContent([new Date(), newTitle, !newList ? activities : res.data.activities, id])
    })
}
    


const formatDate = date =>{
  let todayArray = date.split('/')
  let today = [];
  for (let i = todayArray.length; i > 0 ; i--) {
    if (todayArray[i-1].split("").length < 2) {
      today.push(`0${todayArray[i-1]}`)
    }else{
      today.push(todayArray[i-1]);
    }
  }
  return today.join('-');
}
let today = formatDate(new Date().toLocaleDateString("es-AR"))

  // remove
  const removeNote = (id) => {
      axios.delete('/api/todolist/' + id)
      .then(res => {
        const newNotes = notes.filter(note => note._id !== id);
        setNotes(newNotes);
        setMainContent(false);
    });
    
  };

  // Handle click from open the note list bar
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

  //Porfile Section!!
  //Open profile slide bar
  const handleProfileClick = () =>{
    setProfileSlideBarOn(prevState => !prevState)
  }
  //Login Function
  const logInFunction = (username, password) =>{
    if (username !== '' && password !== '') {
      axios.post('/login', {username, password})
        .then(res =>{
          if (res.data.username) {
            setUser({username:res.data.username, id:res.data._id})
            setShow(false)
            axios.get(`/api/todolist/${res.data._id}`)
            .then(res => {
              setNotes(res.data.toDoList);
            });
          }else{
            setErrorState(res.data)
          }
        })
    }
  }
  //Register Function
  const registerFunction = (newUsername, newPassword) =>{
    if (newUsername !== '' && newPassword !== '') {
      axios.post('/register', {username:newUsername, password:newPassword})
        .then(res => {
          setErrorState(res.data)
          if (res.data === 'User Created!') {
            setLogInState(true)
          }
        })
    }
  }
  const logOut = () =>{
    setUser(false)
    setShow(true)
    setMainContent(false)
  }
  return (
    <div>
      <div style={show ? {} : {display:'none'}} className='modalClass'>
        <LogInForm
        setShow={setShow}
        registerFunction={registerFunction}
        logInFunction={logInFunction}
        logInState={logInState}
        errorState={errorState}
        setLogInState={setLogInState}
        setErrorState={setErrorState}
        />
      </div>

      <main className="d-flex overflow-hidden flex-row">
          <div style={{overflow:'hidden'}}>
            <ProfileSection
            profileSlideBarOn={profileSlideBarOn}
            setProfileSlideBarOn={setProfileSlideBarOn}
            username={user.username}
            setUser={setUser}
            logOut={logOut}
            />
          </div>
          <button 
          className='profileSection' onClick={handleProfileClick}>
            <i className="fa fa-user"></i>
          </button>
          <div  className={sideBarOn ? "noteListContainerOff" : "noteListContainerOn" }>
                  <NotesList 
                  notes={notes} 
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
                  today={today}
                  userId={user.id}
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
            removeNote={removeNote}
            setEditing={setEditing} 
            editing={editing} 
            sideBarOn={sideBarOn}  
            mainContent={mainContent} 
            setMainContent={setMainContent} 
            uploadGroup={uploadGroup}
            today={today}
            />
          }
      </main>
    </div>
  );
};

export default App;