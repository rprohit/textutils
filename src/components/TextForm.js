import React, { useState } from 'react'

export default function TextForm(props) {
    
    const handleOnChange = (event)=>{
        var newText = event.target.value;
        setText(event?.target?.value? newText:"Nothing to update")
    }
    
    const handleOnClick = ()=>{
        var newText = text.toUpperCase();
        setText(newText)
    }
    const[text,setText] = useState('Please enter your text here....');
    
    return (
        <div>
            <h1>{props.heading}</h1>
            <div className="mb-3">
                <textarea className="form-control" rows="8" value={text} 
                onChange={handleOnChange}></textarea>
            </div>
            <button className='btn btn-primary' onClick={handleOnClick}>Convert to Uppercase</button>
        </div>
    )
}
