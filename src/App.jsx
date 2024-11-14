import { useState } from "react";

export default function App() {
  const [todos, setTodos] = useState([]);

  const onSubmit = (formData) => {
    const todo = formData.get("todo");
    setTodos([todo, ...todos]); // Met à jour l'état avec la nouvelle valeur de todo
  };

  return (
    <div className="mx-auto flex max-w-lg flex-col gap-4 p-4">
      <h1 className="text-2xl font-bold">Ma To-do List 🗒️</h1>
      <form action={onSubmit} className="flex items-center gap-2">
        <input
          type="text"
          name="todo"
          className="flex-1 rounded-md border px-3 py-3"
        />
        <button
          type="submit"
          className="rounded-md border bg-zinc-800 px-4 py-3 text-white hover:bg-black"
        >
          Ajouter
        </button>
      </form>
      <ul>
        {todos.map((todo) => (
          <li key={todo}>
            <input
              type="text"
              defaultValue={todo}
              name="todo"
              className="mb-2 w-4/5 flex-1 rounded-md border bg-slate-100 px-4 py-3 hover:bg-slate-200"
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
