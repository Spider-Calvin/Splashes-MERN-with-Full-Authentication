import React, {useState , useEffect}from 'react'
import FileBase from 'react-file-base64'
import {useDispatch, useSelector} from 'react-redux'

import {createPost , updatePost} from '../../Actions/Posts'

function Form({currentId ,setCurrentId}) {
  const post = useSelector((state) =>
    currentId ? state.posts.find((message) => message._id === currentId) : null
  );
  const user = JSON.parse(localStorage.getItem('profile'));

  useEffect(() => {
    if (post) setPostData(post);
  }, [post]);

  const dispatch =useDispatch();

  const [postData , setPostData]=useState({  title:'', message:'', tags:'', selectedFile:'' })

  const SubmitForm = (e) => {
       e.preventDefault();
     if (currentId === null) {
       dispatch(createPost({ ...postData, name: user?.result?.name }));
     } else {
       dispatch(
         updatePost(currentId, { ...postData, name: user?.result?.name })
       );
     }
     clear();
  };

  const clear = () =>{ setCurrentId(null); setPostData(()=>({ title:"", message:"", tags:"", selectedFile:"" })) }

  return (
    <div>
      <form action="" autoComplete="off" noValidate>
        <h3> {currentId ? "Updating The Memory" : "Creating a new memory"}</h3>
        <input
          type="text"
          name="tittle"
          value={postData.title}
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
        />

        <input
          type="text"
          name="messege"
          value={postData.message}
          onChange={(e) =>
            setPostData({ ...postData, message: e.target.value })
          }
        />

        <input
          type="text"
          name="tags"
          value={postData.tags}
          onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(",") })}
        />

        <div>
          {" "}
          <FileBase
            type="file"
            multiple={false}
            onDone={(base64) =>
              setPostData({ ...postData, selectedFile: base64.base64 })
            }
          />{" "}
        </div>

        <button onClick={SubmitForm}>
          {currentId ? "Update" : "Create"}
        </button>
        <br />
      </form>
      <button onClick={clear}>clear</button>
    </div>
  );
}

export default Form
