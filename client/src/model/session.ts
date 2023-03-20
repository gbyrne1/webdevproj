
import { reactive } from "vue";

const session = reactive({
    user: null as User | null,
})

interface User {
    firstname: string;
    lastname?: string;
    email?: string;
    handle?: string;
    photo?: string;
    isAdmin?: boolean;
}

export function useSession() {
    return session;
}

export function login() {
    session.user = {
        firstname: "John Doe",
    }
}



