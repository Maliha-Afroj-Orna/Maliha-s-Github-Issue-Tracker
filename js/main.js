// tab section starts
const allTab = document.getElementById("all-tab");
const openTab = document.getElementById("open-tab");
const closeTab = document.getElementById("close-tab");
const activeBtn = ["btn", "btn-primary"];
const inActiveBtn = ["btn", "btn-outline"];

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
  
};




