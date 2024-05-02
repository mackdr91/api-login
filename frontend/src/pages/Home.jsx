import { useState, useEffect } from "react"
import api from "../api"
import Note from "../components/Note"
import "../styles/Home.css"


function Home() {
  // keep track of all notes; authorized request to get all notes from the server
  const [notes, setNotes] = useState([]);
  // create a note
  const [content, setContent] = useState("")
  const [title, setTitle] = useState("")

  // side effect: as soon as we get to this page get all the notes; 
  //intial mounting of the useEffect (always going to run once without dependency (listening))
  useEffect(() => {
    getNotes();
  }, [])// <--- dependency goes here


  // send request get all of the notes
  const getNotes = () => {
    api.get("/api/notes/") // access to the list of notes
    .then((response) => response.data)// get the notes
    .then((data) => {setNotes(data); console.log(data)}) // change the state; I have the list of notes
    .catch((error) => alert(error));// catch any errors during this process
  };
  

  const deleteNote = (id) => {
    api.delete(`/api/notes/delete/${id}`)
    .then((response) =>{
      if (response.status === 204){
        alert("Note deleted!")
      } else {
        alert("Failed to delete note")
      }
      getNotes();
    }).catch((error) => alert(error));
    
  };

  const createNote = (e) => {
    e.preventDefault();
    api.post("/api/notes/", { title, content })
    .then((response) => {
      if (response.status === 201 ){
        alert("Note Created")
      } else {
        alert("Failed to create note")
      }
      getNotes()
    })
    .catch((error) => alert.apply(error))
    
  }




  return (
    <div>
      <div className="note-list">
        <h2>Notes</h2>
        {notes.map((note) => (
        <Note note={note} onDelete={deleteNote} key={note.id} />)
        )}

      </div>
       
   
      <h2 className="note-t">Create a Note</h2>
      <form onSubmit={createNote}>
        <label htmlFor="title">Title:</label>
        <br />
        <input 
          type="text"
          id="title"
          required
          name="title"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
        <label htmlFor="content">Content:</label>
        <br />
        <textarea 
        name="content" 
        id="content" 
        required
        value={content}
        onChange={(e) => setContent(e.target.value)}
        ></textarea>
        <br />
        <input type="submit" value="Submit" />
      </form>
    </div>
   
  )
  
}
export default Home