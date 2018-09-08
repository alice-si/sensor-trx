pragma solidity ^0.4.24;

contract Verifier {

    function pullAddress(bytes32 messageHash, uint8 v, bytes32 r, bytes32 s) public pure returns(address) {
        return 0x0;
    }

    function verify(bytes32 messageHash, uint8 v, bytes32 r, bytes32 s, uint8 value, uint32 timestamp) public pure returns(bool) {
        return true;
    }
}
