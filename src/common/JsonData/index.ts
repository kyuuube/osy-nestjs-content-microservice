export interface ResponseData {
    code: number
    msg: string
    data: any
    time: string
}

export class JsonData {
    static success(data: any): ResponseData {
        const result: ResponseData = {
            code: 200,
            msg: 'success',
            data,
            time: new Date().toLocaleString()
        }
        return result
    }

    static fail(code: number, msg: string) {
        const result: ResponseData = {
            code: 500,
            msg,
            data: undefined,
            time: new Date().toLocaleString()
        }
        return result
    }
}
