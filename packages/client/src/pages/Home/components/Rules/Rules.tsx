import { FC } from 'react'
import style from './rules.module.css'
import { clsx } from 'clsx'
import Divider from '@components/Divider'
import { GameDemoImage, GameOverImage, GamePosterImage } from '@assets/images'

const Rules: FC = () => (
    <div className={clsx(style.containerRules, 'home-container')}>
        <div className="container">
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
                    <div className={style.aboutImage}>
                        <img src={GamePosterImage} alt="play" />
                    </div>
                    <div className={style.aboutText}>
                        В <span>Fallen Angel</span> нужно прыгать по платформам,
                        чтобы добраться до конца уровня. В игре присутствует
                        элемент случайности, который может повлиять на исход
                        уровня.
                    </div>
                </div>
                <div className={style.imagesContainer}>
                    <div className={style.image}>
                        <img src={GameDemoImage} alt="play" />
                    </div>
                    <div className={style.image}>
                        <img src={GameOverImage} alt="play" />
                    </div>
                </div>
                <div className={style.rules}>
                    <div className={clsx(style.subtitle, style.rulesSubtitle)}>
                        Правила игры
                    </div>
                    <div className={style.rulesText}>
                        <div>
                            Если игрок упадет с платформы, он потеряет жизнь.
                            После этого он должен начать уровень заново.
                        </div>
                        <div>
                            Необходимо подняться как можно выше, постоянно
                            перепрыгивая с одной платформы на другую.
                        </div>
                        <div>
                            Игрок должен корректировать стрелками на клавиатуре
                            направление прыжка.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
)

export default Rules
