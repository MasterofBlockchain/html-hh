import { ethers } from "./ethers-5.6.esm.min.js"

const connecButton = document.getElementById("connectbutton")
const fundButton = document.getElementById("fundbutton")
connectbutton.onclick = connect
fundbutton.onclick = fund

async function connect() {
    if (typeof window.ethereum != "undefined") {
        await window.ethereum.request({
            method: "eth_requestAccounts",
        })
        document.getElementById("connect button").innerHTML = "connected!"
    } else {
        document.getElementById("connect button").innerHTML =
            "please install metamask"
    }
}

async function fund(ethAmount) {
    console.log(`fundin with ${ethAmount}....`)
    if (typeof window.ethereum != "undefined") {
        //provider /connection to the blockchain
        //signer /wallet /someone with some gas
        //contract that we are intercating with
        //ABI and ADDRESS
    }
}
