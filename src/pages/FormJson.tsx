import React from "react";
import useHandleForm from "../assets/useHandleForm";

const FormJson = () => {
  const { form, handleChangeForm } = useHandleForm();

  return (
    <div className="space-y-2">
      <input
        type="text"
        name="name"
        value={form.name}
        onChange={handleChangeForm}
        placeholder="名前"
        className="text-white border"
      />
      <input
        type="email"
        name="email"
        value={form.email}
        onChange={handleChangeForm}
        placeholder="メールアドレス"
        className="text-white border"
      />
      <input
        type="number"
        name="age"
        value={form.age}
        onChange={handleChangeForm}
        placeholder="年齢"
        className="text-white border"
      />
      <pre className="text-white">{JSON.stringify(form, null, 2)}</pre>
    </div>
  );
};

export default FormJson;
