export function renderInputFields({ inputFields, inputs, errors, handleInputChange, isSignup }) {
  return inputFields.map((field, i) => (
    <div key={i} className="flex-col items-center">

      <input
        className={(isSignup ? 'signCardInput' : 'cardInput') + (errors[field] ? ' errorInput' : '')}
        placeholder={field[0].toUpperCase() + field.slice(1).replace('Password', ' Password')}
        type={field.toLowerCase().includes('password') ? 'password' : 'text'}
        value={inputs[field]}
        onChange={e => handleInputChange(field, e.target.value)}
      />

      {errors[field] && <p className="inputErrorMsg">{errors[field]}</p>}
    </div>
  ));
}

export function handleInputChangeTemplate(setInputs, setErrors, errorKey) {
    //errorKey used for response Error
    return (field, value) => {
        setInputs((prev) => ({ ...prev, [field]: value }));
        setErrors((prev) => ({ ...prev, [field]: '', [errorKey]: '' }));
    };
};

export function validateInputs(setErrors, formType, inputs) {
    const errors = {};

    if (formType === 'signup') {
        if (!inputs.username?.trim()) errors.username = 'Username is required';
        if (!inputs.email?.includes('@')) errors.email = 'Invalid email';
        if ((inputs.password || '').length < 6) errors.password = 'Password too short';
        if (inputs.confirmPassword !== inputs.password)
        errors.confirmPassword = 'Passwords do not match';
    }

    if (formType === 'login') {
        if (!inputs.email?.trim()) errors.email = 'Email is required';
        if ((inputs.password || '').length < 6) errors.password = 'Password too short';
    }
    
    return errors
};

export function handleSubmitFactory(formType, inputs, setErrors, onSubmit) {
    return () => {
        const validationErrors = validateInputs(formType, inputs);
        setErrors(validationErrors);

        const isValid = Object.keys(validationErrors).length === 0;
        if (isValid) {
            onSubmit();
        } else {
            console.log('Form has errors:', validationErrors);
        }
    };
};