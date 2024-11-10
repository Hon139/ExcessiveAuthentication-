import { React } from 'react';
//Error component if login authentication failed.


const ErrMsg = ({errMessage}) => {
    if (!errMessage) {
        return null;
    }
    return (
        <div style={{ color: 'red', marginTop: '15px', fontSize: '20px'}}>
           <p>{errMessage}</p>
        </div>
    );
};

export default ErrMsg;