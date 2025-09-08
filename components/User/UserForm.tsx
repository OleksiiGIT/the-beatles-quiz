import { UserType } from "@/store";
import {FormEvent, useState} from "react";

type UserFormProps = {
    onSubmit: (user: UserType) => void;
}

export const UserForm = ({ onSubmit }: UserFormProps) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [touched, setTouched] = useState({ name: false, email: false });

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isNameValid = name.trim() !== "";
    const isEmailValid = emailRegex.test(email);
    const isFormValid = isNameValid && isEmailValid;

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (isFormValid) {
            onSubmit({ name, email });
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="name">Name</label>
                <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    onBlur={() => setTouched(t => ({ ...t, name: true }))}
                />
                {!isNameValid && touched.name && (
                    <span style={{ color: "red" }}>Name is required</span>
                )}
            </div>
            <div>
                <label htmlFor="email">Email</label>
                <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    onBlur={() => setTouched(t => ({ ...t, email: true }))}
                />
                {!isEmailValid && touched.email && (
                    <span style={{ color: "red" }}>Invalid email address</span>
                )}
            </div>
            <button type="submit" disabled={!isFormValid}>Submit</button>
        </form>
    );
}