pragma solidity ^0.4.24;

import 'openzeppelin-solidity/contracts/ownership/Ownable.sol';
import './SensorsManager.sol';
import './ClaimsRegistry.sol';

contract Project is Ownable {

    SensorsManager public sensorsManager;
    ClaimsRegistry public claimsRegistry;

    constructor() public {
        sensorsManager = new SensorsManager();
        claimsRegistry = new ClaimsRegistry();
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


    function addClaim(uint8 _minValue, uint256 _minTime) public onlyOwner {
        claimsRegistry.addClaim(_minValue, _minTime);
    }


    function validate(uint8 _value, uint32 _time, uint256 _claimId) public {
        //TODO: recover from the Verifier contract
        address sensor = 0x0;

        uint8 minValue;
        uint256 minTime;
        bool isValidated;
        (minValue, minTime, isValidated) = claimsRegistry.getClaimDetailsAt(_claimId);

        require(_value >= minValue);
        require(_time >= minTime);
        require(!isValidated);

        claimsRegistry.validateClaim(_claimId, sensor);
    }

}
