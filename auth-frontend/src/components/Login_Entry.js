//import { useState } from "react";
import {React} from "react"

const textInput = ({label, desc, onChange, value}) => {
    return (
        <div>
            <label>{label}</label>
            <input
                type="text"
                value ={value}
                onChange={onChange}
                placeholder={desc}
            />
        </div>
    );
};

export default textInput;