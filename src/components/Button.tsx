type ButtonProps = {
    text?: String;
};
//Named Export
export function Button (props: ButtonProps) {
    return (<button>{props.text || "Default Button"}</button>)
};