/** DM弹窗数据类型 */
export type DmDialog = {
    dialogVisible: boolean,
    title?: string,
    content?:string,
    showCancel?: boolean,
    cancelText?: string,
    confirmText?: string,
    qa?:Qa
}

export type Qa ={
    user:number[],
    qalist:{
        question:string,
        answer:string
    }[]
}

