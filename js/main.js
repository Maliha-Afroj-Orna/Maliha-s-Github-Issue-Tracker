// tab section starts
const allTab = document.getElementById("all-tab");
const openTab = document.getElementById("open-tab");
const closeTab = document.getElementById("close-tab");
const activeBtn = ["btn", "btn-primary"];
const inActiveBtn = ["btn", "btn-outline"];
const allCards = document.getElementById('allCards');
const totalNumOfCards = document.getElementById('totalNumOfCards');

const toggleButton = (id) => {
  allTab.classList.remove(...activeBtn);
  openTab.classList.remove(...activeBtn);
  closeTab.classList.remove(...activeBtn);

  allTab.classList.add(...inActiveBtn);
  openTab.classList.add(...inActiveBtn);
  closeTab.classList.add(...inActiveBtn);

  const clickedBtn = document.getElementById(id);
  clickedBtn.classList.remove(...inActiveBtn);
  clickedBtn.classList.add(...activeBtn);

  // card section starts
  if(clickedBtn == 'allTab') {
    loadAllCards();
    totalNumOfCards.innerText = issues.length;
  }
};

// load all cards
const loadAllCards = async () => {
    const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
    const data = await res.json();
    displayAllData(data.data);
}
const displayAllData = (issues) => {
    allCards.innerHTML = "";

    issues.forEach(issue => {
        const card = document.createElement('div');
        card.innerHTML = `
        <div class="card bg-white card-md shadow-xl border border-gray-100 h-[94%]">
            <div class="card-body space-y-2">
              <div class="flex justify-between items-center">
                <img src="./assets/Open-Status.png" alt="Open Status" />
                <div
                  class="badge badge-error text-xs (${issue.priority.toUpperCase() == 'HIGH' ? 'text-[#EF4444] bg-[#FEECEC] border-[#FEECEC]' : issue.priority.toUpperCase() == 'MEDIUM' ? 'text-[#F59E0B] bg-[#FFF6D1] border-[#FFF6D1]' : 'text-[#9CA3AF] bg-[#EEEFF2] border-[#EEEFF2]'}  font-medium"
                >
                  ${issue.priority.toUpperCase()}
                </div>
              </div>
              <h2 class="card-title text-[#1F2937] text-base font-semibold">
                ${issue.title}
              </h2>
              <p class="line-clamp-2">
                ${issue.description}
              </p>
              <div class="flex gap-2">
                ${issue.labels.map(label => {
                    return `<div
                        class="badge badge-error text-[9px] ${label.toUpperCase() == 'BUG' ? 'text-[#EF4444] bg-[#FEECEC] border-[#EF4444]' : label.toUpperCase() == 'HELP WANTED' ? 'text-[#D97706] bg-[#FFF8DB] border-[#D97706]' : label.toUpperCase() == 'ENHANCEMENT' ? 'text-[#00A96E] bg-[#BBF7D0] border-[#00A96E]' : label.toUpperCase() == 'GOOD FIRST ISSUE' ? 'text-purple-700 bg-purple-400 border-purple-800' : 'text-sky-700 bg-sky-400 border-sky-800'} font-medium"
                        >
                        ${label.toUpperCase() == 'BUG' ? '<i class="fa-solid fa-bug text-[#EF4444]"></i>' : label.toUpperCase() == 'HELP WANTED' ? '<i class="fa-solid fa-compact-disc"></i>' : label.toUpperCase() == 'ENHANCEMENT' ? '<i class="fa-solid fa-star"></i>' : label.toUpperCase() == 'good first issue' ? '<i class="fa-solid fa-circle-exclamation"></i>' : '<i class="fa-solid fa-file-circle-exclamation"></i>'} ${label.toUpperCase()}
                        </div>
                        `
                }).join(' ')}
                
              </div>

              <hr class="text-gray-200 w-full" />

              <div class="space-y-1">
                <p class="text-[#64748B] text-sm">#1 by ${issue.author}</p>
                <p class="text-[#64748B] text-sm pb-2">${issue.createdAt}</p>
              </div>
            </div>
          </div>
        `;
        allCards.append(card);
        totalNumOfCards.innerText = issues.length;
    })
}
loadAllCards();






