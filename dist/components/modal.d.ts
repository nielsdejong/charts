/// <reference types="react" />
interface ModalProps {
    title?: string;
    onClose: () => void;
    children: any;
}
export default function Modal(props: ModalProps): JSX.Element;
export {};
