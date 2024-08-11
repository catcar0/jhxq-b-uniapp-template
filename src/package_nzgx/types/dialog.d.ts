/** DM弹窗数据类型 */
export type DmDialog = {
    dialogVisible: boolean,
    title?: string,
    content?:string,
    location?:string
    type?:string,
    showCancel?: boolean,
    cancelText?: string,
    confirmText?: string,
    qa?:Qa,
    hideCloseIcon?:boolean
    userIndex?:number
    deepclue?:string
    clue?:string
}

export type Qa ={
    user:number[],
    qalist:{
        question:string,
        answer:string
    }[]
}

