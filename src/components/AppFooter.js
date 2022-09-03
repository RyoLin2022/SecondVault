import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
  return (
    <CFooter>
      <div>
        <a href="https://t.me/RyoLin" target="_blank" rel="noopener noreferrer">
          RyoLin
        </a>
        <span className="ms-1">&copy; 2022 creativeLabs.</span>
      </div>
      <div className="ms-auto">
        <span className="me-1">Powered by</span>
        <a href="https://t.me/RyoLin" target="_blank" rel="noopener noreferrer">
          Project Developer
        </a>
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
