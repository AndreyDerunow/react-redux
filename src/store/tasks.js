import { createSlice } from "@reduxjs/toolkit";
import todosService from "../services/todos.service";
import { setError } from "./errors";
const initialState = { entities: [], isLoading: true };

const taskSlice = createSlice({
    name: "task",
    initialState,
    reducers: {
        create(state, action) {
            state.entities.unshift(action.payload);
        },
        recived(state, action) {
            state.entities = action.payload;
            state.isLoading = false;
        },
        update(state, action) {
            const elIndex = state.entities.findIndex(
                (el) => el.id === action.payload.id
            );
            state.entities[elIndex] = {
                ...state.entities[elIndex],
                ...action.payload
            };
        },
        remove(state, action) {
            state.entities = state.entities.filter(
                (el) => el.id !== action.payload.id
            );
        },
        taskRequested(state) {
            state.isLoading = true;
        },
        taskRequestFailed(state, action) {
            state.isLoading = false;
        }
    }
});
const { actions, reducer: taskReducer } = taskSlice;
const { update, remove, create, recived, taskRequested, taskRequestFailed } =
    actions;

export const loadTasks = () => async (dispatch) => {
    dispatch(taskRequested());
    try {
        const data = await todosService.fetch();
        dispatch(recived(data));
    } catch (error) {
        dispatch(taskRequestFailed());
        dispatch(setError(error.message));
    }
};

export const taskCreated = (payload) => async (dispatch, getState) => {
    const { task } = getState();
    try {
        const data = await todosService.createTodo(payload);
        const adaptedData = { ...data, id: task.entities.length + 1 };
        dispatch(create(adaptedData));
    } catch (error) {
        dispatch(taskRequestFailed());
        dispatch(setError(error.message));
    }
};

export const completeTask = (id) => (dispatch) => {
    dispatch(update({ id: id, completed: true }));
};

export function titleChanged(id) {
    return update({ id: id, title: `New title for ${id}` });
}

export function taskDeleted(id) {
    return remove({ id });
}

export const getTasks = () => (state) => state.task.entities;
export const getTasksLoadingStatus = () => (state) => state.task.isLoading;

export default taskReducer;
