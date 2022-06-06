// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

import "./math.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract SimpleMarket is DSMath {

    uint public last_offer_id;

    mapping (uint => OfferInfo) public offers;

    bool locked;

    struct OfferInfo {
        uint     pay_amt;
        ERC20    pay_gem;
        uint     buy_amt;
        ERC20    buy_gem;
        address  owner;
        uint64   timestamp;
    }

    modifier can_buy(uint id) {
        require(isActive(id));
        _;
    }

    modifier can_cancel(uint id) {
        require(isActive(id));
        require(getOwner(id) == msg.sender);
        _;
    }

    modifier can_offer {
        _;
    }

    modifier synchronized {
        require(!locked);
        locked = true;
        _;
        locked = false;
    }

    function isActive(uint id) public view returns (bool active) {
        return offers[id].timestamp > 0;
    }

    function getOwner(uint id) public view returns (address owner) {
        return offers[id].owner;
    }

    function getOffer(uint id) public view returns (uint, ERC20, uint, ERC20) {
      OfferInfo storage offerSelected = offers[id];
      return (offerSelected.pay_amt, offerSelected.pay_gem,
              offerSelected.buy_amt, offerSelected.buy_gem);
    }

    function buy(uint id, uint quantity) public can_buy(id) synchronized returns (bool) {
        OfferInfo memory offerSelected = offers[id];
        uint spend = mul(quantity, offerSelected.buy_amt) / offerSelected.pay_amt;

        require(uint128(spend) == spend);
        require(uint128(quantity) == quantity);

        if (quantity == 0 || spend == 0 ||
            quantity > offerSelected.pay_amt || spend > offerSelected.buy_amt)
        {
            return false;
        }

        offers[id].pay_amt = sub(offerSelected.pay_amt, quantity);
        offers[id].buy_amt = sub(offerSelected.buy_amt, spend);
        require( offerSelected.buy_gem.transferFrom(msg.sender, offerSelected.owner, spend) );
        require( offerSelected.pay_gem.transfer(msg.sender, quantity) );

        if (offers[id].pay_amt == 0) {
          delete offers[id];
        }

        return true;
    }

    function cancel(uint id) public can_cancel(id) synchronized returns (bool success) {
        OfferInfo memory offerSelected = offers[id];
        delete offers[id];

        require( offerSelected.pay_gem.transfer(offerSelected.owner, offerSelected.pay_amt) );

        success = true;
    }

    function kill(uint id) public {
        require(cancel(id));
    }

    function make(ERC20 pay_gem, ERC20 buy_gem, uint128  pay_amt, uint128  buy_amt) public returns (uint id) {
        return offer(pay_amt, pay_gem, buy_amt, buy_gem);
    }

    function offer(uint pay_amt, ERC20 pay_gem, uint buy_amt, ERC20 buy_gem) public can_offer synchronized returns (uint id) {
        require(uint128(pay_amt) == pay_amt);
        require(uint128(buy_amt) == buy_amt);
        require(pay_amt > 0);
        //require(pay_gem != ERC20(0x0));
        require(buy_amt > 0);
        //require(buy_gem != ERC20(0x0));
        require(pay_gem != buy_gem);

        OfferInfo memory info;
        info.pay_amt = pay_amt;
        info.pay_gem = pay_gem;
        info.buy_amt = buy_amt;
        info.buy_gem = buy_gem;
        info.owner = msg.sender;
        info.timestamp = uint64(block.timestamp);
        id = _next_id();
        offers[id] = info;

        require(pay_gem.transferFrom(msg.sender, address(this), pay_amt) );
    }

    function take(uint id, uint128 maxTakeAmount) public {
        require(buy(id, maxTakeAmount));
    }

    function _next_id() internal returns (uint) {
        last_offer_id++; return last_offer_id;
    }

    // added by Bart - to be removed once finalised?
    function getTokenOnOffer(uint id) public view returns (string memory) {
      OfferInfo storage offerSelected = offers[id];
      return (offerSelected.pay_gem.symbol());
    }
}