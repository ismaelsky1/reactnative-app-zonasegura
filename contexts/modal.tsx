import * as React from 'react';

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { createContext, useState, ReactNode, useEffect } from "react";
import ModalAlertCustom from "../components/ModalAlertCustom";
import { ModalAlert } from '../types';

export const ModalContext = createContext({} as ModalContextData);

interface ModalContextData {
    modalAlert: ModalAlert,
    openModalAlert: ()=> void,
    closeModal: ()=> void,
}

interface ModalProviderProps {
    children: ReactNode;
    modalAlert?: ModalAlert,
}

export function ModalContextProvider({ children, ...rest }: ModalProviderProps) {

    const [modalAlert, setModalAlert] = useState<ModalAlert>({title: 'title', btnOk: 'ok - '});
    const [isModalAlertOpen, setIsModalAlertOpen] = useState(false);

    function openModalAlert() {
        console.log('OPEN MODAL');
        setModalAlert(modalAlert);
        setIsModalAlertOpen(true);
    }

    function closeModal() {
        setIsModalAlertOpen(false);
    }


    return (
        <ModalContext.Provider value={{
            modalAlert,
            openModalAlert,
            closeModal
        }}>
            {children}

            {isModalAlertOpen && <ModalAlertCustom  btnOk={modalAlert.btnOk} title={modalAlert.title} mensage={modalAlert.mensage} back={modalAlert.back} btnCancel={modalAlert.btnCancel} icon={modalAlert.icon} />}
        </ModalContext.Provider>
    );
}