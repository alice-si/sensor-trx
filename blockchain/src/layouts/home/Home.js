import React, { Component } from 'react'

class Home extends Component {
  render() {
    return(
      <main className="container">
        <div className="pure-g">
          <div className="pure-u-1-1">
            <h1>SensorTRX</h1>
            <h2>Featherweight transaction relay for
              charity sensor oracles</h2>
            <p>Built by Alice & friends - Ethereum infrastructure for social good</p>

            <img id="trx" src="https://s3.eu-west-2.amazonaws.com/alice-res/trx.png" width="400px" />

            <ul>
              <li><b>No hassle</b>: no need to create & manage Ethereum accounts for each sensor</li>
              <li><b>No risk</b>: lost or broken sensors don’t manage private keys so can’t lose Ξth</li>
              <li><b>Low overhead</b>: sensors don’t need to be directly connected to the blockchain</li>
              <li><b>Decentralised</b>: transactions don’t proxy through a centralised node</li>
            </ul>

          </div>
        </div>
      </main>
    )
  }
}

export default Home
