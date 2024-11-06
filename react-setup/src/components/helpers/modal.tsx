import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
interface modalPropsType{ 
  title?: string,
   content?: string, 
   isOpen?: boolean; 
  onConfirm?: React.MouseEventHandler<HTMLButtonElement>,
  onCancel?:React.MouseEventHandler<HTMLButtonElement>,
  confirmBTNColor?:string 
  confirmBTNText?:string
  cancelBTNColor?:string 
  cancelBTNText?:string
}
function ModalExample({ title, content, onConfirm,isOpen ,onCancel,confirmBTNColor,confirmBTNText,cancelBTNColor,cancelBTNText}: modalPropsType) {
  const [modal, setModal] = useState(true);

  const toggle = () => setModal(!modal);

  const externalCloseBtn = (
    <button
      type="button"
      className="close"
      style={{ position: 'absolute', top: '15px', right: '15px' }}
      onClick={toggle}
    >
      &times;
    </button>
  );
  return (


    <Modal isOpen={isOpen} toggle={toggle}>
      {title ? (<ModalHeader>{title}</ModalHeader>) : ''}


      <ModalBody>

        {content ? <b>{content}
        </b> : ''}
      </ModalBody>
      <ModalFooter>
{     onConfirm&&   <Button color={confirmBTNColor?confirmBTNColor:"primary"} onClick={onConfirm||toggle}>
         {confirmBTNText?confirmBTNText:'Confirm'}
        </Button>}
{    onCancel&&    <Button color={cancelBTNColor?cancelBTNColor:"secondary"} onClick={onCancel||toggle}>
         {cancelBTNText?cancelBTNText: "Cancel"}
        </Button>}
      </ModalFooter>
    </Modal>

  );
}

export default ModalExample;