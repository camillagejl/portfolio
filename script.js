document.addEventListener("DOMContentLoaded", start);

const portfolio = document.querySelector("#portfolio");

function start() {

    // INSERT PAGES --------------------------------------------------------------------------

    async function getPages() {
        let pagesUrl = "https://camillagejl.com/portfolio/wordpress/wp-json/wp/v2/pages";
        let jsonData = await fetch(pagesUrl);
        page = await jsonData.json();
        insertPages();
    }

    function insertPages() {
        page.forEach(item => {
          console.log("Jeg er en page");

          let pageID = `${item.page_id}`;
          console.log("Page ID: " + pageID);

          document.querySelectorAll("section").forEach(section => {
              let sectionID = section.getAttribute("data-id");

              if (sectionID === pageID) {
                  console.log("Jeg sammenligner");
                  section.querySelector("h1").innerHTML = `${item.title.rendered}`;
                  section.querySelector(".post_content").innerHTML = `${item.content.rendered}`;
                  section.querySelector(".image_content").innerHTML = `<img src="${item.image.guid}">`;
              }
          })

        });
    }

    getPages();
    

    // INSERT PORTFOLIO --------------------------------------------------------------------------

    async function getPortfolio() {
        let pagesUrl = "https://camillagejl.com/portfolio/wordpress/wp-json/wp/v2/posts";
        let jsonData = await fetch(pagesUrl);
        portfolioItem = await jsonData.json();
        insertPortfolio();
    }

    function insertPortfolio() {
        portfolioItem.forEach(item => {
            let itemSlug = `${item.slug}`;
            let template =
                `
           <div class="post">
                <div class="post_content">
                    <a href="${item.link_for_projekt}" target="blank">
                        <img src="${item.main_image.guid}" alt="${item.link_text}">
                    </a>
                </div>
                <div class="post_content text_content">
                    <div class="main_text_content">
                    <h2>
                        ${item.title.rendered}
                    </h2>
                    ${item.content.rendered}
                    </div>
                    <div class="extra_info_content">
                        <a href="${item.link_for_projekt}" target="_blank">${item.link_text}</a>
                    <div class="keywords" data-slug="${item.slug}">
                        <b>Keywords</b>
                    </div>
                    </div>
                </div>
            </div>
`;

            portfolio.insertAdjacentHTML("beforeend", template);

            document.querySelectorAll(".keywords").forEach(keywordSection => {
                let keywordSectionSlug = keywordSection.getAttribute("data-slug");
                console.log("Data-slug: " + keywordSectionSlug); // For some reason, some pop up more than once?

                if (keywordSectionSlug === itemSlug) {
                    item.keywords.forEach(keyword => {
                        keywordSection.innerHTML += ` | ${keyword}`;
                    });
                }
            });
        });
    }

    getPortfolio();
}
