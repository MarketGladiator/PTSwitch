PTSwitch
=============

A script for [ProfitTrailer](https://profittrailer.com/) that will read your `ProfitTrailerData.json` file and convert the average price for each PAIR into the market of your choice.

The purpose of which allows you to make a copy of the ProfitTrailer bot so that you can trade on a different market. (i.e. Switch from BTC to ETH)

Any open trades you have when you launch ProfitTrailer (in a different market than current one) will not be recognized by PT, at which point, ProfitTrailer asks for the `XXXXXX_bought_price` of that PAIR.

This tool will allow you to run this script on the **OLD** ProfitTrailer folder and output the `XXXXXX_bought_price` for each PAIR that already contains an average price.


Prerequisites
-------------

  You will need have [Node.js](https://nodejs.org) installed along with [NPM](https://www.npmjs.com/) to install this application.  Use the guide below to install these tools:

  [Node.js & NPM Installation Guide](https://docs.npmjs.com/getting-started/installing-node)


Install
-------

    npm install -g ptswitch


Usage
-----

**Note:** In order to add these prices to the **NEW** ProfitTrailer bot, you will need to enable Hot Config within the Server UI.  Inside the `application.properties` files, set `server.enableConfig = true`.

  **Example:**
  ```
  ptswitch --path="/Path/To/ProfitTrailer" --from="BTC" --to="ETH"
  ```

  **Output:**
  ```
  Put the following into your ProfitTrailer Hot Config to set the 'ETH' prices:

  BLZETH_bought_price = 0.00078320
  LTCETH_bought_price = 0.26052368
  IOTAETH_bought_price = 0.00246733
  OMGETH_bought_price = 0.02183700
  NANOETH_bought_price = 0.01117781
  VENETH_bought_price = 0.00706621
  WTCETH_bought_price = 0.03012962
  ZRXETH_bought_price = 0.00150555
  ```

  **Disclaimer:** This will use current market rate, NOT the rate at the time of the trade. USE AT YOUR OWN RISK!


Donate
------

If you find this script useful, please consider a small donation.

  - BTC address:  1EAZKnWwdgMWyRwHJxuM1x5Ue47CbFWz77
  - ETH address:  0x66e3062A31dFDA680aDc1555f1c646d6Bb1D3274
  - LTC address:  Li9MbeohmAjn1fcS15YR2f2hKs3oKDxZkB
  - NANO address: xrb_1mxdnmoszfq3je95aemcf7936s3gk5nuawkj3p5p69jcqczbgwegnonhhjjw