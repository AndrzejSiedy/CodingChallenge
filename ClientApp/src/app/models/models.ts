export interface InmateLocation {
    dateTime: Date;
    location: string;
}

export interface Inmate {
    id: number;
    title: string;
    name: string;
    gender: string;
    nationality: string;
    dob: Date;
    cellNumber: number;
    intakeDateTime: Date;
    currentLocation: string;
    locationHistory: InmateLocation[];
    imgUrl: string;
}

export enum Gender {
    Male,
    Female
}

export enum Title {
    Mr,
    Mrs,
    Miss,
    Ms
}

export enum Nationality {
    GB,
    US,
    DK,
    FR
}

export interface Name {
    title: Title;
    first: string;
    last: string;
}

export interface DOB {
    date: Date;
    age: number;
}

export interface Picture {
    large: string;
    medium: string;
    thumbnail: string;
}

export interface User {
    id: number;
    name: Name;
    gender: Gender;
    nationality: Nationality;
    dob: DOB;
    email: string;
    picture: Picture;
}

export interface ServiceResponse<T> {
    total: number;
    data: T;
    error?: string;
}

export interface Lov {
    id: number;
    value: string;
}

export interface ViewConfig {
    nationalities: Lov[];
    title: Lov[];
    gender: Lov[];
}


export interface IKeyVal<T> {
    key: string;
    val: T;
}
