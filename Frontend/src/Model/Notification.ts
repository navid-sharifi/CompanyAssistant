
export default interface Notification {
    taskToDoId: string;
    personId: string;
    receiverMobileNumber: string;
    receiverEmailAddress: string;
    notificationType: NotificationType;
    identificationKey: string;
    content: string;
    subject: string;
    sattus: SendingStatus;
    sendingDate?: string;
    trackingCode?: string;
    errorMessage?: any;
    errorDescription?: any;
    tryCount?: number;
    lastSent?: any;
    creationTime?: string;
    person?: any;
    id: string;
    taskToDoAssignmentId?: string;
    taskId?: string;
    taskName?: string;
    taskStatus?: number;
    personName?: string;
    personFamilly?: string;
    taskToDoAssignment?: any;
   
}

enum SendingStatus {
    InvalidReciever = -2,
    Failed = -1,
    WaitForSending = 0,
    SentSuccessfully = 1
}
enum NotificationType {
    SMS = 1,
    Push = 2,
    Email = 3
}





