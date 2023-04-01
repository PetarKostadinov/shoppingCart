import { useState } from "react"


export const useForm = (initialValues, onSubmitHandler) => {
    const [values, setValues] = useState(initialValues);



    const changeValues = (newValues) => {
        // Validate 

        setValues(newValues);
    }

    return {
        values,
        changeValues
    }
}