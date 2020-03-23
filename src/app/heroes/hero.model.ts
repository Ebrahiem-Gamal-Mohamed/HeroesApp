export interface IHero {
    id: number;
    fullName: string;
    powers: string;
    profileImage?: string;
    description?: string;
    rate?: number;
}

export class Hero implements IHero {
    id: number;
    fullName: string;
    powers: string;
    profileImage?: string;
    description?: string;
    rate?: number;

    constructor(id: number = 1, fullName: string, powers: string, profileImage?: string, description?: string, rate?: number) {
        this.fullName = fullName,
            this.powers = powers;
        this.profileImage = profileImage;
        this.description = description;
        this.rate = rate;
    }
}