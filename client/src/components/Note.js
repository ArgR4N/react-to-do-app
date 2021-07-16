const Note = ({setSideBarOn, mainContent, setActualText, setEditing, createdAt, activities, id, title,  removeNote, updateNote, updatedAt, setMainContent}) => {


//TODO:Put edit function in the mainNote

//TODO: limit date system 
//let today = (new Date(createdAt).getDate() + 1)+ "/" +  (new Date(createdAt).getMonth()+ 1)  

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
  let newMainContent = [createdAt, title, activitiesList, id]
  if (newMainContent[3] !== mainContent[3]) {
    setMainContent(newMainContent)
    if (window.screen.width < 700) {
      setSideBarOn(prevState => !prevState)
    }
  }
  setEditing(true)
};

  // render 
  return (
    <div style={{zIndex:0}} className="note card col-10">
      <div className="card-body" onClick={handleCardClick} >
        <h2 className={"noteTitle"} spellCheck={false}
          //edit funtion => disabled={!editable}
          //edit funtion => onChange={(e) => setTitle(e.target.value)}
        >{title}
        </h2>
        <br />
        <button style={{zIndex:2}} className="btn" onClick={() => {removeNote(id);}}>
          <i className="text-danger fa fa-trash fa-lg"></i>
        </button>
      </div>
    </div>
  );
};

export default Note;