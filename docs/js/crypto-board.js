(function($){
    $(function(){
  
        $('.button-collapse').sideNav();

        const PROVIDER_NETWORK = "http://localhost:8545";

        // Rinkeby
        // const PROVIDER_NETWORK = "https://www.rinkeby.io/";
        // const ETHERSCAN_URL = "https://rinkeby.etherscan.io/tx/";

        // Main net
        const ETHERSCAN_URL = "https://etherscan.io/tx/";

        const CONTRACT_ABI = [
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
            }
        ];
        
        // localhost
        // const CONTRACT_ADDRESS = '0x345ca3e014aaf5dca488057592ee47305d9b3e10';
        // Rinkeby
        // const CONTRACT_ADDRESS = '0xb21b1416f324c7b07626b91d019febbd396678a0';
        // Mainnet
        const CONTRACT_ADDRESS = '0xca30013b99cf01fe4d9c6f83b66bfa3800d842db';
        
        if (typeof web3 !== 'undefined') {
            web3 = new Web3(web3.currentProvider);
        } else {
            web3 = new Web3(new Web3.providers.HttpProvider(PROVIDER_NETWORK));
        }

        if (web3.isConnected()) {
            web3.eth.defaultAccount = web3.eth.accounts[0];

            if (web3.eth.defaultAccount) {
                $("#myAddress").html('Your Address: ' + web3.eth.accounts[0]);
                web3.eth.getBalance(web3.eth.defaultAccount, function (error, result) {
                    if (!error) {
                        console.log(result);
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
        let Cryptoboard = cryptoboardContract.at(CONTRACT_ADDRESS);

        // メッセージ更新イベントを定義
        let cryptoboardEvent = Cryptoboard.MessageInfo({}, 'latest');
        
        // メッセージ更新イベントを監視(Metamaskだと動かない)
        cryptoboardEvent.watch((err, result) => {
            if (!err) {
                // if (result.blockHash != $("#insTrans").html()) 
                //     $("#loader").hide();
                    
                // console.log(result);
                // let block_hash_html = 'Block hash: <a href="' + ETHERSCAN_URL + result.blockHash + '">' + result.blockHash + '</a>';
                // $("#insTrans").html(block_hash_html);
                // // If byte32, use web3.toAscii
                // $("#post-user").html(result.args.nickName);
                // $("#post-time").html(convertUnixtimeToDate(result.args.postTime.c[0]));
                // $("#post-message").html(result.args.message);
                get_messages();
            } else {
                $("#loader").hide();
            }
        });
        
        // メッセージリストを取得
        let get_messages = () => {
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
                $(".posted-message-area").css("display", "block");
            });
        });
        
        get_messages();

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
