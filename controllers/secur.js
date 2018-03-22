'use strict';

const crypto = require('crypto')

class Safety {
    hashpassword(pssw) {
        return crypto.createHmac('sha256', pssw).update('superhash:#8U0°1nfy7!"ç&àheuzhx').digest('hex')
    }

    no_html(str) {
        return str
    }

    input(str) {
        return str
    }
}

module.exports = new Safety()