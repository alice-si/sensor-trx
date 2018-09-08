pragma solidity ^0.4.24;

contract Validator {
	
	//Untested because laptop is dying

	function recoverAddr(bytes32 _msgHash, uint8 _v, bytes32 _r, bytes32 _s) public pure returns (address) {
		return ecrecover(_msgHash, _v, _r, _s);
	}

	function validate(bytes32 _msgHash, uint8 _v, bytes32 _r, bytes32 _s, uint8 _value, uint32 _timestamp) public pure returns (bool) {
		//bytes memory prefix = "\x19Ethereum Signed Message:\n".concat(_msgHash.length);//last number is length
		//bytes32 prefixedHash = sha3(prefix, _value.concat(_timestamp));
		//return (prefixedHash == _msgHash);
		return true;
	}
}
