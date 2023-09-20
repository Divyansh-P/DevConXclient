import React, { useState,useContext } from 'react';
import { useHttpClient } from '../../hooks/useHttpClient';
import useForm from '../../hooks/useForm';
import { AuthContext } from '../../context/auth';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { newPostForm } from '../../utils/formConfig';
import { appendData, renderRepeatedSkeletons } from '../../utils';
import ErrorModal from '../../components/Modal/ErrorModal';
import SkeletonElement from '../../components/Skeleton/SkeletonElement';
import {IoMdClose} from '@react-icons/all-files/io/IoMdClose'
import {AiFillCaretDown} from '@react-icons/all-files/ai/AiFillCaretDown'
import {AiFillCaretUp} from '@react-icons/all-files/ai/AiFillCaretUp'
import './newpost.css'
import axios from 'axios'

import { ThreeDots } from  'react-loader-spinner'

const NewPost = () => {
  const auth = useContext(AuthContext);
  const history = useHistory();
  const { currentUser } = auth;
  const { isLoading, sendReq, error, clearError } = useHttpClient();
  const { renderFormInputs, renderFormValues, isFormValid } =
    useForm(newPostForm);
  const formValues = renderFormValues();
  const formInputs = renderFormInputs();
  const postSubmitHandle = async (evt) => {
    evt.preventDefault(); //otherwise, there will be a reload
    const formData = appendData(formValues);
    formData.append('author', currentUser.userId);
    try {
      await sendReq(
        `${process.env.REACT_APP_BASE_URL}/posts`,
        'POST',
        formData,
        {
          Authorization: `Bearer ${currentUser.token}`,
        }
      );
      history.push('/');
    } catch (err) {}
  };
  //box show
 const [showb,setshowb]=useState(true)
  const assist=()=>{
    setshowb(!showb)
  }
  //ai generated content
  const [content,setcontent]=useState([])
  //type set title/idea
  const [typ,settyp]=useState('')
  //input set 
  const [ip,setip]=useState({msg:''})
  const topic=(e)=>{
  setip({msg:e.target.value})
  }
  //model open close
  const [m,setm]=useState(false)
  //minimise
  const [mn,setmn]=useState(false)


//title button fn
  const tit_handler=()=>{
  setm(true)
  setshowb(!showb)
  settyp('title')
  const apiUrl=`${process.env.REACT_APP_BASE_URL}/ai/title`
  axios.post(apiUrl, ip)
  .then((response) => {

    const wordArray = response.data.split('\n');
    setcontent(wordArray)
    console.log('Server response:', response.data);
  })
  .catch((error) => {
    console.error('There was a problem with the POST request:', error);
  });
  }
//idea button fn
  const idea_handler=()=>{
setm(true)
setshowb(!showb)
settyp('ideas')
const apiUrl=`${process.env.REACT_APP_BASE_URL}/ai/ideas`
axios.post(apiUrl, ip)
.then((response) => {

  const wordArray = response.data.split('\n');
  setcontent(wordArray)
  console.log('Server response:', response.data);
})
.catch((error) => {
  console.error('There was a problem with the POST request:', error);
});
  }

  const tag_handler=()=>{
    setm(true)
    setshowb(!showb)
    settyp('tagsuggest')
    const apiUrl=`${process.env.REACT_APP_BASE_URL}/ai/tagsuggest`
    axios.post(apiUrl, {msg:formValues.body})
    .then((response) => {
      const wordArray = response.data.split('\n');
      setcontent(wordArray)
      console.log('Server response:', wordArray);
    })
    .catch((error) => {
      console.error('There was a problem with the POST request:', error);
    });
      }
      const analyse_handler=()=>{
        setm(true)
        setshowb(!showb)
        settyp('analyse')
        const apiUrl=`${process.env.REACT_APP_BASE_URL}/ai/analyse`
        axios.post(apiUrl,{msg:formValues.body})
        .then((response) => {
          const wordArray = response.data.split('\n')
          setcontent(wordArray)
          console.log('Server response:', wordArray);
        })
        .catch((error) => {
          console.error('There was a problem with the POST request:', error);
        });
          }

          const conclusion_handler=()=>{
            setm(true)
            setshowb(!showb)
            settyp('conclusion')
            const apiUrl=`${process.env.REACT_APP_BASE_URL}/ai/conclusion`
            axios.post(apiUrl,{msg:formValues.body})
            .then((response) => {
              const wordArray = [response.data]
              setcontent(wordArray)
              console.log('Server response:', wordArray);
            })
            .catch((error) => {
              console.error('There was a problem with the POST request:', error);
            });
              }


  const genmore=()=>{
    const apiUrl=`${process.env.REACT_APP_BASE_URL}/ai/${typ}`
    axios.post(apiUrl, ip)
    .then((response) => {
    
      const wordArray = response.data.split('\n');
      setcontent(wordArray)
      console.log('Server response:', response.data);
    })
    .catch((error) => {
      console.error('There was a problem with the POST request:', error);
    });
  }

  //back button fn
  const b_handler=()=>{
    setm(false)
    setcontent([])
    setip('')
  }

  const mhandler=()=>{
  setm(!m)
  setmn(!mn)
  }

  const cclhandler=()=>{
    setmn(!mn)
    setcontent([])
    setip('')
  }
  
  return (
    <>
      <ErrorModal error={error} onClose={clearError} />
      {isLoading ? (
        renderRepeatedSkeletons(<SkeletonElement type='text' />, 20)
      ) : (
        <div className='NewPost'>
        <div className='container-create-page'>
          <form className='form form__create'>
            <h2>Create a new post</h2>
            {formInputs}
            <button
              onClick={postSubmitHandle}
              className='btn'
              disabled={!isFormValid()}
            >
              Submit <span>&rarr;</span>
            </button>
          </form>
        </div>
        {showb&&!mn&&<div className='ai-box' onClick={assist}>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        Need assitance?
        </div>}
        {!showb&&<div className='help'>
        <div className='close' onClick={assist}>
        <IoMdClose/>
        </div>
        <div className='newbox'>
        <input type="text" id="fname" name="fname" onChange={topic}/>
        <div className='tit' onClick={tit_handler} >Title ideas</div>
        <div className='bi' onClick={idea_handler}>BrainStorm ideas</div>
        {formValues.body&&
           <div className='bi' onClick={tag_handler}>Suggest Tags</div>}
           {formValues.body&& <div className='bi' onClick={analyse_handler}>Analyse my blog</div>}
           {formValues.body&&<div className='bi' onClick={conclusion_handler}>Provide conclusion</div>}
        </div>
        </div>
      }
      {m&&
        <div className='modal1'>
        <div className='tbox'>
        <div className='txt'>
        {content.length<=0?<div  className='spin'><ThreeDots
          height="80" 
          width="80" 
          radius="9"
          color="#4fa94d" 
          ariaLabel="three-dots-loading"
          wrapperStyle={{}}
          wrapperClassName=""
          visible={true}
           /></div>:content.map((x)=>{
          return <p className='suggestions'>{x}</p>
        })}
        </div>
        <div className='mheader' onClick={mhandler}><AiFillCaretDown/> </div>
        <div className='bfoot'>
        <div className='more' onClick={()=>{setcontent([]);genmore()}}>
        Generate more
        </div>
        <div className='back' onClick={b_handler} >
        Back
        </div>
        </div>
        </div>
        </div>
      }
      {!m&&mn&&<div className='drowp'><div className='upper' onClick={mhandler}><AiFillCaretUp/></div><div className='ccl' onClick={cclhandler}><IoMdClose/></div></div>}
      </div>
      
      )}
    </>
  );
};

export default NewPost;
