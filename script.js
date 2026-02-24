// Chart.js Setup
const ctx = document.getElementById('revenueChart').getContext('2d');

const myChart = new Chart(ctx, {
    type: 'line', // Hum 'line' chart bana rahe hain (Professional look)
    data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'], // X-axis labels
        datasets: [{
            label: 'Monthly Revenue ($)',
            data: [12000, 19000, 15000, 25000, 22000, 30000], // Y-axis data
            borderColor: '#6366f1', // Humara primary color
            backgroundColor: 'rgba(99, 102, 241, 0.2)', // Light shade for fill
            borderWidth: 3,
            tension: 0.4, // Isse line smooth/curvy ho jati hai
            fill: true
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                display: false // Legend chupa rahe hain for clean look
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                grid: {
                    display: false // Horizonal lines hatane ke liye
                }
            },
            x: {
                grid: {
                    display: false // Vertical lines hatane ke liye
                }
            }
        }
    }
});
// 1. Fake Data (Imagine ye API se aa raha hai)
const dashboardData = [
    { title: "Total Revenue", amount: "$24,500", trend: "+12%", class: "up" },
    { title: "Active Users", amount: "1,240", trend: "+5%", class: "up" },
    { title: "Bounce Rate", amount: "32%", trend: "-2%", class: "down" },
    { title: "New Signups", amount: "85", trend: "+18%", class: "up" }
];

const statsGrid = document.getElementById('statsGrid');
const searchInput = document.getElementById('dashboardSearch');

// 2. Function: Cards ko Screen par dikhane ke liye
function displayCards(data) {
    statsGrid.innerHTML = ""; // Pehle purana data saaf karo
    
    data.forEach(item => {
        statsGrid.innerHTML += `
            <div class="card">
                <h3>${item.title}</h3>
                <p class="amount">${item.amount}</p>
                <span class="trend ${item.class}">${item.trend} this month</span>
            </div>
        `;
    });
}

// 3. Search Logic: Filtering the data
searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    
    const filteredData = dashboardData.filter(item => 
        item.title.toLowerCase().includes(searchTerm)
    );
    
    displayCards(filteredData); // Filtered data dikhao
});

// Pehli baar page load hone par saare cards dikhao
displayCards(dashboardData);

const themeIcon = document.getElementById('themeIcon');

themeIcon.addEventListener('click', () => {
    // 1. Body par class toggle karo
    document.body.classList.toggle('dark-theme');

    // 2. Icon badlo (Moon se Sun)
    if (document.body.classList.contains('dark-theme')) {
        themeIcon.classList.replace('bx-moon', 'bx-sun');
        // Bonus: Chart ka color bhi change kar sakte hain (Optional)
    } else {
        themeIcon.classList.replace('bx-sun', 'bx-moon');
    }

    // 3. Local Storage mein save karo (Taake refresh par dark mode na jaye)
    const currentTheme = document.body.classList.contains('dark-theme') ? 'dark' : 'light';
    localStorage.setItem('theme', currentTheme);
});

// Page load hote hi check karo ke user ne pehle kya select kiya tha
window.onload = () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        themeIcon.classList.replace('bx-moon', 'bx-sun');
    }
};
