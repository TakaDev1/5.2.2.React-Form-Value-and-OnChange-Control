import { useState } from "react";
import type { FormType } from "../types/FormType";

const useHandleForm = () => {
  const [form, setForm] = useState<FormType>({
    name: "",
    email: "",
    age: null,
  });

  const handleChangeForm = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  return { form, handleChangeForm };
};

export default useHandleForm;
