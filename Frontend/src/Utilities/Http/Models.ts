export interface HttpResponseListModel<T> {
    isSuccess: boolean
    message: string,
    statusCode : number,
    data: Result<T>
}

export interface HttpResponseModel<T> {
    isSuccess: boolean
    message: string,
    statusCode : number,
    data: T
}


interface Result<T> {
    totalCount: number
    items: T
}
