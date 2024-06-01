### [Видео с демонстрацией работоспособности приложения 1 часть (5-6 спринты)](https://youtu.be/3E77XSlUEpQ)
### [Видео с демонстрацией работоспособности приложения 2 часть (7-8 спринты)](https://youtu.be/xZuykVQl96A)
 
### Как запускать?
1. Убедитесь что у вас установлен `node` и `docker`
2. Выполните команду `yarn bootstrap` - это обязательный шаг, без него ничего работать не будет :)
3. Выполните команду `yarn dev`
3. Выполните команду `yarn dev --scope=client` чтобы запустить только клиент
4. Выполните команду `yarn dev --scope=server` чтобы запустить только server

### Режим разработки
1. В данном режиме проще всего запускать проект следующим образом:
2. Для первого запуска выполните команду `yarn bootstrap`
3. Поднять БД в докере командой `docker-compose up -d postgres`.
4. В файле `.env`: 
   *    В поле `DB_HOST` указать значение `localhost` (`DB_HOST=localhost`)
   *    В `SERVER_URL` и `CLIENT_URL` добавить к значениям их порты (http://localhost:3000 и http://localhost:3001)
7. Выполнить команду `yarn dev`

### Как добавить зависимости?
В этом проекте используется `monorepo` на основе [`lerna`](https://github.com/lerna/lerna)

Чтобы добавить зависимость для клиента 
```yarn lerna add {your_dep} --scope client```

Для сервера
```yarn lerna add {your_dep} --scope server```

И для клиента и для сервера
```yarn lerna add {your_dep}```


Если вы хотите добавить dev зависимость, проделайте то же самое, но с флагом `dev`
```yarn lerna add {your_dep} --dev --scope server```


### Тесты

Для клиента используется [`react-testing-library`](https://testing-library.com/docs/react-testing-library/intro/)

```yarn test```

### Линтинг

```yarn lint```

### Форматирование prettier

```yarn format```

### Production build

```yarn build```

И чтобы посмотреть что получилось


`yarn preview --scope client`
`yarn preview --scope server`

## Хуки
В проекте используется [lefthook](https://github.com/evilmartians/lefthook)
Если очень-очень нужно пропустить проверки, используйте `--no-verify` (но не злоупотребляйте :)

## Ой, ничего не работает :(

Откройте issue, я приду :)

## Автодеплой статики на vercel
Зарегистрируйте аккаунт на [vercel](https://vercel.com/)
Следуйте [инструкции](https://vitejs.dev/guide/static-deploy.html#vercel-for-git)
В качестве `root directory` укажите `packages/client`

Все ваши PR будут автоматически деплоиться на vercel. URL вам предоставит деплоящий бот

## Production окружение в докере
Перед первым запуском выполните `node init.js`


`docker compose up` - запустит пять сервисов
1. Клиент - SSR (client)
2. node, ваш сервер - API (server)
3. postgres, вашу базу данных (postgres)
4. pgadmin, панель управления БД (pgadmin)
5. nginx, прокси с 80 порта на клиентские и серверный порты (nginx)

Если вам понадобится только один сервис, просто уточните какой в команде
`docker compose up {sevice_name}`, например `docker compose up server`
