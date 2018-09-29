import React from 'react';
import './ListSection.css';
import Button from 'Components/Common/Button';

const ListSection = (props) => {
    const { title, children, buttonOnClick, buttonTitle} = props;
    const onClickHandler = (e) => {
        buttonOnClick(e);
    }
    return (
        <div className="list-wrapper">
            <h1 className="list-title">{title}</h1>
            <Button type="button" className="pull-right" buttonStyle="primary" onClick={onClickHandler}>{buttonTitle}</Button>
            <div className="clearfix"></div>
            {children}
        </div>
    );
}

export default ListSection;