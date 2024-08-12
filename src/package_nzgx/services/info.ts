
import { useMemberStore } from '@/package_nzgx/stores'
import { useWebSocketStore } from '@/package_nzgx/stores'
const memberStore = useMemberStore()
const webSocketStore = useWebSocketStore();

const updateInfo = (info: any) => {
    webSocketStore.gameSend(
        info
    )
}

export const addNewItem = (userIndex:number,clue: string, type: number, itemType: 'clues' | 'audio',deepClue:string) => {
    for (let index = 0; index < memberStore.info.characters.length; index++) {
        const isCurrentRole = (userIndex) === index;
        console.log(userIndex, index, '---')
        memberStore.info.characters[index].cueset[itemType].push(
            {
                name: clue,
                isNew: isCurrentRole,
                deepClue: deepClue,
                type: type,
                isRead:false
            }
        );
    }
    updateInfo(memberStore.info)
}

export const scoreChange = (type:string,score:number,users:number[]) =>{
    if (type === 'user') {
        users.forEach(element => {
           memberStore.info.characters[element].score += score 
        });
    } else {
        memberStore.info.teamInfo.score += score
    }
}


