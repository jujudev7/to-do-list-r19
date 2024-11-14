import { useState } from "react";

export default function App() {
  const [todo, setTodo] = useState("");

  const onSubmit = (formData) => {
    const todo = formData.get("todo");

    setTodo(todo); // Met à jour l'état avec la nouvelle valeur de todo
  };

  return (
    <div className="p-4 flex flex-col gap-4 max-w-lg mx-auto">
      <h1 className="font-bold text-2xl">Ma To-do List 🗒️</h1>
      <form action={onSubmit} className="flex items-center gap-2">
        <input
          type="text"
          name="todo"
          className="border rounded-md px-3 py-3 flex-1"
        />
        <button
          type="submit"
          className="border rounded-md px-4 py-3 bg-zinc-800 hover:bg-black text-white"
        >
          Ajouter
        </button>
      </form>
      <h2 className="text-lg">{todo}</h2>
    </div>
  );
}

