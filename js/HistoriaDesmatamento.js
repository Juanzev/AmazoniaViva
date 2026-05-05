// =============================================
// Menu Mobile — novo header (.av-)
// =============================================
const avMenuToggle = document.getElementById('av-menu-toggle');
if (avMenuToggle) {
    avMenuToggle.addEventListener('click', function () {
        const mobileMenu = document.getElementById('av-mobile-menu');
        if (mobileMenu) mobileMenu.classList.toggle('hidden');
    });
}

// =============================================
// Tabs
// =============================================
const tabButtons = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        tabButtons.forEach(btn => btn.classList.remove('tab-active'));
        button.classList.add('tab-active');
        tabContents.forEach(content => content.classList.add('hidden'));
        const tabId = button.getAttribute('data-tab');
        document.getElementById(`${tabId}-tab`).classList.remove('hidden');
    });
});

// =============================================
// Smooth scrolling
// =============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// =============================================
// Charts — inicializados no DOMContentLoaded
// =============================================
document.addEventListener('DOMContentLoaded', function () {

    // Amazônia
    const amazoniaCtx = document.getElementById('amazoniaChart').getContext('2d');
    new Chart(amazoniaCtx, {
        type: 'line',
        data: {
            labels: ['1988', '1990', '1995', '2000', '2004', '2008', '2012', '2016', '2019', '2020', '2021', '2022', '2023'],
            datasets: [{
                label: 'Área Desmatada (km²)',
                data: [21050, 13730, 29059, 18226, 27772, 12911, 4571, 7893, 10129, 10851, 13235, 11568, 9001],
                borderColor: 'rgb(22, 163, 74)',
                backgroundColor: 'rgba(22, 163, 74, 0.1)',
                fill: true,
                tension: 0.3
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: { beginAtZero: true, title: { display: true, text: 'Área Desmatada (km²)' } },
                x: { title: { display: true, text: 'Ano' } }
            }
        }
    });

    // Cerrado
    const cerradoCtx = document.getElementById('cerradoChart').getContext('2d');
    new Chart(cerradoCtx, {
        type: 'line',
        data: {
            labels: ['2001', '2005', '2010', '2015', '2018', '2019', '2020', '2021', '2022', '2023'],
            datasets: [{
                label: 'Área Desmatada (km²)',
                data: [13500, 11580, 7000, 9500, 6657, 6483, 7340, 8531, 10689, 9685],
                borderColor: 'rgb(202, 138, 4)',
                backgroundColor: 'rgba(202, 138, 4, 0.1)',
                fill: true,
                tension: 0.3
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: { beginAtZero: true, title: { display: true, text: 'Área Desmatada (km²)' } },
                x: { title: { display: true, text: 'Ano' } }
            }
        }
    });

    // Comparativo por governo
    const comparativoCtx = document.getElementById('comparativoChart').getContext('2d');
    new Chart(comparativoCtx, {
        type: 'bar',
        data: {
            labels: ['Sarney (85-90)', 'Collor/Itamar (90-95)', 'FHC (95-03)', 'Lula (03-11)', 'Dilma (11-16)', 'Temer (16-19)', 'Bolsonaro (19-22)'],
            datasets: [{
                label: 'Taxa média anual (km²)',
                data: [22400, 17200, 19500, 15500, 5420, 7536, 10500],
                backgroundColor: 'rgba(22, 163, 74, 0.7)',
                borderColor: 'rgb(22, 163, 74)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: { beginAtZero: true, title: { display: true, text: 'Taxa média anual (km²)' } }
            }
        }
    });

    // Queimadas
    const queimadasCtx = document.getElementById('queimadasChart').getContext('2d');
    new Chart(queimadasCtx, {
        type: 'line',
        data: {
            labels: ['2000', '2005', '2010', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023'],
            datasets: [{
                label: 'Focos de Queimadas',
                data: [115000, 226000, 85500, 183000, 184000, 205000, 194000, 197000, 222000, 184000, 172000, 156000],
                borderColor: 'rgb(220, 38, 38)',
                backgroundColor: 'rgba(220, 38, 38, 0.1)',
                fill: true,
                tension: 0.3
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: { beginAtZero: true, title: { display: true, text: 'Número de Focos' } },
                x: { title: { display: true, text: 'Ano' } }
            }
        }
    });

});

// =============================================
// Animate on scroll
// =============================================
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
            observer.unobserve(entry.target);
        }
    });
}, { root: null, rootMargin: '0px', threshold: 0.1 });

document.querySelectorAll('section > div > *').forEach(el => {
    observer.observe(el);
});