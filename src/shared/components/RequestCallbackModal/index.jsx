import React from "react";
import {Modal} from "react-bootstrap";
import {SuccessView} from "./SuccessView";
import {InputForm} from "./InputForm";


export const RequestCallbackModal = ({onClose}) => {
    const [success, setSuccess] = React.useState(false);

    return (
        <Modal show={true}>
            {
                success
                    ? <SuccessView onButtonClick={onClose}/>
                    : <InputForm onSubmit={() => setSuccess(true)}
                                 onClose={onClose}
                    />
            }
        </Modal>
    );
};