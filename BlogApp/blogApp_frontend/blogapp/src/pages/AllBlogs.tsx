import { useEffect, useState } from "react"
import BlogActions from "../redux/blogredux/blog.actions"
import { useAppDispatch } from "../redux/store"
import CreateBlog from "./CreateBlog"
// import Button from '@mui/material/Button';
// import TextField from '@mui/material/TextField';
// import Dialog from '@mui/material/Dialog';
// import DialogActions from '@mui/material/DialogActions';
// import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
// import DialogTitle from '@mui/material/DialogTitle';


const AllBlogs = ()=>{
    const dispatch = useAppDispatch()
    const [data,setData] = useState<any>([])
    const [isDrawerOpened, setIsDrawerOpened] = useState(false);
    const [editData, setEditData] = useState<any>(null);
    const [open, setOpen] = useState(false);

    const getblogs = ()=>{
       dispatch(BlogActions.GETALLBLOGS())
        .then((res)=>{
            setData(res?.payload?.data?.allBlogs)
        })
        .catch((err)=>{
            console.log("error",err)
        })
        .finally(()=>{})
      
    }

    const deleteBlog = (id:any)=>{
      dispatch(BlogActions.deleteBlog(id))
      getblogs()
    }


    const toggleDrawer = () => {
      setIsDrawerOpened(!isDrawerOpened);
     setOpen(true);
  
      if (isDrawerOpened) {
        setEditData(null);
      }
    };

    const handleEditIconFn = (data:any)=>{
      setEditData(data)
      toggleDrawer()
    }

  

    useEffect(()=>{
      if (!editData) {
        getblogs() 
      }
       // eslint-disable-next-line react-hooks/exhaustive-deps
    },[editData])
    
  return <div>
    <div style={{display:"flex"}}>
      <div>
        <button onClick={()=>toggleDrawer()}>Create Blog</button>
        <CreateBlog open={open} setOpen={setOpen} editData={editData} setEditData={setEditData} getblogs={getblogs}/>
      </div>
        {
          data.length>0 ? data.map((el:any)=>{
            // console.log(el)
            return <div key={el.blog_id} >
              <div style={{border:"1px solid red",display:"flex",flexDirection:"row",justifyContent:"space-around"}}>
                <div style={{border:"1px solid black"}}>
                  <p>{el?.title}</p>
                  <p>{el?.created_by[0]?.name || ""}</p> 
                </div>
                <div style={{border:"1px solid black"}}>
                   <p>{el?.created_at}</p>
                   <div style={{display:"flex"}}>
                      <button onClick={()=>deleteBlog(el.blog_id)}>Delete</button>
                      <div >
                        <button onClick={() => handleEditIconFn(el)}>Edit</button>
                        
                        
                      </div>
                   </div>
                </div>
              </div>
              <div>
              {el?.description}
              </div>
              
            </div>
          }) : <div>NO DATA FOUND</div>
        }
    </div>
  </div>
}

export default AllBlogs