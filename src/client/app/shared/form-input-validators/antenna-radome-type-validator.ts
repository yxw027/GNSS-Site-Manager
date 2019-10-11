import { FormControl, Validator } from '@angular/forms';

const antennaRadomeTypePattern = /^[A-Z0-9._-]+( [A-Z0-9._-]+)* +[A-Z0-9]{4}$/;

/**
 * A Validator class for antenna and radome type input component.
 */
export class AntennaRadomeTypeValidator implements Validator {

    constructor() { }

    validate(formControl: FormControl): { [key: string]: any } {
        const value: string = formControl.value;
        if (value && value.length > 0) {
            const matches = value.match(antennaRadomeTypePattern);
            return matches && matches.length > 0 ? null: {
                invalid_antenna_radome_type:
                'IGS unrecognized antenna type consists of capital letters, number, ' +
                'underscores (_), hyphens (-), and periods (.), no consecutive spaces. ' +
                'Radome type consists of 4 capital letters or numbers. ' +
                'Separate antenna type and radome type with one or more spaces' };
        }

        return null;
    }
}
