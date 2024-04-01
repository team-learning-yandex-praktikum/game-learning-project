### Игровой движок

- [Базовые классы](#базовые-классы)
- [Классы игровых объектов](#классы-игровых-объектов)

### Базовые классы

- [GameWorld](#gameworld)
- [GameObject](#gameobject)
- [InputHandler](#inputhandler)
- [PhysicsComponent](#physicscomponent)
- [Sprite](#sprite)
- [ResourcesLoader](#resourcesloader)

### Классы игровых объектов

- [Player](#player)
- [Platform](#platform)
- [Enemy](#enemy)
- [Falling](#falling)
- [Jumping](#jumping)
- [Standing](#standing)
- [Walking](#walking)

### GameWorld

Класс `GameWorld` является основным компонентом, в котором происходит взаимодействие игровых объектов и выполнение
игровой логики. Здесь осуществляется управление игровым циклом, рендерингом объектов и обнаружением столкновений.

**Параметры конструктора**

- `rootElem` : `HTMLElement` - Корневой элемент, к которому добавляется игровой холст.

**Свойства**

- `lastLoopTime` : `number` - Время последней итерации игрового цикла.
- `isGameOver` : `boolean` - Индикатор завершения игры.
- `gameTime` : `number` - Время игры.
- `score` : `number` - Счет игры.
- `enemies` : `Enemy[]` - Массив объектов врагов.
- `platforms` : `Platform[]` - Массив объектов платформ.
- `platformGround` : `Platform` - Первая платформа, являющаяся нижней границей игры.
- `player` : `Player` - Игрок.
- `physics` : `Physics` - Экземпляр класса для расчета столкновений.
- `canvas` : `HTMLCanvasElement` - Элемент с тегом canvas.
- `context` : `CanvasRenderingContext2D` - Контекст рендеринга 2D холста.
- `finishGameHandler`: `FinishGameHandler` - Обработчик завершения игры.
- `jumpDistanceTraveled` : `number` - Расстояние, пройденное персонажем при прыжке.
- `halfCanvasHeight` : `number` - Индикатор прохождения половины высоты холста.
- `scorePositionX` : `number` - Координаты расположения счета по оси X.
- `scorePositionY` : `number` - Координаты расположения счета по оси Y.
- `animationFrameId`: `number | null` - Идентификатор анимационного кадра.

**Методы**

- `resolvePlatformCollision(p: Player, callback: (p: Platform) => void)` : `void` - Проверяет столкновения между игроком
  и платформами.
- `start()` : `void` - Запускает игровой цикл и сохраняет время последней итерации цикла.
- `gameLoop()` : `void` - Выполняет игровой цикл.
- `update(dt: number)` : `void` - Обновляет состояние игры.
- `updateObjects(dt: number)` : `void` - Обновляет игровые объекты.
- `render()` : `void` - Отрисовывает игровые объекты на холсте.
- `clear()` : `void` - Очищает холст.
- `renderObjects(objects: GameObject[])` : `void` - Отрисовывает массив игровых объектов.
- `renderObject(obj: GameObject)` : `void` - Отрисовывает один игровой объект.
- `stopGameLoop()` : `void` - Остановка игрового цикла.
- `reset()` : `void` - Сбрасывает состояние игры.
- `fillPlatforms()` : `void` - Заполнение игрового холста платформами.
- `renderScore()` : `void` - Отрисовка счета на холсте.
- `finishGame()` : `void` - Завешение игры.

#### Инициализация игрового мира

```javascript
 let world: Nullable<GameWorld> = null
const ref = useRef < HTMLDivElement > (null)

useEffect(() => {
  const root = ref.current
  if (world === null && root !== null) {
    world = new GameWorld(root)
  }
}, [world, ref])
```

### GameObject

Класс `GameObject` класс определяет общие свойства и методы объектов.

**Свойства**

- `position`: `Position` - Позиция объекта на игровом холсте.
- `size`: `Size` - Размер объекта.
- `spriteMap`: `SpriteMap` - Карта спрайтов.
- `speed`: `Vector2d` - Скорость движения.
- `state`: `string` - Текущее состояние объекта.

**Методы**

- `getState()`: `string` - Возвращает текущее состояние.
- `get pos()`: `Position` - Получает текущее позицию.
- `set pos(v: Position)`: `void` - Устанавливает позицию.
- `get width()`: `number` - Получает ширину.
- `get height()`: `number` - Получает высоту.
- `getSprite(state: string = 'idle')`: `Sprite | undefined` - Получает спрайт для указанного состояния.
- `setSprite(sprite: Sprite)`: `void` - Устанавливает спрайт для состояния.
- `abstract update(deltaTime: number)`: `void` - Абстрактный метод, обновления объекта.
- `render(ctx: CanvasRenderingContext2D)`: void - Метод для отрисовки объекта на холсте.

### InputHandler

Класс `InputHandler` класс для отслеживания и обработки нажатия клавиш.

**Свойства**

- `pressedKeys`: `Indexed<boolean>` - Индикатор воздействия на клавишу.

**Конструктор**
Установленны слушатели событий воздействия на клавиши.

**Методы**

- `setKey(e: KeyboardEvent, pressed: boolean)`: `void` - Устанавливает состояние, нажата ли клавиша или отпущена.
- `isDown(key: string)`: `boolean` - Проверяет, нажата ли клавиша.
- `isUp(key: string)`: `boolean` - Проверяет, отпущена ли клавиша.
- `isSeveralDown(...k: Keys[])`: `boolean` - Проверяет, нажаты ли все указанные клавиши одновременно.
- `releasedAll()`: `boolean` - Проверяет, все ли клавиши отпущены.
- `get pressedRight()`: `boolean` - Проверяет нажата ли клавиша "Вправо".
- `get pressedLeft()`: `boolean` - Проверяет нажата ли клавиша "Влево".
- `get pressedLeftRight()`: `boolean` - Проверяет нажаты ли одновременно клавиши "Влево" и "Вправо".
- `get releasedLeftRight()`: `boolean` - Проверяет отпущены ли обе клавиши "Влево" и "Вправо".
- `get pressedSpace()`: `boolean` - Проверяет нажата ли клавиша "Пробел".
- `get releasedSpace()`: `boolean` - Проверяет отпущена ли клавиша "Пробел".

### PhysicsComponent

Класс `PhysicsComponent` класс который предоставляет методы для обнаружения столкновений между игровыми объектами.

**Методы**

- `checkCollisions`: `void` - Проверяет столкновения между текущим объектом (игроком) и массивом объектов (платформами).
  При обнаружении столкновения вызывает функцию обратного вызова для соответствующего объекта.
- `boxCollides(obj: GameObject, obj2: GameObject)`: `boolean` - Проверяет, произошло ли столкновение с объектом (
  платформой).

### Sprite

Класс `Sprite` класс предназначенный для отображения изображений на холсте с возможностью анимации.

**Свойства**

- `url: string` - URL-адрес изображения.
- `position: Position` - Позиция спрайта на холсте.
- `size: Size` - Размер спрайта.
- `speed: number` - Скорость анимации.
- `frames: number` - Количество кадров.
- `index: number` - Текущий индекс кадра.
- `image: ImgResource | undefined` - Изображение.
- `ticksPerFrame: number` - Количество обновлений каждого кадра.
- `tickCount: number` - Счетчик обновлений для переключения кадра.

**Конструктор**
Принимает URL изображения и опции для настройки изображения.

**Методы**

- `initImage(size?: Size)`: `Promise<void>` - Метод для загрузки изображения из ресурсов.
- `get width()`: `number` - Получает ширину изображения.
- `get height()`: `number` - Получает высоту изображения.
- `getUrl()`: `string` - Получает URL изображения.
- `resetIndex()`: `void` - Сбрасывает индекс кадра анимации до 0.
- `update()`: `void` - Обновления кадра анимации.
- `render(ctx: CanvasRenderingContext2D)`: `void` - Отображение спрайта на холсте.


### ResourcesLoader

Класс `ResourcesLoader` класс предназначенный для загрузки изображения.

**Свойства**

- `resourceCache`: `Map<string, ImgResource>` - Содержит кэш загруженных изображений.
- `readyCallbacks`: `Callback[]` - Массив обратных вызовов, которые вызваются после загрузки всех изображений.

**Методы**

- `load(urlList: string | string[])`: `Promise<void>` - Загружает один или несколько ресурсов по указанным URL-адресам.
- `onReady(func: Callback)`: `void` - Добавляет обратный вызов в readyCallbacks.
- `get(url: string)`: `ImgResource | undefined` - Получаем данные из кэша.
- `loadByURL(url: string)`: `Promise<ImgResource>` - Загружает ресурс по указанному URL-адресу.
- `isReady()`: `boolean` - Проверяет, все ли изображения загружены.


### Player

Класс `Player` класс предназначенный для описания игрового персонажа.

**Параметры конструктора**

- `plat` : `Platform` - Текущая платформа.
- `world` : `World` - Игровой мир.

**Свойства**

- `currState: State<Player>` - Текущее состояние игрока.
- `platform: Platform` - Текущая платформа.
- `input: InputHandler` - Обработчик управления персонажем.
- `world: World` - Игровой мир.
- `fallPosition: number | null` - Позиция падение игрока.
- `distanceTraveled: number` - Пройденное расстояние игроком.
- `posYOfHighestPlatform: number` - Позиция по оси Y самой высокой платформы.

**Методы**

- `update(deltaTime: number): void` - Обновляет состояние игрока.
- `checkLandingOnPlatform(newState: () => Standing): void` - Проверяет, стоит ли игрок на платформе.
- `checkFallingFromPlatform(newState: () => Falling): void` - Проверяет, падает ли игрок с платформы.
- `isFalling(): boolean` - Проверяет, падает ли игрок.
- `getDistance(): number` - Возвращает пройденное расстояние игроком.
- `isEnoughJumpHigh(): boolean` - Проверяет, достаточно ли высоко прыгнул игрок.
- `onPlatform(): boolean` - Проверяет, стоит ли игрок на платформе.
- `setSpeedX(s: number): void` - Устанавливает скорость по оси X.
- `setSpeedUp(s: number): void` - Устанавливает скорость вверх.
- `setSpeedDown(s: number): void` - Устанавливает скорость вниз.
- `decreaseSpeedX(s: number): void` - Уменьшает скорость по оси X.
- `standOnPlatform(platform: Platform): boolean` - Помещает игрока на платформу.
- `stand(dt: number): void` - Останавливает игрока.
- `jump(dt: number, speedStartJump: number): void` - Переводит игрока в состояние прыжка.
- `fall(dt: number, speedFalling: number): void` - Переводит игрока в состояние падения.
- `walkRight(dt: number, walkSpeed: number): void` - Переводит игрока в состояние движения вправо.
- `walkLeft(dt: number, walkSpeed: number): void` - Переводит игрока в состояние движения влево.
- `move(dt: number): void` - Обновляет позицию игрока.
- `checkBounds(canvas: HTMLCanvasElement): void` - Проверяет, находится ли игрок в пределах игрового поля.
- `calculateJumpDistance(deltaTime: number): number` - Вычисляет пройденное расстояние при прыжке.


### Platform

Класс `Player` класс предназначенный для создания платформ.

**Параметры конструктора**

- `size` : `Size` - Размер платформы.
- `type` : `PlatformType = 'cloud'` - Тип платформы.

**Свойства**

- `type`: `PlatformType` - Тип платформы.

**Методы**

- `update(deltaTime: number)`: `void` - Обновляет состояние платформы.
- `render(ctx: CanvasRenderingContext2D)`: `void` - Отрисовывает платформу на холсте.


### Enemy

Класс `Player` класс предназначенный для создания препятсвий. В РАЗРАБОТКЕ


## Классы состояния игрока

### Falling

Класс `Falling` класс состояние падения игрока.

**Свойства**

- `speedFalling`: `number` - Скорость падения.

**Методы**

- `enterAction(p: Player)`: `void` - Уменьшает горизонтальную скорость игрока и устанавливает вертикальную скорость падения.
- `handleInput(input: InputHandler, p: Player): PlayerState | null` - Обрабатывает скорость при нажатии клавиш во время падения.
- `update(dt: number, p: Player): void` - Обновляет состояние игрока во время падения.

### Jumping

Класс `Jumping` класс состояние прыжка игрока.

**Свойства**

- `canDoubleJump`: `boolean` - Флаг, указывающий, можно ли совершить двойной прыжок.
- `wasReleasedJump`: `boolean` - Флаг, указывающий, была ли отпущена клавиша прыжка.
- `speedStartJump`: `number` - Начальная скорость прыжка.
- `speedXinJump`: `number` - Горизонтальная скорость во время прыжка.

**Методы**

- `enterAction(p: Player)`: `void` - Устанавливает начальную скорость прыжка и разрешает двойной прыжок.
- `handleInput(input: InputHandler, p: Player)`: `PlayerState | null` - Обрабатывает скорость при нажатии клавиш во время прыжка.
- `update(dt: number, p: Player)`: `void` - Обновляет состояние игрока во время прыжка.
- `doubleJump(p: Player)`: `void` - Метод, реализующий двойной прыжок игрока.


### Standing

Класс `Standing` класс состояние без движения игрока.

**Методы**

- `handleInput(input: InputHandler, p: Player)`: `Nullable<PlayerState>` - Обрабатывает скорость при нажатии клавиш в состоянии стояния.
- `update(dt: number, p: Player)`: `void` - Обновляет состояние игрока в состоянии стояния.


### Walking

Класс `Walking` класс состояние бега ирока.

**Свойства**

- `speed`: `number` - Скорость при состоянии бега.

**Параметры конструктора**

- `dir` : `Direction` - Направление бега.


**Методы**

- `handleInput(input: InputHandler, p: Player)`: `Nullable<PlayerState>` - Обрабатывает скорость при нажатии клавиш в состоянии бега..
- `update(dt: number, p: Player)`: `void` - Обновляет состояние игрока в состоянии бега.
- `walk(dt: number, p: Player)` : `void` - Направляет положение игрока в зависимости от направления бега.

