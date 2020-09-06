import { CircularProgress } from '@material-ui/core';

export default function ButtonSecondary({ label, loading, ...rest }) {
    return (
        <button className="button-secondary-block" {...rest}>
            <b>{label}</b>
            { loading && <CircularProgress /> }
        </button>
    )
}