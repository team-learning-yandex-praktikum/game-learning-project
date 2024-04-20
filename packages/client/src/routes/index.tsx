import * as Pages from '../pages'
import { Routes } from './constants'
import { RouteObject } from 'react-router'

export const routesConfig: RouteObject[] = [
    {
        path: Routes.Home,
        element: <Pages.Home />,
    },
    {
        path: Routes.Login,
        element: <Pages.Login />,
    },
    {
        path: Routes.Registration,
        element: <Pages.Registration />,
    },
    {
        path: Routes.Profile,
        element: <Pages.Profile />,
    },
    {
        path: Routes.LeaderBoard,
        element: <Pages.LeaderBoard />,
    },
    {
        path: Routes.Game,
        element: <Pages.Game />,
    },
    {
        path: Routes.Forum,
        children: [
            { index: true, element: <Pages.Forum /> },
            { path: Routes.ForumTopic, element: <Pages.ForumTopic /> },
        ],
    },
    {
        path: Routes.NotFound,
        element: <Pages.ErrorPage code={404} />,
    },
]

export * from './types'
