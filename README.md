# Odin Form Validation

A browser form validated entirely in JavaScript instead of the browser's built-in HTML validation. It gives live, inline feedback as you type and when you leave each field. Built for The Odin Project's [Form Validation With JavaScript](https://www.theodinproject.com/lessons/node-path-javascript-form-validation-with-javascript) lesson.

🔗 **[Live demo](https://victoria-mali.github.io/odin-js-form-validation/)**

## Features

- **Five fields:** email, country, postal code, password, and password confirmation.
- **Validates as you type** — fields re-check on every keystroke and on blur, not only on submit.
- **Clear feedback** — invalid fields turn red and show a specific message about what's wrong.
- **Country-aware postal codes**, validated with [`postal-code-checker`](https://www.npmjs.com/package/postal-code-checker).
- **Password matching** between the password and confirmation fields.
- **Submit gate** — submitting with any error flags every invalid field; a fully valid form gets a "High five ✋".
- The `<form>` uses `novalidate`, so every check runs in JavaScript.

## Built with

Vanilla JavaScript · HTML · CSS · [webpack](https://webpack.js.org/) · ESLint + Prettier