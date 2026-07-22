const API_KEY = "YOUR_API_KEY_HERE";

const searchBtn = document.getElementById("searchBtn");

searchBtn.addEventListener("click", async () => {

    const symbol = document.getElementById("stock").value.trim().toUpperCase();

    if(symbol === ""){
        alert("Please enter a stock symbol.");
        return;
    }

    document.getElementById("stockData").innerHTML =
    "<p>Loading...</p>";

    // Temporary demo values
    // Later we'll replace these with live API data
    const eps = 120;
    const bookValue = 450;
    const currentPrice = 980;

    const graham = Math.sqrt(22.5 * eps * bookValue);

    const mos = ((graham - currentPrice) / graham) * 100;

    let recommendation = "";

    if(currentPrice < graham * 0.8){
        recommendation = "🟢 BUY";
    }else if(currentPrice <= graham){
        recommendation = "🟡 HOLD";
    }else{
        recommendation = "🔴 AVOID";
    }

    document.getElementById("stockData").innerHTML = `
        <h2>${symbol}</h2>
        <p><b>EPS:</b> ${eps}</p>
        <p><b>Book Value:</b> ₹${bookValue}</p>
        <p><b>Current Price:</b> ₹${currentPrice}</p>
    `;

    document.getElementById("result").innerHTML = `
        <h2>Intrinsic Value</h2>
        <h1>₹${graham.toFixed(2)}</h1>

        <p><b>Margin of Safety:</b> ${mos.toFixed(2)}%</p>

        <h2>${recommendation}</h2>
    `;

});
