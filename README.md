# Студенческие сервисы ФАКТ

![Vue.js](https://img.shields.io/badge/vuejs-%2335495e.svg?style=for-the-badge&logo=vuedotjs&logoColor=%234FC08D) ![Nuxtjs](https://img.shields.io/badge/Nuxt-002E3B?style=for-the-badge&logo=nuxtdotjs&logoColor=#00DC82) ![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white) ![NestJS](https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white)

![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E) ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)

![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white) ![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white) ![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)

## Оглавление

## Changelog

### `15.08.2022`
#### Расписание общих комнат
- ✅ Создание записей
- ✅ Удаление записей
- ✅ Валидация записей (проверки на дату, время, пользователя)

#### Toast уведомления
- ✅ Сверстан макет
- ✅ Добавлены анимации
- ✅ Интегрированы со стейт менеджером и Nuxt

### `16.08.2022`
#### Toast уведомления
- ✅ Доделаны и интегрированы toast-уведомления
#### Расписание прачечной
- ✅ Вынесена вся логика из components/LaundrySchedule в pages/laundry
- ✅ Сформулирован интерфейс LaundryEntry
- ✅ Исправлен сдвиг time и wmn

### `17.08.2022` 🌟 PREALPHA → ALPHA 🌟
#### Расписание прачечной
- ✅ Добавлена связь через Pinia
- ✅ Сделана фильтрация и отображение по дням
- ✅ Исправлен баг с бесконечным добавлением записей в одно время
- ✅ Добавлено отображение количества записей пользователя в сайдбаре

### `18.08.2022`
#### Расписание прачечной
- ✅ Нельзя добавлять записи, если время стирки уже началось
- ✅ Нельзя удалять записи, если время стирки уже началось
- ✅ Исправлен баг id записей в прачечную
- ✅ Добавлены store к другим общим комнатам

### `20.08.2022`
#### Аутентификация через Яндекс
- ✅ Попытался прикрутить Yandex Oauth к Nuxt Auth

## To do:
- ❌ Исправить ошибку с исчезновением записей при добавлении или удалении записей (перезагрузка решает проблему)

```ts
vue.runtime.esm.js?2b0e:4560 [Vue warn]: Invalid prop: type check failed for prop "scheduleData". Expected Array, got String with value "".

found in

---> <Schedule> at components/Schedule.vue
       <Pages/kds.vue> at pages/kds.vue
         <Nuxt>
           <Layouts/default.vue> at layouts/default.vue
             <Root>
```
- Исправить ошибку в консоли при добавлении записей
```ts
[h3] [unhandled] H3Error: This page could not be found
    at createError (file:///C:/Users/Timur/Desktop/stfaki-nuxt-ts/node_modules/h3/dist/index.mjs:191:15)
    at Server.nodeHandler (file:///C:/Users/Timur/Desktop/stfaki-nuxt-ts/node_modules/h3/dist/index.mjs:381:21)
    at processTicksAndRejections (node:internal/process/task_queues:96:5) {
  statusCode: 404,
  fatal: false,
  unhandled: true,
  statusMessage: 'Internal Server Error'
}
```

- ❌ Исправить ошибку в консоли при добавлении записей
```ts
ERROR  [uncaughtException] Cannot set headers after they are sent to 
the client

  at new NodeError (node:internal/errors:372:5)
  at ClientRequest.setHeader (node:_http_outgoing:576:11)
  at ProxyServer.<anonymous> (/C:/Users/Timur/Desktop/stfaki-nuxt-ts/node_modules/nitropack/dist/chunks/prerender.mjs:2444:16)
  at ProxyServer.emit (node_modules\eventemitter3\index.js:184:35)    
  at ClientRequest.<anonymous> (node_modules\http-proxy\lib\http-proxy\passes\web-incoming.js:133:16)
  at ClientRequest.emit (node:events:527:28)
  at ClientRequest.emit (node:domain:475:12)
  at tickOnSocket (node:_http_client:765:7)
  at onSocketNT (node:_http_client:825:5)
  at processTicksAndRejections (node:internal/process/task_queues:84:21)
```

- ❌ Пагинация

- ❌ Добавляю запись в стиралку, делаю запись в кдс, не могу отменить запись в стиралку (нельзя удалять не свои записи, что-то случилось с id пользователя)