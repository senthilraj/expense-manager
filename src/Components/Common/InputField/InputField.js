import React from 'react';
import './InputField.css'

const InputField = (props) => {

    const { id, type, value, name, labelText, onChange} = props;

    const inputChangeHandler = (e) => {
        onChange(e);
        e.preventDefault();
    }
    
    return (
        <div className="form-group">
            <label htmlFor={id}>{labelText}</label>
            <input type={type} value={value} name={name} id={id} onChange={inputChangeHandler}/>
        </div>
    );
}
export default InputField;