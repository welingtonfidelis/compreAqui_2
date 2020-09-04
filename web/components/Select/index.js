
export default function Select ({ label, name, options, ...rest }){
    return (
        <div className="select-block">
            <label htmlFor={name}>{label}</label>
            <select value="" id={name} {...rest} >
                <option value="" disabled hidden>Selecione uma opção</option>

                {options.map(el => {
                    return <option key={el.value} value={el.value}>{el.label}</option>
                })}
            </select>
        </div>
    )
}