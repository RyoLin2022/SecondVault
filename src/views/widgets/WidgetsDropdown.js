import React from 'react'
import { CRow, CCol, CWidgetStatsA } from '@coreui/react'

let wsETH = new WebSocket('wss://stream.binance.com:9443/ws/ethusdt@trade')
let wsBNB = new WebSocket('wss://stream.binance.com:9443/ws/bnbusdt@trade')
let wsBTC = new WebSocket('wss://stream.binance.com:9443/ws/btcusdt@trade')
let wsBUSD = new WebSocket('wss://stream.binance.com:9443/ws/busdusdt@trade')

const WidgetsDropdown = () => {
  wsETH.onmessage = (event) => {
    let ethPriceElement = document.getElementById('eth-price')
    let ethObject = JSON.parse(event.data)
    let priceETH = parseFloat(ethObject.p).toFixed(2)
    ethPriceElement.innerText = priceETH
  }
  wsBNB.onmessage = (event1) => {
    let bnbPriceElement = document.getElementById('bnb-price')
    let bnbObject = JSON.parse(event1.data)
    let priceBNB = parseFloat(bnbObject.p).toFixed(2)
    bnbPriceElement.innerText = priceBNB
  }
  wsBTC.onmessage = (event2) => {
    let btcPriceElement = document.getElementById('btc-price')
    let btcObject = JSON.parse(event2.data)
    let priceBTC = parseFloat(btcObject.p).toFixed(2)
    btcPriceElement.innerText = priceBTC
  }
  wsBUSD.onmessage = (event3) => {
    let busdPriceElement = document.getElementById('busd-price')
    let busdObject = JSON.parse(event3.data)
    let priceBUSD = parseFloat(busdObject.p).toFixed(2)
    busdPriceElement.innerText = priceBUSD
  }
  return (
    <CRow>
      <CCol sm={6} lg={3}>
        <CWidgetStatsA
          className="mb-4"
          color="primary"
          value={
            <>
              <p id="eth-price">0</p>
              {''}
            </>
          }
          title="ETH"
        />
      </CCol>
      <CCol sm={6} lg={3}>
        <CWidgetStatsA
          className="mb-4"
          color="info"
          value={
            <>
              <p id="bnb-price">0</p>
              {''}
            </>
          }
          title="BNB"
        />
      </CCol>
      <CCol sm={6} lg={3}>
        <CWidgetStatsA
          className="mb-4"
          color="warning"
          value={
            <>
              <p id="btc-price">0</p>
              {''}
            </>
          }
          title="BTC"
        />
      </CCol>
      <CCol sm={6} lg={3}>
        <CWidgetStatsA
          className="mb-4"
          color="danger"
          value={
            <>
              <p id="busd-price">0</p>
              {''}
            </>
          }
          title="BUSD"
        />
      </CCol>
    </CRow>
  )
}

export default WidgetsDropdown
