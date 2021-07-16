const Activity = ({mainContent, activity}) =>{
    console.log(mainContent)
    return (
        <li key={mainContent[2].indexOf(activity)}  className="list-group-item "> 
        <div className=' activityContainer'>
            <div className='w-50 activityText'>
                <p className=' activity'>{activity}</p>
                <p className=' activityDate' >{'16/07/2021'}</p>
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
    )
}

export default Activity;