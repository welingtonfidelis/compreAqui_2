import { Fade, Backdrop, Modal, IconButton } from '@material-ui/core';
import { HighlightOff } from '@material-ui/icons';

export default function TransitionsModal({ open, close, children }) {

    const handleClose = () => {
        close(false);
    }

    return (
        <div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className="modal-container"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <div className="modal-content">
                        <div className="modal-close-button">
                            <IconButton size="medium" onClick={handleClose}>
                                <HighlightOff fontSize="large"/>
                            </IconButton>
                        </div>

                        {children}
                    </div>
                </Fade>
            </Modal>
        </div>
    );
}