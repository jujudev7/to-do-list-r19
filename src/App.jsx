import { useRef, useState } from "react";

export default function App() {
  const [todos, setTodos] = useState([
    { id: 1, text: "Manger", checked: false },
    { id: 2, text: "Bouger", checked: false },
    { id: 3, text: "Dormir", checked: false },
  ]);

  const toggleTodo = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, checked: !todo.checked } : todo,
      ),
    );
  };

  const [draggedTodo, setDraggedTodo] = useState(null);
  const [lastMouseY, setLastMouseY] = useState(0);
  const placeholderRef = useRef(null);

  const onSubmit = (formData) => {
    const todo = formData.get("todo");
    setTodos([{ id: Date.now(), text: todo }, ...todos]);
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const onDragStart = (e, todo) => {
    setDraggedTodo(todo);
  };

  const onDragOver = (e) => {
    e.preventDefault();

    const targetElement = e.target.closest("li");
    if (!targetElement || targetElement === placeholderRef.current) return;

    // Empêche le placeholder d'apparaître sur l'élément déplacé
    if (
      draggedTodo &&
      parseInt(targetElement.dataset.id, 10) === draggedTodo.id
    )
      return;

    const currentMouseY = e.clientY;
    const isMovingDown = currentMouseY > lastMouseY;
    setLastMouseY(currentMouseY);

    const parentElement = targetElement.parentNode;
    const allElements = Array.from(parentElement.children);
    const currentIndex = allElements.indexOf(targetElement);

    // Ne pas permettre l'insertion juste après l'élément draggé
    const draggedIndex = allElements.findIndex(
      (el) => el.dataset.id === draggedTodo?.id?.toString(),
    );

    const targetElementHeight = targetElement.offsetHeight;
    const targetElementTop = targetElement.getBoundingClientRect().top;

    // Calculer la position de la souris par rapport à l'élément
    const mouseRelativeToTarget = currentMouseY - targetElementTop;

    if (isMovingDown) {
      // N'afficher le placeholder qu'après avoir parcouru la moitié de la hauteur de l'élément
      if (mouseRelativeToTarget > targetElementHeight / 5) {
        const nextIndex = currentIndex + 1;
        if (nextIndex < allElements.length && currentIndex !== draggedIndex) {
          parentElement.insertBefore(
            placeholderRef.current,
            allElements[nextIndex],
          );
        } else {
          // Si on est à la fin de la liste
          parentElement.appendChild(placeholderRef.current);
        }
      }
    } else {
      // Pour le mouvement vers le haut, on insère avant l'élément courant
      // sauf si c'est l'élément juste après celui qu'on déplace
      if (currentIndex !== draggedIndex + 1) {
        parentElement.insertBefore(
          placeholderRef.current,
          allElements[currentIndex],
        );
      }
    }
  };

  const onDrop = () => {
    if (!placeholderRef.current) return;

    const updatedTodos = todos.filter((t) => t.id !== draggedTodo.id);
    const placeholderIndex = Array.from(
      placeholderRef.current.parentNode.children,
    ).indexOf(placeholderRef.current);
    updatedTodos.splice(placeholderIndex, 0, draggedTodo);

    setTodos(updatedTodos);
    setDraggedTodo(null);
  };

  const onDragEnd = () => {
    if (placeholderRef.current) {
      placeholderRef.current.remove();
    }
  };

  if (!placeholderRef.current) {
    const placeholder = document.createElement("li");
    placeholder.style.height = "48px";
    placeholder.style.background = "cyan";
    placeholder.style.border = "2px dashed #cbd5e0";
    placeholder.style.margin = "8px 0";
    placeholderRef.current = placeholder;
  }

  return (
    <div className="mx-auto flex max-w-lg flex-col gap-4 p-4">
      <h1 className="text-2xl font-bold">Ma To-do List 🗒️</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target);
          onSubmit(formData);
          e.target.reset();
        }}
        className="flex items-center gap-2"
      >
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
      <ul onDragOver={onDragOver} onDrop={onDrop} onDragEnd={onDragEnd}>
        {todos.map((todo) => (
          <li
            key={todo.id}
            data-id={todo.id}
            draggable
            onDragStart={(e) => onDragStart(e, todo)}
            className="mb-2 flex w-4/5 flex-1 items-center justify-between rounded-md border bg-slate-100 px-4 py-3 hover:bg-slate-200"
          >
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={todo.checked}
                onChange={() => toggleTodo(todo.id)}
                className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
              />
              <span>{todo.text}</span>
            </div>
            <button
              onClick={() => deleteTodo(todo.id)}
              className="rounded-md border border-zinc-800 bg-white p-1 text-sm"
            >
              🗑️
            </button>
          </li>
        ))}
      </ul>
      <div className="done"></div>
    </div>
  );
}
