const agentSchema = {
    firstName: {
        notEmpty: true,
        errorMessage: 'Please provide your first name'
    },
    lastName: {
        notEmpty: true,
        errorMessage: 'Please provide your first name'
    },
    agentLicense: {
        notEmpty: true,
        errorMessage: 'Please provide an Agent License'
    },
    address: {
        notEmpty: true,
        errorMessage: 'Please provide an address'
    }
}

module.exports = {
    agentSchema
} 