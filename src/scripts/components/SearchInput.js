export default class SearchInput {
    constructor(input) {
        this.input = input;
    }

    //валидация поля input
    checkInputValidity(error) {
        if (this.input.validity.valueMissing) {
            //если поле пустое
            error.textContent = "Нужно ввести ключевое слово";
            error.classList.remove("hidden");
            return false;
        } else {
            //если ошибок нет, то поле валидно
            error.textContent = "";
            error.classList.add("hidden");
            return true;
        }
    }

    inputValidateSpace(error) {
        if (this.input.value.match(/^\s*$/)) {
            error.textContent = "Задан пустой поисковой запрос";
            error.classList.remove("hidden");
            return false;
        } else {
            error.textContent = "";
            error.classList.add("hidden");
            return true;
        }
    }

    //очищение поля ошибки
    reset(error) {
        error.textContent = "";
    }
}
