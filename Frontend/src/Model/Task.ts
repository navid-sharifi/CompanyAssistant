
export interface Task {
    projectDepartmentDisciplineId?: any;
    idcTransitionDetailId?: any;
    taskName?: string;
    taskStatus: TaskToDoStatus;
    notStartedDescription?: string;
    inProgressDescription?: string;
    doneDescription?: string;
    moduleName?: string;
    startDate?: string;
    endDate?: string;
    startTime?: string;
    endTime?: string;
    taskToDoAssignments?: any[];
    projectDepartmentDiscipline?: any;
    idcTransitionDetail?: any;
    id: string;
}

export enum TaskToDoStatus{
    NotStarted = 0,
    Started=1,
    Issued = 2,
    Done=3
}
