pragma solidity ^0.4.2;

import 'openzeppelin-solidity/contracts/lifecycle/Destructible.sol';
import './Project.sol';


contract Authentication is Destructible {
  struct User {
    bytes32 name;
    Project project;

  }

  mapping (address => User) private users;

  uint private id; // Stores user id temporarily

  modifier onlyExistingUser {
    // Check if user exists or terminate

    require(!(users[msg.sender].name == 0x0));
    _;
  }

  modifier onlyValidName(bytes32 name) {
    // Only valid names allowed

    require(!(name == 0x0));
    _;
  }

  function login() constant
  public
  onlyExistingUser
  returns (bytes32) {
    return (users[msg.sender].name);
  }

  function getProject() view public onlyExistingUser returns(address) {
    return (users[msg.sender].project);
  }

  function signup(bytes32 name)
  public
  payable
  onlyValidName(name)
  returns (bytes32) {
    // Check if user exists.
    // If yes, return user name.
    // If no, check if name was sent.
    // If yes, create and return user.

    if (users[msg.sender].name == 0x0)
    {
        users[msg.sender].name = name;
        users[msg.sender].project = new Project();

        return (users[msg.sender].name);
    }

    return (users[msg.sender].name);
  }

  function update(bytes32 name)
  public
  payable
  onlyValidName(name)
  onlyExistingUser
  returns (bytes32) {
    // Update user name.

    if (users[msg.sender].name != 0x0)
    {
        users[msg.sender].name = name;

        return (users[msg.sender].name);
    }
  }
}
