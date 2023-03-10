import { taskUpdated } from "./actionTypes";

export function taskReducer(state = [], action) {
    switch (action.type) {
        case taskUpdated: {
            const newArray = [...state];
            const elIndex = newArray.findIndex(
                (el) => el.id === action.payload.id
            );
            newArray[elIndex] = { ...newArray[elIndex], ...action.payload };
            return newArray;
        }

        default:
            return state;
    }
}
