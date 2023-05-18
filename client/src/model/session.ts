import { useRouter } from "vue-router";
import { reactive } from "vue";
import * as myFetch from "./myFetch";
import type { DataEnvelope, DataListEnvelope } from "./myFetch";



const session = reactive({
    user: null as User | null,
    isLoading: false,
    messages: [] as {
        msg: string,
        type: "success" | "error" | "warning" | "info",
    }[],
})

export interface User {
    id: number;
    _id?: string;
    firstname: string;
    lastname: string;
    email: string;
    handle: string;
    photo?: string;
    token?: string;
    isAdmin?: boolean;
}




export function useSession() {
    return session;
}
/*
export function login(email: string,password: string): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
        try {
            const response = await api("users/login", {
                "email": email,
                "password": password
            });
    
            session.user = response.data.user;
            if(!session.user) {
                console.log("User not found", "error");
                return reject("User not found");
            }
            session.user.token = response.data.token;
            const router = useRouter();
            router.push(session.redirectUrl ?? "/");
            session.redirectUrl = null;
            resolve();
        } catch (error) {
            console.error("Error in login function: ", error);
            reject(error);
        }
    });
}
*/

export function login(email: string, password: string) {
    return async function () {
      try {
        const response = await api("users/login", {
            "email": email,
            "password": password
        });
  
        session.user = response.data.user;
        if (!session.user) {
          console.log("User not found", "error");
          return;
        }
        session.user.token = response.data.token;
      } catch (error) {
        console.error("Error in login function: ", error);
        throw error;
      }
    };
  }

  export function deleteuser(id: number): Promise<void> {
 
    return api(`users/${id}`, {}, "DELETE")
      .then(response => {
        const { data, isSuccess } = response;
        if (isSuccess) {
          session.messages.push({
            msg: "User deleted successfully!",
            type: "success",
          });
        } else {
          session.messages.push({
            msg: "Failed to delete User.",
            type: "error",
          });
        }
      })
      .catch(error => {
        console.error("Error in deleteuser function: ", error);
        session.messages.push({
          msg: error.message ?? JSON.stringify(error),
          type: "error",
        });
        throw error;
      });
  }

    export function api(url: string, data?: any, method?: string, headers?: any) {
        session.isLoading = true;

        if(session.user?.token){
            headers = {
                "Authorization": `Bearer ${session.user.token}`,
                ...headers,
            }
        }    
        return myFetch.api(url, data, method, headers)
            .catch(err => {
                console.error({err});
                session.messages.push({
                    msg: err.message  ?? JSON.stringify(err),
                    type: "error",
                })
            })
            .finally(() => {
                session.isLoading = false;
            })
    }
    

    export function getuser(id: number): Promise<DataEnvelope<User>> {

        return api(`users/${id}`)
    
    }

    export function getusers(): Promise<DataListEnvelope<User>> {

        return api(`users/`)
        .then(response => {
            const { data, total } = response;
            return { data, total, isSuccess: true };
          });
    }

    export function adduser(user: User): Promise<void> {
        return api("users/", user, "POST")
          .then(response => {
            const { data, isSuccess } = response;
            if (isSuccess) {
              session.messages.push({
                msg: "User added successfully!",
                type: "success",
              });
            } else {
              session.messages.push({
                msg: "Failed to add user.",
                type: "error",
              });
            }
          })
          .catch(error => {
            console.error("Error in adduser function: ", error);
            session.messages.push({
              msg: error.message ?? JSON.stringify(error),
              type: "error",
            });
            throw error;
          });
      }

    export function searchuser(q: string): Promise<DataEnvelope<User>> {

        return api(`users/search/${q}`)
    
    }


    export function useLogout() {
        const router = useRouter();  
         return function(){
            console.log({router});
            session.user = null;
    
            router.push("/login");
        }
    }