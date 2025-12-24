public class RecordDelete {
@AuraEnabled
    public static Boolean publishDeleteEvent(String recordId , String objectType) {
        try {
            Claim_Delete_Request__e evt = new Claim_Delete_Request__e();
            evt.RecordId__c = recordId;
            evt.Type__c = objectType;
             

            Database.SaveResult result = EventBus.publish(evt);

            return result.isSuccess();
        } catch (Exception e) {
            System.debug('Error Publishing Event: ' + e.getMessage());
            return false;
        }
    }
}