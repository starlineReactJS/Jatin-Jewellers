import React from 'react';

export default function ContactData(props) {
    return (
        <p className='mb-3' >
            <i className={`fa fa-${props.icon}`}></i>
            <strong>{props?.title}</strong>
            {props?.detail?.map((item, index) => (
                <span className={`detail${index + 1}`} key={`${item}_${index}`} >{item}</span>
            ))}
        </p>
    );
}
