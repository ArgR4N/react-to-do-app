import React, { useState } from 'react';
import ReactTooltip from "react-tooltip";
import NewActivity from './NewActivity.js';
const NoteForm = ({setAddNoteOn, addNote, addActivity, setAddActivity }) => {
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
  // state hooks para el form
  const [title, setTitle] = useState('');
  const [activity, setActivity] = useState(''); 
  const [activities, setActivities] = useState([]);
  const [dateFor, setDateFor] = useState(today)
  const [formError, setFormError] = useState()
  // handler para el submit
  const handleSubmit = e => {
    e.preventDefault();
    if(title === ''){
      setFormError('The group need a name!')
      return null;
    }else{
      addNote({title, activities:activities});
      // blanquear formulario
      setFormError('')
      setTitle(''); 
      setActivities([ ])
      setActivity(' ')
    }
  };
  
  const addActivityHandle = () =>{
    setAddActivity(!addActivity)
  }
  
  const checkActivityHandle = () =>{
    
    if(activity === ''){
      setFormError('The activity needs information!')
      return null;
    }else{
      setFormError('')
      setActivities([...activities, activity])
      setActivity('')
      setAddActivity(!addActivity)
    }

  }
  
  const resetActivityHandle = () =>{
    setAddActivity(!addActivity)
  };



  const handleDeleteActivity = (e) =>{
    let newActivities = [ ]
    activities.forEach(i=>{
      if (i !== e) {
        newActivities.push(i)
      }else{
        return null;
      }
    });
    setActivities(newActivities)
  }

  // render JSX
  return (
    <form  className="noteForm" onSubmit={handleSubmit}  >
      <div className="form-group ">
        <h2 htmlFor="title">Create New Group</h2>
        <label htmlFor="title">Group Name</label>
        <input
          id="title"
          className="form-control"
          type='text'
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
      </div>

      <ul className="list-group my-2">
      {activities.map((e)=>(
          <NewActivity
          dateFor={dateFor}
          setDateFor={setDateFor}
          e={e}
          today={today}
          handleDeleteActivity={handleDeleteActivity}
          />
      ))}

      </ul>


      
      <div  className="d-flex align-items-center">
        <input
            style={addActivity ? {} : {display:'none'}}
            id="title"
            className="form-control w-75"
            type='text'
            value={activity}
            onChange={e => setActivity(e.target.value)}
          />

      <button  onClick={checkActivityHandle}  type='button' style={addActivity ? {} : {display:'none'}} className="addActivityBtnContainer">
        <i className="fa fa-check-square mx-1"></i>
      </button >
      <button onClick={resetActivityHandle} type='button' style={addActivity ? {} : {display:'none'}} className="addActivityBtnContainer">
        <i   className="fa fa-minus-square mx-1"></i>
      </button>

        
      </div>
      <button onClick={addActivityHandle}  type="button" style={addActivity ? {display:'none'} : {}} className="addActivityBtn" >
        <i  data-tip data-for={"registerTip"} className=" fa fa-plus-square" ></i>
      </button>

      <ReactTooltip id="registerTip"  className="addActivityTooltip p-1" place="right" effect="solid">
        Add Activity
      </ReactTooltip>
      
      <h6 style={{textAlign:'center', fontSize:'13px',color:'red', margin:'10px 0 0 0'}}> {formError} </h6>
      <input
        className="btn btn-primary mt-3"
        type="submit"
        value="Guardar"
      />
     <input
        style={window.screen.width < 700 ? {} : {display:'none'}}
        className="btn btn-danger mt-3 mx-2"
        type="button"
        value="Cancelar"
        onClick={() => setAddNoteOn(prevState => !prevState)}
      />
    </form>
  );
};

export default NoteForm;