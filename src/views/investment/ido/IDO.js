import React, { useState } from 'react'
import { CRow, CCard, CCardHeader, CCardBody, CButton, CCol } from '@coreui/react'
import './IDO.css'
import { CopyToClipboard } from 'react-copy-to-clipboard'
let currentAccount = sessionStorage.getItem('Account')
let accAllowance = Number(0)
const IDO = () => {
  const [copied, setCopied] = useState(false)
  let refLink = null
  let refAccount = null
  let BusdContract = '0x4F3775617aB942b4395d8A3A2e80ffDb08028c13'
  let IDOContract = '0x13E8d3BC55BA39b121cdBF679b5a9FA09B6daA9F'
  GenerateLink()
  function alertCopied() {
    alert('Invitation link has been copied!!')
  }
  async function GetData() {
    CheckApproval()
    GetRef()
    seeRef()
  }
  async function makeCheck() {
    currentAccount = sessionStorage.getItem('Account')
    console.log(currentAccount)
    if (currentAccount === null) {
      alert('no account detected, please connect your wallet again')
    } else {
      GetData()
      let checkBTN = document.getElementById('checkButton')
      checkBTN.hidden = true
    }
  }
  /*------------------Here's the token Approval-----------------*/
  /*------------------Here's the token Approval-----------------*/
  /*------------------Here's the token Approval-----------------*/
  async function ApproveToken() {
    currentAccount = sessionStorage.getItem('Account')
    CheckApproval()
    if (currentAccount === null) {
      alert('no account detected!!')
    }
    accAllowance = parseInt(accAllowance)
    if (accAllowance === 0) {
      let inputGasPrice = await window.ethereum.request({
        method: 'eth_gasPrice',
      })
      let inputData =
        '0x095ea7b3000000000000000000000000' +
        IDOContract.substring(2, IDOContract.length) +
        '0000000000000000000000000000000000000000204fce5e3e25026110000000'
      let params = [
        {
          from: currentAccount,
          to: BusdContract,
          gas: Number(300000).toString(16), // 30400
          gasPrice: inputGasPrice, // 10000000000
          value: '0', // 2441406250
          data: inputData,
        },
      ]

      var ApproveBTN = document.getElementById('approveButton')
      let result = window.ethereum
        .request({
          method: 'eth_sendTransaction',
          params,
        })
        .then((ApproveBTN.innerText = 'Approving...'))
        .catch((err) => {
          ApproveBTN.innerText = 'Approve BUSD'
          console.log(err)
        })

      setTimeout(function () {
        console.log('The first log delay 20 second')
        CheckApproval()
      }, 20000)

      setTimeout(function () {
        console.log('The second log delay 40 second')
        CheckApproval()
      }, 40000)
    }
  }

  /*------------------Checck the allowance for IDO contract-----------------*/
  /*------------------Checck the allowance for IDO contract-----------------*/
  /*------------------Checck the allowance for IDO contract-----------------*/
  async function CheckApproval() {
    currentAccount = sessionStorage.getItem('Account')
    console.log('Checking Approval' + accAllowance)
    let inputdata =
      '0xdd62ed3e' +
      '000000000000000000000000' +
      currentAccount.substring(2, currentAccount.length) +
      '000000000000000000000000' +
      IDOContract.substring(2, IDOContract.length)
    accAllowance = await window.ethereum.request({
      method: 'eth_call',
      params: [
        {
          to: BusdContract,
          data: inputdata,
          //allowance:0xdd62ed3e
          //BalanceOF + staking contract address
        },
        'latest',
      ],
    })
    console.log('Checking Approval' + accAllowance)
    let idoButton = document.getElementById('idoButton')
    let approved = document.getElementById('approveButton')
    if (accAllowance > 0) {
      // approveButton.innerText = 'Approved'
      approved.hidden = true
      idoButton.hidden = false
    } else {
      approved.hidden = false
      idoButton.hidden = true
    }
  }
  async function seeRef() {
    let RefAddr = sessionStorage.getItem('RefAccount')
    console.log('seeRef : ' + RefAddr)
  }
  async function GenerateLink() {
    let link = window.location.href
    //link = 'DNS server/#/investment/ido?invitedBy=' + currentAccount
    if (link.includes('tokenpocket')) link = link.substring(0, link.length - 23)
    if (link.length > 60) link = link.substring(0, link.length - 42) + currentAccount
    else link = link + '?invitedBy=' + currentAccount
    refLink = link
  }
  async function GetRef() {
    let link = window.location.href
    if (link.includes('invitedBy=')) {
      let start = link.indexOf('By=')
      refAccount = link.substring(start + 3, start + 45)
    } else {
      refAccount = '0x0000000000000000000000000000000000000000'
    }
    sessionStorage.setItem('RefAccount', refAccount)
  }
  async function makeIDO() {
    currentAccount = sessionStorage.getItem('Account')
    accAllowance = parseInt(accAllowance)
    CheckApproval()
    console.log(accAllowance)
    if (accAllowance === 0) {
      CheckApproval()
    } else {
      console.log('accAllowance > 0')
    }
  }
  async function claimToken() {
    //Do nothing
  }
  return (
    <>
      <CCard className="mb-4">
        <CCardHeader>
          <CCol>
            <CRow className="sameRow">
              <div id="approve">
                <CButton
                  color="primary"
                  variant="outline"
                  className="sameRowRight"
                  id="approveButton"
                  onClick={ApproveToken}
                  hidden
                >
                  Approve BUSD
                </CButton>
              </div>
              <div id="makecheck">
                <CButton
                  color="primary"
                  variant="outline"
                  className="sameRowRight"
                  id="checkButton"
                  onClick={makeCheck}
                >
                  Make a check
                </CButton>
              </div>
              <div id="makeido">
                <CButton
                  color="primary"
                  variant="outline"
                  className="sameRowRight"
                  id="idoButton"
                  onClick={makeIDO}
                  hidden
                >
                  Make IDO
                </CButton>
              </div>
              <div id="makeclaim">
                <CButton
                  color="primary"
                  variant="outline"
                  className="sameRowRight"
                  id="claimButton"
                  onClick={claimToken}
                  hidden
                >
                  Claim Token
                </CButton>
              </div>
            </CRow>
          </CCol>
        </CCardHeader>
        <CCardBody>
          <CRow>
            <h1 className="sameRowLeft">IDO Dashboard</h1>
          </CRow>
          <p>
            The BUSD Vault is an innovative token having a vault. <br />
            The vault provides a base price of the token which decreases the chance of dumping.
          </p>
          <table className="table">
            <thead>
              <tr>
                <th>
                  <span className="h5">IDO progress</span>
                </th>
                <th>
                  <span className="h5" id="idoCABalance">
                    0
                  </span>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <span className="h5">IDO per person</span>
                </td>
                <td>
                  <span className="h5">100 BUSD</span>
                </td>
              </tr>
              <tr>
                <td>
                  <span className="h5">Your Balance</span>
                </td>
                <td>
                  <span className="h5" id="idoAccBalance">
                    0
                  </span>
                </td>
              </tr>
              <tr>
                <td>
                  <span className="h5">Your Referrals</span>
                </td>
                <td>
                  <span className="h5">0</span>
                </td>
              </tr>
              <tr>
                <td>
                  <span className="h5">Your Earnings</span>
                </td>
                <td>
                  <span className="h5">0</span>
                </td>
              </tr>
              <tr>
                <td>
                  <span className="h5">Your Referral Link</span>
                </td>
                <td>
                  <CopyToClipboard text={refLink} onCopy={() => setCopied(true)}>
                    <CButton color="primary" id="inviteLink" onClick={alertCopied}>
                      Copy Link
                    </CButton>
                  </CopyToClipboard>
                </td>
              </tr>
            </tbody>
          </table>
        </CCardBody>
      </CCard>
      <CCard className="mb-4">
        <CCardHeader>
          <h1 className="sameRowLeft">Mechanism</h1>
        </CCardHeader>
        <CCardBody>
          <p>
            Total Tax : 7%
            <br />
            Marketing : 2% <br /> BUSD Vault : 2% <br /> LP Reward : 3%
          </p>
        </CCardBody>
      </CCard>
      <CCard className="mb-4">
        <CCardHeader>Inline text elements</CCardHeader>
        <CCardBody>
          <p>
            Traditional heading elements are designed to work best in the meat of your page content.
            When you need a heading to stand out, consider using a <strong>display heading</strong>
            —a larger, slightly more opinionated heading style.
          </p>
          <div className="bd-example">
            <p>
              You can use the mark tag to <mark>highlight</mark> text.
            </p>
            <p>
              <del>This line of text is meant to be treated as deleted text.</del>
            </p>
            <p>
              <s>This line of text is meant to be treated as no longer accurate.</s>
            </p>
            <p>
              <ins>This line of text is meant to be treated as an addition to the document.</ins>
            </p>
            <p>
              <u>This line of text will render as underlined</u>
            </p>
            <p>
              <small>This line of text is meant to be treated as fine print.</small>
            </p>
            <p>
              <strong>This line rendered as bold text.</strong>
            </p>
            <p>
              <em>This line rendered as italicized text.</em>
            </p>
          </div>
        </CCardBody>
      </CCard>
    </>
  )
}

export default IDO
