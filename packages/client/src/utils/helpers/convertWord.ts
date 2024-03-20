export const getCorrectForm = (
    number: number,
    oneForm: string,
    twoForm: string,
    fiveForm: string
) => {
    const remainedOfHundred = Math.abs(number) % 100
    const remaindeOfTen = remainedOfHundred % 10
    if (remainedOfHundred > 10 && remainedOfHundred < 20) {
        return fiveForm
    }
    if (remaindeOfTen > 1 && remaindeOfTen < 5) {
        return twoForm
    }
    if (remaindeOfTen === 1) {
        return oneForm
    }
    return fiveForm
}
