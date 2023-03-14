import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import {
    titleChanged,
    taskDeleted,
    completeTask,
    getTasks,
    loadTasks,
    taskCreated,
    getTasksLoadingStatus
} from "./store/tasks";
import configureStore from "./store/store";
import { Provider, useDispatch, useSelector } from "react-redux";
import { getError } from "./store/errors";

const store = configureStore();

const App = () => {
    const state = useSelector(getTasks());
    const isLoading = useSelector(getTasksLoadingStatus());
    const error = useSelector(getError());
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(loadTasks());
    }, [dispatch]);
    const addTask = () => {
        const userId = state[0].userId;
        const id = state.length + 1;
        dispatch(
            taskCreated({ userId, title: `New task №${id}`, completed: false })
        );
    };
    const changeTitle = (elId) => {
        dispatch(titleChanged(elId));
    };
    const deleteTask = (elId) => {
        dispatch(taskDeleted(elId));
    };
    if (isLoading) {
        return <h1>Loading...</h1>;
    }
    if (error) {
        return <h1>{error}</h1>;
    }
    return (
        <>
            <h1>App</h1>
            <button onClick={addTask}>Add task</button>
            <ul>
                {state.map((el) => (
                    <li key={el.id}>
                        <p>{el.title}</p>
                        <p>{el.completed ? "completed" : "not done"}</p>
                        <button onClick={() => dispatch(completeTask(el.id))}>
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
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>
);
