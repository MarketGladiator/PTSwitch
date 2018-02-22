'use strict';

global.fetch = require('node-fetch');
const fs = require('fs');
const cc = require('cryptocompare');

const DEFAULTS = {
  dataFile: 'ProfitTrailerData.json',
  decimalPlaces: 8,
  marketFrom: 'BTC',
  marketTo: 'ETH',
  ptPath: '.',
}

class ProfitTrailer {
  init(path, marketFrom, marketTo) {
    if (path) {
      this.ptPath = path;
      this.dataFile = `${path}/${DEFAULTS.dataFile}`;
    } else {
      this.ptPath = DEFAULTS.ptPath;
      this.dataFile = `${DEFAULTS.ptPath}/${DEFAULTS.dataFile}`;
    }

    if (marketFrom && marketTo) {
      this.marketFrom = marketFrom;
      this.marketTo = marketTo;
    } else {
      this.marketFrom = DEFAULTS.marketFrom;
      this.marketTo = DEFAULTS.marketTo;
    }

    this.currencies = [];

    this.loadDataFile(this.dataFile);
  }

  loadDataFile(dataPath) {
    const averages = JSON.parse(fs.readFileSync(dataPath)).storedAverageMap;

    Object.keys(averages).forEach((market) => {
      const currency = averages[market];

      if (currency.lastAveragePrice) {
        this.currencies.push({
          currencyPair: currency.currencyPair,
          lastAveragePrice: currency.lastAveragePrice,
        });
      }
    });

    this.getMarketPrices();
  }

  getMarketPrices() {
    cc.price(this.marketFrom, this.marketTo)
    .then((price) => {
      this.marketPrice = price[this.marketTo];

      this.convertCurrencies();
    })
    .catch((err) => {
      console.error(err);
    });
  }

  convertCurrencies() {
    if (this.currencies.length !== 0) {
      console.log(`Put the following into your ProfitTrailer Hot Config to set the '${this.marketTo}' prices:\n`);

      this.currencies.forEach((currency) => {
        if (!currency.currencyPair.startsWith(this.marketTo)) {
          const currencyPair = currency.currencyPair.replace(this.marketFrom, this.marketTo);
          const currencyPrice = (currency.lastAveragePrice * this.marketPrice).toFixed(DEFAULTS.decimalPlaces);
  
          console.log(`${currencyPair}_bought_price = ${currencyPrice}`);
        }
      });

      console.log('\nDisclaimer: This will use current market rate, NOT the rate at the time of the trade. USE AT YOUR OWN RISK!\n');
    } else {
      console.error(`Error: No currencies found in ${this.dataFile}`);
    }
  }
}

module.exports = new ProfitTrailer();