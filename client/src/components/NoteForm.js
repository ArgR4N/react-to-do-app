import React, { useState } from 'react';
import ReactTooltip from "react-tooltip";
import NewActivity from './NewActivity.js';
const NoteForm = ({today, setAddNoteOn, addNote, addActivity, setAddActivity }) => {

  // state hooks para el form
  const [title, setTitle] = useState('');
  const [activity, setActivity] = useState([' ', today]); 
  const [activities, setActivities] = useState([]);
  const [formError, setFormError] = useState()
  // handler para el submit
  const handleSubmit = e => {
    e.preventDefault();
    if(title === ''){
      setFormError('The group need a name!')
      return null;
    }else{
      if(window.screen.width < 700) {
        setAddNoteOn(prevState => !prevState)
      } 
      addNote({title, activities:activities});
      // blanquear formulario
      setFormError('')
      setTitle(''); 
      setActivities([ ])
      console.log(today);
      setActivity([' ', today])
    }
  };
  
  const addActivityHandle = () =>{
    setAddActivity(!addActivity)
  }
  
  const checkActivityHandle = () =>{
    if(activity[0] === ''){
      setFormError('The activity needs information!')
      return null;
    }else{
      setFormError('')
      setActivities([...activities, activity])
      setActivity( [' ', today])
      setAddActivity(!addActivity)
    }

  }
  
  const resetActivityHandle = () =>{
    setActivity(['',today])
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
    <form  className=" noteForm" onSubmit={handleSubmit}  >
      <div className="form-group ">
        <h2 htmlFor="title">Create New Group</h2>
        <label htmlFor="title">Group Name</label>
        <input
          id="title"
          className="w form-control"
          type='text'
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
      </div>

      <ul className="list-group my-2">
      {activities.map((e)=>(
          <NewActivity
          key={activities.indexOf(e)}
          activity={e}
          handleDeleteActivity={handleDeleteActivity}
          />
      ))}

      </ul>


      
      <div  className="flex-wrap gap-1 d-flex align-items-center">
        <input
            style={addActivity ? {} : {display:'none'}}
            id="activityTitle"
            className="form-control w-75"
            type='text'
            value={activity[0]}
            onChange={e => setActivity([e.target.value, activity[1]])}
          />
            <input  style={addActivity ? {minWidth:'135px', maxWidth:'135px'} : {display:'none'}} className='mx-1' type="date" id="start" name="trip-start"
            value={activity[1]}
            onChange={e=>setActivity([activity[0], e.target.value])}
            min="2005-15-03" max="2025-12-31">
            </input>

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
        className="btn btn-danger mt-3 mx-2"
        type="button"
        value="Cancelar"
        onClick={() => setAddNoteOn(prevState => !prevState)}
      />
    </form>
  );
};

export default NoteForm;