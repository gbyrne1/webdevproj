import userdata from "../data/users.json";
import { reactive } from "vue";

const session = reactive({
    user: null as User | null,
})

interface User {
    id: number;
    firstname: string;
    lastname?: string;
    email?: string;
    handle?: string;
    photo?: string;
    isAdmin?: boolean;
}

export function getUsers():User[]{
    return userdata.users;
}

export function useSession() {
    return session;
}

export function login(User: User) {
    session.user = User;
    }




