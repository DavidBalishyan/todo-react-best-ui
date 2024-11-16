import React, { useState } from "react";
//no css, using bulmacss for styling
document.title = "Todo app in reactjs";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [newTodo, setNewTodo] = useState("");
  const todosPerPage = 5;

  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos([...todos, newTodo]);
      setNewTodo("");
    }
  };

  // Pagination
  const indexOfLastTodo = currentPage * todosPerPage;
  const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
  const currentTodos = todos.slice(indexOfFirstTodo, indexOfLastTodo);

  const totalPages = Math.ceil(todos.length / todosPerPage);

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="section">
      <div className="container">
        <h1 className="title has-text-centered is-3 mb-6">Todo app in react js</h1>
        <div className="box">
          <div className="field is-grouped">
            <div className="control is-expanded">
              <input
                className="input"
                type="text"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                placeholder="Add a new task..."
              />
            </div>
            <div className="control">
              <button onClick={addTodo} className="button is-primary">
                Add
              </button>
            </div>
          </div>

          <ul className="list is-hoverable">
            {currentTodos.map((todo, index) => (
              <li
                key={index + indexOfFirstTodo}
                className="list-item box mb-3"
              >
                <div className="level">
                  <span className="level-left">{todo}</span>
                  <button
                    className="level-right button is-danger is-light is-small"
                    onClick={() =>
                      setTodos(todos.filter((_, i) => i !== index + indexOfFirstTodo))
                    }
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
            {currentTodos.length === 0 && (
              <li className="has-text-grey-light has-text-centered">
                Nothing to do, it looks like you are free!
              </li>
            )}
          </ul>
          {todos.length > 0 && (
            <nav
              className="pagination is-centered mt-4"
              role="navigation"
              aria-label="pagination"
            >
              <button
                onClick={handlePrevious}
                className="pagination-previous"
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <button
                onClick={handleNext}
                className="pagination-next"
                disabled={currentPage === totalPages}
              >
                Next
              </button>
              <ul className="pagination-list">
                {Array.from({ length: totalPages }, (_, i) => (
                  <li key={i}>
                    <button
                      className={`pagination-link ${
                        currentPage === i + 1 ? "is-current" : ""
                      }`}
                      onClick={() => setCurrentPage(i + 1)}
                    >
                      {i + 1}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;