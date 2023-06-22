import { useState, useCallback, useRef, useEffect } from "react";

export function useFormValidation(initialValues = {}) {
    const [values, setValues] = useState(initialValues);
    const [errors, setErrors] = useState({});
    const [isValid, setIsValid] = useState(false);
    const formRef = useRef(null);

    useEffect(() => {
        setIsValid(true)
    }, [])

    const handleChange = (e) => {
        const { name, value, validationMessage, form } = e.target;
        setValues((oldValues) => ({ ...oldValues, [name]: value }));
        setErrors((oldErrors) => ({ ...oldErrors, [name]: validationMessage }));
        setIsValid(form.checkValidity())
    }

    const setValue = useCallback((name, value) => {
        setValues((oldValues) => ({ ...oldValues, [name]: value }))
    }, [])

    return { values, errors, isValid, handleChange, setValue, setIsValid, formRef };
}