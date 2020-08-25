import axios from 'axios';
import * as interfaces from '../constants/interface';

const httpHeaders = { headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') } };


export const meApi = (user: interfaces.User) => {
    console.log(httpHeaders);
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

export const skillsApi = (skills: Array<String>) => {
    return axios.post(`${process.env.REACT_APP_SERVER_API}/saveSkills`, {
        skills: skills
    }, httpHeaders)
        .then(res => {
            return "Success"
        })
}

export const addExperienceApi = (experienceData: interfaces.Experience) => {
    // Below code is being used with localStorage
    const name = `experiences`;
    let experiences = JSON.parse(localStorage.getItem(name) || '{}');
    experiences = Array.isArray(experiences) ? experiences : [];

    experiences.push(experienceData);
    localStorage.setItem(name, JSON.stringify(experiences));

    return experiences;

    // Below code will be used with real backend
    // return axios.post(`${process.env.REACT_APP_SERVER_API}/addExperience`, {
    //     experienceData: experienceData
    // }, httpHeaders)
    //     .then(res => {
    //         return "Success"
    //     })
}

export const deleteExperienceApi = (id: String) => {

    // Below code is being used with localStorage
    const name = `experiences`;
    let experiences = JSON.parse(localStorage.getItem(name) || '{}');
    experiences = Array.isArray(experiences) ? experiences : [];
    for (var i = 0; i < experiences.length; i++) {
        if (experiences[i].id === id) {
            experiences.splice(i, 1);
        }
    }

    localStorage.setItem(name, JSON.stringify(experiences));

    return experiences;

    // Below code will be used with real backend
    // return axios.post(`${process.env.REACT_APP_SERVER_API}/deleteExperienc`, {
    //     id: id
    // }, httpHeaders)
    //     .then(res => {
    //         return "Success"
    //     })
}

export const editExperienceApi = (id: String) => {

    // Below code is being used with localStorage
    let element = null;
    const name = `experiences`;
    let experiences = JSON.parse(localStorage.getItem(name) || '{}');
    experiences = Array.isArray(experiences) ? experiences : [];
    for (var i = 0; i < experiences.length; i++) {
        if (experiences[i].id === id) {
            element = experiences[i];
        }
    }

    return element;

    // Below code will be used with real backend
    // return axios.get(`${process.env.REACT_APP_SERVER_API}/editExperience/${id}`, httpHeaders)
    //     .then(res => {
    //         return "Success"
    //     })
}

export const updateExperienceApi = (experienceData: interfaces.Experience) => {

    // Below code is being used with localStorage
    const name = `experiences`;
    let experiences = JSON.parse(localStorage.getItem(name) || '{}');
    experiences = Array.isArray(experiences) ? experiences : [];
    for (var i = 0; i < experiences.length; i++) {
        if (experiences[i].id === experienceData.id) {
            experiences[i].from = experienceData.from;
            experiences[i].to = experienceData.to;
            experiences[i].company = experienceData.company;
            experiences[i].position = experienceData.position;
            experiences[i].description = experienceData.description;
        }
    }
    localStorage.setItem(name, JSON.stringify(experiences));

    return experiences;

    // Below code will be used with real backend
    // return axios.put(`${process.env.REACT_APP_SERVER_API}/updateExperience`, {
    //     experienceData: experienceData
    // }, httpHeaders)
    //     .then(res => {
    //         return "Success"
    //     })
}

export const addEducationApi = (educationData: interfaces.Education) => {

    // Below code is being used with localStorage
    const name = `educations`;
    let educations = JSON.parse(localStorage.getItem(name) || '{}');
    educations = Array.isArray(educations) ? educations : [];

    educations.push(educationData);
    localStorage.setItem(name, JSON.stringify(educations));

    return educations;

    // Below code will be used with real backend
    // return axios.post(`${process.env.REACT_APP_SERVER_API}/addEducation`, {
    //     educationData: educationData
    // }, httpHeaders)
    //     .then(res => {
    //         return "Success"
    //     })
}

export const deleteEducationApi = (id: String) => {

    // Below code is being used with localStorage
    const name = `educations`;
    let educations = JSON.parse(localStorage.getItem(name) || '{}');
    educations = Array.isArray(educations) ? educations : [];
    for (var i = 0; i < educations.length; i++) {
        if (educations[i].id === id) {
            educations.splice(i, 1);
        }
    }

    localStorage.setItem(name, JSON.stringify(educations));

    return educations;

    // Below code will be used with real backend
    // return axios.post(`${process.env.REACT_APP_SERVER_API}/deleteEducation`, {
    //     id: id
    // }, httpHeaders)
    //     .then(res => {
    //         return "Success"
    //     })
}

export const editEducationApi = (id: String) => {

    // Below code is being used with localStorage
    let element = null;
    const name = `educations`;
    let educations = JSON.parse(localStorage.getItem(name) || '{}');
    educations = Array.isArray(educations) ? educations : [];
    for (var i = 0; i < educations.length; i++) {
        if (educations[i].id === id) {
            element = educations[i];
        }
    }

    return element;

    // Below code will be used with real backend
    // return axios.get(`${process.env.REACT_APP_SERVER_API}/editEducation/${id}`, httpHeaders)
    //     .then(res => {
    //         return "Success"
    //     })
}

export const updateEducationApi = (educationData: interfaces.Education) => {

    // Below code is being used with localStorage
    const name = `educations`;
    let educations = JSON.parse(localStorage.getItem(name) || '{}');
    educations = Array.isArray(educations) ? educations : [];
    for (var i = 0; i < educations.length; i++) {
        if (educations[i].id === educationData.id) {
            educations[i].from = educationData.from;
            educations[i].to = educationData.to;
            educations[i].type = educationData.type;
            educations[i].institution = educationData.institution;
            educations[i].description = educationData.description;
        }
    }
    localStorage.setItem(name, JSON.stringify(educations));

    return educations;

    // Below code will be used with real backend
    // return axios.put(`${process.env.REACT_APP_SERVER_API}/updateEducation`, {
    //     educationData: educationData
    // }, httpHeaders)
    //     .then(res => {
    //         return "Success"
    //     })
}