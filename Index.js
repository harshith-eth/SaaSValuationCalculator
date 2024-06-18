document.addEventListener('DOMContentLoaded', function () {
    // Retrieve saved data from localStorage
    const savedData = JSON.parse(localStorage.getItem('valuationData')) || {};

    // Populate form fields with saved data
    Object.keys(savedData).forEach(key => {
        const field = document.getElementById(key);
        if (field) field.value = savedData[key];
    });

    // Save form data to localStorage on input
    document.querySelectorAll('input').forEach(input => {
        input.addEventListener('input', function () {
            savedData[input.id] = input.value;
            localStorage.setItem('valuationData', JSON.stringify(savedData));
        });
    });
});

document.getElementById('valuation-form').addEventListener('submit', function (e) {
    e.preventDefault();

    // Get form values
    const mrr = parseFloat(document.getElementById('mrr').value);
    const arr = parseFloat(document.getElementById('arr').value);
    const ttmRevenue = parseFloat(document.getElementById('ttm-revenue').value);
    const ttmProfit = parseFloat(document.getElementById('ttm-profit').value);
    const lastMonthRevenue = parseFloat(document.getElementById('last-month-revenue').value);
    const lastMonthProfit = parseFloat(document.getElementById('last-month-profit').value);
    const customers = parseFloat(document.getElementById('customers').value);
    const annualGrowthRate = parseFloat(document.getElementById('annual-growth-rate').value) / 100;
    const webTraffic = parseFloat(document.getElementById('web-traffic').value);
    const churn = parseFloat(document.getElementById('churn').value) / 100;
    const cac = parseFloat(document.getElementById('cac').value);
    const ltv = parseFloat(document.getElementById('ltv').value);

    // Proprietary SaaS valuation algorithm
    const valuation = (arr * 2) + (ttmRevenue * 2) + (ttmProfit * 2) + (lastMonthRevenue * 1.5) + 
                      (lastMonthProfit * 1.5) + (customers * 1.2) + (annualGrowthRate * 1000) + 
                      (webTraffic / 1000) - (churn * 1000) + (ltv * 1.5) - cac;

    const currency = document.getElementById('currency').value;
    document.getElementById('result').innerText = `Your SaaS valuation is ${currency} ${valuation.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
});

// Add event listeners to synchronize MRR and ARR fields
document.getElementById('mrr').addEventListener('input', function() {
    const mrr = parseFloat(this.value);
    if (!isNaN(mrr)) {
        document.getElementById('arr').value = (mrr * 12).toFixed(2);
    } else {
        document.getElementById('arr').value = '';
    }
});

document.getElementById('arr').addEventListener('input', function() {
    const arr = parseFloat(this.value);
    if (!isNaN(arr)) {
        document.getElementById('mrr').value = (arr / 12).toFixed(2);
    } else {
        document.getElementById('mrr').value = '';
    }
});
