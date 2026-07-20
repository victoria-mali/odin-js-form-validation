import "./styles.css";
// import { validatePostalCode, validatePostalCodes } from "postal-code-checker";

const form = document.getElementById("form");

const inputs = [
  {
    input: document.getElementById("email"),
    error: document.querySelector(".email-error"),
  },
  {
    input: document.getElementById("country"),
    error: document.querySelector(".country-error"),
  },
  {
    input: document.getElementById("postal-code"),
    error: document.querySelector(".postal-error"),
  },
  {
    name: "password",
    input: document.getElementById("password1"),
    error: document.querySelector(".password-error"),
  },
  {
    name: "confirm password",
    input: document.getElementById("password2"),
    error: document.querySelector(".confirm-password-error"),
  },
];

inputs.forEach((item) => {
  const input = item.input;
  const errorDiv = item.error;
  input.addEventListener("input", (e) => {
    if (input.validity.valid) {
      errorDiv.classList.add("error-visibility");
      errorDiv.textContent = "";
    } else {
      showError(input, errorDiv);
    }
  });
  input.addEventListener("focus", (e) => {
    input.classList.remove("invalid", "valid");
  });

  input.addEventListener("blur", (e) => {
    validate(input, errorDiv);
  });
});

function showError(input, errorDiv) {
  if (input.validity.valueMissing) {
    errorDiv.textContent = `You need to enter an ${input.name}`;
  }
  if (input.validity.tooShort) {
    errorDiv.textContent = `You need to enter at least ${input.minLength} characters`;
  }
  if (input.validity.typeMismatch) {
    errorDiv.textContent =
      "You need to enter a valid email address e.g xxxxx@gmail.com";
  }
  errorDiv.classList.remove("error-visibility");
}

function checkPasswords() {
  let password1 = form.password.value;
  let password2 = form.password2.value;
  let errorDiv = document.querySelector(".confirm-password-error");

  let isMatching;
  if (password1 != password2) {
    isMatching = false;
  } else {
    isMatching = true;
  }

  if (isMatching === false) {
    errorDiv.classList.remove("error-visibility");
    errorDiv.textContent = "Passwords don't match";
  }
}

form.addEventListener("submit", (e) => {

    e.preventDefault();
  checkPasswords();
});

function validate(input, errorDiv) {
  const isValid = input.validity.valid;
  input.classList.toggle("invalid", !isValid);
  input.classList.toggle("valid", isValid);
  isValid
    ? errorDiv.classList.add("error-visibility")
    : errorDiv.classList.remove("error-visibility");
  errorDiv.textContent = isValid ? "" : `Check your ${input.name}`;
}
