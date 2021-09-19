/// <reference types="react" />
interface ButtonProps {
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    colour?: 'red' | 'green' | 'blue';
    bg?: 'white';
    text: string;
    px?: number;
    py?: number;
    onClick: Function;
    disabled?: boolean;
}
export default function Button(props: ButtonProps): JSX.Element;
export {};
