import React, { useState } from 'react';
import ReactTooltip from "react-tooltip";

const NoteForm = ({ addNote, addActivity, setAddActivity }) => {

  // state hooks para el form
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [activity, setActivity] = useState(''); 
  const [activities, setActivities] = useState([]);
  // handler para el submit
  const handleSubmit = e => {
    e.preventDefault();
    addNote({title, text, activities:activities});
    // blanquear formulario
    setTitle(''); 
    setText('');
    setActivities([ ])
    setActivity(' ')
  };

  const addActivityHandle = () =>{
    setAddActivity(!addActivity)
  }
  
  const checkActivityHandle = () =>{
    setActivities([...activities, activity])
    setActivity('')
    setAddActivity(!addActivity)
  }
  
  const resetActivityHandle = () =>{
    setAddActivity(!addActivity)
  };

  const splitHtml = (text) => {
    let textArray =  text.split("<")
    return textArray[0]
  }

  const handleDeleteActivity = (e) =>{
    let newActivities = [ ]
    let z = true;
    activities.forEach(i=>{
      if (i !== splitHtml(e.target.parentNode.innerHTML)) {
        newActivities.push(i)
      }else{
        if(!z){
          newActivities.push(i)
        }else{
          z = false
        }
      }
    });
    setActivities(newActivities)
    console.log(e.target.parentNode.innerHTML)
    
  }
  const formatDate =(date)=>{
    let todayArray = date.split('/')
    for (let i = todayArray.length; i > 3; i--){
      console.log(todayArray[i])
    }
    let today = '2021-07-13'
    return today
  }

  let today = formatDate(new Date().toLocaleDateString("es-AR"))
  let k = 0;
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
          <div style={{wordWrap:'break-word'}} className="list-group-item d-flex flex-row align-items justify-content-between">
            <li key={k++} className="overflow-auto "> 
            {e} 
            </li>
            <input type="date" id="start" name="trip-start"
             value={today}
             min="2005-03-15" max="2021-12-31">
            </input>
            <i onClick={(e) => handleDeleteActivity(e)} className="mx-1 deleteActivityBtn fa fa-minus-square "/>
          </div>
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
      <button type='button' style={addActivity ? {} : {display:'none'}} className="addActivityBtnContainer">
      <i onClick={checkActivityHandle}  className="fa fa-check-square mx-1"></i>
      </button >
      <button type='button' style={addActivity ? {} : {display:'none'}} className="addActivityBtnContainer">
      <i onClick={resetActivityHandle}  className="fa fa-minus-square mx-1"></i>
      </button>
       
        
      </div>
      <div style={addActivity ? {display:'none'} : {}} className="addActivityBtn" >
      <i onClick={addActivityHandle}   data-tip data-for={"registerTip"} className=" fa fa-plus-square" ></i>
      </div>
      <ReactTooltip id="registerTip"  className="addActivityTooltip p-1" place="right" effect="solid">
        Add Activity
      </ReactTooltip>
      <input
        style={{marginBottom:'10px'}}
        className="btn btn-primary mt-3"
        type="submit"
        value="Guardar"
      />
    </form>
  );
};

export default NoteForm;