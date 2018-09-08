pragma solidity ^0.4.24;

contract Verifier {

	function recoverAddress(bytes32 msgHash, uint8 v, bytes32 r, bytes32 s) public pure returns(address) {
		bytes memory prefix = "\x19Ethereum Signed Message:\n32";
		bytes32 prefixedHash = keccak256(prefix, msgHash);
		return ecrecover(prefixedHash, v, r, s);
	}

	function verifyHash(bytes32 msgHash, uint8 value, uint256 timestamp) public pure returns(bool) {
		bytes32 onchainHash = keccak256(value, timestamp);
		return (onchainHash == msgHash);
	}
}
