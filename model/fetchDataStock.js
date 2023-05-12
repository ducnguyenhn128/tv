
const { TradingViewAPI } = require('tradingview-scraper');
const axios = require('axios')

// const ticketList = ['HOSE:ACB', 'HOSE:MBB', 'HOSE:BID', 'HOSE:VCB', 'HOSE:CTG', 'HOSE:TCB', 'HOSE:VIB',
//                     'HOSE:HPG', 'HOSE:HSG', 'HOSE:NKG',
//                     'HOSE:SSI', 'HOSE:HCM', 'HOSE:VND', 'HOSE:VCI','HNX:SHS', 'HOSE:CTS'
//                     ]

const ticketList = ['HOSE:ACB', 'HOSE:MBB', 'HOSE:BID', 'HOSE:VCB', 'HOSE:CTG', 'HOSE:TCB', 'HOSE:VIB']

const tv = new TradingViewAPI();

// Send Data to the API, update in the Database
const updateTicketData = async (ticket, data) => {
    const URL = "http://localhost:3001";
    // console.log(data)
    try {
      const response = await axios.put(`http://localhost:3001/${ticket}`, data);
      console.log(`Updated data for ${ticket} in the database: ${response.data}`);
    } catch (err) {
      console.error(err);
    }
  };

  // Get data from Trading View
const getData = async () => {
    try {
        await tv.setup();
        for (let ticket of ticketList) {
            const ticker = await tv.getTicker(ticket);
            const data = await ticker.fetch();
            console.log(`Current Price of ${ticket} is ${data.bid}`);
            await updateTicketData(ticket, data)
        }
    } catch (err) {
        console.log(err);
    } finally {
        tv.cleanup();
    }
}


getData();