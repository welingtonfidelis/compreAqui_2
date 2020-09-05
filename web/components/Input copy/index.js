import { TextField, Input } from '@material-ui/core';

export default function InputComponent ({ label, name, ...rest }) {
    return (
        <div className="input-block">
            <TextField 
                label={label} 
                id={name} 
                {...rest} 
                variant="outlined" 
                size="small"
                fullWidth
            />
        </div>
    )
}