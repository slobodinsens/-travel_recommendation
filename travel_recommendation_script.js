document.addEventListener("DOMContentLoaded", function() {
    let travelData = [];
    
    fetch('travel_recommendation_api.json')
        .then(response => response.json())
        .then(data => {
            console.log(data);
            travelData = data;
            displayRecommendations(data);
        })
        .catch(error => console.error('Error fetching recommendations:', error));
    
    document.getElementById("search-form").addEventListener("submit", function(event) {
        event.preventDefault();
        const searchTerm = document.getElementById("search-input").value.toLowerCase();
        
        let filteredResults = [];
        if (searchTerm.includes("beach")) {
            filteredResults = travelData.filter(item => item.description.toLowerCase().includes("beach"));
        } else if (searchTerm.includes("temple")) {
            filteredResults = travelData.filter(item => item.description.toLowerCase().includes("temple"));
        } else if (searchTerm.includes("country")) {
            filteredResults = travelData.filter(item => item.description.toLowerCase().includes("country"));
        } else {
            filteredResults = travelData.filter(item => 
                item.name.toLowerCase().includes(searchTerm) ||
                item.description.toLowerCase().includes(searchTerm)
            );
        }
        
        displayRecommendations(filteredResults.slice(0, 2)); // Display at least two results
    });
    
    document.getElementById("clear-button").addEventListener("click", function() {
        document.getElementById("search-input").value = "";
        document.getElementById("recommendations").innerHTML = "";
    });
    
    function displayRecommendations(data) {
        const recommendationsContainer = document.getElementById('recommendations');
        recommendationsContainer.innerHTML = "";
        data.forEach(item => {
            const div = document.createElement('div');
            div.classList.add('recommendation-item');
            div.innerHTML = `<h3>${item.name}</h3><img src="${item.imageUrl}" alt="${item.name}" width="200"><p>${item.description}</p>`;
            recommendationsContainer.appendChild(div);
        });
    }
});
