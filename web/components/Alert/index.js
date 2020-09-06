import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

export default function AlertInform(props) {
    const {
        open, close, text = 'Salvo com sucesso', severity = 'success',
        vertical = 'top', horizontal = 'right'
    } = props;

    const Alert = (props) => ( <MuiAlert elevation={6} variant="filled" {...props} /> )

    const handleClose = () => { close(false) };

    return (
        <Snackbar
            open={open}
            autoHideDuration={6000}
            onClose={handleClose}
            anchorOrigin={{ vertical, horizontal }}
        >
            <Alert onClose={handleClose} severity={severity}>
                {text}
            </Alert>
        </Snackbar>
    )
}