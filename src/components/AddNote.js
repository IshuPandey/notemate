import React, {useContext, useState,useRef} from 'react'
import NoteContext from "../context/notes/NoteContext"
import '../App.css'


const AddNote = () => {
    

    
    const context = useContext(NoteContext);
    const {addNote} = context;

    const [note, setNote] = useState({title: "", description: "", tag: ""})

    const handleClick = (e)=>{
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        setNote({title: "", description: "", tag: ""})
        
    }

    const onChange = (e)=>{
        setNote({...note, [e.target.name]: e.target.value})
    }




  
    return (





        
        // <div className="container my-3">
        //     <h2>Add a Note</h2>
        //     <form className="my-3">
        //     <div className="card1">
        //         <div className="mb-2">
        //         <div class="inputBox1">
        //             <label htmlFor="title" className="form-label">Title</label>
        //             <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" onChange={onChange} /> 
        //         </div></div>
                
        //         <div className="mb-2">
        //         <div class="inputBox1">
        //             <label htmlFor="description" className="form-label">Description</label>
        //             <input type="text" className="form-control" id="description" name="description" onChange={onChange} />
        //         </div></div>
        //         <button type="submit"  className="enter" onClick={handleClick}>Add Note</button>
        //         </div>

        //         {/* <div className="mb-3 form-check">
        //             <input type="checkbox" className="form-check-input" id="exampleCheck1" />
        //             <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
        //         </div> */}
                
        //     </form>
        // </div>
        


        <>
             <form className="my-3">

        <div class="container my-3">
        <div class="card1">
            <h1 class="singup">Note Details </h1>
            <div class="inputBox1">
                <input type="text" required="required" id="title" name="title" minLength={3} value={note.title} onChange={onChange}/>
                <span class="user">Title</span>
            </div>

            <div class="inputBox">
                <input type="text" required="required" id="description" name="description" minLength={5} value={note.description} onChange={onChange}/>
                <span>Description</span>
            </div>

            <div class="inputBox">
            <input type="text" required="required" id="tag" name="tag" value={note.tag} onChange={onChange}/>
                <span>Tags</span>
            </div>

            <button disabled={note.title.length<3 || note.description.length<5} class="enter" type="submit" onClick={handleClick} >Add Note</button>

        </div>
    </div>
        </form>
      
       
        </>

        
        
    )
}

export default AddNote