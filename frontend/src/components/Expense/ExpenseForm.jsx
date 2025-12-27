import { useState } from "react";
import React from "react";
import { api } from "../../services/api";

export default function ExpenseForm({ refresh }) {
  const [data, setData] = useState({
    name: "",
    amount: "",
    category: "Food",
    payment: "Cash"
  });

  const submit = async () => {
    await api.post("/expenses", data);
    refresh();
  };

  return (
    <>
      <input placeholder="🍔 Expense" onChange={e => setData({ ...data, name: e.target.value })} />
      <input type="number" placeholder="₹" onChange={e => setData({ ...data, amount: e.target.value })} />
      <button onClick={submit}>➕ Add</button>
    </>
  );
}
