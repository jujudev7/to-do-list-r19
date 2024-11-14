import { useState } from "react";

export default function App() {
  const [todos, setTodos] = useState([
    { id: 1, text: "Manger" },
    { id: 2, text: "Dormir" },
  ]);

  const onSubmit = (formData) => {
    const todo = formData.get("todo");
    setTodos([{ id: Date.now(), text: todo }, ...todos]); // Met à jour l'état avec la nouvelle valeur de todo
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
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
          <li
            key={todo.id}
            className="mb-2 flex w-4/5 flex-1 items-center justify-between rounded-md border bg-slate-100 px-4 py-3 hover:bg-slate-200"
          >
            <span>{todo.text}</span>
            <button
              onClick={() => deleteTodo(todo.id)}
              className="rounded-md border border-zinc-800 bg-white p-1 text-sm"
            >
              🗑️
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
