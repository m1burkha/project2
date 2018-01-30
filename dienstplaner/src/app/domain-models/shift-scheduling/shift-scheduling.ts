
export interface IShiftScheduling {
    id: string;
    shifts: Date[];
    caption: string;
}

export class ShiftScheduling implements IShiftScheduling {
    id: string;
    shifts: Date[];
    caption: string;

    /**
     * creates a new shift scheduling item
     * @param values arguments (id, shifts, caption)
     */
    constructor(values: any =  null) {
        Object.assign(this, values);
    }
}
