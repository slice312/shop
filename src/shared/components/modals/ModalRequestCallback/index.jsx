import React from "react";
import {Modal} from "react-bootstrap";
import {ModalSuccessView} from "src/shared/components/modals/ModalSuccessView";
import {InputForm} from "./InputForm";


export const ModalRequestCallback = ({onClose}) => {
    const [success, setSuccess] = React.useState(false);


    return (
        <Modal show={true}>
            {
                success
                    ? <ModalSuccessView
                        title="Спасибо"
                        Text={
                            <div>
                                Ваша заявка была принята ожидайте, <br/>
                                скоро Вам перезвонят
                            </div>
                        }
                        onClose={onClose}
                    />
                    : <InputForm onSubmit={() => setSuccess(true)}
                                 onClose={onClose}
                    />
            }
        </Modal>
    );
};