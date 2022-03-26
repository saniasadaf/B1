const commonResponse = (req, res) => {
    return res.json({ message: "hello users"});
}


module.exports = {
    commonResponse
}