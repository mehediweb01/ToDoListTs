import React, { useState } from "react";

interface TypeTodo {
  id: number;
  Text: string;
}
function App() {
  const [TodoList, setTodoList] = useState<TypeTodo[]>([]);
  const [newTodo, setNewTodo] = useState<string>("");
  const [EditId, setEditId] = useState<number | null>(null);
  const [EditText, setEditText] = useState<string>("");

  const handleAddTodo = (e: React.FormEvent) => {
    e.preventDefault();
    const trimValue = newTodo.trim();
    setTodoList([...TodoList, { id: Date.now(), Text: trimValue }]);
    setNewTodo("");
  };

  const handleDeleteTodo = (id: number) => {
    setTodoList(TodoList.filter((todo) => todo.id !== id));
  };

  const handleEditTodo = (todo: TypeTodo) => {
    setEditId(todo.id);
    setEditText(todo.Text);
  };

  const handleUpdate = (id: number, e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimValue = EditText.trim();
    if (!trimValue) return;
    setTodoList(
      TodoList.map((todo) =>
        todo.id === id ? { ...todo, Text: trimValue } : todo
      )
    );
    setEditId(null);
    setEditText("");
  };

  const handleCancel = () => {
    setEditId(null);
    setEditText("");
  };
  return (
    <>
      <main className="flex justify-center items-center  bg-slate-300 min-h-screen">
        <div className="bg-white flex justify-center items-center flex-col rounded-xl shadow-2xl shadow-black text-center mx-5 py-5 w-full sm:w-1/2 h-full">
          <div className="border-b border-slate-300 w-full">
            <h1 className=" font-semibold font-serif text-3xl tracking-[2px] leading-7 text-teal-500 px-8 py-4">
              ToDo List Ts
            </h1>
          </div>

          <div className="flex justify-center items-center gap-5 px-6 py-5 w-full">
            <div className="w-full">
              <form
                className="w-full flex gap-3 justify-center items-center"
                onSubmit={handleAddTodo}
              >
                <input
                  type="text"
                  onChange={(e) => setNewTodo(e.target.value)}
                  value={newTodo}
                  placeholder="Add a new task"
                  className="border-2 border-slate-300 rounded-md px-6 py-4 w-full focus:outline-none text-slate-500 font-thin font-serif text-xl -tracking-tighter"
                />
                <button
                  type="submit"
                  disabled={!newTodo.trim()}
                  className="bg-blue-600 disabled:opacity-50 px-3 py-2 rounded-md text-white disabled:cursor-not-allowed  duration-300 hover:bg-blue-500 hover:font-bold font-semibold hover:text-green-300  transition-colors"
                >
                  Add
                </button>
              </form>
            </div>
          </div>

          {TodoList.length === 0 && (
            <p className="text-slate-400 font-thin text-xl font-sans">
              No tasks yet. Add one above!
            </p>
          )}

          {/* map */}
          {TodoList.map((list) => (
            <div key={list.id} className="w-full">
              {EditId === list.id ? (
                <form
                  className="flex justify-center gap-3 mx-6"
                  onSubmit={(e) => handleUpdate(list.id, e)}
                >
                  <input
                    type="text"
                    onChange={(e) => setEditText(e.target.value)}
                    value={EditText}
                    autoFocus
                    className="border-2 border-slate-300 rounded-md focus:outline-none text-slate-500 font-thin font-serif text-xl -tracking-tighter w-full px-3 py-2"
                  />
                  <button
                    type="submit"
                    disabled={!EditText.trim()}
                    className="px-2 py-1 rounded-md bg-green-500 text-white hover:bg-green-300 hover:text-black transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="px-2 py-1 rounded-md bg-gray-400 text-white hover:bg-gray-600 transition-all duration-300"
                  >
                    Cancel
                  </button>
                </form>
              ) : (
                <div className="px-5 py-2 w-full">
                  <div className="flex justify-between items-center gap-3 w-full border border-slate-200 px-4 py-2 rounded-md">
                    <span className="font-sans text-[18px] text-slate-900">
                      {list.Text}
                    </span>
                    <div className="flex gap-2 shrink-0">
                      {/* edit */}
                      <button
                        type="button"
                        className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                        onClick={() => handleEditTodo(list)}
                        aria-label={`Edit task: ${list.Text}`}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                        </svg>
                      </button>
                      {/* delete */}
                      <button
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        onClick={() => handleDeleteTodo(list.id)}
                        aria-label={`Delete task: ${list.id}`}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="M3 6h18" />
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
          {/* map end */}
        </div>
      </main>
    </>
  );
}

export default App;
