import React, { useState } from 'react';
import RegisterForm from "../modal/RegisterForm";
import SuccessModal from "../modal/SuccessModal";

function Main(props) {
  const [formShow, setFormShow] = useState(false);  
  const [modalShow, setModalShow] = useState(false);

  return (
    <div className="container-fluid d-flex align-items-center flex-fill">
      <div className='w-100'>
        <h1> {props.title} </h1>
        <p> {props.content} </p>
        <button className="btn btn-outline-success mb-2"
          onClick={() => setFormShow(true)}> 
            {props.buttonTitle} 
        </button>
      </div>              

      <RegisterForm show={formShow} onHide={() => setFormShow(false)} 
        showSuccessModal={setModalShow} />
      <SuccessModal show={modalShow} onHide={() => setModalShow(false)}/>
    </div>
  )
}

export default Main
