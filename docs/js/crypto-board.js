(function($){
    $(function(){
  
        $('.button-collapse').sideNav();

        // const PROVIDER_NETWORK = "http://localhost:9545";

        // Rinkeby
        const PROVIDER_NETWORK = "https://www.rinkeby.io/";
        const ETHERSCAN_URL = "https://rinkeby.etherscan.io/tx/";

        // Main net
        // const ETHERSCAN_URL = "https://etherscan.io/";

        const CONTRACT_ABI = [
            {
                "constant": true,
                "inputs": [
                    {
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "name": "writerAccounts",
                "outputs": [
                    {
                        "name": "",
                        "type": "address"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [
                    {
                        "name": "_index",
                        "type": "uint256"
                    }
                ],
                "name": "getMessage",
                "outputs": [
                    {
                        "name": "",
                        "type": "address"
                    },
                    {
                        "name": "",
                        "type": "string"
                    },
                    {
                        "name": "",
                        "type": "string"
                    },
                    {
                        "name": "",
                        "type": "bytes32"
                    },
                    {
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [],
                "name": "owner",
                "outputs": [
                    {
                        "name": "",
                        "type": "address"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [
                    {
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "name": "messages",
                "outputs": [
                    {
                        "name": "writerAddress",
                        "type": "address"
                    },
                    {
                        "name": "nickName",
                        "type": "string"
                    },
                    {
                        "name": "message",
                        "type": "string"
                    },
                    {
                        "name": "topic",
                        "type": "bytes32"
                    },
                    {
                        "name": "postTime",
                        "type": "uint256"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [],
                "name": "getWriterCount",
                "outputs": [
                    {
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [],
                "name": "getMessageCount",
                "outputs": [
                    {
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [],
                "name": "getWriterAccounts",
                "outputs": [
                    {
                        "name": "",
                        "type": "address[]"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [
                    {
                        "name": "_index",
                        "type": "uint256"
                    }
                ],
                "name": "getWriterAccount",
                "outputs": [
                    {
                        "name": "",
                        "type": "address"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "constructor"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": false,
                        "name": "writerAddress",
                        "type": "address"
                    },
                    {
                        "indexed": false,
                        "name": "nickName",
                        "type": "string"
                    },
                    {
                        "indexed": false,
                        "name": "message",
                        "type": "string"
                    },
                    {
                        "indexed": false,
                        "name": "topic",
                        "type": "bytes32"
                    },
                    {
                        "indexed": false,
                        "name": "postTime",
                        "type": "uint256"
                    }
                ],
                "name": "MessageInfo",
                "type": "event"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": true,
                        "name": "previousOwner",
                        "type": "address"
                    },
                    {
                        "indexed": true,
                        "name": "newOwner",
                        "type": "address"
                    }
                ],
                "name": "OwnershipTransferred",
                "type": "event"
            },
            {
                "constant": false,
                "inputs": [
                    {
                        "name": "_nickName",
                        "type": "string"
                    },
                    {
                        "name": "_message",
                        "type": "string"
                    },
                    {
                        "name": "_topic",
                        "type": "bytes32"
                    }
                ],
                "name": "postMessage",
                "outputs": [],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "constant": false,
                "inputs": [
                    {
                        "name": "newOwner",
                        "type": "address"
                    }
                ],
                "name": "transferOwnership",
                "outputs": [],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
            }
        ];
        
        // localhost
        // const CONTRACT_ADDRESS = '0x345ca3e014aaf5dca488057592ee47305d9b3e10';
        // Rinkeby
        const CONTRACT_ADDRESS = '0xb21b1416f324c7b07626b91d019febbd396678a0';
        
        if (typeof web3 !== 'undefined') {
            web3 = new Web3(web3.currentProvider);
        } else {
            web3 = new Web3(new Web3.providers.HttpProvider(PROVIDER_NETWORK));
        }

        if (web3.isConnected()) {
            web3.eth.defaultAccount = web3.eth.accounts[0];

            if (web3.eth.defaultAccount) {
                $("#myAddress").html('Your Address: ' + web3.eth.accounts[0]);
                // let ether_balance = web3.fromWei(web3.eth.getBalance(web3.eth.accounts[0]).toNumber());
                web3.eth.getBalance(web3.eth.defaultAccount, function (error, result) {
                    if (!error) {
                        // console.log(result);
                        let ether_balance = web3.fromWei(result).toNumber();
                        $("#myBalance").html('Balance: ' + ether_balance + ' ether');
                    } else {
                        console.error(error);
                    }
                });
            } else {
                $("#no-send-message").html('Your address is disable. <br>Please unlock Metamask. ');
                $(".address-area").css("display", "none");
                $("#button").addClass('disabled');
            }
        } else {
            $("#no-send-message").html('No connection to Main Ethereum Network. ');
            $(".address-area").css("display", "none");
            $("#button").addClass('disabled');
        }
        
        let cryptoboardContract = web3.eth.contract(CONTRACT_ABI);
        // New contract
        // var cryptoboard = cryptoboardContract.new(
        //    {
        //      from: web3.eth.accounts[0], 
        //      data: '0x6060604052341561000f57600080fd5b336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550610f6f8061009e6000396000f3006060604052600436106100a4576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680630d80fefd146100a95780631ed0382014610230578063319339161461029357806349819eba146102bc57806386f79edb1461035c5780638da5cb5b146103935780638ecc8b68146103e8578063be655cee14610411578063f2fde38b14610474578063f41aabf3146104ad575b600080fd5b34156100b457600080fd5b6100ca6004808035906020019091905050610517565b604051808673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018060200180602001858152602001841515151581526020018381038352878181546001816001161561010002031660029004815260200191508054600181600116156101000203166002900480156101995780601f1061016e57610100808354040283529160200191610199565b820191906000526020600020905b81548152906001019060200180831161017c57829003601f168201915b505083810382528681815460018160011615610100020316600290048152602001915080546001816001161561010002031660029004801561021c5780601f106101f15761010080835404028352916020019161021c565b820191906000526020600020905b8154815290600101906020018083116101ff57829003601f168201915b505097505050505050505060405180910390f35b341561023b57600080fd5b6102516004808035906020019091905050610587565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b341561029e57600080fd5b6102a66105cb565b6040518082815260200191505060405180910390f35b34156102c757600080fd5b61035a600480803590602001908201803590602001908080601f0160208091040260200160405190810160405280939291908181526020018383808284378201915050505050509190803590602001908201803590602001908080601f016020809104026020016040519081016040528093929190818152602001838380828437820191505050505050919050506105d8565b005b341561036757600080fd5b61037d60048080359060200190919050506108a9565b6040518082815260200191505060405180910390f35b341561039e57600080fd5b6103a6610aa0565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34156103f357600080fd5b6103fb610ac5565b6040518082815260200191505060405180910390f35b341561041c57600080fd5b6104326004808035906020019091905050610ad2565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b341561047f57600080fd5b6104ab600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610b11565b005b34156104b857600080fd5b6104c0610c66565b6040518080602001828103825283818151815260200191508051906020019060200280838360005b838110156105035780820151818401526020810190506104e8565b505050509050019250505060405180910390f35b60028181548110151561052657fe5b90600052602060002090600502016000915090508060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1690806001019080600201908060030154908060040160009054906101000a900460ff16905085565b600060018281548110151561059857fe5b906000526020600020900160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050919050565b6000600280549050905090565b600280548060010182816105ec9190610cfa565b9160005260206000209060050201600060a0604051908101604052803373ffffffffffffffffffffffffffffffffffffffff16815260200186815260200185815260200142815260200160011515815250909190915060008201518160000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060208201518160010190805190602001906106a5929190610d2c565b5060408201518160020190805190602001906106c2929190610d2c565b506060820151816003015560808201518160040160006101000a81548160ff021916908315150217905550505050600180548060010182816107049190610dac565b9160005260206000209001600033909190916101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550507fd609d15a195c24a0d0f60f60d4d37f7a41ad29914a6d9d6b54a824b53547d036338383426001604051808673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001806020018060200185815260200184151515158152602001838103835287818151815260200191508051906020019080838360005b838110156108005780820151818401526020810190506107e5565b50505050905090810190601f16801561082d5780820380516001836020036101000a031916815260200191505b50838103825286818151815260200191508051906020019080838360005b8381101561086657808201518184015260208101905061084b565b50505050905090810190601f1680156108935780820380516001836020036101000a031916815260200191505b5097505050505050505060405180910390a15050565b6108b1610dd8565b6002828154811015156108c057fe5b906000526020600020906005020160a060405190810160405290816000820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001600182018054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156109c95780601f1061099e576101008083540402835291602001916109c9565b820191906000526020600020905b8154815290600101906020018083116109ac57829003601f168201915b50505050508152602001600282018054600181600116156101000203166002900480601f016020809104026020016040519081016040528092919081815260200182805460018160011615610100020316600290048015610a6b5780601f10610a4057610100808354040283529160200191610a6b565b820191906000526020600020905b815481529060010190602001808311610a4e57829003601f168201915b50505050508152602001600382015481526020016004820160009054906101000a900460ff1615151515815250509050919050565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6000600180549050905090565b600181815481101515610ae157fe5b90600052602060002090016000915054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141515610b6c57600080fd5b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1614151515610ba857600080fd5b8073ffffffffffffffffffffffffffffffffffffffff166000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a3806000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050565b610c6e610e2c565b6001805480602002602001604051908101604052809291908181526020018280548015610cf057602002820191906000526020600020905b8160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019060010190808311610ca6575b5050505050905090565b815481835581811511610d2757600502816005028360005260206000209182019101610d269190610e40565b5b505050565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f10610d6d57805160ff1916838001178555610d9b565b82800160010185558215610d9b579182015b82811115610d9a578251825591602001919060010190610d7f565b5b509050610da89190610ec2565b5090565b815481835581811511610dd357818360005260206000209182019101610dd29190610ec2565b5b505050565b60a060405190810160405280600073ffffffffffffffffffffffffffffffffffffffff168152602001610e09610ee7565b8152602001610e16610ee7565b8152602001600081526020016000151581525090565b602060405190810160405280600081525090565b610ebf91905b80821115610ebb57600080820160006101000a81549073ffffffffffffffffffffffffffffffffffffffff0219169055600182016000610e869190610efb565b600282016000610e969190610efb565b60038201600090556004820160006101000a81549060ff021916905550600501610e46565b5090565b90565b610ee491905b80821115610ee0576000816000905550600101610ec8565b5090565b90565b602060405190810160405280600081525090565b50805460018160011615610100020316600290046000825580601f10610f215750610f40565b601f016020900490600052602060002090810190610f3f9190610ec2565b5b505600a165627a7a72305820bd89a8faf189862482df59ac4a924bc232365ebb51b26c4530142a2a257612c50029', 
        //      gas: '4700000'
        //    }, function (e, contract){
        //     console.log(e, contract);
        //     if (typeof contract.address !== 'undefined') {
        //          console.log('Contract mined! address: ' + contract.address + ' transactionHash: ' + contract.transactionHash);
        //     }
        // });
        
        let Cryptoboard = cryptoboardContract.at(CONTRACT_ADDRESS);
        console.log(Cryptoboard);

        // メッセージ更新イベントを定義
        let cryptoboardEvent = Cryptoboard.MessageInfo({}, 'latest');
        
        // メッセージ更新イベントを監視
        cryptoboardEvent.watch((err, result) => {
            if (!err) {
                if (result.blockHash != $("#insTrans").html()) 
                    $("#loader").hide();
                    
                console.log(result);
                let block_hash_html = 'Block hash: <a href="' + ETHERSCAN_URL + result.blockHash + '">' + result.blockHash + '</a>';
                $("#insTrans").html(block_hash_html);
                // If byte32, use web3.toAscii
                $("#post-user").html(result.args.nickName);
                $("#post-time").html(convertUnixtimeToDate(result.args.postTime.c[0]));
                $("#post-message").html(result.args.message);
                get_message_count();
            } else {
                $("#loader").hide();
            }
        });
        
        // メッセージリストを取得
        let get_message_count = () => {
            Cryptoboard.getMessageCount((error, result) => {
                let messages_html = '';
                if (result) {
                    if (parseInt(result.c) > 0) {
                        $("#messageCount").html(result.c + ' messages'); 
                        for (let i=0; i < parseInt(result.c[0]); i++) {
                            Cryptoboard.getMessage(i, (err, res) => {
                                if (!err) {
                                    // console.log(messages_html);
                                    let message_html = '<div class="message-list">';
                                    message_html += '<span id="post-user">' + res[1].toString() + '</span>';
                                    message_html += '<span id="post-time">' + convertUnixtimeToDate(res[4]).toString() + '</span>';
                                    message_html += '<p id="post-message">' + res[2].toString() + '</p>';
                                    message_html += '</div>'
                                    messages_html = message_html + messages_html;
                                    if (i === parseInt(result.c[0]) - 1) {
                                        $("#messages").html(messages_html);
                                    }
                                }
                            });
                        }
                        // console.log(messages_html);
                    } else {
                        $("#messageCount").html('0 messages'); 
                        $("#messages").html("No message.");
                    }
                }
            });
        }
        
        // メッセージ投稿
        $("#button").click(function() {
            $("#loader").show();
        
            Cryptoboard.postMessage($("#name").val(), $("#message").val(), 'main', {from: web3.eth.defaultAccount, gas: 210000}, (err, res) => {
                console.log(res);
                if (err) {
                    console.log(err);
                    $("#loader").hide();
                }
                let block_hash_html = 'Block hash: <a href="' + ETHERSCAN_URL + res + '">' + res + '</a>';
                $("#insTrans").html(block_hash_html);
                $("#post-user").html($("#name").val());
                $("#post-message").html($("#message").val());
                $("#loader").hide();
                $("#name").val('');
                $("#message").val('');
            });
        });
        
        get_message_count();

        let convertUnixtimeToDate = (timestamp) => {
            var d = new Date( timestamp * 1000 );
            var year  = d.getFullYear();
            var month = d.getMonth() + 1;
            var day  = d.getDate();
            var hour = ( d.getHours()   < 10 ) ? '0' + d.getHours()   : d.getHours();
            var min  = ( d.getMinutes() < 10 ) ? '0' + d.getMinutes() : d.getMinutes();
            var sec   = ( d.getSeconds() < 10 ) ? '0' + d.getSeconds() : d.getSeconds();
            let result = year + '/' + month + '/' + day + ' ' + hour + ':' + min + ':' + sec;
            return result;
        }
        
    }); // end of document ready
})(jQuery); // end of jQuery name space
