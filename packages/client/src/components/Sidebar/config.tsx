import { SidebarItemProps } from '@components/Sidebar/elements/SidebarItem/types'
import { Routes } from '@routes/constants'
import {
  ChartIcon,
  ForumIcon,
  HomeIcon,
  PlayIcon,
  ProfileIcon,
} from '@assets/icons'

export const sidebarConfig: SidebarItemProps[] = [
  {
    title: 'Главная',
    link: Routes.Home,
    icon: <HomeIcon />,
  },
  {
    title: 'Таблица лидеров',
    link: Routes.LeaderBoard,
    icon: <ChartIcon />,
  },
  {
    title: 'Игра',
    link: Routes.Game,
    icon: <PlayIcon />,
  },
  {
    title: 'Форум',
    link: Routes.Forum,
    icon: <ForumIcon />,
  },
  {
    title: 'Профиль',
    link: Routes.Profile,
    icon: <ProfileIcon />,
  },
]
