import { AbiItem } from 'web3-utils';

export class Constants {

    static readonly NetworkId: string = "0x4"; // Rinkeby Test Network
    static readonly DistributorAddress = "0xD0C94dE29A62D94BaCB88e1D6a5741d208Ac0ef4";
    static readonly AuthorityAddress = "0xc954697B3aA7c7810Dd972f10455e56C733DdbA5";
    
    static readonly DistributorAbi: AbiItem[] = [
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "_consumptionMeter",
					"type": "address"
				},
				{
					"internalType": "address",
					"name": "_productionMeter",
					"type": "address"
				}
			],
			"stateMutability": "nonpayable",
			"type": "constructor"
		},
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": true,
					"internalType": "address",
					"name": "consumer",
					"type": "address"
				},
				{
					"indexed": false,
					"internalType": "uint256",
					"name": "subscriptionRunId",
					"type": "uint256"
				}
			],
			"name": "ConsumerEnrolled",
			"type": "event"
		},
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": true,
					"internalType": "address",
					"name": "producer",
					"type": "address"
				},
				{
					"indexed": false,
					"internalType": "uint256",
					"name": "amount",
					"type": "uint256"
				}
			],
			"name": "EtherClaimedByProducer",
			"type": "event"
		},
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": true,
					"internalType": "address",
					"name": "owner",
					"type": "address"
				}
			],
			"name": "OwnerAdded",
			"type": "event"
		},
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": true,
					"internalType": "address",
					"name": "owner",
					"type": "address"
				}
			],
			"name": "OwnerRemoved",
			"type": "event"
		},
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": true,
					"internalType": "address",
					"name": "producer",
					"type": "address"
				},
				{
					"indexed": false,
					"internalType": "uint256",
					"name": "subscriptionRunId",
					"type": "uint256"
				}
			],
			"name": "ProducerEnrolled",
			"type": "event"
		},
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": false,
					"internalType": "enum HydroBloxStateMachine.SubscriptionStates",
					"name": "state",
					"type": "uint8"
				}
			],
			"name": "StateTransitioned",
			"type": "event"
		},
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": true,
					"internalType": "address",
					"name": "consumer",
					"type": "address"
				},
				{
					"indexed": false,
					"internalType": "uint256",
					"name": "amount",
					"type": "uint256"
				}
			],
			"name": "TokensClaimedByConsumer",
			"type": "event"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "owner",
					"type": "address"
				}
			],
			"name": "addOwner",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "subscriptionPrice",
					"type": "uint256"
				}
			],
			"name": "changeSubscriptionPrice",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "claimEtherAsProducer",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "claimTokensAsConsumer",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "consumptionMeter",
			"outputs": [
				{
					"internalType": "contract HydroBloxConsumptionMeter",
					"name": "",
					"type": "address"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "enrollAsConsumer",
			"outputs": [],
			"stateMutability": "payable",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "enrollAsProducer",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "isOwner",
			"outputs": [
				{
					"internalType": "bool",
					"name": "",
					"type": "bool"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "",
					"type": "address"
				}
			],
			"name": "owners",
			"outputs": [
				{
					"internalType": "bool",
					"name": "",
					"type": "bool"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "liters",
					"type": "uint256"
				}
			],
			"name": "produce",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "productionMeter",
			"outputs": [
				{
					"internalType": "contract HydroBloxProductionMeter",
					"name": "",
					"type": "address"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "owner",
					"type": "address"
				}
			],
			"name": "removeOwner",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "state",
			"outputs": [
				{
					"internalType": "enum HydroBloxStateMachine.SubscriptionStates",
					"name": "",
					"type": "uint8"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "store",
			"outputs": [
				{
					"internalType": "contract HydroBloxStorage",
					"name": "",
					"type": "address"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "token",
			"outputs": [
				{
					"internalType": "contract HydroBloxToken",
					"name": "",
					"type": "address"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "transitionToNextState",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		}
	];

    static readonly AuthorityAbi: AbiItem[] = [
		{
			"inputs": [],
			"stateMutability": "nonpayable",
			"type": "constructor"
		},
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": true,
					"internalType": "address",
					"name": "owner",
					"type": "address"
				}
			],
			"name": "OwnerAdded",
			"type": "event"
		},
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": true,
					"internalType": "address",
					"name": "owner",
					"type": "address"
				}
			],
			"name": "OwnerRemoved",
			"type": "event"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "owner",
					"type": "address"
				}
			],
			"name": "addOwner",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "consumptionMeter",
			"outputs": [
				{
					"internalType": "contract HydroBloxConsumptionMeter",
					"name": "",
					"type": "address"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "isOwner",
			"outputs": [
				{
					"internalType": "bool",
					"name": "",
					"type": "bool"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "_consumptionMeterAddress",
					"type": "address"
				}
			],
			"name": "issueConsumptionMeter",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "_productionMeterAddress",
					"type": "address"
				}
			],
			"name": "issueProductionMeter",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "",
					"type": "address"
				}
			],
			"name": "owners",
			"outputs": [
				{
					"internalType": "bool",
					"name": "",
					"type": "bool"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "productionMeter",
			"outputs": [
				{
					"internalType": "contract HydroBloxProductionMeter",
					"name": "",
					"type": "address"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "owner",
					"type": "address"
				}
			],
			"name": "removeOwner",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		}
	];
}
