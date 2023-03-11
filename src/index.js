import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import * as actions from "./store/actions";
import { initiateStore } from "./store/store";

const store = initiateStore();

const App = () => {
    const [state, setState] = useState(store.getState());
    useEffect(() => {
        store.subscribe(() => {
            setState(store.getState());
        });
    }, []);
    const completeTask = (elId) => {
        store.dispatch(actions.taskCompleted(elId));
    };
    const changeTitle = (elId) => {
        store.dispatch(actions.titleChanged(elId));
    };
    const deleteTask = (elId) => {
        store.dispatch(actions.taskDeleted(elId));
    };
    return (
        <>
            <h1>App</h1>

            <ul>
                {state.map((el) => (
                    <li key={el.id}>
                        <p>{el.title}</p>
                        <p>{el.completed ? "completed" : "not done"}</p>
                        <button onClick={() => completeTask(el.id)}>
                            Complete
                        </button>
                        <button onClick={() => changeTitle(el.id)}>
                            Change Title
                        </button>
                        <button onClick={() => deleteTask(el.id)}>
                            Delete
                        </button>
                        <hr></hr>
                    </li>
                ))}
            </ul>
        </>
    );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
