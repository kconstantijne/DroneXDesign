const $=(s,root=document)=>root.querySelector(s);
const $$=(s,root=document)=>[...root.querySelectorAll(s)];
const STORAGE_KEY="labspace-content-v1";
const projectGrid=$("#projectGrid");
const toast=$("#toast");
let editing=false;
let originalHTML="";

$("#year").textContent=new Date().getFullYear();

function showToast(message){
  toast.textContent=message;toast.classList.add("show");
  window.clearTimeout(showToast.timer);
  showToast.timer=window.setTimeout(()=>toast.classList.remove("show"),2600);
}

// Restore saved text and project cards on this device.
function restoreSaved(){
  try{
    const saved=JSON.parse(localStorage.getItem(STORAGE_KEY)||"{}");
    if(saved.texts) $$("[data-editable]").forEach((el,i)=>{if(saved.texts[i]!==undefined)el.innerHTML=saved.texts[i]});
    if(saved.projects) projectGrid.innerHTML=saved.projects;
  }catch(error){console.warn("Не вдалося завантажити локальні зміни",error)}
}
restoreSaved();

// Navigation for small screens.
$("#menuToggle").addEventListener("click",()=>$(".nav").classList.toggle("open"));
$$(".nav a").forEach(a=>a.addEventListener("click",()=>$(".nav").classList.remove("open")));

// Project filters.
$$(".filter").forEach(button=>button.addEventListener("click",()=>{
  $$(".filter").forEach(b=>b.classList.remove("active"));
  button.classList.add("active");
  const filter=button.dataset.filter;
  $$(".project-card",projectGrid).forEach(card=>card.hidden=filter!=="all"&&card.dataset.category!==filter);
}));

function setEditing(value){
  editing=value;document.body.classList.toggle("editing",editing);
  $$("[data-editable]").forEach(el=>el.contentEditable=editing?"true":"false");
  if(!editing) $$("[data-editable]").forEach(el=>el.removeAttribute("contenteditable"));
  $("#editToggle").textContent=editing?"✎ Режим активний":"✎ Редагувати";
}
$("#editToggle").addEventListener("click",()=>{
  if(!editing) originalHTML=document.body.innerHTML;
  setEditing(!editing);
});
$("#saveEdits").addEventListener("click",()=>{
  const texts=$$("[data-editable]").map(el=>el.innerHTML);
  const projects=projectGrid.innerHTML;
  localStorage.setItem(STORAGE_KEY,JSON.stringify({texts,projects}));
  setEditing(false);showToast("Зміни збережено на цьому пристрої.");
});
$("#cancelEdits").addEventListener("click",()=>{
  if(confirm("Вийти без збереження змін? Перезавантажити сторінку?")){
    setEditing(false);location.reload();
  }
});

// Add a project card while editing.
$("#addProject").addEventListener("click",()=>{
  const title=prompt("Назва проєкту:");
  if(!title)return;
  const category=prompt("Напрям: введіть sky для «Вартові неба» або refly для Re:Fly","refly");
  const valid=category==="sky"?"sky":"refly";
  const description=prompt("Короткий опис проєкту:","Навчальна або творча робота учасників гуртка.")||"";
  const card=document.createElement("article");
  card.className="project-card";card.dataset.category=valid;
  card.innerHTML=`<div class="project-visual ${valid==="sky"?"visual-blue":"visual-pink"}"><span class="visual-index">NEW</span><div class="${valid==="sky"?"blueprint-drone":"poster-word"}">${valid==="sky"?"✳":"CREATE"}</div><span class="visual-caption">${valid==="sky"?"FLIGHT / STUDY":"VISUAL / DESIGN"}</span></div><div class="project-info"><div><span class="project-type">${valid==="sky"?"ВАРТОВІ НЕБА":"REFLY"}</span><h3 data-editable></h3></div><span class="project-arrow">↗</span><p data-editable></p></div>`;
  $("h3",card).textContent=title;$("p",card).textContent=description;
  projectGrid.append(card);
  $$("[data-editable]",card).forEach(el=>el.contentEditable="true");
  showToast("Проєкт додано. Натисни «Зберегти зміни».");
});


// Works & achievements carousel: buttons, dots, keyboard and touch swipe.
const achievementTrack=$("#achievementTrack");
if(achievementTrack){
  const achievementSlides=$$(".achievement-slide",achievementTrack);
  const achievementDots=$$(".achievement-dot");
  const achievementCounter=$("#achievementCounter");
  let achievementIndex=0;
  const showAchievement=(index)=>{
    achievementIndex=(index+achievementSlides.length)%achievementSlides.length;
    achievementTrack.style.transform=`translateX(-${achievementIndex*100}%)`;
    achievementSlides.forEach((slide,i)=>{
      const active=i===achievementIndex;
      slide.classList.toggle("is-active",active);
      slide.setAttribute("aria-hidden",active?"false":"true");
      slide.setAttribute("aria-label",`${i+1} з ${achievementSlides.length}`);
    });
    achievementDots.forEach((dot,i)=>{
      const active=i===achievementIndex;
      dot.classList.toggle("active",active);
      if(active)dot.setAttribute("aria-current","true");else dot.removeAttribute("aria-current");
    });
    if(achievementCounter)achievementCounter.innerHTML=`${String(achievementIndex+1).padStart(2,"0")} <i>/</i> ${String(achievementSlides.length).padStart(2,"0")}`;
  };
  $("#achievementPrev")?.addEventListener("click",()=>showAchievement(achievementIndex-1));
  $("#achievementNext")?.addEventListener("click",()=>showAchievement(achievementIndex+1));
  achievementDots.forEach(dot=>dot.addEventListener("click",()=>showAchievement(Number(dot.dataset.slide))));
  achievementTrack.addEventListener("keydown",event=>{
    if(event.key==="ArrowLeft")showAchievement(achievementIndex-1);
    if(event.key==="ArrowRight")showAchievement(achievementIndex+1);
  });
  let touchStartX=0;
  achievementTrack.addEventListener("touchstart",event=>{touchStartX=event.changedTouches[0].screenX},{passive:true});
  achievementTrack.addEventListener("touchend",event=>{
    const delta=event.changedTouches[0].screenX-touchStartX;
    if(Math.abs(delta)>45)showAchievement(achievementIndex+(delta<0?1:-1));
  },{passive:true});
  showAchievement(0);
}

// Basic keyboard accessibility for card-like controls.
$$(".filter").forEach(b=>b.setAttribute("aria-pressed",b.classList.contains("active")?"true":"false"));
