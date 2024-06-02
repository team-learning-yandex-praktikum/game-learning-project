jest.mock('react', () => ({
    ...jest.requireActual('react'),
    useId: () => 'r:id',
}))

jest.mock('sanitize-html', () => ({
    ...jest.requireActual('sanitize-html'),
    default: value => value,
}))

