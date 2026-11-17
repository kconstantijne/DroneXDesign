const componentData={
 frame:{title:"Рама",text:"Рама — несуча основа дрона. Вона утримує двигуни, електроніку та інші вузли, задає геометрію конструкції й допомагає захистити компоненти.",fact:"Матеріал і конструкція рами впливають на масу, жорсткість і ремонтопридатність апарата."},
 motors:{title:"Безколекторні двигуни",text:"Двигуни перетворюють електричну енергію на обертання. Разом із пропелерами вони створюють тягу, необхідну для руху та утримання апарата в повітрі.",fact:"У квадрокоптера чотири двигуни, а зміна їхньої швидкості допомагає змінювати положення та напрям руху."},
 props:{title:"Пропелери",text:"Пропелери — це лопаті, які під час обертання взаємодіють із повітрям і створюють тягу. Їхні розмір, форма та стан впливають на характеристики системи.",fact:"Навіть невелике пошкодження пропелера може спричинити вібрації, тому його стан перевіряють перед будь-якою практикою."},
 controller:{title:"Контролер польоту",text:"Контролер польоту — електронний обчислювальний модуль. Він отримує дані сенсорів, обробляє команди та координує роботу систем дрона.",fact:"Контролер часто містить датчики, які допомагають визначати обертання та прискорення апарата."},
 camera:{title:"FPV-камера",text:"FPV-камера передає зображення з борту дрона на наземний екран або окуляри. Вона дає пілоту візуальне уявлення про оточення.",fact:"FPV означає First Person View — «вид від першої особи»."},
 battery:{title:"Акумулятор",text:"Акумулятор є джерелом електроенергії для силової установки та бортової електроніки. Його параметри мають відповідати вимогам конкретної моделі.",fact:"Літій-полімерні акумулятори потребують уважного поводження, правильного заряджання та нагляду дорослого."},
 antenna:{title:"Антена",text:"Антена є частиною радіосистеми. Вона допомагає передавати або приймати сигнали зв'язку між бортовим обладнанням і наземною системою.",fact:"Якість радіозв'язку залежить не лише від антени, а й від перешкод, умов середовища та сумісності обладнання."}
};
const componentGrid=document.querySelector("#componentGrid");
if(componentGrid){
 const cards=[...componentGrid.querySelectorAll(".component-card")];
 cards.forEach((card,index)=>card.addEventListener("click",()=>{
  cards.forEach(c=>c.classList.remove("active"));card.classList.add("active");
  const item=componentData[card.dataset.key];
  document.querySelector("#detailNumber").textContent=String(index+1).padStart(2,"0");
  document.querySelector("#detailTitle").textContent=item.title;
  document.querySelector("#detailText").textContent=item.text;
  document.querySelector("#detailFact").textContent="Цікавий факт: "+item.fact;
 }));
}
const trajectoryData={
 straight:{icon:"↗",title:"Прямолінійна",text:"Рух відбувається вздовж прямої лінії. Це найпростіша модель для пояснення напрямку та відстані.",path:"M10 70L170 20"},
 curve:{icon:"⌁",title:"Криволінійна",text:"Шлях змінює напрям і утворює плавну криву. Така форма траєкторії часто трапляється під час зміни напрямку руху.",path:"M10 65 C45 0 95 100 170 22"},
 loop:{icon:"◎",title:"Замкнена",text:"Траєкторія повертається до початкової точки або проходить замкнений контур. Це зручна модель для пояснення руху по колу.",path:"M90 8 C165 8 165 82 90 82 C15 82 15 8 90 8"},
 mixed:{icon:"⌁",title:"Комбінована",text:"Складається з кількох ділянок різної форми. Вона допомагає описати складний маршрут на схемі або в навчальній симуляції.",path:"M10 70 L55 20 Q85 0 105 45 L145 15 L170 60"}
};
document.querySelectorAll(".route-tab").forEach(tab=>tab.addEventListener("click",()=>{
 document.querySelectorAll(".route-tab").forEach(t=>t.classList.remove("active"));tab.classList.add("active");
 const item=trajectoryData[tab.dataset.tab];
 document.querySelector("#trajectoryIcon").textContent=item.icon;
 document.querySelector("#trajectoryTitle").textContent=item.title;
 document.querySelector("#trajectoryText").textContent=item.text;
 document.querySelector("#miniPath path").setAttribute("d",item.path);
}));
const factorData={
 weather:{icon:"☁",title:"Погодні умови",text:"Пориви вітру можуть змінювати рух об'єкта, а опади та погана видимість ускладнюють спостереження. Навчальні польоти планують лише за дозволених і безпечних умов."},
 energy:{icon:"ϟ",title:"Енергозабезпечення",text:"Стан акумулятора впливає на доступний час роботи та стабільність системи. Перед практичними заняттями його стан перевіряють за інструкцією виробника."},
 mass:{icon:"⬡",title:"Маса системи",text:"Загальна маса апарата та встановленого обладнання впливає на навантаження силової системи. Будь-які зміни конструкції мають оцінюватися фахівцем."},
 environment:{icon:"⌁",title:"Навколишнє середовище",text:"Будівлі, дерева, лінії електропередач та інші перешкоди впливають на безпеку й можуть погіршувати зв'язок. Місце для навчання обирають лише в дозволеній зоні."}
};
document.querySelectorAll(".factor-card").forEach(card=>card.addEventListener("click",()=>{
 document.querySelectorAll(".factor-card").forEach(c=>c.classList.remove("active"));card.classList.add("active");
 const item=factorData[card.dataset.factor];
 document.querySelector("#factorIcon").textContent=item.icon;
 document.querySelector("#factorTitle").textContent=item.title;
 document.querySelector("#factorText").textContent=item.text;
}));
document.querySelectorAll("[data-reveal]").forEach(button=>button.addEventListener("click",()=>{
 const target=document.getElementById(button.dataset.reveal);target.hidden=!target.hidden;
 button.textContent=target.hidden?"Показати приклад ↗":"Приховати приклад ↑";
}));
document.querySelector("#year").textContent=new Date().getFullYear();
const menu=document.querySelector("#menuToggle");if(menu)menu.addEventListener("click",()=>document.querySelector(".nav").classList.toggle("open"));
