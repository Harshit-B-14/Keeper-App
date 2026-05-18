import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";

function App() {
  const [notes, setNotes] = useState([]);
  const [editingID, setEditingID] = useState(null);

  useEffect( () => {
    let loaded = localStorage.getItem("savedNotes");
    if(loaded){
      try{
        setNotes(JSON.parse(loaded));
      }
      catch(e){
        console.log("Error occured",e);
      }
    }
  },[]);

  useEffect( () => {
    localStorage.setItem("savedNotes",JSON.stringify(notes));
  },[notes]);

  function addNote(newNote) {
    setNotes(prevNotes => {
      return [...prevNotes, newNote];
    });
  }

  function deleteNote(id) {
    setNotes(prevNotes => {
      return prevNotes.filter((note) => {
        return note.id !== id;
      });
    });
  }

  function editID(id){
    
  }

  function updateNotes(id, updatedTitle, updatedContent){
    if ( updatedTitle === "" && updatedContent === "" ){
      deleteNote(id);
      return;
    }
    
    setNotes((prevNotes) => {
      return prevNotes.map((note)=>{
        if(note.id === id){
          return {
            ...note,
            title: updatedTitle, //create a state in this file
            content: updatedContent //create a state in this file
          };
        }
        return note;
      })
    });
    setEditingID(null);
  }

  function editNote(id){
    setEditingID(id);
  }

  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      {notes.map((noteItem, index) => {
        return (
          <Note
            key={noteItem.id}
            id = {noteItem.id}
            title={noteItem.title}
            content={noteItem.content}
            onDelete={deleteNote}
            onEdit = {editNote}
            editingID = {editingID}
            updateNotes = {updateNotes}
          />
        );
      })}
      <Footer />
    </div>
  );
}

export default App;
