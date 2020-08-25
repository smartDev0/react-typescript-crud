export interface User {
    username: String,
    email: String,
    dob: any,
    bio: String,
}

export interface Experience {
    id: String,
    from: any,
    to: any,
    company: String,
    position: String,
    description: String,
}

export interface Education {
    id: String,
    from: any,
    to: any,
    type: String,
    institution: String,
    description: String,
}