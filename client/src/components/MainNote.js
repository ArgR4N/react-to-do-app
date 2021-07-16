import { main } from '@popperjs/core';
import React, { useState} from 'react';
import Activity from './Activity.js'

const MainNote = ( {removeNote, uploadGroup, setEditing, editing, mainContent , setMainContent, sideBarOn} )=>{
    const [newText, setNewText] = useState(mainContent[1])
    const [newActivities, setNewActivities] = useState(mainContent[2])  
    const [newActivity, setNewActivity] = useState('')
    if(newActivities !== mainContent[2]) setNewActivities(mainContent[2])
    function editingToggle(){
        setEditing(prevState => !prevState)
        setNewText(mainContent[1])
    }

    function handleUpload(){
        editingToggle()
        if (mainContent[1] !== newText || mainContent[2] !== newActivities) {
            uploadGroup(mainContent[3], newText, newActivities)
        }
    }

    function handleAddNote(){
        setNewActivity(prevState => !prevState)
    }

    function handleChange(e){
        if(!editing){
            setNewText(e.target.value)
        }else{
            return null;
        }
    }
    function handleDelete(){
        removeNote(mainContent[3])
    }

    return (
    <div className={ 'mainNoteContainer overflow-hidden w-100 mainNoteOn'}>
        <main className='mainNote'>
            <div className="m-2 card overflow-hidden w-100" >
                <div  style={{fontSize:'25px'}} className='w-100 d-flex  flex-wrap '>
                    <input
                    style={editing ? {display:'none'} : {width:'50%'}}
                    value={newText}
                    onChange={handleChange}
                    />
                    <div className='w-50' style={editing ? {} : {display:'none'}}>
                    <h3 className='m-0'>{mainContent[1]}</h3>
                    </div>
                    <div className='d-flex'>
                        <button onClick={editingToggle}>
                            <i style={editing ? {color:'grey'} : {color:'red'}} className={!editing ? "fa fa-minus-square" : "fa fa-edit"}></i>
                        </button>
                        <button onClick={handleUpload} style={editing ? {display:'none'} : {}} >
                            <i style={{color:'rgb(0, 255, 0)'}} className="fa fa-check-square mx-1"></i>
                        </button>
                        <button  onClick={handleDelete} style={{fontSize:'18px'}}>
                            <i style={editing ? {} : {display:'none'}} className="mx-1 text-danger fa fa-trash fa-lg"></i>
                        </button>
                    </div>
                </div>
                <h6 className="mainNoteCreationDate">
                Created or Edited at: {new Date(mainContent[0]).toLocaleDateString("es-AR")} 
                </h6>
            </div>
            <div className='mainNoteContent'>
                {mainContent[2].length !== 0 ?                 
                <ul className=" mainNoteContentList list-group"> 
                    {mainContent[2].map(activity=>(
                            <Activity
                            mainContent={mainContent}
                            activity={activity}
                            />
                    ))} 
                <div style={newActivity ? {display:'none'} : {}} className='d-flex justify-content-center align-items-center'>
                    <h5 style={{textAlign:'center', margin:'0', color:'gray'}}>Add Activity</h5>
                    <button onClick={handleAddNote} style={{ alignItems:'center'}} className='addActivityBtn alig-items-center d-flex justify-content-center'>
                        <i style={newActivity ? {display:'none'} : {}} className='fa fa-plus-square'></i>
                    </button>
                </div>
 
                </ul> : 
                <div style={newActivity ? {display:'none'} : {}} className='d-flex justify-content-center align-items-center'>
                    <h5 style={{textAlign:'center', margin:'0', color:'gray'}}>Any Acvtivity</h5>
                    <button onClick={handleAddNote} style={{ alignItems:'center'}} className='addActivityBtn alig-items-center d-flex justify-content-center'>
                        <i style={newActivity ? {display:'none'} : {}} className='fa fa-plus-square'></i>
                    </button>
                </div>}
                <form onSubmit={e => e.preventDefault()} style={newActivity ? {marginTop:'-35px'} : {display:'none'} }>
                    <div className='activityBtnContainer'>
                        <input type='text'></input>
                        <button  onClick={handleAddNote}  className="addActivityBtnContainer">
                            <i className="fa fa-check-square mx-1"></i>
                        </button > 
                        <button onClick={handleAddNote} className="addActivityBtnContainer">
                            <i className="fa fa-minus-square mx-1"></i>
                        </button>
                    </div>
                </form>
            </div>
            <div>
            </div>
            <button onClick={() => setMainContent(false)} style={!mainContent ? {display:"none"} : {}} className='mainBtn btn btn-danger' >
            Close Group
            </button>
            
        </main>
    </div>
)}


export default MainNote