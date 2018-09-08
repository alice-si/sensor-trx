pragma solidity ^0.4.24;

import 'openzeppelin-solidity/contracts/ownership/Ownable.sol';


contract ClaimsRegistry is Ownable {

    event ClaimAdded(uint256 indexed index, uint8 minValue, uint256 minTime);
    event ClaimValidated(uint256 indexed index, address sensor);

    struct Claim {
        uint8 minValue;
        uint256 minTime;
        bool isValidated;
    }

    Claim[] claims;


    function addClaim(uint8 _minValue, uint256 _minTime) public onlyOwner {
        claims.push(Claim(_minValue, _minTime, false));
        emit ClaimAdded(claims.length -1, _minValue, _minTime);
    }

    function validateClaim(uint256 _index, address _sensor) public onlyOwner {
        claims[_index].isValidated = true;
        emit ClaimValidated(_index, _sensor);
    }

    function getClaimsCount() public view returns(uint256) {
        return claims.length;
    }

    function getClaimDetailsAt(uint256 _index) public view returns(uint8, uint256, bool) {
        return (claims[_index].minValue, claims[_index].minTime, claims[_index].isValidated);
    }

}
