import { LeaderboardTable } from '@api/leaderBoard/types'
import { SortRating } from '@pages/LeaderBoard/type'

const quickSort = (
    arr: LeaderboardTable[],
    sortField: keyof LeaderboardTable
): LeaderboardTable[] => {
    if (arr.length <= 1) {
        return arr
    }
    const pivot = arr[0]
    const left: LeaderboardTable[] = []
    const right: LeaderboardTable[] = []

    for (let i = 1; i < arr.length; i++) {
        const current = arr[i][sortField] ? arr[i][sortField] : null
        const main = pivot[sortField] ? pivot[sortField] : null
        if (current && main && current < main) {
            left.push(arr[i])
        } else {
            right.push(arr[i])
        }
    }

    return [
        ...quickSort(left, sortField),
        pivot,
        ...quickSort(right, sortField),
    ]
}

export const sortLeaderboardTable = (
    ratingTable: LeaderboardTable[],
    typeSort: SortRating,
    sortField: keyof LeaderboardTable
) => {
    if (!ratingTable.length) {
        return ratingTable
    }
    if (typeSort === SortRating.ascend) {
        return quickSort(ratingTable, sortField)
    } else {
        return quickSort(ratingTable, sortField).reverse()
    }
}
