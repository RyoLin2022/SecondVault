import React, { useEffect } from 'react'
import { useState } from 'react'
import { ethers } from 'ethers'
import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
  CContainer,
  CHeader,
  CHeaderDivider,
  CHeaderNav,
  CHeaderToggler,
  CNavLink,
  CNavItem,
  CButton,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cibTelegram, cibTwitter, cilMenu } from '@coreui/icons'
import { AppBreadcrumb } from './index'
let currentAccount = null
const AppHeader = () => {
  const dispatch = useDispatch()
  requestAccount()
  useEffect(() => {
    console.log('inside')
    changingAccount()
  })

  async function changingAccount() {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', () => {
        requestAccount()
      })
    }
  }

  const sidebarShow = useSelector((state) => state.sidebarShow)
  const [walletAddress, setWalletAddress] = useState('')
  async function requestAccount() {
    console.log('Requesting account...')
    try {
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      })
      setWalletAddress(accounts[0])
      localStorage.setItem('Account', currentAccount)
      currentAccount = accounts[0]
      console.log(currentAccount)
      var btnConnect = document.getElementById('connect-btn')
      let lengthAcc = currentAccount.length
      btnConnect.value = currentAccount
      btnConnect.innerText =
        currentAccount.substring(0, 4) + '...' + currentAccount.substring(lengthAcc - 4, lengthAcc)
    } catch (error) {
      console.log('error connecting')
    }
    //Check if Metamask Exist
    if (window.ethereum) {
      console.log('detected')
    } else {
      console.log('not detected')
      alert('Please Install Metamask')
    }
  }

  async function connectWallet() {
    if (typeof window.ethereum !== 'undefined') {
      await requestAccount()
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      alert('Wallet connected successfully!')
    } else {
      alert('Please install an injected Web3 wallet')
    }
  }

  return (
    <CHeader position="sticky" className="mb-4">
      <CContainer fluid>
        <CHeaderToggler
          className="ps-1"
          onClick={() => dispatch({ type: 'set', sidebarShow: !sidebarShow })}
        >
          <CIcon icon={cilMenu} size="lg" />
        </CHeaderToggler>
        <CHeaderNav className="d-none d-md-flex me-auto">
          <CNavItem>
            <CNavLink to="/dashboard" component={NavLink}>
              BUSD Vault
            </CNavLink>
          </CNavItem>
        </CHeaderNav>
        <CHeaderNav>
          <CNavItem>
            <CNavLink href="https://t.me/RyoLin">
              <CIcon icon={cibTelegram} size="lg" />
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink href="#">
              <CIcon icon={cibTwitter} size="lg" />
            </CNavLink>
          </CNavItem>
          <CButton color="primary" onClick={connectWallet} id="connect-btn">
            Connect
          </CButton>
        </CHeaderNav>
      </CContainer>
      <CHeaderDivider />
      <CContainer fluid>
        <AppBreadcrumb />
      </CContainer>
    </CHeader>
  )
}
export default AppHeader
