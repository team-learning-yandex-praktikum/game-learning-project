import * as Pages from '../pages'
import { Routes } from './constants'
import { RouteConfigObject } from './types'

export const routesConfig: RouteConfigObject[] = [
    {
        path: Routes.Home,
        element: <Pages.Home />,
    },
    {
        path: Routes.Login,
        element: <Pages.Login />,
        isAuth: true,
    },
    {
        path: Routes.Registration,
        element: <Pages.Registration />,
        isAuth: true,
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
    {
        path: Routes.Error,
        element: <Pages.ErrorPage code={500} />,
    },
]

export * from './types'
