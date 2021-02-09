// функция для сохранения объектов в память браузера
export function saveState<T>(key: string, state: T) {
    const stateAsString = JSON.stringify(state);
    localStorage.setItem(key, stateAsString)
}

// функция для получения сохранённого объекта в памяти браузера:
export function restoreState<T>(key: string, defaultState: T) {
    const stateAsString = localStorage.getItem(key);
    if (stateAsString !== null) defaultState = JSON.parse(stateAsString) as T;
    return defaultState;
}

// ---------------------------------------------------------------------------------------------------------------
// использование:
// type StateType = {
//     x: string
//     y: number
// }
//
// // сохраняем объект типа StateType в ячейке "test"
// saveState<StateType>("test", {x: "A", y: 1});
//
// // получем в переменную state объект из ячейки "test" или дэфолтный объект если ячейка пуста
// const state: StateType = restoreState<StateType>("test", {x: "", y: 0});

export const PERS_AREA_ADMIN_TOKEN = 'pers-area-admin-token'
