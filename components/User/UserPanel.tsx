import {useStore} from "@/store";
import {UserForm} from "@/components/User/UserForm";

export const UserPanel = () => {
    const user = useStore((state) => state.user)
    const addUser = useStore((state) => state.addUser)

    if (!user) {
        return (
            <div>
                <p>No user logged in.</p>
                <UserForm onSubmit={(userData) => addUser(userData)} />
            </div>
        )
    }

    return (
        <div>
            <p>Welcome, {user.name}!</p>
            <p>Email: {user.email}</p>
        </div>
    )
}