import { ProjectDepartment } from "./ProjectDepartment";

export interface Project {
    logo: string;
    companyId: string;
    projectCategoryId: string;
    contractTypeId: string;
    projectType: number;
    code: string;
    title: string;
    titleEn: string;
    shortTitle: string;
    province: string;
    city: string;
    longitude: string;
    latitude: string;
    startDate: string;
    actualStartDate: string;
    estimatedEndDate: string;
    endDate: string;
    contractType: any;
    projectCategory: any;
    projectDepartments?: ProjectDepartment[];
    id: string;
}


