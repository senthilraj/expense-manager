import React from 'react';
import './Modal.css';

const Modal = (props) => {
    
    const { children, title, show, onSubmit} = props;

    const onSubmitHandlder = (e) => {
        onSubmit(e);
        e.preventDefault();
    }

    return(
        <div>
            { show &&
                <div className="modal-wrapper">     
                    <div className="modal-container">
                        <form onSubmit={onSubmitHandlder}>
                            <h1 className="modal-title">{title}</h1>
                            {children}
                        </form>
                    </div>
                </div>
            }
        </div>
    );
}

export default Modal;