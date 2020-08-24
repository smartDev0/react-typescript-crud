import axios from 'axios';
const httpHeaders = { headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') } };

export const meApi = user => {
    return axios.post(`${process.env.REACT_APP_SERVER_API}/saveMe`, {
        username: user.username,
        email: user.email,
        dob: user.dob,
        bio: user.bio,
    }, httpHeaders)
        .then(res => {
            return "Success"
        })
}

export const skillsApi = skills => {
    return axios.post(`${process.env.REACT_APP_SERVER_API}/saveSkills`, {
        skills: skills
    }, httpHeaders)
        .then(res => {
            return "Success"
        })
}

export const experienceApi = experienceData => {
    return axios.post(`${process.env.REACT_APP_SERVER_API}/saveExperience`, {
        experienceData: experienceData
    }, httpHeaders)
        .then(res => {
            return "Success"
        })
}

export const educationApi = educationData => {
    return axios.post(`${process.env.REACT_APP_SERVER_API}/saveEducation`, {
        educationData: educationData
    }, httpHeaders)
        .then(res => {
            return "Success"
        })
}
