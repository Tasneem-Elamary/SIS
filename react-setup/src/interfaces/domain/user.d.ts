interface User {
    name?: string;
    email: string;
    role?: 'university admin'|'faculty admin'|'professor'|'teaching assistant'|'student',
}

export default User;
