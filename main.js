(()=>{"use strict";function e(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,o=Array(t);n<t;n++)o[n]=e[n];return o}var t={baseUrl:"https://nomoreparties.co/v1/wff-cohort-30",headers:{authorization:"d2f61755-899c-4723-86e5-0729969e7c0f","Content-Type":"application/json"}},n=function(e,n,o,r,c,a,i,u){var s=r.cloneNode(!0),l=s.querySelector(".card__image");l.src=n.link,l.alt="Изображение города ".concat(n.name),s.querySelector(".card__title").textContent=n.name;var d=s.querySelector(".card__delete-button");e._id!==n.owner._id?d.remove():d.addEventListener("click",(function(){c(s),function(e){fetch("".concat(t.baseUrl,"/cards/").concat(e._id),{method:"DELETE",headers:t.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))})).catch((function(e){console.log(e)}))}(n)}));var f=s.querySelector(".card__like-button"),p=s.querySelector(".card__like-counter");return p.textContent=o.length,n.likes.forEach((function(t){e._id===t._id&&f.classList.add("card__like-button_is-active")})),f.addEventListener("click",(function(){a(f,"card__like-button_is-active",n,p)})),s.querySelector(".card__image").addEventListener("click",(function(){i(u,n)})),s};function o(e){e.remove()}function r(e,n,o,r){e.classList.contains(n)?(e.classList.remove(n),function(e){return fetch("".concat(t.baseUrl,"/cards/likes/").concat(e._id),{method:"DELETE",headers:t.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))})).catch((function(e){console.log(e)}))}(o).then((function(e){r.textContent=e.likes.length}))):(e.classList.add(n),function(e){return fetch("".concat(t.baseUrl,"/cards/likes/").concat(e._id),{method:"PUT",headers:t.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))})).catch((function(e){console.log(e)}))}(o).then((function(e){r.textContent=e.likes.length})))}function c(e){e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",i),document.removeEventListener("click",u)}function a(e){e.classList.add("popup_is-opened"),document.addEventListener("keydown",i),document.addEventListener("click",u)}function i(e){"Escape"===e.key&&c(document.querySelector(".popup_is-opened"))}function u(e){e.target.classList.contains("popup_is-opened")&&c(document.querySelector(".popup_is-opened"))}function s(e,t){e.querySelector(t.submitButtonSelector).classList.add(t.inactiveButtonClass),Array.from(e.querySelectorAll(t.inputSelector)).forEach((function(n){e.querySelector(".".concat(n.id,"-error")).textContent="",e.querySelector(".".concat(n.id,"-error")).classList.remove(t.errorClass),n.classList.remove(t.inputErrorClass)}))}var l=document.querySelector("#card-template").content.querySelector(".card"),d=document.querySelector(".places__list"),f=document.querySelector(".profile__edit-avatar-button"),p=document.querySelector(".popup_type_edit-avatar"),m=document.forms["update-avatar"],_=document.querySelector(".profile__image"),v=document.querySelector(".profile__edit-button"),h=document.querySelector(".popup_type_edit"),y=document.forms["edit-profile"],S=document.querySelector(".profile__add-button"),b=document.querySelector(".popup_type_new-card"),g=document.forms["new-place"],k=b.querySelector(".popup__input_type_card-name"),q=b.querySelector(".popup__input_type_url"),L=document.querySelector(".popup_type_image"),E=document.querySelector(".profile__title"),C=document.querySelector(".profile__description"),j=document.querySelectorAll(".popup__close"),x={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"};function A(){Promise.all([fetch("".concat(t.baseUrl,"/users/me"),{headers:t.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))})).catch((function(e){console.log(e)})),fetch("".concat(t.baseUrl,"/cards"),{headers:t.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))})).catch((function(e){console.log(e)}))]).then((function(t){var n,o,r=(o=2,function(e){if(Array.isArray(e))return e}(n=t)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var o,r,c,a,i=[],u=!0,s=!1;try{if(c=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;u=!1}else for(;!(u=(o=c.call(n)).done)&&(i.push(o.value),i.length!==t);u=!0);}catch(e){s=!0,r=e}finally{try{if(!u&&null!=n.return&&(a=n.return(),Object(a)!==a))return}finally{if(s)throw r}}return i}}(n,o)||function(t,n){if(t){if("string"==typeof t)return e(t,n);var o={}.toString.call(t).slice(8,-1);return"Object"===o&&t.constructor&&(o=t.constructor.name),"Map"===o||"Set"===o?Array.from(t):"Arguments"===o||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(o)?e(t,n):void 0}}(n,o)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}());return{user:r[0],cards:r[1]}})).catch((function(e){console.log(e)})).then((function(e){var t=e.user,c=e.cards;d.innerHTML="";for(var a=0;a<c.length;a++)d.append(n(t,c[a],c[a].likes,l,o,r,P,L));E.textContent=t.name,C.textContent=t.about,_.style.backgroundImage='url("'.concat(t.avatar,'")')}))}function P(e,t){e.querySelector(".popup__image").src=t.link,e.querySelector(".popup__image").alt=t.name,e.querySelector(".popup__caption").textContent=t.name,a(e)}function U(e,t,n){var o=e.querySelector(".popup__button");o.textContent===n?o.textContent=t:o.textContent=n}A(),v.addEventListener("click",(function(){a(h),s(h,x),y.name.value=E.textContent,y.description.value=C.textContent})),y.addEventListener("submit",(function(e){var n,o;e.preventDefault(),U(e.target,"Сохранение...","Сохранить"),(n=y.name.value,o=y.description.value,fetch("".concat(t.baseUrl,"/users/me"),{method:"PATCH",headers:t.headers,body:JSON.stringify({name:n,about:o})}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))})).catch((function(e){console.log(e)}))).then((function(){A()})).then((function(){c(h),U(e.target,"Сохранение...","Сохранить")}))})),f.addEventListener("click",(function(){a(p),s(p,x)})),m.addEventListener("submit",(function(e){var n;e.preventDefault(),U(e.target,"Сохранение...","Сохранить"),(n=m.avatar.value,fetch("".concat(t.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:t.headers,body:JSON.stringify({avatar:n})}).then((function(e){if(e.ok)return e.json()})).catch((function(e){console.log(e)}))).then((function(e){_.style.backgroundImage='url("'.concat(e.avatar,'")')})).then((function(){c(p),U(e.target,"Сохранение...","Сохранить")}))})),S.addEventListener("click",(function(){a(b),s(b,x)})),b.addEventListener("submit",(function(e){e.preventDefault();var n,o,r={name:k.value,link:q.value};U(e.target,"Сохранение...","Сохранить"),(n=r.name,o=r.link,fetch("".concat(t.baseUrl,"/cards"),{method:"POST",headers:t.headers,body:JSON.stringify({name:n,link:o})}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))})).catch((function(e){console.log(e)}))).then((function(){A(),s(b,x),g.reset()})).then((function(){c(b),U(e.target,"Сохранение...","Сохранить")}))})),j.forEach((function(e){e.addEventListener("click",(function(e){c(e.target.closest(".popup"))}))})),function(e){var t=e.formSelector,n=e.inputSelector,o=e.submitButtonSelector,r=e.inactiveButtonClass,c=e.inputErrorClass,a=e.errorClass;function i(e,t,n){var o=e.querySelector(".".concat(t.id,"-error"));0===t.value.length?o.textContent="Вы пропустили это поле.":o.textContent=n,o.classList.add(a),t.classList.add(c)}function u(e){var t=Array.from(e.querySelectorAll(n)),u=e.querySelector(o);t.forEach((function(n){n.addEventListener("input",(function(){(function(e,t){var n=t.dataset.errorMessage;console.log(t.validity.patternMismatch),t.validity.patternMismatch?i(e,t,n):t.validity.valid?function(e,t){var n=e.querySelector(".".concat(t.id,"-error"));n.textContent="",n.classList.remove(a),t.classList.remove(c)}(e,t):i(e,t,t.validationMessage)})(e,n),function(e,t){!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?t.classList.remove(r):t.classList.add(r)}(t,u)}))}))}Array.from(document.querySelectorAll(t)).forEach((function(e){u(e)}))}(x)})();