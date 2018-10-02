
*Please use the following sensor address for the testing purpose **0x01db8c011f8caa93479fa6db874e08156c7d02ab** / Simulation currently not in operation, check back for more information.*


INTRO

SensorTRX is a project that was hacked during EthBerlin 2018.  
A presentation of the project can be found here: https://tinyurl.com/y7dufof3  
A demo of the project can be found here: http://sensor-trx.alice.si/  

OVERVIEW

SensorTRX is a lightweight protocol for sensor oracles.  
It avoids the hassle of having to create and manage ethereum accounts for each sensor in a project.  
It also avoids having sensors manage private keys and connecting directly to the blockchain, so that if they are lost or damaged, no Eth is lost.  

HOW IT WORKS

Sensors simply sign their data with an elliptic curve digital signature and broadcast it over the Internet.  
Relayers can pick up these messages and carry out a (free) off-chain verification of the validity of the message by querying the the target smart contract to avoid unnecessary overhead.  
If everything checks out, the Relayer can then send the signed data to the smart contract. Once accepted, the Relayer automatically receives a bounty reward for relaying the message.  

IMPLEMENTATION FOR CHARITIES

This implementation was coded during EthBerlin and integrates with the Alice (www.alice.si) "donation by results" protocol.  
It allows charities to verify claims that they have achieved their goals by broadcasting signed messages on Telegram (this could be any public posting service).  
Relayers can check whether the sensor will successfully validate a charity claim before relaying the message.  
Relayers only receive a bounty if the message effectively verifies a claim.  

SMART CONTRACTS

Authentication contract: admin gateway that ensures only the authorised project administrator can manage sensors.  
Project contract: this is the main interface for the SensorTRX protocol, allowing calls to the sensor management, signature verification and charity claims contracts. Relayers can perform a query on the validity of signed sensor messages here. The Project contract also pays out bounties to relayers.  
Sensor management contract: allows the project manager to create authorised sensors (whitelist) and activate or deactivate them (in case they become unresponsive)  
Verifier contract: verifies the signature of whitelisted sensors  
Claims registry contract: records the claims made by charities (in this implementation)  
