import { main } from '@popperjs/core';
import React, { useState} from 'react';


const MainNote = ( {uploadGroup, setEditing, editing, mainContent , setMainContent, sideBarOn} )=>{
    const [newText, setNewText] = useState(mainContent[1])
    const [newActivities, setNewActivities] = useState(mainContent[2])  
    if(newActivities !== mainContent[2]) setNewActivities(mainContent[2])
    function editingToggle(){
        setEditing(prevState => !prevState)
        setNewText(mainContent[1])
    }

    function handleUpload(){
        editingToggle()
        uploadGroup(mainContent[3], newText, newActivities)
    }

    function handleChange(e){
        setNewText(e.target.value)
    }

    return (
    <div className={sideBarOn ? 'overflow-hidden w-100 mainNoteOff' : 'overflow-hidden w-100 mainNoteOn'}>
<main className='mainNote'>
            <h3 className=" card overflow-hidden w-75" >
                <div className='d-flex  flex-wrap overflow-auto'>
                    <input
                    style={editing ? {display:'none'} : {width:'50%'}}
                    value={newText}
                    className='carlitos'
                    onChange={!editing ? (handleChange) : null}
                    />
                    <span
                    style={editing ? {} : {display:'none'}}
                    >
                    {mainContent[1]}
                    </span>
                    <div >
                        <button onClick={editingToggle}>
                        <i style={editing ? {color:'grey'} : {color:'red'}} className={!editing ? "fa fa-minus-square" : "fa fa-edit"}></i>
                        </button>
                        <button onClick={handleUpload} style={editing ? {display:'none'} : {}} >
                                    <i style={{color:'rgb(0, 255, 0)'}} className="fa fa-check-square mx-1"></i>
                        </button>
                    </div>
                </div>
                <h6 className="mainNoteCreationDate">
                {new Date(mainContent[0]).toLocaleDateString("es-AR")} 
                </h6>
            </h3>
            <div className='mainNoteContent'>
                {mainContent[2].length !== 0 ?                 
                <ul className=" mainNoteContentList list-group"> 
                {mainContent[2].map(activity=>(
                    <li  className="list-group-item "> 
                        <div className='activityContainer'>
                        <div className='activityText'>
                            <p className=' activity'>{activity}</p>
                            <p className=' activityDate' >13/07/2021</p>
                        </div>
                        <div className='activityBtnContainer'>
                            <button  className="addActivityBtnContainer">
                            <i className="fa fa-check-square mx-1"></i>
                            </button >
                            <button className="addActivityBtnContainer">
                            <i className="fa fa-minus-square mx-1"></i>
                            </button>
                        </div>
                        </div>

                    </li>
                ))} 
                </ul> : <h5 style={{textAlign:'center', margin:'0', color:'gray'}}>Any Acvtivity</h5>}
                
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