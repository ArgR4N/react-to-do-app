
const ProfileSection = ({profileSlideBarOn, setProfileSlideBarOn, username, logOut}) =>{
    const handleLogOut = () =>{
        setProfileSlideBarOn(false)
        logOut()
    }
    return(
        <div className={profileSlideBarOn ? 'profileSlideOn' : 'profileSlideOff'}>
            <button onClick={() => setProfileSlideBarOn(false)} className='closeProfileSlideBarBtn'></button>
            <button onClick={handleLogOut} className='logOut'>
                <i className="fa fa-arrow-right"></i>
            </button>
            <div className=' userAvatar'>
                <div className='userAvatar1'></div>
                <div className='userAvatar2'></div>
            </div>
            <h2>{username}</h2>
        </div>
    )
}

export default ProfileSection;