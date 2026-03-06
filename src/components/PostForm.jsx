import React,{useCallback} from 'react'
import {useForm} from 'react-hook-form'
import {Butaton, Input, Select, RTE} from '../index'
import {useDispatch} from 'redux-tookit'
import appwriteService from  '../../appwrite/config' 
import {useSelector} from 'react-redux'




function PostForm({post}){


const {register, handlesumit, watch ,setValue} = useForm({
  defaultValues: {
    title:    post ?.title || '',
    slug :    post?.slug ||  ' ',
    content:  post?.content || ' ', 
    status :  post?.status ||  'active ',
  
}});


const navigate = useNavigate();

const userData  = useSelector(state=>state.user.userData);


 const submit = async (data) =>
 {
  if(post)
    {
     const file = data.image[0] ?  appwriteService.uploadFile(data.image ) : null 
      if(file)
        {
           appwriteService.deletefile(post.featuredImage); 
        }
         
       const dbpost = await appwriteService.updatePost(
       post.$id,
       {
          ...data,
         featuredImage: file ? file.$id : undefined, 
         if(dpost)
         {
            navigate(`/post/${dbpost.id}`);
          }
        }
       );


      }
    } 



return (
    <div>
      
    </div>
  )
}

export default PostForm
