pragma solidity ^0.4.24;

import 'openzeppelin-solidity/contracts/ownership/Ownable.sol';

contract SensorsManager is Ownable {

    mapping(address => bool) private activeSensors;

    function activateSensor(address _sensor) public onlyOwner {
        activeSensors[_sensor] = true;
    }

    function deactivateSensor(address _sensor) public onlyOwner {
        activeSensors[_sensor] = false;
    }

    function isSensorActive(address _sensor) public view returns(bool) {
        return activeSensors[_sensor];
    }

}
