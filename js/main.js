// tab section starts
const allTab = document.getElementById("all-tab");
const openTab = document.getElementById("open-tab");
const closeTab = document.getElementById("close-tab");
const activeBtn = ["btn", "btn-primary"];
const inActiveBtn = ["btn", "btn-outline"];
const totalNumOfCards = document.getElementById("totalNumOfCards");
const cardContainer = document.getElementById("cardContainer");
let issues = [];

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
  if (id == "all-tab") {
    loadAllCards();
  } else if (id == "open-tab") {
    loadOpenCards();
  } else if (id == "close-tab") {
    loadCloseCards();
  }
};

// load all cards
const loadAllCards = async () => {
  const res = await fetch(
    "https://phi-lab-server.vercel.app/api/v1/lab/issues",
  );
  const data = await res.json();
  issues = data.data;
  displayAllData(issues);
  totalNumOfCards.innerText = issues.length;
};
// load open cards
const loadOpenCards = () => {
  const openIssues = issues.filter((issue) => issue.status == "open");
  displayAllData(openIssues);
  totalNumOfCards.innerText = openIssues.length;
};
// load close cards
const loadCloseCards = () => {
  const closeIssues = issues.filter((issue) => issue.status == "closed");
  displayAllData(closeIssues);
  totalNumOfCards.innerText = closeIssues.length;
};
// display cards
const displayAllData = (issues) => {
  cardContainer.innerHTML = "";

  issues.forEach((issue) => {
    const card = document.createElement("div");
    card.innerHTML = `
        <div onclick="openModal(${issue.id})" class="card bg-white card-md shadow-xl border border-gray-100 h-[94%] cursor-pointer">
            <div class="card-body space-y-2 ${issue.status == 'open' ? "border-t-4 border-[#00A96E] rounded-xl" : "border-t-4 border-[#A855F7] rounded-xl"}">
              <div class="flex justify-between items-center">
                <img src="./assets/Open-Status.png" alt="Open Status" />
                <div
                  class="badge badge-error text-xs ${issue.priority.toUpperCase() == "HIGH" ? "text-[#EF4444] bg-[#FEECEC] border-[#FEECEC]" : issue.priority.toUpperCase() == "MEDIUM" ? "text-[#F59E0B] bg-[#FFF6D1] border-[#FFF6D1]" : "text-[#9CA3AF] bg-[#EEEFF2] border-[#EEEFF2]"}  font-medium"
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
                ${issue.labels
                  .map((label) => {
                    return `<div
                        class="badge badge-error text-[9px] ${label.toUpperCase() == "BUG" ? "text-[#EF4444] bg-[#FEECEC] border-[#EF4444]" : label.toUpperCase() == "HELP WANTED" ? "text-[#D97706] bg-[#FFF8DB] border-[#D97706]" : label.toUpperCase() == "ENHANCEMENT" ? "text-[#00A96E] bg-[#BBF7D0] border-[#00A96E]" : label.toUpperCase() == "GOOD FIRST ISSUE" ? "text-purple-700 bg-purple-400 border-purple-800" : "text-sky-700 bg-sky-400 border-sky-800"} font-medium rounded-3xl"
                        >
                        ${label.toUpperCase() == "BUG" ? '<i class="fa-solid fa-bug text-[#EF4444]"></i>' : label.toUpperCase() == "HELP WANTED" ? '<i class="fa-solid fa-compact-disc"></i>' : label.toUpperCase() == "ENHANCEMENT" ? '<i class="fa-solid fa-star"></i>' : label.toUpperCase() == "good first issue" ? '<i class="fa-solid fa-circle-exclamation"></i>' : '<i class="fa-solid fa-file-circle-exclamation"></i>'} ${label.toUpperCase()}
                        </div>
                        `;
                  })
                  .join(" ")}
                
              </div>

              <hr class="text-gray-200 w-full" />

              <div class="space-y-1 flex justify-between items-center pb-2">
                <div>
                  <p class="text-[#64748B] text-xs">#${issue.id} by ${issue.author}</p>
                  <p class="text-[#64748B] text-xs">Assignee: ${issue.assignee}</p>
                </div>
                <div>
                  <p class="text-[#64748B] text-xs ">${new Date(issue.createdAt).toLocaleDateString("en-US")}</p>
                  <p class="text-[#64748B] text-xs ">Updated: ${new Date(issue.updatedAt).toLocaleDateString("en-US")}</p>
                </div>
              </div>
            </div>
          </div>
        `;
    cardContainer.append(card);
  });
};
loadAllCards();

// modal section starts
const issueModal = document.getElementById("issue_modal");
const openModal = async (id) => {
  const res = await fetch(
    `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`,
  );
  const data = await res.json();
  const issueDetails = data.data;

  const modalTitle = document.getElementById("modalTitle");
  const modalStatus = document.getElementById("modalStatus");
  const modalName = document.getElementById("modalName");
  const modalDate = document.getElementById("modalDate");
  const modalBadge = document.getElementById("modalBadge");
  const modalDesc = document.getElementById("modalDesc");
  const modalFooterName = document.getElementById("modalFooterName");
  const modalFooterBadge = document.getElementById("modalFooterBadge");

  modalTitle.innerText = issueDetails.title;
  modalStatus.innerHTML = `${issueDetails.status == "open" ? `<button id="modalStatus" class="btn btn-success rounded-3xl text-white font-medium text-sm px-6"> ${issueDetails.status}</button>` : `<button id="modalStatus" class="btn btn-error rounded-3xl text-white font-medium text-sm px-6"> ${issueDetails.status}</button>`}`;
  modalName.innerText = issueDetails.author;
  modalDate.innerText = issueDetails.createdAt;
  modalBadge.innerHTML = `${issueDetails.labels
    .map((label) => {
      return `<div
                        class="badge badge-error text-[9px] ${label.toUpperCase() == "BUG" ? "text-[#EF4444] bg-[#FEECEC] border-[#EF4444]" : label.toUpperCase() == "HELP WANTED" ? "text-[#D97706] bg-[#FFF8DB] border-[#D97706]" : label.toUpperCase() == "ENHANCEMENT" ? "text-[#00A96E] bg-[#BBF7D0] border-[#00A96E]" : label.toUpperCase() == "GOOD FIRST ISSUE" ? "text-purple-700 bg-purple-400 border-purple-800" : "text-sky-700 bg-sky-400 border-sky-800"} font-medium rounded-3xl"
                        >
                        ${label.toUpperCase() == "BUG" ? '<i class="fa-solid fa-bug text-[#EF4444]"></i>' : label.toUpperCase() == "HELP WANTED" ? '<i class="fa-solid fa-compact-disc"></i>' : label.toUpperCase() == "ENHANCEMENT" ? '<i class="fa-solid fa-star"></i>' : label.toUpperCase() == "good first issue" ? '<i class="fa-solid fa-circle-exclamation"></i>' : '<i class="fa-solid fa-file-circle-exclamation"></i>'} ${label.toUpperCase()}
                        </div>
                        `;
    })
    .join(" ")}`;
  modalDesc.innerText = issueDetails.description;
  modalTitle.innerText = issueDetails.title;
  modalFooterName.innerText = issueDetails.assignee.toUpperCase();
  modalFooterBadge.innerHTML = `${issueDetails.priority.toUpperCase() == "HIGH" ? `<div class="btn btn-error text-xs text-white bg-[#EF4444] border-[#EF4444] font-medium rounded-3xl px-6"> ${issueDetails.priority.toUpperCase()} </div>` : issueDetails.priority.toUpperCase() == "MEDIUM" ? `<div class="btn btn-error text-xs text-white bg-[#D97706] border-[#D97706] font-medium rounded-3xl px-6">${issueDetails.priority.toUpperCase()}</div>` : `<div class="btn btn-error text-xs text-white bg-[#9CA3AF] border-[#9CA3AF] font-medium rounded-3xl px-6">${issueDetails.priority.toUpperCase()}</div>`}`;

  issueModal.showModal();
};


// search section starts