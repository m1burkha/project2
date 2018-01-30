export interface IEmployee {
    id: string;
    caption: string;
    department: string;
    weekHours: number;
    workLoad: number;
    vacationDays: number;
}

export class Employee implements IEmployee {
    id: string;
    caption: string;
    department: string;
    weekHours: number;
    workLoad: number;
    vacationDays: number;

    constructor(values: any = null) {
        this.id = '';
        Object.assign(this, values);
    }
}