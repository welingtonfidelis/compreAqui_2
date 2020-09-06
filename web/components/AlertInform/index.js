import {
    Button, Dialog, DialogActions, DialogContent,
    DialogTitle, Slide, DialogContentText
} from '@material-ui/core';

import ButtonSecondary from '../ButtonSecondary';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertInform({ title, text, open, close }) {

    return (
        <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={close}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle id="alert-dialog-slide-title">{title}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                    {text}
          </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={close} color="primary">
                    <b style={{color: '#F2BB16'}}>
                        OK
                    </b>
                </Button>
            </DialogActions>
        </Dialog>
    )
}