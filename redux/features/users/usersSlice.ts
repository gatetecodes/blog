import { createSlice } from "@reduxjs/toolkit";

interface IUser {
    id: string;
    name: string;
}
interface RootState {
    users: IUser[];
}
const initialState = [
    { id: "0", name: "Dude Lebowski " },
    { id: "1", name: "Walter Sobchak" },
    { id: "2", name: "Donny Kerabatsos" },
] as IUser[];

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {},
});

export const selectAllUsers = (state: RootState) => state.users;

export default usersSlice.reducer;
