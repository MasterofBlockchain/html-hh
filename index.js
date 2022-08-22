import { ethers } from "./ethers-5.6.esm.min.js"
import { abi, contractAddress } from "./constants.js"

const connectbutton = document.getElementById("connectbutton")
const fundbutton = document.getElementById("fundbutton")
const balanceButton = document.getElementById("balanceButton")
const withdrawalButton = document.getElementById("withdrawalButton")
connectbutton.onclick = connect
fundbutton.onclick = fund
balanceButton.onclick = getBalance
withdrawalButton.onclick = withdrawal
console.log(ethers)

async function connect() {
    if (typeof window.ethereum != "undefined") {
        await ethereum.request({
            method: "eth_requestAccounts",
        })
        connectbutton.innerHTML = "connected!"
    } else {
        connectbutton.innerHTML = "please install metamask"
    }
}

async function getBalance() {
    if (typeof window.ethereum != "undefined") {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const balance = await provider.getBalance(contractAddress)
        console.log(ethers.utils.formatEther(balance))
    }
}

async function fund() {
    const ethAmount = document.getElementById("ethAmount").value
    console.log(`fundin with ${ethAmount}`)

    if (typeof window.ethereum != "undefined") {
        //provider /connection to the blockchain
        //signer /wallet /someone with some gas
        //contract that we are intercating with
        //ABI and ADDRESS
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        const contract = new ethers.Contract(contractAddress, abi, signer)
        try {
            const transactionResponse = await contract.fund({
                value: ethers.utils.parseEther(ethAmount),
            })
            //wait for this tx to finish
            await listenForTransactionMine(transactionResponse, provider)
            console.log("done")
        } catch (error) {
            console.log(error)
        }
    }
}
function listenForTransactionMine(transactionResponse, provider) {
    console.log(`Mining ${transactionResponse.hash}....`)
    //liste for this transaction to be finish
    //return new Prommise()
    //function listener(){}/ we dont use it since we have annoymous function
    return new Promise((resolve, reject) => {
        provider.once(transactionResponse.hash, (transactionReceipt) => {
            console.log(
                `completed with ${transactionReceipt.confirmations}confirmations`
            )
            resolve()
        })
    })
}
async function withdrawal() {
    if (typeof window.ethereum != "undefined") {
        console.log("withdrawaling...")
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        const contract = new ethers.Contract(contractAddress, abi, signer)
        try {
            const transactionResponse = await contract.withdrawal()
            await listenForTransactionMine(transactionResponse, provider)
        } catch (error) {
            console.log(error)
        }
    }
}
