import React from 'react'
import ReactDOM from 'react-dom/client'

import App from '@/pages/App'

import '@/styles/index.css'
import { RecoilRoot } from 'recoil'

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RecoilRoot>
      <App />
    </RecoilRoot>
  </React.StrictMode>
)
