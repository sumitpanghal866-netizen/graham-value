const API_KEY = "Mb6QeTf9ipELxuRgxAfEJtBheOB6PobT";

const searchBtn = document.getElementById("searchBtn");

searchBtn.addEventListener("click", async () => {

    const symbol = document.getElementById("stock").value.trim().toUpperCase();

    if (!symbol) {
        alert("Enter a stock symbol");
        return;
    }

    document.getElementById("stockData").innerHTML = "Loading...";
    document.getElementById("result").innerHTML = "";

    try {

        const profile = await fetch(
            `https://financialmodelingprep.com/api/v3/profile/${symbol}?apikey=${API_KEY}`
        );

        const profileData = await profile.json();

        const key = await fetch(
            `https://financialmodelingprep.com/api/v3/key-metrics-ttm/${symbol}?apikey=${API_KEY}`
        );

        const keyData = await key.json();

        if (!profileData.length || !keyData.length) {
            throw new Error("Stock not found");
        }

        const price = profileData[0].price;
        const company = profileData[0].companyName;

        const eps = keyData[0].netCurrentAssetValue || 0;
        const bookValue = keyData[0].bookValuePerShareTTM || 0;

        if (eps <= 0 || bookValue <= 0) {
            document.getElementById("stockData").innerHTML =
                "<h2>" + company + "</h2><p>Financial data unavailable.</p>";
            return;
        }

        const graham = Math.sqrt(22.5 * eps * bookValue);

        const mos = ((graham - price) / graham) * 100;

        let rating = "🔴 AVOID";

        if (price < graham * 0.8)
            rating = "🟢 BUY";
        else if (price <= graham)
            rating = "🟡 HOLD";

        document.getElementById("stockData").innerHTML = `
            <h2>${company}</h2>
            <p>Current Price: ₹${price.toFixed(2)}</p>
            <p>EPS: ${eps.toFixed(2)}</p>
            <p>Book Value: ₹${bookValue.toFixed(2)}</p>
        `;

        document.getElementById("result").innerHTML = `
            <h2>Intrinsic Value</h2>
            <h1>₹${graham.toFixed(2)}</h1>
            <p>Margin of Safety: ${mos.toFixed(2)}%</p>
            <h2>${rating}</h2>
        `;

    } catch (e) {

        document.getElementById("stockData").innerHTML =
            "<h2>Unable to fetch stock data.</h2>";

        console.error(e);

    }

});
