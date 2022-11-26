import { Modal } from "react-bootstrap";
import { yupResolver } from '@hookform/resolvers/yup'
import React, { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import axios from "axios";
import * as Yup from 'yup'
import './Modal.css'

const RegisterForm = (props) => {
   const [isPending, setIsPending] = useState(false);
   const [errorMessage, setErrorMessage] = useState('');

   // This state is to determind whether our modal should be static or not.
   const [backDrop, setBackDrop] = useState(true);

  // Validate form.

  const formSchema = Yup.object().shape({
    name: Yup.string()
      .required('Full name is required')
      .min(3, 'Full name must be at least 3 characters long'),
    email: Yup.string()
      .required('Email is required')
      .email('Invalid email format'),
    confirmEmail: Yup.string()
      .oneOf([Yup.ref('email')], 'Confirm email does not match with email'),
  })

  const formOptions = { resolver: yupResolver(formSchema) }

  const { 
    register, 
    handleSubmit, 
    reset, 
    formState,
  } = useForm(formOptions)

  const { errors } = formState

  // Submit data.

  function onSubmit(data, event) {
    event.preventDefault();

    setIsPending(true);

    // We should not allow user turn off the modal while submitting.

    setBackDrop(false);

    axios.post('https://us-central1-blinkapp-684c1.cloudfunctions.net/fakeAuth', data)
    .then(() => {
        setErrorMessage('');
        setIsPending(false);
        setBackDrop(true);

        // Open success modal.

        props.showSuccessModal(true);

        // Close form.

        props.onHide();
    })
    .catch((error) => {
        setIsPending(false);
        setBackDrop(true);

        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log(error.response);
            setErrorMessage(error.response.data.errorMessage);
        } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            console.log(error.request);
            setErrorMessage('Sending failed. Please try again later.');
        } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message);
            setErrorMessage(error.message);
        }
    }) 
  }
  
  // If form close then we will reset input value.

  useEffect(() => {
    if (!props.show) {
        reset();
        setErrorMessage('');
    }
  }, [props.show, reset]);

  return (
    <Modal
      show={props.show}
      onHide={props.onHide}
      backdrop={backDrop}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      contentClassName="align-items-center"
      centered
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          Request an invite
        </Modal.Title>
      </Modal.Header>
      <form className="mt-2" onSubmit={handleSubmit(onSubmit)}>
        <Modal.Body>            
            <input
                name="name"
                placeholder="Full name"
                {...register('name')}
                className={`form-control ${errors.name ? 'is-invalid' : ''}`}
            />
            <div className="invalid-feedback">{errors.name?.message}</div>
            <input
                name="email"
                placeholder="Email"
                {...register('email')}
                className={`form-control mt-4 ${errors.email ? 'is-invalid' : ''}`}
            />
            <div className="invalid-feedback">{errors.email?.message}</div>
            <input
                name="confirmEmail"
                placeholder="Confirm email"
                {...register('confirmEmail')}
                className={`mt-4 form-control ${errors.confirmEmail ? 'is-invalid' : ''}`}
            />
            <div className="invalid-feedback">{errors.confirmEmail?.message}</div> 
            <div className="text-danger mt-4"><em>{errorMessage}</em></div>           
            <button className={`btn btn-outline-success w-100 mt-4 ${isPending ? 'disabled' : ''}`} 
                type="submit"
            >
                {isPending ? 'Sending, please wait...' : 'Send'}
            </button>
        </Modal.Body>
      </form>      
    </Modal>
  )
}

export default RegisterForm