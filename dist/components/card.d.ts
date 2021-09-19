/// <reference types="react" />
export interface CardTab {
    children?: any;
    active?: boolean;
    text?: string;
    onClick?: () => void;
}
interface Action {
    to: string | Record<string, any>;
    text: string;
}
interface CardProps {
    title?: string;
    titleActive?: boolean;
    onTitleClick?: () => void;
    tabs?: CardTab[];
    children?: any;
    actions?: Action[];
    expanded?: boolean;
    rows?: number;
}
export default function Card(props: CardProps): JSX.Element;
export {};
