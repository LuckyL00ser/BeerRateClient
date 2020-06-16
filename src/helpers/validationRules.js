import { extend } from "vee-validate";
import { email, required, min, max, confirmed, numeric } from "vee-validate/dist/rules";

extend("email", {
  ...email,
  message: "Podaj poprawny adres e-mail"
});
extend("password", {
  params: ["target"],
  validate(value, { target }) {
    return value === target;
  },
  message: "Hasła nie są identyczne"
});
extend("required", {
  ...required,
  message: "To pole jest wymagane"
});
extend("numeric", {
  ...numeric,
  message: "To pole może zawierać wyłącznie cyfry"
});
extend("max", {
  ...max,
  params: ["length"],
  message: "Zbyt długa nazwa. To pole może mieć maksymalnie {length} znaków"
});
extend("max_value", {
  params: ["specified"],
  validate(value, { specified }) {
    return value <= specified;
  },
  message: "Maksimum {specified}"
});
extend("min_value", {
  params: ["specified"],
  validate(value, { specified }) {
    return value >= specified;
  },
  message: "Minimum {specified}"
});
extend("min", {
  ...min,
  params: ["length"],
  message: "Zbyt krótkie. To pole musi mieć minimum {length} znaków"
});
extend("confirmed", {
  ...confirmed,
  params: ["target"],
  message: "Hasła różnią się od siebie"
});
