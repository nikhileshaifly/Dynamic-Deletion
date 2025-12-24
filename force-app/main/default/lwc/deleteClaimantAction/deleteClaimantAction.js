import { LightningElement, api } from 'lwc';
import publishDeleteEvent from '@salesforce/apex/RecordDelete.publishDeleteEvent';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { CloseActionScreenEvent } from 'lightning/actions';

export default class deleteClaimantAction extends LightningElement {
    @api recordId; 
    @api objectApiName; 

    handleDelete() {
        if (!this.recordId || !this.objectApiName) {
            this.showToast('Error', 'Missing record ID or object type.', 'error');
            return;
        }

        publishDeleteEvent({ recordId: this.recordId, objectType: this.objectApiName }) 
            .then(result => {
                if (result) {
                    this.showToast('Success', 'Deletion event published successfully.', 'success');
                } else {
                    this.showToast('Error', 'Failed to publish deletion event.', 'error');
                }
                this.closeQuickAction();
            })
            .catch(error => {
                let errorMessage = error?.body?.message || 'Unknown error occurred.';
                this.showToast('Error', 'Error occurred: ' + errorMessage, 'error');
                this.closeQuickAction();
            });
    }

    handleClose() {
        this.closeQuickAction();
    }

    closeQuickAction() {
        this.dispatchEvent(new CloseActionScreenEvent());
    }

    showToast(title, message, variant) {
        this.dispatchEvent(new ShowToastEvent({ title, message, variant }));
    }
}