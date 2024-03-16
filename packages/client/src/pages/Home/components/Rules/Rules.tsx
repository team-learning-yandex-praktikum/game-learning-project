import { FC } from 'react'
import style from './rules.module.css'
import { clsx } from 'clsx'
import { RulesProps } from './types'
import Divider from '@components/Divider'
import { FlyImage, JumpImage, StartImage } from '@assets/images'

const Rules: FC<RulesProps> = ({ className }) => {
  return (
    <div className={clsx(style.containerRules, className)}>
      <div className={style.dividers}>
        <div className={style.shortDivider}>
          <Divider color="green" />
        </div>
        <div className={style.longDivider}>
          <Divider color="green" />
        </div>
      </div>
      <div className={style.content}>
        <div className={style.titlesContainer}>
          <div className={style.subtitle}>Об игре</div>
          <div className={style.title}>Как играть?</div>
        </div>
        <div className={style.about}>
          <div className={style.startImage}>
            <div className={style.aboutImage}>
              <img src={StartImage} alt="play" />
            </div>
          </div>
          <div>
            <div className={style.textCenter}>В Jump-Jump нужно прыгать по</div>
            <div>
              платформам, чтобы добраться до конца уровня. В игре присутствует
              элемент случайности, который может повлиять на исход уровня.
            </div>
          </div>
        </div>
        <div className={style.imagesContainer}>
          <div className={style.image}>
            <img src={JumpImage} alt="play" />
          </div>
          <div className={style.image}>
            <img src={FlyImage} alt="play" />
          </div>
        </div>
        <div className={style.rules}>
          <div className={clsx(style.subtitle, style.rulesSubtitle)}>
            Правила игры
          </div>
          <div className={style.rulesText}>
            <div>
              Если игрок упадет с платформы, он потеряет жизнь. После этого он
              должен начать уровень заново.
            </div>
            <div>
              Необходимо подняться как можно выше, постоянно перепрыгивая с
              одной платформы на другую.
            </div>
            <div>
              Игрок должен только корректировать мышью направление его полета
              (нажимать на клавишу мыши не нужно, просто поворачивать ее в
              стороны).
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Rules
