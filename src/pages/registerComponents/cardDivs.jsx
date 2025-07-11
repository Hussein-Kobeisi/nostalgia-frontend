import {Input, Button}  from './components.jsx'

export const InputsDiv = ({divClasses, inputClasses, fields}) => (
    <div className={`flex-col items-center ${divClasses}`}>
        {fields.map((field) => (
            <Input classesStr={`cardInput ${inputClasses}`} key={field} placeholder={field} />
        ))}
    </div>
)

export const BtnsDiv = ({divClasses, inputClasses, fields, clicks}) => (
    <div className={`flex-col items-center ${divClasses}`}>
        {fields.map((field, i) => (
            <Button classesStr={`cardBtn ${inputClasses}`} key={field} text={field} onClick={clicks[i]} />
        ))}
    </div>
)

export const LinksDiv = ({divClasses, inputClasses, fields, clicks}) => (
    <div className={`flex-col items-center ${divClasses}`}>
        {fields.map((field, i) => (
            <p className={`cardLink ${inputClasses}`} key={i} onClick={clicks[i]}> {field} </p>
        ))}
    </div>
)