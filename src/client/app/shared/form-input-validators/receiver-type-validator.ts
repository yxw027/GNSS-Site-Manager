import { FormControl, Validator } from '@angular/forms';
import { GeodesyMLCodelistService } from '../geodesyml-codelist/geodesyml-codelist.service';

const receiverTypePattern = /^[A-Z0-9._-]+( [A-Z0-9._-]+)*$/;

/**
 * A Validator class for receiver type input component.
 */
export class ReceiverTypeValidator implements Validator {

    constructor(private geodesyMLCodelistService: GeodesyMLCodelistService) { }

    validate(formControl: FormControl): { [key: string]: any } {
        const value: string = formControl.value;
        if (value && value.length > 0) {
            const matches = value.match(receiverTypePattern);
            if (matches && matches.length > 0) {
                const codeList: string[] = this.geodesyMLCodelistService.getReceiverCodes();
                const index = codeList.indexOf(value);
                return index >= 0 ? null : {
                    invalid_receiver_type:
                        '"' + value + '" is not an IGS recognized receiver type.' };
            } else {
                return {
                    invalid_receiver_type:
                        'IGS unrecognized receiver type consists of capital letters, number, ' +
                        'underscores (_), hyphens (-), and periods (.), no consecutive spaces.' };
            }
        }

        return null;
    }
}
