type User = {
    readonly id?: string,
    email: string,
    password?: string,
    role?: 'university admin'|'faculty admin'|'professor'|'teaching assistant'|'student',
}
export default User;
