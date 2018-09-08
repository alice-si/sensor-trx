pragma solidity ^0.4.24;

import 'openzeppelin-solidity/contracts/ownership/Ownable.sol';

contract SensorsManager is Ownable {

    event SensorActivated(address indexed sensorAddress);
    event SensorDeactivated(address indexed sensorAddress);

    mapping(address => bool) private activeSensors;
    address[] public sensors;

    function addSensor(address _sensor) public onlyOwner {
        sensors.push(_sensor);
    }

    function activateSensor(address _sensor) public onlyOwner {
        activeSensors[_sensor] = true;
        emit SensorActivated(_sensor);
    }

    function deactivateSensor(address _sensor) public onlyOwner {
        activeSensors[_sensor] = false;
        emit SensorDeactivated(_sensor);
    }

    function isSensorActive(address _sensor) public view returns(bool) {
        return activeSensors[_sensor];
    }

    function getSensorsCount() public view returns(uint256) {
        return sensors.length;
    }

    function getSensorsAt(uint256 _index) public view returns(address) {
        return sensors[_index];
    }

}
