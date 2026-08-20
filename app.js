
const L={"سوريا":[["حمص","Homs"],["دمشق","Damascus"],["حلب","Aleppo"],["حماة","Hama"],["اللاذقية","Latakia"],["طرطوس","Tartus"],["إدلب","Idlib"],["درعا","Daraa"],["السويداء","As-Suwayda"],["دير الزور","Deir ez-Zor"],["الرقة","Raqqa"],["الحسكة","Al-Hasakah"],["القامشلي","Qamishli"]],"السعودية":[["الرياض","Riyadh"],["جدة","Jeddah"],["مكة المكرمة","Mecca"],["المدينة المنورة","Medina"],["الدمام","Dammam"],["الخبر","Khobar"],["الظهران","Dhahran"],["الطائف","Taif"],["أبها","Abha"],["خميس مشيط","Khamis Mushait"],["تبوك","Tabuk"],["بريدة","Buraydah"],["عنيزة","Unaizah"],["حائل","Hail"],["جازان","Jazan"]],"الأردن":[["عمّان","Amman"],["الزرقاء","Zarqa"]],"تركيا":[["قيصري","Kayseri"],["إسطنبول","Istanbul"]]};
const C={"سوريا":"Syria","السعودية":"Saudi Arabia","الأردن":"Jordan","تركيا":"Turkey"},M={"سوريا":5,"السعودية":4,"الأردن":23,"تركيا":13};
const P=[
["وَقُولُوا لِلنَّاسِ حُسْنًا","سورة البقرة، الآية 83","قال رسول الله ﷺ: «الكلمة الطيبة صدقة».","متفق عليه","الكلمة الحسنة قد تفتح قلبًا، وتخفف همًّا، وتترك أثرًا أجمل مما نتوقع.","اللهم ارزقنا طيب الكلام، ولين القلب، وحسن الأثر في الناس."],
["وَالْكَاظِمِينَ الْغَيْظَ وَالْعَافِينَ عَنِ النَّاسِ","سورة آل عمران، الآية 134","قال رسول الله ﷺ: «ليس الشديد بالصرعة، إنما الشديد الذي يملك نفسه عند الغضب».","متفق عليه","القوة الحقيقية أن نملك ردّنا عندما نغضب، فلا نفسد بكلمة ما بنيناه في سنوات.","اللهم ارزقنا حلمًا عند الغضب، وعفوًا عند المقدرة، وسلامًا في القلوب."],
["وَلَا تَنسَوُا الْفَضْلَ بَيْنَكُمْ","سورة البقرة، الآية 237","قال رسول الله ﷺ: «لا يشكر الله من لا يشكر الناس».","رواه أبو داود","الخلاف لا ينبغي أن يمحو تاريخًا من المعروف؛ من الوفاء أن نتذكر الفضل حتى عندما تتغير الظروف.","اللهم ارزقنا الوفاء، وحفظ الجميل، ونقاء القلب من الجحود."],
["وَقُل رَّبِّ زِدْنِي عِلْمًا","سورة طه، الآية 114","قال رسول الله ﷺ: «من سلك طريقًا يلتمس فيه علمًا سهل الله له به طريقًا إلى الجنة».","رواه مسلم","التعلم لا يرتبط بعمر أو منصب؛ كل معرفة نافعة تزيد قدرتنا على الفهم والإحسان.","اللهم علّمنا ما ينفعنا، وانفعنا بما علّمتنا، وزدنا علمًا وحكمة."],
["ادْفَعْ بِالَّتِي هِيَ أَحْسَنُ","سورة فصلت، الآية 34","قال رسول الله ﷺ: «إن الرفق لا يكون في شيء إلا زانه، ولا ينزع من شيء إلا شانه».","رواه مسلم","الرد الهادئ لا يعني الضعف؛ أحيانًا تكون ألطف إجابة هي أقوى طريقة لإيقاف دائرة الإساءة.","اللهم ارزقنا الرفق في القول والعمل، وجمّل به أخلاقنا."]
];
const N=[["Fajr","الفجر"],["Sunrise","الشروق"],["Dhuhr","الظهر"],["Asr","العصر"],["Maghrib","المغرب"],["Isha","العشاء"]];
let pi=(new Date().getDate()-1)%P.length,times={};
const $=x=>document.getElementById(x);
function fit(){let w=$("viewport").clientWidth;$("card").style.transform=`scale(${w/1024})`;$("viewport").style.height=(1536*w/1024)+"px"} addEventListener("resize",fit);
function countries(){$("country").innerHTML=Object.keys(L).map(x=>`<option>${x}</option>`).join("");$("country").value=localStorage.dc||"سوريا";cities()}
function cities(){let c=$("country").value;$("city").innerHTML=L[c].map(x=>`<option value="${x[1]}">${x[0]}</option>`).join("");let s=localStorage.dcity;if(s&&L[c].some(x=>x[1]==s))$("city").value=s;loc()}
function loc(){let c=$("country").value,x=L[c].find(z=>z[1]==$("city").value);$("loc").textContent=x?x[0]:$("city").value}
function pack(){let p=P[pi];[["verse",0],["vref",1],["hadith",2],["href",3],["benefit",4],["dua",5]].forEach(x=>$(x[0]).textContent=p[x[1]]);["ve","vr","he","hr","be","de"].forEach((id,i)=>$(id).value=p[i])}
function renderTimes(){$("prayers").innerHTML=N.map(([k,n])=>`<div class="pr"><div class="pn">${n}</div><div class="pt">${times[k]||"--:--"}</div></div>`).join("")}
async function load(){loc();localStorage.dc=$("country").value;localStorage.dcity=$("city").value;try{let d=$("date").value.split("-").reverse().join("-"),u=`https://api.aladhan.com/v1/timingsByCity/${d}?city=${encodeURIComponent($("city").value)}&country=${encodeURIComponent(C[$("country").value])}&method=${M[$("country").value]}`,j=await (await fetch(u)).json();N.forEach(([k])=>times[k]=j.data.timings[k].split(" ")[0]);$("day").textContent=j.data.date.gregorian.weekday.ar;$("greg").textContent=`${j.data.date.gregorian.day} ${j.data.date.gregorian.month.ar} ${j.data.date.gregorian.year}`;renderTimes();$("status").textContent="تم تحديث البطاقة والمواقيت."}catch(e){$("status").textContent="تعذر جلب المواقيت الآن. افتح النسخة عبر Safari/GitHub Pages."}}
$("country").onchange=()=>{localStorage.removeItem("dcity");cities();load()};$("city").onchange=load;$("date").onchange=load;
$("name").oninput=()=>{$("sig").textContent=$("name").value;localStorage.dname=$("name").value};
[["ve","verse"],["vr","vref"],["he","hadith"],["hr","href"],["be","benefit"],["de","dua"]].forEach(([a,b])=>$(a).oninput=()=>$(b).textContent=$(a).value);
$("next").onclick=()=>{pi=(pi+1)%P.length;pack()};
async function shot(){let c=$("card"),t=c.style.transform;c.style.transform="none";await document.fonts.ready;let x=await html2canvas(c,{width:1024,height:1536,scale:1.5,useCORS:true,logging:false});c.style.transform=t;return x}
async function file(){let x=await shot(),b=await new Promise(r=>x.toBlob(r,"image/png",.96));return new File([b],`nafahat-${$("date").value}.png`,{type:"image/png"})}
$("save").onclick=async()=>{let f=await file(),a=document.createElement("a");a.href=URL.createObjectURL(f);a.download=f.name;a.click()};
$("share").onclick=async()=>{let f=await file();if(navigator.canShare&&navigator.canShare({files:[f]}))await navigator.share({files:[f],title:"نفحات يومية"});else $("save").click()};
$("theme").onclick=()=>{document.body.classList.toggle("alt");$("status").textContent="هذه النسخة تثبّت أولًا الشكل المعتمد؛ سنضيف مكتبة التصاميم بعد اعتمادها."};
let d=new Date();$("date").value=`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;
$("name").value=localStorage.dname||"";$("sig").textContent=$("name").value;countries();pack();renderTimes();fit();load();
