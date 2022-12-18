const URL = 'https://api.coinstats.app/public/v1/coins?skip=0&limit=100&currency=KRW';

/*
{
    "id": "bitcoin",
    "icon": "https://api.coin-stats.com/api/files/812fde17aea65fbb9f1fd8a478547bde/f3738cc5df5f59afb57111d67d951170_1.png",
    "name": "Bitcoin",
    "symbol": "BTC",
    "rank": 1,
    "price": 6362.74960614,
    "priceBtc": 1,
    "volume": 4514555849.85,
    "marketCap": 110545616313,
    "availableSupply": 17373875,
    "totalSupply": 17373875,
    "priceChange1h": 0.12,
    "priceChange1d": -0.56,
    "priceChange1w": -1.07,
    "websiteUrl": "https://bitcoin.org",
    "redditUrl": "https://www.reddit.com/r/bitcoin",
    "twitterUrl": "https://twitter.com/btc",
    "exp": [
      "https://blockchain.info/",
      "https://live.blockcypher.com/btc/",
      "https://blockchair.com/bitcoin/blocks"
    ]
  }
  */

document.getElementById('search').addEventListener('input', (e) => {
    const search = e.currentTarget.value;

    axios
    .get(URL)
    .then(res => {
        if (res.status != 200) {
            console.error('coin api error');
            return;
        }

        setCoins(res.data.coins, search);
    });
});

function setCoins(coins, search) {
    const coinContent = document.getElementById('coin_content');


    const content = coins
                .filter(coin => coin.name.toLowerCase().includes(search))
                .map((coin, id) => {
                    return `
                    <tr id="${coin.id}" class="coin-table-row">
                        <td class="rank">${coin.rank}</td>
                        <td class="logo">
                            <a href="${coin.websiteUrl}">
                                <img src="${coin.icon}" alt="" width="30px;" />
                            </a>
                            <p>${coin.name}</p>
                        </td>
                        <td class="symbol">${coin.symbol}</td>
                        <td class="marketcap">${toKRW(Math.round(coin.marketCap))}</td>
                        <td class="price">${toKRW(Math.round(coin.price))}</td>
                        <td class="avaliable">${coin.availableSupply}</td>
                    </tr>`;
                })
                .join('');

    if (content == '') {
        coinContent.innerHTML = '<tr class="coin-table-row"><td colspan="6" class="no-search">No search results found</td></tr>';
        return;
    }

    coinContent.innerHTML = content;
}

function toKRW(currency) {
    return new Intl.NumberFormat('ko-KR', { 
        style: 'currency', currency: 'KRW'
     })
    .format(currency);
}
