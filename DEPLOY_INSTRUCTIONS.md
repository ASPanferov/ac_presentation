# 🚀 Инструкция по деплою GitHub Pages

## Автоматическая активация GitHub Pages

Для активации GitHub Pages выполните следующие шаги:

### 1. Перейдите в настройки репозитория
Откройте: https://github.com/ASPanferov/ac_presentation/settings/pages

### 2. Настройте источник деплоя
- В разделе **"Source"** выберите **"GitHub Actions"**
- Это активирует автоматический деплой через workflow

### 3. Проверьте workflow
- Перейдите во вкладку **"Actions"**: https://github.com/ASPanferov/ac_presentation/actions
- Убедитесь, что workflow "Deploy static content to Pages" выполняется

### 4. Доступ к презентации
После успешного деплоя презентация будет доступна по адресу:
**https://aspanferov.github.io/ac_presentation/**

## ⚙️ Автоматизация

Настроен автоматический деплой:
- ✅ При каждом push в ветку `main`
- ✅ Workflow GitHub Actions
- ✅ Деплой статических файлов

## 📁 Структура файлов

```
├── index.html              # Главная страница презентации
├── index-ru.html           # Русская версия
├── presentation-styles.css # Стили
├── presentation-script.js  # JavaScript
├── charts-setup.js         # Настройка графиков
├── images/                 # Изображения команды
├── .github/workflows/      # GitHub Actions
└── README.md              # Документация
```

## 🔄 Обновление презентации

Для обновления презентации:
1. Внесите изменения в файлы
2. Закоммитьте: `git add . && git commit -m "Описание изменений"`
3. Запушьте: `git push origin main`
4. GitHub Actions автоматически обновит сайт

---

**Статус**: ✅ Презентация готова к деплою
**URL после активации**: https://aspanferov.github.io/ac_presentation/