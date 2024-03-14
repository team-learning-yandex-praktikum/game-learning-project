import React from 'react'
import {
  IskanderImage,
  LeilaImage,
  ArthurImage,
  AnastasiaImage,
} from '@assets/team'

export const teamMap = [
  {
    firstName: 'Искандер',
    lastName: 'Айдынов',
    avatar: <img src={IskanderImage} alt="Iskander" />,
  },
  {
    firstName: 'Лейла',
    lastName: 'Бекирова',
    avatar: <img src={LeilaImage} alt="Leila" />,
  },
  {
    firstName: 'Артур',
    lastName: 'Сиволов',
    avatar: <img src={ArthurImage} alt="Arthur" />,
  },
  {
    firstName: 'Анастасия',
    lastName: 'Курочкина',
    avatar: <img src={AnastasiaImage} alt="Anastasia" />,
  },
]
