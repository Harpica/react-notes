# Проект "Заметки на React"

## Описание

Одностраничное приложение на React, использующее localStorage браузера для сохранения заметок. Заметки можно создавать, удалять и редактировать. Заметки хранятся в localStorage в виде строки с Markdown разметкой. Форматирование текста заметок в режиме WYSIWYG.

## Ссылка на gh-pages

https://harpica.github.io/react-notes/

## Запуск проекта

`npm run dev` — запускает сервер с hot-reload
`npm run build` — собирает проект

Новые коммиты автоматичеки деплоятся на gh-pages

## Инструменты и технологии

- Typescript
- React
- Vite
- MUI
- Использованы библиотеки react-markdown и turndown для отображения и парсинга HTML в Markdown

## Дальнейшее развитие

- Уменьшить количество перерендериваний компонента NoteList
- Улучшить live-форматирование текста
- Добавить возможность форматировать текст в Italic, даже если это один символ внутри слова. В данный момент поддерживается только форматирование с помощью символов "\_" в Markdown
- Провести рефакторинг стилей
- Улучшить поиск по заметкам: поиск недостаточно точный
