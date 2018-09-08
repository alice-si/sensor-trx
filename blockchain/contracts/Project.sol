pragma solidity ^0.4.24;

import 'openzeppelin-solidity/contracts/ownership/Ownable.sol';
import './SensorsManager.sol';

contract Project is Ownable {

    SensorsManager public sensorsManager;

    constructor() public {
        sensorsManager = new SensorsManager();
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

    function validate() {
//        address sender = validator.pullAddress(bytes32 messageHash, uint8 v, bytes32 r, bytes32 s);
//        validator.verify(value, time)
    }

}
