import { Modal } from "react-bootstrap"

const SuccessModal = (props) => {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      contentClassName="align-items-center"
      centered
    >
      <Modal.Header>
        <Modal.Title data-testid="success-modal-title">
          All done!
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h5>
          You will be one of the first to experience Broccoli & Co. when we launch.
        </h5>
      </Modal.Body>
      <Modal.Footer>
        <button className="btn btn-outline-success w-100 mt-4"
            onClick={() => props.onHide()}
        >
            OK
        </button>
      </Modal.Footer>
    </Modal>
  )
}

export default SuccessModal