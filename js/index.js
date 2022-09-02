
function getData() {
    fetch("./data.json")
        .then((response) => {
            return response.json();
        })
        .then((companies) => {
            jobListing(companies);
        })
        .catch((error) => console.log(error));
}

getData();

const card = document.querySelector(".company-card");
const clearButton = document.querySelector(".clear-button");

function jobListing(companies) {

    for (let i = 1; i < companies.length; i++) {
        var cardClone = card.cloneNode(true);
        card.parentNode.insertBefore(cardClone, card);
    }

    const cards = document.querySelectorAll(".company-card");
    const companyLogo = document.querySelectorAll(".logo");
    const companyName = document.querySelectorAll(".company-name");
    const notifications = document.querySelectorAll(".notification");
    const jobPosition = document.querySelectorAll(".job-position");
    const postDate = document.querySelectorAll(".post-date");
    const jobContract = document.querySelectorAll(".contract");
    const jobLocation = document.querySelectorAll(".location");
    const jobRole = document.querySelectorAll(".role");
    const jobLevel = document.querySelectorAll(".level");
    const jobLanguage = document.querySelectorAll(".language");
    const jobTools = document.querySelectorAll(".tools");

    for (let i = 0; i < companies.length; i++) {

        cards[i].id = `company_${companies[i].id}`;
        companyLogo[i].src = companies[i].logo;
        companyName[i].innerText = companies[i].company;

        if (companies[i].new === true)
            notifications[i].innerHTML += `<span class="new-state">NEW!</span>`;

        if (companies[i].featured === true) {
            notifications[i].innerHTML += `<span class="featured-state">FEATURED</span>`;
            cards[i].style.borderLeft = "5px solid var(--Desaturated-Dark-Cyan)";
        }

        jobPosition[i].innerText = companies[i].position;
        postDate[i].innerText = companies[i].postedAt;
        jobContract[i].innerText = companies[i].contract;
        jobLocation[i].innerText = companies[i].location;

        jobRole[i].innerText = companies[i].role;
        jobRole[i].setAttribute("value", companies[i].role);

        jobLevel[i].innerText = companies[i].level;
        jobLevel[i].setAttribute("value", companies[i].level);

        if (companies[i].languages.length >= 1) {
            for (let j = 0; j < companies[i].languages.length; j++)
                jobLanguage[i].innerHTML += `<button class="skill" value="${companies[i].languages[j]}" >${companies[i].languages[j]}</button>`;
        }

        if (companies[i].tools.length >= 1) {
            for (let j = 0; j < companies[i].tools.length; j++)
                jobTools[i].innerHTML += `<button class="skill" value="${companies[i].tools[j]}">${companies[i].tools[j]}</button>`;
        }

    }

    const skill = document.querySelectorAll(".skill");
    const filterOptions = document.querySelectorAll(".filter-options")
    const filteredSection = document.querySelector(".filter-section");
    const skillList = document.querySelector(".skill-list");

    for (let i = 0; i < skill.length; i++) {

        skill[i].addEventListener("click", function () {


            
            filteredSection.style.transform = "translateY(-3.5rem) scaleY(1)";

            if (skillList.querySelector(`[value="${skill[i].value}"]`) === null) {

                var addSkill =`<li class="filtered-skill">
                                        <button class="skill filtered" value="${this.value}">${this.value}</button>
                                        <span class="remove-skill"></span>
                                        </li>`;

                skillList.insertAdjacentHTML('beforeend', addSkill);

                for (let j = 0; j < cards.length; j++) {

                    var choiceSkill = filterOptions[j].querySelector(`[value="${skill[i].value}"]`);

                    if (cards[j].contains(choiceSkill) == false)
                        cards[j].style.display = "none";

                    const filteredSkill = document.querySelectorAll(".filtered-skill");
                    const removeSkill = document.querySelectorAll(".remove-skill");

                    for (let k = 0; k < removeSkill.length; k++) {

                        removeSkill[k].addEventListener("click", function () {

                            filteredSkill[k].remove();

                            var restOFSkills = skillList.querySelectorAll(`.skill`);
                            var buttonsOfSkills = cards[j].querySelectorAll(`.skill`);

                            var restSkillsArr = [];
                            for (let skill of restOFSkills) {
                                restSkillsArr.push(skill.value);
                            }

                            var buttonsArr = [];
                            for (let skillButton of buttonsOfSkills) {
                                if (cards[j].contains(skillButton)) {
                                    buttonsArr.push(skillButton.value)
                                }
                            }

                            if (restSkillsArr.every(elem => buttonsArr.includes(elem)))
                                cards[j].style.display = "flex";

                            if (filteredSection.querySelector(`[class="filtered-skill"]`) === null) {
                                filteredSection.style.transform = "translateY(-3.5rem) scaleY(0)";
                                
                            }

                        })

                    }

                }


            }

        })

    }

    clearButton.addEventListener("click", function () {

        filteredSection.style.transform = "translateY(-3.5rem) scaleY(0)";

        skillList.innerHTML = null;

        for (let i = 0; i < cards.length; i++)
            cards[i].style.display = "flex"

    })

}
