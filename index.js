'use strict'
const get = require("get")
const _ = require("underscore")

const layout = require("./layout.json")

let apiUrl = layout.apiUrl
let serviceEndpoints = layout.endpoints
let endpoints = _.keys(serviceEndpoints)
let idRegEx = /\:id/

function safeparse(json) {
    try {
        json = JSON.parse(json)
    } catch(e) {
        return false
    }
}

endpoints.reduce((memo, endpoint) => {
    memo[endpoint] = (id) => {

        return new Promise((resolve, reject) => {
            // Sanitize the id coming in
            let id = parseInt(id, 10)

            if (typeof id !== "number") return reject("ID should be a number")

            let url = apiUrl + serviceEndpoints[endpoint]
            let urlWithId = endpointUrl.replace(idRegEx, id)

            get(urlWithId)
            .then(data => {
                let res = safeparse(data)
                if (res) return resolve(res)
                else reject(new Error(`Could not safeparse API response: ${data}`))
            })
            .catch(reject)
        })
    }
    return memo
})
