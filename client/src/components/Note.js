import React, { useState } from 'react';
const Note = ({ createdAt, activities, id, initialTitle, initialText, removeNote, updateNote, updatedAt, setMainContent, key}) => {

  // note title state
  const [title, setTitle] = useState(initialTitle);
  // note text state
  const [text, setText] = useState(initialText);

/*
  //no se va a editar desde aca
  //const [editable, setEditable] = useState(false);
  // handlers
  // save handler
  const handleSave = () => {
      updateNote(id, title, text);
      setEditable(!editable);
  };
//TODO:Put edit function in the mainNote
*/

//TODO: limit date system 
let today = (new Date(createdAt).getDate() + 1)+ "/" +  (new Date(createdAt).getMonth()+ 1)  

//Acitvities list for the render
let activitiesList = []
if (activities) {
  activities.forEach(activity =>{
    if (activity.title) {
      activitiesList.push(activity.title)
    }else{//inessesarie line
      activitiesList.push(activity)
    }
  }) 
}
const handleCardClick = ()=>{
  setMainContent([text, title, activitiesList])
};

  // render 
  return (
    <div style={{zIndex:0}} className="note card col-10" key={key}>
      <div className="card-body" onClick={handleCardClick} >
        <h2 className={"noteTitle"} spellCheck={false}
          //edit funtion => disabled={!editable}
          //edit funtion => onChange={(e) => setTitle(e.target.value)}
        >{title}
        </h2>
        <br />
        <button style={{zIndex:2}} className="btn" onClick={() => {setMainContent(false); removeNote(id);}}>
          <i className="text-danger fa fa-trash fa-lg"></i>
        </button>
      </div>
    </div>
  );
};

export default Note;