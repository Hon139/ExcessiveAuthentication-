//import { useState } from "react";
import {React} from "react"

const textInput = ({type, label, desc, onChange, value}) => {
    return (
        <div>
            <label>{label}</label>
            <input
                type= {type === "password" ? "password":"text"}
                value ={value}
                onChange={onChange}
                placeholder={desc}
            />
        </div>
    );
};

export default textInput;