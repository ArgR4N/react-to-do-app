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
      <div className="form-group mb-3">
        <label htmlFor="text">Description</label>
        <textarea
          id="text"
          className="form-control"
          value={text}
          rows="4"
          onChange={e => setText(e.target.value)}
        >
        </textarea>
      </div>

      <ul className="list-group my-2">
      {activities.map((e)=>(
          <div style={{wordWrap:'break-word'}} className="list-group-item d-flex flex-row align-items justify-content-between">
            <li key={k++} className="overflow-auto "> 
            {e} 
            </li>
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
      <div style={addActivity ? {} : {display:'none'}} className="addActivityBtnContainer">
      <i onClick={checkActivityHandle}  className="fa fa-check-square mx-1"></i>
      </div >
      <div style={addActivity ? {} : {display:'none'}} className="addActivityBtnContainer">
      <i onClick={resetActivityHandle}  className="fa fa-minus-square mx-1"></i>
      </div>
       
        
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