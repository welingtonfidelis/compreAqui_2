import {
    Button, Dialog, DialogActions, DialogContent,
    DialogTitle, Slide, DialogContentText
} from '@material-ui/core';


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertConfirm({ title, text, open, close, confirm }) {
    const handleClose = () => close(false);

    return (
        <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
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
                <Button onClick={handleClose} color="primary">
                    <b style={{color: '#898989'}}>
                        NÃO
                    </b>
                </Button>
                <Button onClick={confirm} color="primary">
                    <b style={{color: '#F2BB16'}}>
                        SIM
                    </b>
                </Button>
            </DialogActions>
        </Dialog>
    )
}