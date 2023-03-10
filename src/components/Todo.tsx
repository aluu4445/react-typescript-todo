import React from "react";

type TodoProps = {
  name: string, 
  completed?: boolean, 
  id: string,
  toggleTaskCompleted: (id: string) => void,
  deleteTask: (id: string) => void,
  editTask: (id: string, newName: string) => void,
}

export default function Todo(props: TodoProps) {

  const [isEditing, setEditing] = React.useState(false);
  const [editInput, setEditInput] = React.useState('');

  function handleEditSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    props.editTask(props.id, editInput)
    setEditInput('');
    setEditing(false);
  }

  const editingTemplate = (
    <form className="stack-small" onSubmit={handleEditSubmit}>
      <div className="form-group">
        <label className="todo-label" htmlFor={props.id}>
          New name for {props.name}
        </label>
        <input 
          id={props.id} 
          className="todo-text" 
          type="text" 
          value={editInput}
          onChange={(e) => setEditInput(e.target.value)}
        />
      </div>
      <div className="btn-group">
        <button type="button" className="btn todo-cancel" onClick={() => setEditing(false)}>
          Cancel
          <span className="visually-hidden">renaming {props.name}</span>
        </button>
        <button type="submit" className="btn btn__primary todo-edit">
          Save
          <span className="visually-hidden">new name for {props.name}</span>
        </button>
      </div>
    </form>
  );

  const viewTemplate = (
    <div className="stack-small">
      <div className="c-cb">
          <input
            id={props.id}
            type="checkbox"
            defaultChecked={props.completed}
            onChange={() => props.toggleTaskCompleted(props.id)}
          />
          <label className="todo-label" htmlFor={props.id}>
            {props.name}
          </label>
        </div>
        <div className="btn-group">
          <button 
            type="button" 
            className="btn" 
            onClick={() => setEditing(true)}
          >
            Edit <span className="visually-hidden">{props.name}</span>
          </button>
          <button
            type="button"
            className="btn btn__danger"
            onClick={() => props.deleteTask(props.id)}
          >
            Delete <span className="visually-hidden">{props.name}</span>
          </button>
        </div>
    </div>
  );

  return <li className="todo">{isEditing ? editingTemplate : viewTemplate}</li>;

}