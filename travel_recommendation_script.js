document.addEventListener("DOMContentLoaded", function() {
    fetch('travel_recommendation_api.json')
        .then(response => response.json())
        .then(data => {
            console.log(data);
            const recommendationsContainer = document.getElementById('recommendations');
            data.forEach(item => {
                const div = document.createElement('div');
                div.classList.add('recommendation-item');
                div.innerHTML = `<h3>${item.name}</h3><img src="${item.imageUrl}" alt="${item.name}" width="200"><p>${item.description}</p>`;
                recommendationsContainer.appendChild(div);
            });
        })
        .catch(error => console.error('Error fetching recommendations:', error));
});
