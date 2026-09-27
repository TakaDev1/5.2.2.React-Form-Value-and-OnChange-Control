import React from "react";
import useHandleForm from "../assets/useHandleForm";

const FormJson = () => {
  const { form, handleChangeForm } = useHandleForm();

  return (
    <div>
      <input
        type="text"
        name="name"
        value={form.name}
        onChange={handleChangeForm}
        placeholder="名前"
      />
      <input
        type="email"
        name="email"
        value={form.email}
        onChange={handleChangeForm}
        placeholder="メールアドレス"
      />
      <input
        type="number"
        name="age"
        value={form.age}
        onChange={handleChangeForm}
        placeholder="年齢"
      />
      <pre>{JSON.stringify(form, null, 2)}</pre>
    </div>
  );
};

export default FormJson;
