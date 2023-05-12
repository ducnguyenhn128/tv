
const { TradingViewAPI } = require('tradingview-scraper');

const ticketSymbol = 'HOSE:VIC';
const tv = new TradingViewAPI();


const getData = async () => {
    try {
        await tv.setup();
        const ticker = await tv.getTicker(ticketSymbol);
        const data = await ticker.fetch();
        console.log(data)
    } catch (err) {
        console.log(err);
    } finally {
        tv.cleanup();
    }
}

getData();