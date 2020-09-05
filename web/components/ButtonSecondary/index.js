
export default function ButtonSecondary({ label, name, ...rest }) {
    return (
        <button className="button-secondary-block" {...rest}>
            {label}
        </button>
    )
}