import {Group,Inputt,FormInputLabel} from './form-input.styles.jsx'

const FormInput =({ label, ...otherProps })=>{
    return(
        <Group>
            <Inputt {...otherProps} />
            {label && (
                <FormInputLabel shrink={otherProps.value.length} className={`${otherProps.value.length > 0 ? 'shrink' : null} form-input-label`}>
                    {label}
                </FormInputLabel>
            )}
        </Group>
    )
}

export default FormInput