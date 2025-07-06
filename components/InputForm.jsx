import React from 'react';

function InputForm(props) {
    return (
        <div>
            <div className="form-group mb-4">
                <input
                    type={props.type}
                    className= {props.classes}
                    name={props.name}
                    placeholder={props.holderText}
                    value={props.val}
                    onChange={props.onChangeAction}
                    required
                />
            </div>
        </div>
    )
}

export default InputForm;