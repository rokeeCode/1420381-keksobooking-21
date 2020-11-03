(()=>{"use strict";(()=>{const e=function(e=0,t=100){return Math.floor(Math.random()*(t-e))+e};window.utils={Key:{ENTER:"Enter",ESC:"Escape",MOUSE_LEFT_BUTTON:1},PIN_PARAM:{width:50,height:70},getRandomInt:e,getRandomElement:t=>t[e(0,t.length)],getRandomLocation:(t,o)=>e(t.width/2,o.clientWidth-t.width/2),getRandomLengthString:t=>t.slice(0,e(1,t.length)),showListElements:(e,t)=>{const o=document.createDocumentFragment();for(let n of e)o.append(t(n));return o},endingsGenerator:(e,t)=>{const o=[];return o[e]||(o[e]=e%100>4&&e%100<20?2:[2,0,1,1,1,2][Math.min(e%10,5)]),`${e} ${t[o[e]]}`},deleteNode:e=>{const t=document.querySelector(e);t&&t.remove()},hasExtension:(e,t)=>{const o=e.value;return new RegExp("("+t.join("|").replace(/\./g,"\\.")+")$").test(o)},errorHandler:e=>{const t=document.createElement("div");t.style.position="fixed",t.style.top="40%",t.style.left="50%",t.style.width="300px",t.style.height="200px",t.style.marginLeft="-150px",t.style.padding="30px",t.style.fontSize="30px",t.style.backgroundColor="red",t.style.zIndex="100",t.style.color="#fff",t.style.textAlign="center",t.textContent=e,document.body.insertAdjacentElement("afterbegin",t)},removeList:(e,t)=>{const o=document.querySelectorAll(e);t();for(let e=1;e<o.length;e++)o[e].remove()},getElementCords:(e,t,o)=>({left:e.offsetLeft+t/2,top:e.offsetTop+o}),showServerStatus:(e,t)=>{const o=e.cloneNode(!0),n=o.querySelector(".error__button"),r=document.querySelector(".ad-form__submit");t.append(o);const s=e=>{e.target.parentNode!==o&&(o.remove(),r.disabled=!1),document.removeEventListener("keydown",d)},d=e=>{e.key===window.utils.Key.ESC&&(o.remove(),r.disabled=!1),document.removeEventListener("keydown",d),document.removeEventListener("click",s)};n&&n.addEventListener("click",(()=>{o.remove(),r.disabled=!1})),document.addEventListener("keydown",d),o.addEventListener("click",s)},contains:(e,t)=>t.every((t=>e.includes(t))),endMatches:(e,t)=>e.some((e=>t.endsWith(e)))}})(),(()=>{const e="https://21.javascript.pages.academy/keksobooking/data",t="https://21.javascript.pages.academy/keksobooking";window.backend={load:(t,o)=>{const n=new XMLHttpRequest;n.responseType="json",n.open("GET",e),n.addEventListener("load",(()=>{switch(n.status){case 200:t(n.response);break;case 400:o(`Ошибка в запросе! ${n.status} ${n.statusText}`);break;case 404:o(`Страница не найдена! ${n.status} ${n.statusText}`);break;case 500:o(`Серверная ошибка! Попробуйте позже. ${n.status} ${n.statusText}`);break;default:o(`Статус ответа: ${n.status} ${n.statusText}`)}})),n.addEventListener("error",(()=>{o("Ошибка! Проверьте Ваше соединение с интернетом!")})),n.send()},send:(e,o,n)=>{const r=new XMLHttpRequest;r.responseType="json",r.addEventListener("load",(()=>{switch(r.status){case 200:o(r.response);break;case 400:n(`Ошибка в запросе! ${r.status} ${r.statusText}`);break;case 404:n(`Страница не найдена! ${r.status} ${r.statusText}`);break;case 500:n(`Серверная ошибка! Попробуйте позже. ${r.status} ${r.statusText}`);break;default:n(`Статус ответа: ${r.status} ${r.statusText}`)}})),r.open("POST",t),r.send(e)}}})(),window.move={doMove:(e,t)=>{e.addEventListener("mousedown",(function(o){o.preventDefault();let n={x:o.clientX,y:o.clientY},r=!1;const s=function(o){o.preventDefault();let s=n.x-o.clientX,d=n.y-o.clientY;r=!0,n={x:o.clientX,y:o.clientY},e.style.top=e.offsetTop-d+"px",e.style.left=e.offsetLeft-s+"px",t()},d=function(t){if(t.preventDefault(),r){const t=function(o){o.preventDefault(),e.removeEventListener("click",t)};e.addEventListener("click",t)}document.removeEventListener("mousemove",s),document.removeEventListener("mouseup",d)};document.addEventListener("mousemove",s),document.addEventListener("mouseup",d)}))}},(()=>{const e=document.querySelector("#card").content.querySelector(".popup"),t=document.querySelector(".map__pins"),o=document.querySelector(".map__filters-container"),n={flat:"Квартира",bungalow:"Бунгало",house:"Дом",palace:"Дворец"},r=()=>{window.utils.deleteNode(".map__card"),document.removeEventListener("keydown",s)},s=e=>{e.key===window.utils.Key.ESC&&r()};t.addEventListener("click",(e=>{const t=document.querySelectorAll(".map__pin:not(.map__pin--main)");for(let r=0;r<t.length;r++)e.target!==t[r]&&e.target.parentNode!==t[r]||(window.utils.deleteNode(".map__card"),n=r,o.insertAdjacentElement("beforebegin",window.card.renderCard(window.state[n])));var n})),window.card={renderCard:t=>{const o=e.cloneNode(!0),d=o.querySelector(".popup__avatar"),i=o.querySelector(".popup__title"),a=o.querySelector(".popup__text--address"),c=o.querySelector(".popup__text--price"),l=o.querySelector(".popup__type"),u=o.querySelector(".popup__text--capacity"),p=o.querySelector(".popup__text--time"),m=o.querySelector(".popup__features"),w=o.querySelector(".popup__description"),f=o.querySelector(".popup__photos"),y=o.querySelector(".popup__close");return d.src=t.author.avatar,a.textContent=t.offer.address,c.textContent=t.offer.price+"₽/ночь",l.textContent=n[t.offer.type],u.textContent=`${window.utils.endingsGenerator(t.offer.rooms,["комната","комнаты","комнат"])}\n    для ${window.utils.endingsGenerator(t.offer.guests,["гостя","гостей","гостей"])}`,p.textContent=`Заезд после ${t.offer.checkin}, выезд до ${t.offer.checkout}`,m.innerHTML="",m.append(window.utils.showListElements(t.offer.features,(e=>{const t=document.createElement("li");return t.className="popup__feature popup__feature--"+e,t}))),w.textContent=t.offer.description,f.innerHTML="",f.append(window.utils.showListElements(t.offer.photos,(e=>{const t=document.createElement("img");return t.className="popup__photo",t.width="45",t.src=e,t}))),i.textContent=t.offer.title,y.addEventListener("click",r),document.addEventListener("keydown",s),o},deleteCards:()=>{window.utils.removeList(".map__pin",(()=>{window.utils.deleteNode(".map__card")}))}}})(),(()=>{const e=document.querySelector(".ad-form").querySelector("#address"),t=document.querySelector(".map__pin--main"),o=document.querySelector("#timein"),n=document.querySelector("#timeout");o.addEventListener("change",(()=>{n.value=o.value})),n.addEventListener("change",(()=>{o.value=n.value})),e.value=`${t.offsetLeft}, ${t.offsetTop}`,window.form={disabledForm:(e,t=!0)=>{for(let o of e.children)o.disabled=t?"disabled":""},changeAddressInput:()=>{const o=window.utils.getElementCords(t,window.utils.PIN_PARAM.width,window.utils.PIN_PARAM.height);e.value=`${o.left}, ${o.top}`},checkRoomValidity:()=>{const e=document.querySelector("#room_number"),t=document.querySelector("#capacity");!{1:[1],2:[1,2],3:[1,2,3],100:[0]}[e.value].includes(parseInt(t.value,10))?e.setCustomValidity("\n      1 комната — «для 1 гостя»;\n      2 комнаты — «для 2 гостей» или «для 1 гостя»;\n      3 комнаты — «для 3 гостей», «для 2 гостей» или «для 1 гостя»;\n      100 комнат — «не для гостей».\n      "):e.setCustomValidity("")},typeOfHouses:()=>{const e=document.querySelector("#type");document.querySelector("#price").setAttribute("min",{bungalow:0,flat:1e3,house:5e3,palace:1e4}[e.value])}}})(),(()=>{const e=document.querySelector(".map__filters");let t=[];window.backend.load((e=>{t=e}),window.utils.errorHandler),window.map={updatePins:()=>{window.card.deleteCards(),window.filter.getFilterInfo(t),window.form.disabledForm(e,!1)}}})(),(()=>{const e=document.querySelector("#pin").content.querySelector(".map__pin"),t=document.querySelector(".map__pins"),o=function(t){const o=e.cloneNode(!0),n=o.querySelector("img");return o.style.left=t.location.x+"px",o.style.top=t.location.y+"px",n.src=t.author.avatar,o};window.pin={renderPin:o,renderPinsElements:e=>{const n=e.length<5?e.length:5,r=document.createDocumentFragment();for(let t=0;t<n;t++)r.appendChild(o(e[t]));t.appendChild(r)}}})(),(()=>{const e=document.querySelector(".ad-form"),t=document.querySelector(".map__filters"),o=document.querySelector(".map__pin--main"),n=document.querySelector(".map__pins"),r=document.querySelector(".map__overlay"),s=document.querySelector("#success").content.querySelector(".success"),d=document.querySelector("#error").content.querySelector(".error"),i=document.querySelector(".ad-form__reset"),a=document.querySelector(".ad-form__submit"),c=()=>{window.card.deleteCards(),window.form.disabledForm(e),window.form.disabledForm(t),n.classList.add("map--faded"),e.classList.add("ad-form--disabled"),e.reset(),t.reset(),u()},l=()=>{window.form.disabledForm(e,!1),n.classList.remove("map--faded"),e.classList.remove("ad-form--disabled"),window.map.updatePins()};o.addEventListener("mousedown",(e=>{e.buttons===window.utils.Key.MOUSE_LEFT_BUTTON&&l()}));const u=()=>{o.style.top="375px",o.style.left="570px"};window.move.doMove(o,(()=>{(()=>{const e=window.utils.getElementCords(o,window.utils.PIN_PARAM.width,window.utils.PIN_PARAM.height);o.offsetTop>=630?o.style.top="630px":o.offsetTop<=130&&(o.style.top="130px"),e.left<=0?o.style.left=0-window.utils.PIN_PARAM.width/2+"px":e.left>r.offsetWidth&&(o.style.left=r.offsetWidth-window.utils.PIN_PARAM.width/2+"px")})(),window.form.changeAddressInput()})),o.addEventListener("keydown",(function(e){e.key===window.utils.Key.ENTER&&(l(),window.form.changeAddressInput())}));const p=()=>{window.utils.showServerStatus(s,e),c()},m=()=>{window.utils.showServerStatus(d,e)};e.addEventListener("submit",(t=>{window.form.checkRoomValidity(),window.form.typeOfHouses(),a.disabled=!0,window.backend.send(new FormData(e),p,m),t.preventDefault()})),i.addEventListener("click",(()=>{c()})),c()})(),window.debounce=function(e){let t=null;return function(...o){t&&window.clearTimeout(t),t=window.setTimeout((function(){e(...o)}),500)}},(()=>{const e=document.querySelector("#avatar"),t=document.querySelector(".ad-form-header__preview img"),o=document.querySelector("#images"),n=document.querySelector(".ad-form__photo"),r=["gif","jpg","jpeg","png"],s=(e,t)=>{const o=e.files[0],n=o.name.toLowerCase();if(window.utils.endMatches(r,n)){const e=new FileReader;e.addEventListener("load",(()=>{t(e)})),e.readAsDataURL(o)}};e.addEventListener("change",(()=>{s(e,(e=>{t.src=e.result}))})),o.addEventListener("change",(()=>{s(o,(e=>{n.style.backgroundImage=`url(${e.result})`,n.style.backgroundPosition="center center",n.style.backgroundSize="100%"}))}))})(),(()=>{const e=document.querySelector(".map__filters");e.style.opacity="1",window.filter={getFilterInfo:t=>{const o=document.querySelector("#housing-type"),n=document.querySelector("#housing-price"),r=document.querySelector("#housing-rooms"),s=document.querySelector("#housing-guests"),d=e.querySelectorAll('[name="features"]');window.state=t;const i=(e,t)=>{const i={type:{any:a=e,palace:a.filter((e=>"palace"===e.offer.type)),flat:a.filter((e=>"flat"===e.offer.type)),house:a.filter((e=>"house"===e.offer.type)),bungalow:a.filter((e=>"bungalow"===e.offer.type))},price:{any:a,middle:a.filter((e=>e.offer.price<1e4||e.offer.price<5e4?e:"")),low:a.filter((e=>e.offer.price<1e4?e:"")),high:a.filter((e=>e.offer.price>5e4?e:""))},room:{any:a,1:a.filter((e=>1===e.offer.rooms)),2:a.filter((e=>2===e.offer.rooms)),3:a.filter((e=>3===e.offer.rooms))},guests:{any:a,2:a.filter((e=>2===e.offer.guests)),1:a.filter((e=>1===e.offer.guests)),0:a.filter((e=>0===e.offer.guests))}};var a;switch(t){case"type":window.state=i.type[o.value];break;case"price":window.state=i.price[n.value];break;case"room":window.state=i.room[r.value];break;case"guest":window.state=i.guests[s.value];break;case"features":(e=>{let t=[];d.forEach((e=>{e.checked&&t.push(e.defaultValue)}));const o=[];e.forEach((e=>{window.utils.contains(e.offer.features,t)&&o.push(e)})),window.state=o})(e)}};window.pin.renderPinsElements(window.state);const a=window.debounce((()=>{window.state=t,i(window.state,"type"),i(window.state,"price"),i(window.state,"room"),i(window.state,"guest"),i(window.state,"features"),window.card.deleteCards(),window.debounce(window.pin.renderPinsElements(window.state))}));e.addEventListener("change",a)}}})()})();