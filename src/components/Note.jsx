import React, {useState, useEffect, useRef} from "react";

function Note(props) {

  const textareaRef = useRef(null); //creates an object with "current" property set to null
  const [updatedTitle, setUpdatedTitle] = useState(props.title);
  const [updatedContent, setUpdatedContent] = useState(props.content);

  useEffect(() => {
    if(textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = 
        textareaRef.current.scrollHeight + "px";
    }
  },[props.editingID]);

  function handleClick() {
    props.onDelete(props.id);
  }

  function handleChangeTitle(event){
      let val = event.target.value;
      setUpdatedTitle(val);
  }

  function handleChangeContent(event){
    let val = event.target.value;
    setUpdatedContent(val);

    textareaRef.current.style.height = "auto"; //this means textarea's height is set to auto (style is used to access css properties and textareaRef points to the element textarea)
    textareaRef.current.style.height = 
      textareaRef.current.scrollHeight + "px"; // why didnt we write style here?
  }
  return (
    <div className="note">
      {props.id === props.editingID ? 
        <h1 className="Heading">
          <textarea 
            value={updatedTitle} 
            onChange = {handleChangeTitle}>
          </textarea>
        </h1> : 
        <h1>{props.title}</h1>}
      {props.id === props.editingID ? 
        <p>
          <textarea 
            ref = {textareaRef} //now textarea.current points to textarea
            value={updatedContent} 
            onChange = {handleChangeContent}>
          </textarea>
        </p> : 
        <p>{props.content}</p>}
      {props.id === props.editingID ? 
        <button id="save" 
          onClick={() => {
              props.updateNotes(props.id, updatedTitle, updatedContent)
              }}>
            SAVE
        </button> : 
        <button 
          id="edit" 
          onClick={() => {props.onEdit(props.id)}}>
            EDIT
        </button>}
      <button 
        id="delete" 
        onClick={handleClick}>
          DELETE
      </button>
    </div>
  );
}

export default Note;
