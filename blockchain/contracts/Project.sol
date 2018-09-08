pragma solidity ^0.4.24;

import 'openzeppelin-solidity/contracts/ownership/Ownable.sol';
import 'openzeppelin-solidity/contracts/math/SafeMath.sol';
import './SensorsManager.sol';
import './ClaimsRegistry.sol';
import './Verifier.sol';

contract Project is Ownable {
    using SafeMath for uint256;

    SensorsManager public sensorsManager;
    ClaimsRegistry public claimsRegistry;
    Verifier public verifier;

    uint256 reservedBounties;

    constructor() public {
        sensorsManager = new SensorsManager();
        claimsRegistry = new ClaimsRegistry();
        verifier = new Verifier();
    }

    function addSensor(address _sensor) public onlyOwner {
        sensorsManager.addSensor(_sensor);
    }

    function activateSensor(address _sensor) public onlyOwner {
        sensorsManager.activateSensor(_sensor);
    }

    function deactivateSensor(address _sensor) public onlyOwner {
        sensorsManager.deactivateSensor(_sensor);
    }


    function addClaim(uint8 _minValue, uint256 _minTime, uint256 _bounty) public onlyOwner {
        require(address(this).balance.sub(reservedBounties) >= _bounty );
        claimsRegistry.addClaim(_minValue, _minTime, _bounty);
        reservedBounties = reservedBounties.add(_bounty);
    }


    function validate(bytes32 msgHash, uint8 v, bytes32 r, bytes32 s, uint8 _value, uint32 _time, uint256 _claimId) public {
        verifier.verifyHash(msgHash, _value, _time);

        //verify the sensor
        address sensor = verifier.recoverAddress(msgHash, v, r, s);
        require(sensorsManager.isSensorActive(sensor));

        uint8 minValue;
        uint256 minTime;
        uint256 bounty;
        bool isValidated;
        (minValue, minTime, bounty, isValidated) = claimsRegistry.getClaimDetailsAt(_claimId);

        require(_value >= minValue);
        require(_time >= minTime);
        require(!isValidated);

        claimsRegistry.validateClaim(_claimId, sensor);
        reservedBounties = reservedBounties.sub(bounty);
        msg.sender.transfer(bounty);
    }

    function () payable {}

}
