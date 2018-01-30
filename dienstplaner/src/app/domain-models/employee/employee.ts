/**
 * interface of an employee
 */
export interface IEmployee {
    /** id */
    id: string;
    /** caption */
    caption: string;
    /** department */
    department: string;
    /** week hours */
    weekHours: number;
    /** work load in percent */
    workLoad: number;
    /** vacation days */
    vacationDays: number;
}

/**
 * class of an employee
 */
export class Employee implements IEmployee {
    /** id */
    id: string;
    /** caption */
    caption: string;
    /** department */
    department: string;
    /** week hours */
    weekHours: number;
    /** work load in percent */
    workLoad: number;
    /** vacation days */
    vacationDays: number;

    /**
     * creates a new employee
     * @param values values (id, caption, department, weekHours, workLoad, vacationDays)
     */
    constructor(values: any = null) {
        this.id = '';
        Object.assign(this, values);
    }
}