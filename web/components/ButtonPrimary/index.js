
export default function ButtonPrimary({ label, name, ...rest }) {
    return (
        <button className="button-primary-block" {...rest}>
            {label}
        </button>
    )
}