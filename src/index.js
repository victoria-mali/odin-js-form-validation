import "./styles.css";
import { validatePostalCode } from "postal-code-checker";

const container = document.querySelector(".container");
const success = document.querySelector(".success");
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
    input: document.getElementById("password1"),
    error: document.querySelector(".password-error"),
  },
  {
    input: document.getElementById("password2"),
    error: document.querySelector(".confirm-password-error"),
  },
];

inputs.forEach((item) => {
  const input = item.input;
  const errorDiv = item.error;

  input.addEventListener("input", (e) => {
    if (input === document.getElementById("country")) {
      validateZip();
    }

    if (input === document.getElementById("postal-code")) {
      validateZip();
    }

    if (input === document.getElementById("password2")) {
      syncPasswordMatch();
      return;
    }

    if (
      input === document.getElementById("password1") ||
      input === document.getElementById("password2")
    ) {
      syncPasswordMatch();
    }

    if (input.validity.valid) {
      errorDiv.classList.add("error-visibility");
      errorDiv.textContent = "";
    } else {
      showError(input, errorDiv);
    }
  });
  input.addEventListener("focus", (e) => {
    input.classList.remove("invalid", "valid");
    if (!errorDiv.classList.contains("error-visibility")) {
      showError(input, errorDiv);
    }
  });

  input.addEventListener("blur", (e) => {
    validate(input, errorDiv);
  });
});

function showError(input, errorDiv) {
  if (input.validity.valueMissing) {
    const label = document
      .querySelector(`label[for="${input.id}"]`)
      .textContent.toLowerCase();
    if (label === "confirm password") {
      errorDiv.textContent = "Please confirm your password";
    } else {
      errorDiv.textContent = `Please enter your ${label}`;
    }
  }
  if (input.validity.tooShort) {
    errorDiv.textContent = `You need to enter at least ${input.minLength} characters`;
  }
  if (input.validity.typeMismatch) {
    errorDiv.textContent =
      "You need to enter a valid email address e.g xxxxx@gmail.com";
  }
  if (input.validity.customError) {
    if (input === document.getElementById("password2")) {
      errorDiv.textContent = "The passwords don't match";
    }
    if (input === document.getElementById("postal-code")) {
      errorDiv.textContent =
        "Your postal code doesn't match your selected country";
    }
  }

  errorDiv.classList.remove("error-visibility");
}

function validateZip() {
  let postalCodeInput = form.zip;
  let postalCodeError = document.querySelector(".postal-error");
  let country = form.country.value;
  let zip = form.zip.value;

  if (zip === "") {
    postalCodeInput.setCustomValidity("");
  } else {
    let isValid = validatePostalCode(country, zip);
    postalCodeInput.setCustomValidity(isValid ? "" : "notValid");
  }

  if (
    postalCodeInput.classList.contains("valid") ||
    postalCodeInput.classList.contains("invalid")
  ) {
    validate(postalCodeInput, postalCodeError);
  }
}

function checkPasswords() {
  let password1 = form.password.value;
  let password2 = form.password2.value;

  if (password1 === password2) {
    return true;
  } else {
    return false;
  }
}

function syncPasswordMatch() {
  const password2Input = document.getElementById("password2");
  const password2Error = document.querySelector(".confirm-password-error");

  const isMatching = checkPasswords();
  password2Input.setCustomValidity(isMatching ? "" : "notMatching");

  if (password2Input.validity.valid) {
    password2Error.classList.add("error-visibility");
    password2Error.textContent = "";
  } else {
    showError(password2Input, password2Error);
  }
  if (
    password2Input.classList.contains("valid") ||
    password2Input.classList.contains("invalid")
  ) {
    validate(password2Input, password2Error);
  }
}

function validate(input, errorDiv) {
  let isValid = input.validity.valid;
  input.classList.toggle("invalid", !isValid);
  input.classList.toggle("valid", isValid);
  isValid
    ? errorDiv.classList.add("error-visibility")
    : errorDiv.classList.remove("error-visibility");
  if (isValid) {
    errorDiv.textContent = "";
  } else {
    showError(input, errorDiv);
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const allValid = inputs.every((item) => item.input.validity.valid);

  if (allValid) {
    container.classList.add("error-visibility");
    success.classList.remove("error-visibility");
  } else {
    inputs.forEach((item) => {
      validate(item.input, item.error);
    });
  }
});
