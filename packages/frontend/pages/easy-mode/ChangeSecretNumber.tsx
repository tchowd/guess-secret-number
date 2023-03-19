import React from 'react'
import { useAccount } from 'wagmi'

function ChangeSecretNumber() {
  const { address, connector, isConnected } = useAccount()

  return (
    <div>

    </div>
  )
}

export default ChangeSecretNumber