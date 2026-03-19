// ===============================
// AKHANDVERSE FINAL APP ENGINE (LOCKED)
// ROOT STRUCTURE + SECURITY + PERFORMANCE
// ===============================


// ===== DRAWER CONTROL =====
function toggleDrawer(){
  document.getElementById("drawer").classList.add("active");
  document.getElementById("overlay").classList.add("active");

  // 🔒 LOCK BODY SCROLL
  document.body.classList.add("drawer-open");
}

function closeDrawer(){
  document.getElementById("drawer").classList.remove("active");
  document.getElementById("overlay").classList.remove("active");

  // 🔓 UNLOCK BODY SCROLL
  document.body.classList.remove("drawer-open");
}


// ===== QUERY PARAM =====
function getQueryParam(param){
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}


// ===== CATEGORY MAP =====
const categoryMap = {
  "temples":"Temples",
  "bhajan":"Bhajan",
  "scriptures":"Scriptures",
  "learning":"Learning",
  "yoga":"Yoga",
  "gurus":"Gurus",
  "philosophy":"Philosophy",
  "festivals":"Festivals",
  "shopping":"Shopping",
  "media":"Media",
  "kids":"Kids",
  "community":"Community",
  "astrology":"Astrology",
  "ayurveda":"Ayurveda"
};


// ===== LOAD JSON =====
async function loadPlatforms(){
  try{
    const res = await fetch("platforms.json");

    if(!res.ok){
      throw new Error("HTTP error " + res.status);
    }

    return await res.json();

  }catch(e){
    console.error("❌ JSON LOAD ERROR:", e);
    return [];
  }
}


// ===== RENDER TITLE =====
function renderCategoryTitle(type){
  const title = categoryMap[type] || "Category";

  const titleEl = document.getElementById("categoryTitle");
  const pageTitle = document.getElementById("pageTitle");

  if(titleEl) titleEl.innerText = title;
  if(pageTitle) pageTitle.innerText = title;
}


// ===== CTA TEXT =====
function getCTA(category){
  switch(category){
    case "temples":
      return "🛕 Visit / Darshan";

    case "bhajan":
      return "🎧 Listen Bhajan";

    case "scriptures":
      return "📖 Read Text";

    case "learning":
      return "🎓 Start Learning";

    case "yoga":
      return "🧘 Practice Now";

    case "gurus":
      return "🙏 Explore Teachings";

    case "philosophy":
      return "🧠 Read Insights";

    case "festivals":
      return "📅 View Details";

    case "shopping":
      return "🛍 Explore Store";

    case "media":
      return "🎥 Watch Now";

    case "kids":
      return "👶 Explore Stories";

    case "community":
      return "🌍 Join Community";

    case "astrology":
      return "🔮 Check Now";

    case "ayurveda":
      return "🌿 Explore Health";

    default:
      return "🌐 Open Platform";
  }
}


// ===== CREATE CARD =====
function createCard(item){
  return `
    <div class="list-card">

      <div class="list-title">${item.name}</div>

      <div class="list-desc">
        ${item.description}
      </div>

      <a href="${item.url}" target="_blank" class="btn">
        ${getCTA(item.category)}
      </a>

    </div>
  `;
}


// ===== RENDER PLATFORMS =====
async function renderPlatforms(){

  const type = getQueryParam("type");

  if(!type){
    console.warn("⚠️ No category type found");
    return;
  }

  renderCategoryTitle(type);

  const data = await loadPlatforms();

  const container = document.getElementById("platformContainer");

  if(!container){
    console.warn("⚠️ Container not found");
    return;
  }

  const filtered = data.filter(item => item.category === type);

  if(filtered.length === 0){
    container.innerHTML = `
      <div class="glass-card">
        <div class="card-title">No Platforms Found</div>
        <div class="card-desc">
          Platforms will be added soon.
        </div>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(createCard).join("");
}


// ===============================
// 🔒 SECURITY + UX PROTECTION
// ===============================

// 🚫 PINCH ZOOM BLOCK
document.addEventListener("gesturestart", function (e){
  e.preventDefault();
});

// 🚫 DOUBLE TAP ZOOM BLOCK
document.addEventListener("dblclick", function (e){
  e.preventDefault();
});

// 🚫 CTRL + SCROLL ZOOM (DESKTOP)
document.addEventListener("wheel", function(e){
  if(e.ctrlKey){
    e.preventDefault();
  }
},{ passive:false });


// ===============================
// 🔄 BACK/FORWARD CACHE FIX
// ===============================
window.addEventListener("pageshow", function(event){
  if(event.persisted){
    window.location.reload();
  }
});


// ===============================
// 🚀 INIT
// ===============================
document.addEventListener("DOMContentLoaded", () => {

  // AUTO DETECT CATEGORY PAGE
  if(document.getElementById("platformContainer")){
    renderPlatforms();
  }

});