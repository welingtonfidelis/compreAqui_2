import { Autocomplete } from '@material-ui/lab';

import Input from '../Input';

export default function Select({ label, options, ...rest }) {
    return (
        <div className="select-block">
            <Autocomplete
                id={label}
                options={options}
                {...rest}
                getOptionLabel={(option) => option.name || option.title}
                renderInput={(params) => <Input label={label} {...params} />}
            />
        </div>
    )
}