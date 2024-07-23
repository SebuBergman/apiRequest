const apiRequestsTemplate = document.createElement("template");
apiRequestsTemplate.innerHTML = `
<style>
.mailSidebar__mailbox__button__div, .mailSidebar__mailbox__button {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding-left: 10px;
    padding-right: 30px;
}

.mailSidebar__mailbox__button__heading {
    padding-left: 10px;
}

</style>
    <div class="apiRequest_Card">
        <slot name="icon"></slot>
        <h4 class="apiRequest_Card__heading"></h4>
        <p class="apiRequest_Card__text"></p>
        <img class="apiRequest_Card__artwork">
    </div>
    <p></p>
`;

class ApiRequest extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({ mode: "open" });  
    }

    connectedCallback() {
        this.shadowRoot.append(apiRequestsTemplate.content.cloneNode(true));

        const responseData = [];

        let urls = [
            'https://api.artic.edu/api/v1/artworks/129883',
            'https://api.artic.edu/api/v1/artworks/129884',
            'https://api.artic.edu/api/v1/artworks/129885',
        ];

        const fetchPromises = urls.map(url => fetch(url).then(response => response.json()));

        async function getData() {
            Promise.all(fetchPromises)
            .then(responses => {
                responseData.push(responses.map(response => response));
                //console.log(responseData);
                //console.log(responseData[0].data);
            })
            .catch(error => console.error('Error fetching data:', error)); 
        }

        
        getData();
        console.log(responseData)
        
        //const title = responseData[0].data;
        //this.shadowRoot.querySelector("h4").innerText = title;
        const unreadCount = this.getAttribute("unreadCount");
        this.shadowRoot.querySelector("p").innerText = unreadCount;
    }

    disconnectedCallback() {
        console.log("Our element is removed from DOM");
        this.shadowRoot.querySelector("button").removeEventListener;
    }
}

window.customElements.define("app-api-content", ApiRequest);