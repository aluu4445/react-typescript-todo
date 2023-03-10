import React from "react";

type FilterButtonProps = {
    name: string,
    toggleTaskFilter: (filterStatus: string) => void,
}

export default function FilterButton(props: FilterButtonProps) {
    return (
        <button 
            type="button" 
            className="btn toggle-btn" 
            aria-pressed="true"
            onClick={() => props.toggleTaskFilter(props.name)}
        >
            <span className="visually-hidden">Show </span>
            <span>{props.name}</span>
            <span className="visually-hidden"> tasks</span>
        </button>
    );

}