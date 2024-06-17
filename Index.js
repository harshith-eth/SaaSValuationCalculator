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

    // Improved valuation formula based on SaaS metrics
    const valuation = (arr * 3) + (ttmRevenue * 2) + (ttmProfit * 2) - cac + (ltv * 1.5) + 
                      (lastMonthRevenue * 1.5) + (lastMonthProfit * 1.5) + 
                      (customers * 1.2) + (annualGrowthRate * 1000) + 
                      (webTraffic / 1000);

    const currency = document.getElementById('currency').value;
    document.getElementById('result').innerText = `Your SaaS valuation is ${currency} ${valuation.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
    
    // Trigger popup 30 seconds after the result is displayed
    setTimeout(function() {
        if (document.getElementById('result').innerText.trim() !== '') {
            openPopup();
        }
    }, 30000);
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

function openPopup() {
    document.getElementById('popup').style.display = 'block';
    document.getElementById('overlay').style.display = 'block';
}

function closePopup() {
    document.getElementById('popup').style.display = 'none';
    document.getElementById('overlay').style.display = 'none';
}

// Open popup on page load after 1 second
window.onload = function() {
    setTimeout(openPopup, 1000);
};

// Open popup on button click after 1 second
document.querySelector('button[type="submit"]').addEventListener('click', function() {
    setTimeout(openPopup, 1000);
});

// Open popup 30 seconds after calculation result is displayed
document.getElementById('valuation-form').addEventListener('submit', function() {
    setTimeout(function() {
        if (document.getElementById('result').innerText.trim() !== '') {
            openPopup();
        }
    }, 30000);
});

// Add event listener for the report button
document.getElementById('report-btn').addEventListener('click', function () {
    // Code to handle report request, redirect to new page, or open a modal
    alert('Get a detailed report functionality coming soon!');
});
