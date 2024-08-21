type User = {
    readonly id?: number,
    email: string,
    password: string,
    role: 'university admin'|'faculty admin'|'professor'|'teaching ass',
}
export default User;
