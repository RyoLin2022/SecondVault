import React from 'react'
import { CCardHeader, CCard, CCardBody, CCol, CRow, CWidgetStatsA } from '@coreui/react'
import './Dashboard.css'

let wsETH = new WebSocket('wss://stream.binance.com:9443/ws/ethusdt@trade')
let wsBNB = new WebSocket('wss://stream.binance.com:9443/ws/bnbusdt@trade')
let wsBTC = new WebSocket('wss://stream.binance.com:9443/ws/btcusdt@trade')
let wsBUSD = new WebSocket('wss://stream.binance.com:9443/ws/busdusdt@trade')

const Dashboard = () => {
  wsETH.onmessage = (event) => {
    let ethPriceElement = document.getElementById('eth-price')
    if (event.data !== null) {
      let ethObject = JSON.parse(event.data)
      let priceETH = parseFloat(ethObject.p).toFixed(2)
      ethPriceElement.innerText = priceETH
    }
  }
  wsBNB.onmessage = (event1) => {
    let bnbPriceElement = document.getElementById('bnb-price')
    if (event1.data !== null) {
      let bnbObject = JSON.parse(event1.data)
      let priceBNB = parseFloat(bnbObject.p).toFixed(2)
      bnbPriceElement.innerText = priceBNB
    }
  }
  wsBTC.onmessage = (event2) => {
    let btcPriceElement = document.getElementById('btc-price')
    if (event2.data !== null) {
      let btcObject = JSON.parse(event2.data)
      let priceBTC = parseFloat(btcObject.p).toFixed(2)
      btcPriceElement.innerText = priceBTC
    }
  }
  wsBUSD.onmessage = (event3) => {
    let busdPriceElement = document.getElementById('busd-price')
    if (event3.data !== null) {
      let busdObject = JSON.parse(event3.data)
      let priceBUSD = parseFloat(busdObject.p).toFixed(2)
      busdPriceElement.innerText = priceBUSD
    }
  }
  async function chartBNB() {
    let chart = document.getElementById('dexscreener-embed')
    let chartName = document.getElementById('ChartName')
    chartName.innerText = 'BNB Price Chart'
    chart.innerHTML =
      '<iframe src="https://dexscreener.com/bsc/0x58F876857a02D6762E0101bb5C46A8c1ED44Dc16?embed=1&trades=0"></iframe>'
  }
  async function chartETH() {
    let chart = document.getElementById('dexscreener-embed')
    let chartName = document.getElementById('ChartName')
    chartName.innerText = 'ETH Price Chart'
    chart.innerHTML =
      '<iframe src="https://dexscreener.com/bsc/0x531FEbfeb9a61D948c384ACFBe6dCc51057AEa7e?embed=1&trades=0"></iframe>'
  }
  async function chartBTC() {
    let chart = document.getElementById('dexscreener-embed')
    let chartName = document.getElementById('ChartName')
    chartName.innerText = 'BTC Price Chart'
    chart.innerHTML =
      '<iframe src="https://dexscreener.com/bsc/0x3F803EC2b816Ea7F06EC76aA2B6f2532F9892d62?embed=1&trades=0"></iframe>'
  }

  return (
    <>
      <CCard>
        <CCardHeader>
          <CRow>
            <p>
              Note: The price data is from Binance, and the chart is from dexscreener <br />
              You can see the chart when clicking on each column
            </p>
          </CRow>
        </CCardHeader>
        <CCardBody>
          <CRow>
            <CCol sm={6} lg={3} onClick={chartETH}>
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
            <CCol sm={6} lg={3} onClick={chartBNB}>
              <CWidgetStatsA
                id="BNB"
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
            <CCol sm={6} lg={3} onClick={chartBTC}>
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
          <CRow>
            <CCol sm={5}>
              <h4 id="ChartName" className="card-title mb-0">
                BNB Price Chart
              </h4>
            </CCol>
            <div id="dexscreener-embed">
              <iframe src="https://dexscreener.com/bsc/0x58F876857a02D6762E0101bb5C46A8c1ED44Dc16?embed=1&trades=0"></iframe>
            </div>
          </CRow>
        </CCardBody>
      </CCard>
    </>
  )
}

export default Dashboard
