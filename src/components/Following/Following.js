import React, { useState, useEffect,useContext} from 'react';
import { useHttpClient } from '../../hooks/useHttpClient';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import ErrorModal from '../../components/Modal/ErrorModal';
import { AuthContext } from '../../context/auth';
import { useHistory } from "react-router-dom";
import './Following.css'
const Following = () => {
  const [loadeduser, setLoadeduser] = useState([]);
  const { userId } = useParams();
  const { isLoading, sendReq, error, clearError } = useHttpClient();
  const { currentUser } = useContext(AuthContext);
  useEffect(() => {
    const fetchfollowing = async () => {
      try {
        const responseData = await sendReq(
          `${process.env.REACT_APP_BASE_URL}/users/${currentUser.userId}`,
          'GET',
          null,
          {
            Authorization: `Bearer ${currentUser.token}`,
          }
        );
        console.log(responseData.user.following)
        setLoadeduser(responseData.user.following);
      } catch (err) {}
    };
    fetchfollowing();
  }, [sendReq,userId, currentUser]);
  const history = useHistory();
  const User_profile=(id)=>{
    let path = `/users/${id}`; 
    history.push(path);
  }
  return (
    <>
      <ErrorModal error={error} onClose={clearError} />
      <div className='following_box'>
      <div className='followingheader'>Your followings</div>
      <div className='following'>
      {loadeduser.length>0?loadeduser.map((x)=>{
        return <div className='following_list' onClick={()=>{User_profile(x._id)}} ><div> <img className='pfp' src={x.avatar} alt="user avatar"/> </div><div className='uname'>{x.name}</div></div>
      }):<div>You dont follow ayone</div>}
      </div>
      </div>
     
    </>
  );
};

export default Following;
