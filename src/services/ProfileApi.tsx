import axios from 'axios';
import * as interfaces from '../constants/interface';

const httpHeaders = { headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') } };


export const meApi = (user: interfaces.User) => {
    const name = `me`;
    localStorage.removeItem(name);
    localStorage.setItem(name, JSON.stringify(user));
}

export const skillsApi = (skillsData: any) => {
    const name = `skills`;
    localStorage.removeItem(name);
    localStorage.setItem(name, JSON.stringify(skillsData));

    return skillsData;
}

export const addExperienceApi = (experienceData: interfaces.Experience) => {
    const name = `experiences`;
    let experiences = JSON.parse(localStorage.getItem(name) || '{}');
    experiences = Array.isArray(experiences) ? experiences : [];

    experiences.push(experienceData);
    localStorage.setItem(name, JSON.stringify(experiences));

    return experiences;
}

export const deleteExperienceApi = (id: String) => {

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
}

export const editExperienceApi = (id: String) => {

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
}

export const updateExperienceApi = (experienceData: interfaces.Experience) => {

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
}

export const addEducationApi = (educationData: interfaces.Education) => {

    const name = `educations`;
    let educations = JSON.parse(localStorage.getItem(name) || '{}');
    educations = Array.isArray(educations) ? educations : [];

    educations.push(educationData);
    localStorage.setItem(name, JSON.stringify(educations));

    return educations;
}

export const deleteEducationApi = (id: String) => {

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
}

export const editEducationApi = (id: String) => {

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
}

export const updateEducationApi = (educationData: interfaces.Education) => {

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
}

export const wholeSaveApi = () => {
    let me = JSON.parse(localStorage.getItem('me') || '{}');
    let experiences = JSON.parse(localStorage.getItem('experiences') || '{}');
    experiences = Array.isArray(experiences) ? experiences : [];
    let educations = JSON.parse(localStorage.getItem('educations') || '{}');
    educations = Array.isArray(educations) ? educations : [];
    let skills = JSON.parse(localStorage.getItem('skills') || '{}');
    skills = Array.isArray(skills) ? skills : [];
    let StringSkills = [];
    for(var i=0; i<skills.length; i++) {
        StringSkills.push(skills[i].value)
    }
    console.log(StringSkills);
    let wholeData = null;
    wholeData =
    {
        "fullName": me.username,
        "dateOfBirth": me.dob,
        "uid": me.id,
        "email": me.email,
        "bio": me.bio,
        "experience": experiences,
        "educations": educations,
        "skills": StringSkills
    }
    return axios.post(`${process.env.REACT_APP_SERVER_API}/wholeSave`, {
        wholeData: wholeData
    }, httpHeaders)
        .then(res => {
            return "Success"
        })
}