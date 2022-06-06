// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract WETH is ERC20 {
  event Deposit(address indexed sender, uint256 amount);
  event Withdrawal(address indexed recipient, uint256 amount);

   constructor() ERC20("Wrapped Ether", "WETH") {}

  function deposit() public payable {
    _mint(msg.sender, msg.value);
    emit Deposit(msg.sender, msg.value);
  }

  function withdraw(uint amount) public {
    require(balanceOf(msg.sender) >= amount);
//    address payable recipient = msg.sender;
    _burn(msg.sender, amount);
    payable(msg.sender).transfer(amount);
    emit Withdrawal(msg.sender, amount);
   }

   function readBalance() view public returns(uint amount){
     amount = balanceOf(msg.sender);
   }
}
