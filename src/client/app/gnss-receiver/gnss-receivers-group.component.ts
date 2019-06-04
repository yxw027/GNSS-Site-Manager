import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import * as _ from 'lodash';

import { AbstractGroupComponent } from '../shared/abstract-groups-items/abstract-group.component';
import { GnssReceiverViewModel } from './gnss-receiver-view-model';
import { SiteLogService } from '../shared/site-log/site-log.service';

/**.
 * This class represents a group of GNSS Receivers.
 */
@Component({
    moduleId: module.id,
    selector: 'gnss-receivers-group',
    templateUrl: 'gnss-receivers-group.component.html',
})
export class GnssReceiversGroupComponent extends AbstractGroupComponent<GnssReceiverViewModel> {
    constructor(protected siteLogService: SiteLogService, protected formBuilder: FormBuilder) {
        super(siteLogService, formBuilder);
    }

    getItemName(): string {
        return 'GNSS Receiver';
    }

    getControlName(): string {
        return 'gnssReceivers';
    }

    /* **************************************************
     * Other methods
     */
    getNewItemViewModel(): GnssReceiverViewModel {
        return new GnssReceiverViewModel();
    }

    /**
     * Copy values from the current item to the new item created, and disable key fields if required.
     */
    copyValuesFromCurrentItem(newItemForm: FormGroup, currentItemForm: FormGroup): void {
        let filedsToCopy = ['receiverType', 'manufacturerSerialNumber', 'firmwareVersion',
                            'satelliteSystems', 'elevationCutoffSetting', 'temperatureStabilization'];
        let valuesToCopy = _.pick(currentItemForm.getRawValue(), filedsToCopy);
        newItemForm.patchValue(_.cloneDeep(valuesToCopy));

        // Disable of the two fileds must be after patchValue() completed, so need the 2nd setTimeout
        setTimeout(() => {
            newItemForm.controls.receiverType.disable();
            newItemForm.controls.manufacturerSerialNumber.disable();
        });
    }
}
