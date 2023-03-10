import React from "react";

type FormProps = {
    addTask: (taskName: string) => void,  
}

export default function Form(props: FormProps) {

    const [inputText, setInputText] = React.useState('');

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        if (!inputText) return;
        e.preventDefault();
        props.addTask(inputText);
        setInputText('');
    }

    return (
        <form onSubmit={handleSubmit}>
        <h2 className="label-wrapper">
          <label htmlFor="new-todo-input" className="label__lg">
            What needs to be done?
          </label>
        </h2>
        <input
          type="text"
          id="new-todo-input"
          className="input input__lg"
          name="text"
          autoComplete="off"
          onChange={(e) => setInputText(e.target.value)}
          value={inputText}
        />
        <button type="submit" className="btn btn__primary btn__lg">
          Add
        </button>
      </form>
    );
}