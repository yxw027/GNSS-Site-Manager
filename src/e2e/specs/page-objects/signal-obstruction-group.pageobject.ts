import { by, ElementFinder } from 'protractor';
import { LogItemGroup } from './log-item-group.pageobject';

export class SignalObstructionGroup extends LogItemGroup {

    readonly possibleProblemSourceInput: ElementFinder = this.newItemContainer
                    .element(by.css('text-input[controlName="possibleProblemSource"]'));
    readonly notesInput: ElementFinder = this.newItemContainer
                    .element(by.css('textarea-input[controlName="notes"]'));

    public constructor() {
        super('Signal Obstruction');
    }

    public getAllInputFields(): ElementFinder[] {
        return [
            this.possibleProblemSourceInput,
            this.notesInput,
        ];
    }
}
