import { main } from '@popperjs/core';
import React, { useState, useEffect } from 'react';
import Activity from './Activity.js'

const MainNote = ( {removeNote, uploadGroup, setEditing, editing, mainContent , setMainContent, today} )=>{
    const [newText, setNewText] = useState(mainContent[1]);
    const [newActivity, setNewActivity] = useState({editing:false, text:'', dateFor:today});
    const [formError, setFormError] = useState()

    useEffect(() => {
        setNewText(mainContent[1])
        setNewActivity({editing:false, text:'', dateFor:today})
    }, [mainContent, today])

    function editingToggle(){
        setEditing(prevState => !prevState)
        setNewText(mainContent[1])
    }
    function handleUpload(newList){
        uploadGroup(mainContent[3], newText, mainContent[2], newList)

    }

    function handleEditing(){
        editingToggle()
        handleUpload(false)
    }



    function handleAddActivity(){
        if (newActivity.editing) {
            if (newActivity.text === '') {
                setFormError('The activity needs information!')
            }else{
                let activity = [newActivity.text, newActivity.dateFor]
                let newList = mainContent[2].concat([activity])
                handleUpload(newList)
                setFormError('')
                setNewActivity(prevState => ({...prevState, editing: false}))
            }

        }else{
        setNewActivity(prevState => ({...prevState, editing: !prevState.editing}))

        }
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
    const deleteActivity = (_id) =>{
        let newList =[]
        mainContent[2].forEach(activity =>{
            if (activity._id === _id) {
                return null;
            }else{
                newList.push(activity)
            }
        })
        handleUpload(newList)
    }

    return (
    <div className={  ' mainNoteContainer overflow-hidden w-100 mainNoteOn'}>
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
                        <button onClick={handleEditing} style={editing ? {display:'none'} : {}} >
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
            <div className=' mainNoteContent'>
                {mainContent[2] && mainContent[2].length !== 0 
                ?                 
                <ul className=" mainNoteContentList list-group"> 
                    {mainContent[2].map(activity=>(
                            <Activity
                            today={today}
                            key={activity._id}
                            deleteActivity={deleteActivity}
                            mainContent={mainContent}
                            activity={activity}
                            />
                    ))} 
                <div  className='d-flex justify-content-center align-items-center'>
                    <h5 style={newActivity.editing ? {display:'none'} : {textAlign:'center', margin:'0', color:'gray'}}>Add Activity</h5>
                    <button onClick={handleAddActivity} style={{ alignItems:'center'}} className='addActivityBtn alig-items-center d-flex justify-content-center'>
                        <i style={newActivity.editing ? {display:'none'} : {}} className='fa fa-plus-square'></i>
                    </button>
                </div>
 
                <form onSubmit={e => e.preventDefault()} style={newActivity.editing ? {marginTop:'-35px', display:'flex', flexWrap:'wrap', gap:'5px', justifyContent:'start'} : {display:'none'} }>
                <input value={newActivity.text} type='text'
                        onChange={(e) => setNewActivity(prevState =>({...prevState, text:e.target.value}))}></input>
                        <input value={newActivity.dateFor}  type='date'
                    min="2005-15-03" max="2022-12-31" 
                    onChange={(e) => setNewActivity(prevState =>({...prevState, dateFor:e.target.value}))}
                    >
                    </input>
                    <div className='activityBtnContainer'>

                        <button  onClick={handleAddActivity}  className="addActivityBtnContainer">
                            <i className="fa fa-check-square mx-1"></i>
                        </button > 
                        <button onClick={() => setNewActivity(prevState => ({...prevState, editing: !prevState.editing}))} className="addActivityBtnContainer">
                            <i className="fa fa-minus-square mx-1"></i>
                        </button>
                    </div>
                    <h6 style={{color:'red'}}>{formError}</h6>
                </form>
                </ul> 
                : 
                <ul className='mainNoteContentList list-group overflow-hidden'>
                                    <div style={newActivity.editing ? {display:'none'} : {}} className='d-flex justify-content-center align-items-center'>
                    <h5 style={newActivity.editing ? {display:'none'} : {textAlign:'center', margin:'0', color:'gray'}}>Any Acvtivity</h5>
                    <button onClick={handleAddActivity} style={{ alignItems:'center'}} className='addActivityBtn alig-items-center d-flex justify-content-center'>
                        <i style={newActivity.editing ? {display:'none'} : {}} className='fa fa-plus-square'></i>
                    </button>
                </div>
                 
                <form onSubmit={e => e.preventDefault()} style={newActivity.editing ? {marginTop:'-35px', display:'flex', flexWrap:'wrap', gap:'5px', justifyContent:'start'} : {display:'none'} }>
                <input value={newActivity.text} type='text'
                        onChange={(e) => setNewActivity(prevState =>({...prevState, text:e.target.value}))}></input>
                        <input value={newActivity.dateFor}  type='date'
                    min="2005-15-03" max="2022-12-31" 
                    onChange={(e) => setNewActivity(prevState =>({...prevState, dateFor:e.target.value}))}
                    >
                    </input>
                    <div className='activityBtnContainer'>

                        <button  onClick={handleAddActivity}  className="addActivityBtnContainer">
                            <i className="fa fa-check-square mx-1"></i>
                        </button > 
                        <button onClick={() => setNewActivity(prevState => ({...prevState, editing: !prevState.editing}))} className="addActivityBtnContainer">
                            <i className="fa fa-minus-square mx-1"></i>
                        </button>
                    </div>
                    <h6 style={{color:'red'}}>{formError}</h6>

                </form>
                </ul>
                
                }

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