import { Request } from 'express'

interface RenderResult {
    html: string
    initialState: unknown
}

type RenderFn = (req: Request) => Promise<RenderResult>

export interface RenderAndTemplate {
    render: RenderFn
    template: string
}
