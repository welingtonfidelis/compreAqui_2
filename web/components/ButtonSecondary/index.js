
export default function ButtonSecondary({ label, name, ...rest }) {
    return (
        <div className="button-secondary-block" {...rest}>
            {label}
        </div>
    )
}