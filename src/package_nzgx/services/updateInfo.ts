import { http } from '@/package_nzgx/utils/https'
type InfoType = {
    game_id: number
    stage_number: number
    name: string
    description: string
    status: string
    creator: string
    tenant_id: number
}
const info:InfoType = {
    game_id: 1,
    stage_number: 1,
    name: "clue",
    description: "This is the first stage.",
    status: "not_started",
    creator: "admin",
    tenant_id: 123
}
type updateInfoType = {
    name: string
    description: string
    status: string
    updater: string
}
const updateInfo:updateInfoType = {
    name: "Stage 12",
    description: "Updated description for the stage.1112",
    status: "in_progress",
    updater: "admin"
  }
/**
 * 储存游戏结构
 * @param data 请求参数
 */
export const postInfo = (description: any) => {
    info.description = description
    return http({
        method: 'POST',
        url: '/api/game-stages',
        data: info,
    })
}
/**
 * 根据id查询游戏结构
 * @param data 请求参数
 */
export const getInfoById = (id: number) => {
    return http({
        method: 'GET',
        url: '/api/game-stages/' + id
    })
}
/**
 * 更新游戏结构or线索信息
 * @param data 请求参数
 */
export const updateInfoById = (id: number,name:string,description: any) => {
    updateInfo.description = JSON.stringify(description)
    updateInfo.name = name
    return http({
        method: 'PUT',
        url: '/api/game-stages/' + id,
        data:updateInfo
    })
}
