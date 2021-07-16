const NewActivity = ({handleDeleteActivity, activity}) =>{  
    const [text, dateFor ]= activity
    return (
        <li className='d-flex align-items-center justify-content-between list-group-item'>
            <div style={{maxWidth:'100px', overflow:'auto'}} className='mx-1'><p style={{margin:'0'}}>{text}</p></div>
            <input disabled className='mx-1' style={{minWidth:'135px', maxWidth:'135px'}} type="date" id="start" name="trip-start"
            value={dateFor}>
            </input>
            <button onClick={()=>{handleDeleteActivity(activity)}} type='button' className='removeActivity'>
                <i className='fa fa-minus-square'></i>
            </button>
        </li>
    );
}

export default NewActivity;