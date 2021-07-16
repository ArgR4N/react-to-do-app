const NewActivity = ({dateFor, setDateFor, handleDeleteActivity, e, today}) =>{  
    
    return (
        <li className='d-flex align-items-center justify-content-between list-group-item'>
            <div style={{maxWidth:'100px', overflow:'auto'}} className='mx-1'><p style={{margin:'0'}}>{e}</p></div>
            <input className='mx-1' style={{minWidth:'135px', maxWidth:'135px'}} type="date" id="start" name="trip-start"
            value={dateFor}
            onChange={e=>setDateFor(e.target.value)}
            min="2005-15-03" max="2022-12-31">
            </input>
            <button onClick={()=>{handleDeleteActivity(e)}} type='button' className='removeActivity'>
                <i className='fa fa-minus-square'></i>
            </button>
        </li>
    );
}

export default NewActivity;