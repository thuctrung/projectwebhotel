function validator(formSelector) {

    var _this = this;
    var formRules = {};

    function getParent(element, selector) {
        while (element.parentElement) {
            if (element.parentElement.matches(selector)) {
                return element.parentElement;
            }
            element = element.parentElement
        }
    }

    /**
     * Quy ước tạo rules: 
     * Nếu có lỗi return 'error message'
     * Nếu không có lỗi return 'undefined'
     */
    var validatorRules = {
        required: function(value) {
            return value ? undefined : "Please fill in this field!"
        },

        email: function(value) {
            var regax = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            return regax.test(value) ? undefined : "Email address is not valid!"
        },

        min: function(min) {
            return function(value) {
                return value.length >= min ? undefined : `Please enter at least ${min} characters!`;
            }
        }
    }

    //Lấy ra form element trong DOM theo 'formSelector'
    var formElement = document.querySelector(formSelector)

    //Xử lý khi có element trong DOM
    if (formElement) {
        var inputs = document.querySelectorAll('[name][rules]')
        for (var input of inputs) {
            var rules = input.getAttribute('rules').split('|');
            for (var rule of rules) {
                var isRuleHasValue = rule.includes(':');
                var ruleInfor;
                if (isRuleHasValue) {
                    ruleInfor = rule.split(':')
                    rule = ruleInfor[0];
                    validatorRules[rule](ruleInfor[1])
                }

                var ruleFunc = validatorRules[rule];
                if (isRuleHasValue) {
                    ruleFunc = ruleFunc(ruleInfor[1]);
                }

                if (Array.isArray(formRules[input.name])) {
                    formRules[input.name].push(ruleFunc);
                } else {
                    formRules[input.name] = [ruleFunc];
                }
            }
            //Lắng nghe sự kiện để validate (blur, change)

            input.onblur = handleValidate;
            input.oninput = handleClearError;
        }
        //Function thực hiện validate
        function handleValidate(event) {
            var rules = formRules[event.target.name];
            var errorMessage;

            for (var rule of rules) {
                errorMessage = rule(event.target.value);
                if (errorMessage) break;
            }

            // Nếu có lỗi thì hiển thị ra UI
            if (errorMessage) {
                var formGroup = getParent(event.target, '.form-group');
                if (formGroup) {
                    // console.log(formGroup.value)
                    formGroup.classList.add('invalid');
                    var formMessage = formGroup.querySelector('.form-message');
                    if (formMessage) {
                        formMessage.innerText = errorMessage;
                    }
                }
            }
            return !errorMessage;
        }

        //Function thực hiện clear error message
        function handleClearError(event) {
            var formGroup = getParent(event.target, '.form-group');
            if (formGroup.classList.contains('invalid')) {
                formGroup.classList.remove('invalid');
                var formMessage = formGroup.querySelector('.form-message')
                if (formMessage) {
                    formMessage.innerText = '';
                }
            }
        }
    }
    // Xử lý hành vi submit
    formElement.onsubmit = function(event) {
        event.preventDefault();
        var inputs = document.querySelectorAll('[name][rules]');
        var isValid = true;
        for (var input of inputs) {
            if (!handleValidate({ target: input })) {
                isValid = false;
            }
        }
    }
}