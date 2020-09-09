import InputMaks from 'react-input-mask';

import Input from '../Input';

export default function InputMask({label, mask, ...rest}) {
    return (
        <div className="input-mask-block">
            <InputMaks mask={mask} maskChar="_" {...rest}>
                {(props) => <Input {...props} label={label}/>}
            </InputMaks>
        </div>
    )
}