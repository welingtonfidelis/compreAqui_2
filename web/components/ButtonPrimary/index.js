
export default function ButtonPrimary({ label, name, ...rest }) {
    return (
        <div className="button-primary-block" {...rest}>
            {label}
        </div>
    )
}